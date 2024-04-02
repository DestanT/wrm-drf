from django.urls import path
from .views import PlaylistList, PlaylistDetail

urlpatterns = [
    path('playlists/', PlaylistList.as_view()),
    path('playlists/<int:pk>', PlaylistDetail.as_view()),
]
