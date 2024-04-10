from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
import base64
import os

# Create your views here.
from django.http import HttpResponse

def login_view(request):
    try:
        nonce = base64.b64encode(os.urandom(16)).decode('utf-8')
        if request.user.is_authenticated:
            return redirect('users')
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)  # Fix: Pass request object as first argument
                return redirect('users')
        return render(request, 'login.html', {'nonceValue': nonce})
    except Exception as e:
        print(str(e))
        return render(request, 'login.html', {'nonceValue': nonce})

@login_required
def users(request):
    nonce = base64.b64encode(os.urandom(16)).decode('utf-8')
    return render(request, 'users.html', {'nonceValue': nonce})

@login_required
def withdraw(request):
    nonce = base64.b64encode(os.urandom(16)).decode('utf-8')
    return render(request, 'withdraw.html', {'nonceValue': nonce})

@login_required
def deposit(request):
    nonce = base64.b64encode(os.urandom(16)).decode('utf-8')
    return render(request, 'deposit.html', {'nonceValue': nonce})

def logout_view(request):
    logout(request)
    return redirect('login')

