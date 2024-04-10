from django.contrib import admin
from .models import UserAdminTable, PaymentTable

# Register your models here.
admin.site.register(UserAdminTable)
admin.site.register(PaymentTable)