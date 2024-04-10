from django.db import models

# Create your models here.
class UserAdminTable(models.Model):

    USER_ID = models.AutoField(primary_key=True)

    USER_NAME = models.CharField(max_length=30, null=False)

    MOBILE_NUMBER = models.CharField(max_length=15, null=False)

    PASSWORD = models.CharField(max_length=200, null=False)

    IS_KYC = models.BooleanField(default=False)

    IS_BLOCKED = models.BooleanField(default=False)

    CREATE_DATE = models.DateTimeField(auto_now_add=True)

    BALANCE = models.FloatField(default=0)


    class Meta:
        db_table = "USER_ADMIN"


class PaymentTable(models.Model):

    ID = models.AutoField(primary_key=True)

    MOBILE_NUMBER = models.CharField(max_length=15, null=False)

    IS_DEPOSIT = models.BooleanField(default=False)

    IS_WITHDRAW = models.BooleanField(default=False)

    APPROVE_PAYMENT = models.BooleanField(default=False)

    CREATE_DATE = models.DateTimeField(auto_now_add=True)

    AMOUNT = models.FloatField(null=False)

    class Meta:
        db_table = "PAYMENT"
