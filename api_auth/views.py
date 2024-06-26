import os
import secrets
import base64
import hashlib
from datetime import timedelta
from urllib.parse import urlencode
import requests
from django.http import JsonResponse
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from .models import SpotifyToken
from rest_framework_simplejwt.authentication import JWTAuthentication


def generate_code_verifier():
    return secrets.token_urlsafe(64)


def get_code_challenge(code_verifier):
    hashed = hashlib.sha256(code_verifier.encode()).digest()
    return base64.urlsafe_b64encode(hashed).decode().rstrip('=')


@login_required
def authorise_spotify(request):
    code_verifier = generate_code_verifier()
    code_challenge = get_code_challenge(code_verifier)
    request.session['code_verifier'] = code_verifier

    scope = 'user-read-private user-read-email streaming'
    params = {
        'response_type': 'code',
        'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
        'scope': scope,
        'code_challenge_method': 'S256',
        'code_challenge': code_challenge,
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
    }

    auth_url = f"https://accounts.spotify.com/authorize?{urlencode(params)}"
    return JsonResponse({'auth_url': auth_url})


# @login_required
def get_access_token(request):
    code = request.GET.get('code')
    code_verifier = request.GET.get('code_verifier')
    print("(Not Working!) user: ", request.user)

    if not code_verifier:
        return JsonResponse({'error': 'No code verifier found in session'}, status=400)

    payload = {
        'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
        'client_secret': os.environ.get('SPOTIFY_CLIENT_SECRET'),
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
        'code_verifier': code_verifier,
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    response = requests.post(
        'https://accounts.spotify.com/api/token', data=urlencode(payload), headers=headers, timeout=10
    )
    data = response.json()
    print("data: ", data)

    if response.status_code != 200:
        return JsonResponse(data, status=response.status_code)

    # FIX: Middleware - request.user is not correct! Below is a temporary fix
    auth = JWTAuthentication()
    header = auth.get_header(request)
    print("header: ", header)
    raw_token = auth.get_raw_token(header)
    validated_token = auth.get_validated_token(raw_token)
    user = auth.get_user(validated_token)

    # Update or create SpotifyToken and attach it to the user
    # user = request.user  # FIX: Middleware - request.user is not correct! Re-use when fixed
    expires_at = timezone.now() + timedelta(seconds=data['expires_in'])

    done = SpotifyToken.objects.update_or_create(
        owner=user,
        defaults={
            'access_token': data['access_token'],
            'token_type': data['token_type'],
            'expires_at': expires_at,
            'refresh_token': data.get('refresh_token', ''),
        }
    )
    print("done: ", done)

    return JsonResponse(data)


@login_required
def refresh_access_token(request):
    user = request.user
    try:
        spotify_token_object = SpotifyToken.objects.get(owner=user)
        refresh_token = spotify_token_object.refresh_token

        payload = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': os.environ.get('SPOTIFY_CLIENT_ID'),
            'client_secret': os.environ.get('SPOTIFY_CLIENT_SECRET'),
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        response = requests.post(
            'https://accounts.spotify.com/api/token', data=urlencode(payload), headers=headers, timeout=10
        )
        data = response.json()

        if response.status_code != 200:
            return JsonResponse(data, status=response.status_code)

        # Update the SpotifyToken object
        expires_at = timezone.now() + timedelta(seconds=data['expires_in'])

        spotify_token_object.access_token = data['access_token']
        spotify_token_object.expires_at = expires_at
        spotify_token_object.refresh_token = data.get('refresh_token', refresh_token)
        spotify_token_object.save()

        return JsonResponse(data)
    except SpotifyToken.DoesNotExist:
        return JsonResponse({'error': 'No existing token found for this user'}, status=404)


# @login_required
def search_spotify(request):
    query = request.GET.get('query')
    print("query: ", query)

    # FIX: Middleware - request.user is not correct! Below is a temporary fix
    auth = JWTAuthentication()
    header = auth.get_header(request)
    print("header: ", header)
    raw_token = auth.get_raw_token(header)
    print("raw_token: ", raw_token)
    validated_token = auth.get_validated_token(raw_token)
    print("validated_token: ", validated_token)
    user = auth.get_user(validated_token)
    print('user: ', user)

    token = SpotifyToken.objects.get(owner=user)
    print('token: ', token)
    access_token = token.access_token


    headers = {
        'Authorization': f'Bearer {access_token}',
    }

    response = requests.get(
        f'https://api.spotify.com/v1/albums/{query}', headers=headers, timeout=10
    )
    data = response.json()
    print("data: ", data)

    if response.status_code != 200:
        return JsonResponse(data, status=response.status_code)

    return JsonResponse(data)
