from django.urls import path
from .views import authorise_spotify, get_access_token, refresh_access_token, search_spotify

urlpatterns = [
    path('auth/spotify/', authorise_spotify, name='authorise-spotify'),
    path('auth/spotify/callback/', get_access_token, name='get-spotify-access-token'),
    path('auth/spotify/refresh/', refresh_access_token, name='refresh-spotify-access-token'),
    path('auth/spotify/search/', search_spotify, name='search-spotify'),
]
