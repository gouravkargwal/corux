from django.urls import path, include
from api.views import UserAdminView, withdraw, deposit, upi, transactions, depositWithoutUtr, userBets, withdrawByUser, depositByUser

urlpatterns = [
    path("user/", UserAdminView.as_view()),
    path("withdraw/", withdraw.as_view()),
    path("deposit/", deposit.as_view()),
    path("depositWithoutUtr/", depositWithoutUtr.as_view()),
    path("upi/", upi.as_view()),
    path("transactions/", transactions.as_view()),
    path("userbets/", userBets.as_view()),
    path("withdrawByUser/", withdrawByUser.as_view()),
    path("depositByUser/", depositByUser.as_view()),
]

