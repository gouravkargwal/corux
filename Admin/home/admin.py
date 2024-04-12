from django.contrib import admin
from .models import UserAdminTable, PaymentDepositTable, PaymentWithdrawTable

# Register your models here.
admin.site.register(UserAdminTable)
admin.site.register(PaymentDepositTable)
admin.site.register(PaymentWithdrawTable)