from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.utils.timezone import now
from home.serializers import UserAdminSerializer, PaymentDepositSerializer, PaymentWithdrawSerializer
from home.models import UserAdminTable, PaymentDepositTable, PaymentWithdrawTable
from home.custom_logging import adminlogger


class UserAdminView(APIView):
    def get(self, request):
        try:
            adminlogger.info("UserAdmin get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            totalCount = UserAdminTable.objects.all().count()
            users = UserAdminTable.objects.all()[start:start+length]
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
        try:
            adminlogger.info("withdraw get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            totalCount = PaymentWithdrawTable.objects.all().count()
            payments = PaymentWithdrawTable.objects.all()[start:start+length]
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
        try:
            adminlogger.info("withdraw patch")
            data = request.data.copy()
            if not data.get('ID'):
                return Response({"status": 400, "message":"ID is required"})
            data["UPDATE_DATE"] = now()
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
        try:
            adminlogger.info("deposit get")
            start = int(request.GET.get('start', 0))
            length = int(request.GET.get('length', start + 25))
            totalCount = PaymentDepositTable.objects.all().count()
            payments = PaymentDepositTable.objects.all()[start:start+length]
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
        try:
            adminlogger.info("deposit patch")
            data = request.data.copy()
            if not data.get('ID'):
                return Response({"status": 400, "message":"ID is required"})
            payment = PaymentDepositTable.objects.get(ID=request.data.get('ID'))
            data["UPDATE_DATE"] = now()
            serializedpayment = PaymentDepositSerializer(payment, data=data, partial=True)
            if serializedpayment.is_valid():
                serializedpayment.save()
            else:
                return Response(serializedpayment.errors)
            return Response({'status': 200, "message": "success"})
        
        except Exception as e:
            adminlogger.error(f"Error: {str(e)}")
            return Response({"status": 400, "message":"Something went wrong. Please try again later"}, status=status.HTTP_400_BAD_REQUEST)