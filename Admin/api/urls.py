from django.urls import path, include
from api.views import UserAdminView, withdraw, deposit, upi, transaction

urlpatterns = [
    path("user/", UserAdminView.as_view()),
    path("withdraw/", withdraw.as_view()),
    path("deposit/", deposit.as_view()),
    path("upi/", upi.as_view()),
    path("transaction/", transaction.as_view()),
]
