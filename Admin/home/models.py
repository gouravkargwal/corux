from django.db import models
import uuid
from datetime import datetime

# Create your models here.


class UserAdminTable(models.Model):

    USER_ID = models.AutoField(primary_key=True)

    USER_NAME = models.CharField(max_length=30, null=False)

    MOBILE_NUMBER = models.CharField(max_length=12, null=False)

    PASSWORD = models.CharField(max_length=200, null=False)

    IS_KYC = models.BooleanField(default=False)

    IS_BLOCKED = models.BooleanField(default=False)

    CREATE_DATE = models.DateTimeField(auto_now_add=True)

    BALANCE = models.DecimalField(max_digits=30, decimal_places=3, default=0)

    PROMOTIONAL_BALANCE = models.DecimalField(
        max_digits=30, decimal_places=3, default=50)

    WINNING_BALANCE = models.DecimalField(
        max_digits=30, decimal_places=3, default=0)

    UPDATE_DATE = models.DateTimeField(auto_now=True)

    UPDATE_DATE = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "USER"


class PaymentDepositTable(models.Model):

    ID = models.AutoField(primary_key=True)

    MOBILE_NUMBER = models.CharField(max_length=15, null=False)

    TRANSACTION_ID = models.UUIDField(default=uuid.uuid4, editable=False)

    ADMIN_UPI_ID = models.CharField(max_length=50, null=True, blank=True)

    UTR = models.CharField(max_length=50, null=True, blank=True)

    CREATE_DATE = models.DateTimeField(auto_now_add=True)

    AMOUNT = models.DecimalField(max_digits=30, decimal_places=3, null=False)

    APPROVE_DEPOSIT = models.BooleanField(default=False)

    DENY_DEPOSIT = models.BooleanField(default=False)

    IS_PROMOTIONAL = models.BooleanField(default=False)

    UPDATE_DATE = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "DEPOSIT"


class PaymentWithdrawTable(models.Model):

    ID = models.AutoField(primary_key=True)

    MOBILE_NUMBER = models.CharField(max_length=15, null=False)

    UTR = models.CharField(max_length=50, null=True, blank=True)

    USER_UPI_ID = models.CharField(max_length=50, null=False)

    ADMIN_UPI_ID = models.CharField(max_length=50, null=True, blank=True)

    CREATE_DATE = models.DateTimeField(auto_now_add=True)

    AMOUNT = models.DecimalField(max_digits=30, decimal_places=3, null=False)

    APPROVE_WITHDRAW = models.BooleanField(default=False)

    DENY_WITHDRAW = models.BooleanField(default=False)

    UPDATE_DATE = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "WITHDRAW"


class UpiTable(models.Model):

    ID = models.AutoField(primary_key=True)

    USER_NAME = models.CharField(max_length=30, null=False)

    UPI_ID = models.CharField(max_length=50, null=False)

    CREATE_DATE = models.DateTimeField(auto_now_add=True)

    UPDATE_DATE = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "UPI_TABLE"


class ReferralTable(models.Model):
    REFERRAL_ID = models.AutoField(primary_key=True)

    MOBILE_NUMBER = models.CharField(max_length=12, null=False)

    REFERRAL_CODE_TO = models.CharField(max_length=10, null=False)

    REFERRAL_CODE_FROM = models.CharField(max_length=10, null=True, blank=True)

    LEVEL_1_REFER = models.CharField(max_length=15, null=True, blank=True)

    LEVEL_2_REFER = models.CharField(max_length=15, null=True, blank=True)

    CREATE_DATE = models.DateTimeField(auto_now_add=True)

    UPDATE_DATE = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'REFERRAL_TABLE'
        
class BetColor(models.Model):
    MOBILE_NUMBER = models.CharField(max_length=12)
    GAME_ID = models.CharField(max_length=14)
    BET_ID = models.BigAutoField(primary_key=True)  # Auto-incrementing primary key
    BET_ON = models.CharField(max_length=10, blank=True, null=True)  # Nullable field
    BET_AMOUNT = models.FloatField(default=0.0, null=True)  # Float field for amounts
    CREATE_DATE = models.DateTimeField(auto_now_add=True)
    UPDATE_DATE = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'BET_COLOR'  # Specify the database table name
        
class BetNumber(models.Model):
    MOBILE_NUMBER = models.CharField(max_length=12)
    GAME_ID = models.CharField(max_length=14)
    BET_ID = models.BigAutoField(primary_key=True)  # Auto-incrementing primary key
    BET_ON = models.BigIntegerField(blank=True, null=True)  # Nullable field
    BET_AMOUNT = models.FloatField(default=0.0, null=True)  # Float field for amounts
    CREATE_DATE = models.DateTimeField(auto_now_add=True)
    UPDATE_DATE = models.DateTimeField(auto_now=True)


    class Meta:
        db_table = 'BET_NUMBER'  # Specify the database table name
        
class AllTimeWinner(models.Model):
    RESULT_ID = models.AutoField(primary_key=True)  # AutoField automatically creates an integer primary key
    BET_ID = models.BigIntegerField()
    MOBILE_NUMBER = models.CharField(max_length=12)
    GAME_ID = models.CharField(max_length=14)
    COLOR = models.CharField(max_length=10, default='grey', null=True, blank=True)
    NUMBER = models.BigIntegerField(default=-1, null=True, blank=True)
    AMOUNT_WON = models.FloatField(default=0, null=True, blank=True)
    CREATE_DATE = models.DateTimeField(auto_now_add=True)
    UPDATE_DATE = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "ALL_TIME_WINNER_TABLE"  # Define the table name in the database
