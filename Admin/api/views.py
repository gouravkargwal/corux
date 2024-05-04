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
from django.db import transaction


class UserAdminView(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        try:
            adminlogger.info("UserAdmin get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            totalCount = UserAdminTable.objects.all().count()
            users = UserAdminTable.objects.all().order_by('-CREATE_DATE')[start:start+length]
            serializedUsers = UserAdminSerializer(users, many=True)
            return Response({
                "data": serializedUsers.data,
                "recordsTotal": totalCount,
                "recordsFiltered": totalCount,
            })
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        permission_classes = [IsAuthenticated]
        try:
            adminlogger.info("UserAdmin Patch")
            data = request.data
            if not data.get('USER_ID'):
                return Response({"status": 400, "message":"User ID is required"})
            user = UserAdminTable.objects.get(USER_ID=request.data.get('USER_ID'))
            serializedUser = UserAdminSerializer(user, data=data, partial=True)
            if serializedUser.is_valid():
                serializedUser.save()
            else:
                return Response(serializedUser.errors)
            
            return Response({'status': 200, "message": "success"})
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)
        
class withdraw(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        try:
            adminlogger.info("withdraw get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            totalCount = PaymentWithdrawTable.objects.all().count()
            payments = PaymentWithdrawTable.objects.all().order_by('-CREATE_DATE')[start:start+length]
            serializedpayments = PaymentWithdrawSerializer(payments, many=True)
            return Response(
                {
                    "data" : serializedpayments.data,
                    "recordsTotal": totalCount,
                    "recordsFiltered": totalCount
                }
            )
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request):
        permission_classes = [IsAuthenticated]
        try:
            with transaction.atomic():
                adminlogger.info("withdraw patch")
                data = request.data.copy()
                serializer = ValidationWithdrawApprovedSerializer(data=data)
                if serializer.is_valid():
                    pass
                else:
                    first_field = next(iter(serializer.errors))
                    first_error = serializer.errors[first_field][0] 
                    return Response({"message": first_error}, status=status.HTTP_400_BAD_REQUEST)
                payment = PaymentWithdrawTable.objects.get(ID=request.data.get('ID'))
                serializedpayment = PaymentWithdrawSerializer(payment, data=data, partial=True)
                if serializedpayment.is_valid():
                    serializedpayment.save()
                else:
                    return Response(serializedpayment.errors)
                return Response({'status': 200, "message": "success"})
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)

    
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
            upiId = UpiTable.objects.filter(USER_NAME = user.username).first().UPI_ID
            if searchValue:
                totalCount = PaymentDepositTable.objects.filter(ADMIN_UPI_ID=upiId, UTR__icontains=searchValue).count()
                payments = PaymentDepositTable.objects.filter(ADMIN_UPI_ID=upiId, UTR__icontains=searchValue)[start:start+length]
            else:
                totalCount = PaymentDepositTable.objects.filter(ADMIN_UPI_ID=upiId).count()
                payments = PaymentDepositTable.objects.filter(ADMIN_UPI_ID=upiId).order_by('-CREATE_DATE')[start:start+length]
            serializedpayments = PaymentDepositSerializer(payments, many=True)
            return Response(
                {
                    "data" : serializedpayments.data,
                    "recordsTotal": totalCount,
                    "recordsFiltered": totalCount
                }
            )
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request):
        permission_classes = [IsAuthenticated]
        try:
            with transaction.atomic():
                adminlogger.info("deposit patch")
                data = request.data.copy()
                if not data.get('ID'):
                    return Response({"status": 400, "message":"ID is required"})
                payment = PaymentDepositTable.objects.get(ID=request.data.get('ID'))
                adminlogger.info(payment)
                paymentGetSerializer = UpdateDepositSerializer(payment)
                adminlogger.info(paymentGetSerializer.data)
                user = UserAdminTable.objects.get(MOBILE_NUMBER=paymentGetSerializer.data["MOBILE_NUMBER"])
                if data.get("APPROVE_DEPOSIT"):
                    balance=user.BALANCE + paymentGetSerializer.data["AMOUNT"]
                elif data.get("DENY_DEPOSIT"):
                    balance=user.BALANCE
                serializedUser = UserAdminSerializer(user, data={"BALANCE": balance}, partial=True)
                serializedpayment = PaymentDepositSerializer(payment, data=data, partial=True)
                if serializedpayment.is_valid() and serializedUser.is_valid():
                    serializedpayment.save()
                    serializedUser.save()
                else:
                    return Response(serializedpayment.errors)
                return Response({'status': 200, "message": "success"})
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)
        
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
                    "data" : serializedpayments.data,
                    "recordsTotal": totalCount,
                    "recordsFiltered": totalCount
                }
            )
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        permission_classes = [IsAuthenticated]
        try:
            with transaction.atomic():
                adminlogger.info("upi patch")
                data = request.data.copy()
                if not data.get('ID'):
                    return Response({"status": 400, "message":"ID is required"})
                upiEntry = UpiTable.objects.get(ID=request.data.get('ID'))
                upiEntry.delete()
                return Response({'status': 200, "message": "success"})
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)
        
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
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)

