from rest_framework import serializers
from .models import UserAdminTable, PaymentDepositTable, PaymentWithdrawTable, UpiTable

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

class UpdateDepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDepositTable
        fields = ['AMOUNT', 'MOBILE_NUMBER']

class UpdateWithdrawSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentWithdrawTable
        fields = ['AMOUNT', 'MOBILE_NUMBER']

class UpiIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpiTable
        fields = ['UPI_ID']

class UpiTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpiTable
        fields = '__all__'

class ValidationWithdrawApprovedSerializer(serializers.Serializer):
    ID = serializers.IntegerField(required=True, error_messages={'required': 'ID is required.', 'invalid': 'ID must be an integer', 'blank': 'ID can not be blank'})
    ADMIN_UPI_ID = serializers.CharField(required=True, max_length=255, error_messages={'required': 'ADMIN UPI ID is required', 'blank': 'ADMIN UPI ID can not be blank'})
    APPROVE_WITHDRAW = serializers.BooleanField(required=True, error_messages={'required': 'APPROVE WITHDRAW is required', 'blank': 'APPROVE WITHDRAW can not be blank'})

    def validate_APPROVE_WITHDRAW(self, value):
        if value is not True:
            raise serializers.ValidationError("APPROVE WITHDRAW must be set to True")
        return value

class ValidationWithdrawDeniedSerializer(serializers.Serializer):
    ID = serializers.IntegerField(required=True)
    DENY_WITHDRAW = serializers.BooleanField(required=True)