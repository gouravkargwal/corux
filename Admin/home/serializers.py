from rest_framework import serializers
from .models import UserAdminTable, PaymentTable

class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdminTable
        fields = "__all__"

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTable
        fields = "__all__"