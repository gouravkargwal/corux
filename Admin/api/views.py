from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.utils.timezone import now
from home.serializers import UserAdminSerializer, PaymentDepositSerializer, PaymentWithdrawSerializer, UpdateDepositSerializer, UpdateWithdrawSerializer, ValidationWithdrawApprovedSerializer, UpiTableSerializer
from home.models import UserAdminTable, PaymentDepositTable, PaymentWithdrawTable, UpiTable
from home.custom_logging import adminlogger
from django.conf import settings
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from django.utils import timezone
from decimal import Decimal, ROUND_HALF_UP
import datetime


class UserAdminView(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        try:
            adminlogger.info("UserAdmin get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            totalCount = UserAdminTable.objects.all().count()
            users = UserAdminTable.objects.all().order_by(
                '-CREATE_DATE')[start:start+length]
            serializedUsers = UserAdminSerializer(users, many=True)
            return Response({
                "data": serializedUsers.data,
                "recordsTotal": totalCount,
                "recordsFiltered": totalCount,
            })

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        permission_classes = [IsAuthenticated]
        try:
            adminlogger.info("UserAdmin Patch")
            data = request.data
            if not data.get('USER_ID'):
                return Response({"status": 400, "message": "User ID is required"})
            user = UserAdminTable.objects.get(
                USER_ID=request.data.get('USER_ID'))
            serializedUser = UserAdminSerializer(user, data=data, partial=True)
            if serializedUser.is_valid():
                serializedUser.save()
            else:
                return Response(serializedUser.errors)

            return Response({'status': 200, "message": "success"})

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)


class withdraw(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        try:
            adminlogger.info("withdraw get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            totalCount = PaymentWithdrawTable.objects.all().count()
            payments = PaymentWithdrawTable.objects.all().order_by(
                '-CREATE_DATE')[start:start+length]
            serializedpayments = PaymentWithdrawSerializer(payments, many=True)
            return Response(
                {
                    "data": serializedpayments.data,
                    "recordsTotal": totalCount,
                    "recordsFiltered": totalCount
                }
            )

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        permission_classes = [IsAuthenticated]
        try:
            with transaction.atomic():
                adminlogger.info("withdraw patch")
                data = request.data.copy()
                if not data.get('ID'):
                    return Response({"status": 400, "message": "ID is required"})
                payment = PaymentWithdrawTable.objects.get(ID=data.get('ID'))
                adminlogger.info(payment)
                paymentGetSerializer = UpdateWithdrawSerializer(payment)
                adminlogger.info(paymentGetSerializer.data)
                user = UserAdminTable.objects.get(
                    MOBILE_NUMBER=paymentGetSerializer.data["MOBILE_NUMBER"])
                if data.get("APPROVE_WITHDRAW"):
                    if paymentGetSerializer.data["DENY_WITHDRAW"]:
                        balance = Decimal(user.WINNING_BALANCE) - \
                            Decimal(paymentGetSerializer.data["AMOUNT"])
                    else:
                        balance = Decimal(user.BALANCE)
                elif data.get("DENY_WITHDRAW"):
                    balance = Decimal(user.WINNING_BALANCE) + \
                        Decimal(paymentGetSerializer.data["AMOUNT"])
                balance = balance.quantize(
                    Decimal('0.001'), rounding=ROUND_HALF_UP)
                serializedUser = UserAdminSerializer(
                    user, data={"WINNING_BALANCE": balance}, partial=True)
                serializedpayment = PaymentWithdrawSerializer(
                    payment, data=data, partial=True)
                if serializedpayment.is_valid():
                    if serializedUser.is_valid():
                        serializedpayment.save()
                        serializedUser.save()
                    else:
                        first_field = next(iter(serializedUser.errors))
                        first_error = serializedUser.errors[first_field][0]
                        return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    first_field = next(iter(serializedpayment.errors))
                    first_error = serializedpayment.errors[first_field][0]
                    return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)

                return Response({'status': 200, "message": "success"})

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)


class deposit(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        try:
            user = request.user
            adminlogger.info("deposit get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            searchValue = request.GET.get('search[value]', '')
            adminlogger.info(searchValue)
            upiId = UpiTable.objects.filter(
                USER_NAME=user.username).first().UPI_ID
            if searchValue:
                totalCount = PaymentDepositTable.objects.filter(
                    ADMIN_UPI_ID=upiId, UTR__icontains=searchValue, IS_PROMOTIONAL=False).count()
                payments = PaymentDepositTable.objects.filter(
                    ADMIN_UPI_ID=upiId, UTR__icontains=searchValue, IS_PROMOTIONAL=False)[start:start+length]
            else:
                totalCount = PaymentDepositTable.objects.filter(
                    ADMIN_UPI_ID=upiId, IS_PROMOTIONAL=False).count()
                payments = PaymentDepositTable.objects.filter(
                    ADMIN_UPI_ID=upiId, IS_PROMOTIONAL=False).order_by('-CREATE_DATE')[start:start+length]
            serializedpayments = PaymentDepositSerializer(payments, many=True)
            return Response(
                {
                    "data": serializedpayments.data,
                    "recordsTotal": totalCount,
                    "recordsFiltered": totalCount
                }
            )

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        permission_classes = [IsAuthenticated]
        try:
            with transaction.atomic():
                print("123")
                adminlogger.info("deposit patch")
                data = request.data.copy()
                if not data.get('ID'):
                    return Response({"status": 400, "message": "ID is required"})
                payment = PaymentDepositTable.objects.get(
                    ID=request.data.get('ID'))
                adminlogger.info(payment)
                paymentGetSerializer = UpdateDepositSerializer(payment)
                adminlogger.info(paymentGetSerializer.data)

                if data.get("APPROVE_DEPOSIT"):
                    notExist = PaymentDepositTable.objects.filter(
                        APPROVE_DEPOSIT=True, IS_PROMOTIONAL=False, MOBILE_NUMBER=paymentGetSerializer.data["MOBILE_NUMBER"]).exists()
                    if not notExist:
                        adminlogger.info("not exist")
                        promotional_amount = Decimal(
                            paymentGetSerializer.data["AMOUNT"]) * Decimal('0.15')
                        user = UserAdminTable.objects.get(
                            MOBILE_NUMBER=paymentGetSerializer.data["MOBILE_NUMBER"])

                        balance = (Decimal(user.BALANCE) +
                                   Decimal(paymentGetSerializer.data["AMOUNT"])).quantize(
                            Decimal('0.001'), rounding=ROUND_HALF_UP)

                        promotional_amount_new = (Decimal(user.PROMOTIONAL_BALANCE) + promotional_amount).quantize(
                            Decimal('0.001'), rounding=ROUND_HALF_UP)

                        new_balance = {"BALANCE": balance,
                                       "PROMOTIONAL_BALANCE": promotional_amount_new}

                        serializedUser = UserAdminSerializer(
                            user, data=new_balance, partial=True)
                        serializedpayment = PaymentDepositSerializer(
                            payment, data=data, partial=True)

                        new_deposit_data = {
                            "AMOUNT": promotional_amount.quantize(
                                Decimal('0.001'), rounding=ROUND_HALF_UP),
                            "MOBILE_NUMBER": paymentGetSerializer.data["MOBILE_NUMBER"],
                            "IS_PROMOTIONAL": 1,
                            "APPROVE_DEPOSIT": 1
                        }
                        new_deposit_serializer = PaymentDepositSerializer(
                            data=new_deposit_data)

                        if serializedpayment.is_valid():
                            if serializedUser.is_valid():
                                if new_deposit_serializer.is_valid():
                                    new_deposit_serializer.save()
                                    serializedpayment.save()
                                    serializedUser.save()
                                else:
                                    first_field = next(
                                        iter(new_deposit_serializer.errors))
                                    first_error = new_deposit_serializer.errors[first_field][0]
                                    return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)
                            else:
                                first_field = next(iter(serializedUser.errors))
                                first_error = serializedUser.errors[first_field][0]
                                return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)
                        else:
                            first_field = next(iter(serializedpayment.errors))
                            first_error = serializedpayment.errors[first_field][0]
                            return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        adminlogger.info("exist")
                        user = UserAdminTable.objects.get(
                            MOBILE_NUMBER=paymentGetSerializer.data["MOBILE_NUMBER"])

                        balance = (Decimal(user.BALANCE) +
                                   Decimal(paymentGetSerializer.data["AMOUNT"])).quantize(
                            Decimal('0.001'), rounding=ROUND_HALF_UP)

                        new_balance = {"BALANCE": balance}

                        serializedUser = UserAdminSerializer(
                            user, data=new_balance, partial=True)
                        serializedpayment = PaymentDepositSerializer(
                            payment, data=data, partial=True)

                        if serializedpayment.is_valid():
                            if serializedUser.is_valid():
                                serializedpayment.save()
                                serializedUser.save()

                            else:
                                first_field = next(iter(serializedUser.errors))
                                first_error = serializedUser.errors[first_field][0]
                                return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)
                        else:
                            first_field = next(iter(serializedpayment.errors))
                            first_error = serializedpayment.errors[first_field][0]
                            return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)

                elif data.get("DENY_DEPOSIT"):
                    serializedpayment = PaymentDepositSerializer(
                        payment, data=data, partial=True)
                    if serializedpayment.is_valid():
                        serializedpayment.save()

                    else:
                        first_field = next(iter(serializedpayment.errors))
                        first_error = serializedpayment.errors[first_field][0]
                        return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)

                return Response({'status': 200, "message": "success"})

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            print(str(e))
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)


class upi(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        try:
            adminlogger.info("upi get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            totalCount = UpiTable.objects.all().count()
            payments = UpiTable.objects.all()[start:start+length]
            serializedpayments = UpiTableSerializer(payments, many=True)
            return Response(
                {
                    "data": serializedpayments.data,
                    "recordsTotal": totalCount,
                    "recordsFiltered": totalCount
                }
            )

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        permission_classes = [IsAuthenticated]
        try:
            with transaction.atomic():
                adminlogger.info("upi patch")
                data = request.data.copy()
                if not data.get('ID'):
                    return Response({"status": 400, "message": "ID is required"})
                upiEntry = UpiTable.objects.get(ID=request.data.get('ID'))
                upiEntry.delete()
                return Response({'status': 200, "message": "success"})

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        permission_classes = [IsAuthenticated]
        try:
            with transaction.atomic():
                adminlogger.info("upi post")
                data = request.data.copy()
                upiSerializer = UpiTableSerializer(data=data)
                if upiSerializer.is_valid():
                    upiSerializer.save()
                return Response({'status': 200, "message": "success"})

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)


class transactions(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        try:
            date = request.GET.get("date")
            adminlogger.info(date)
            deposit_sum = PaymentDepositTable.objects.filter(
                UPDATE_DATE__lte=date, APPROVE_DEPOSIT=1).aggregate(Sum('AMOUNT'))['AMOUNT__sum'] or 0
            adminlogger.info(deposit_sum)
            deposit_sum = round(deposit_sum, 2)

            withdraw_sum = PaymentWithdrawTable.objects.filter(
                UPDATE_DATE__lte=date, APPROVE_WITHDRAW=1).aggregate(Sum('AMOUNT'))['AMOUNT__sum'] or 0
            withdraw_sum = round(withdraw_sum, 2)

            balance_sum = UserAdminTable.objects.aggregate(Sum('BALANCE'))[
                'BALANCE__sum'] or 0
            balance_sum = round(balance_sum, 2)
            profit = deposit_sum-withdraw_sum-balance_sum

            return Response({
                'status': 200,
                'message': 'success',
                'deposit': deposit_sum,
                'withdraw': withdraw_sum,
                'balance': profit
            })

        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message": "Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)
