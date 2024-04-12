from rest_framework import serializers
from .models import UserAdminTable, PaymentDepositTable, PaymentWithdrawTable

class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdminTable
        fields = "__all__"

class PaymentDepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDepositTable
        fields = "__all__"

class PaymentWithdrawSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentWithdrawTable
        fields = "__all__"