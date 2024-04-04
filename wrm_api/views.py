from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view()
def root_route(request):
    return Response({
        'message': 'Welcome to the WRM API.',
        'endpoints': {
            'profiles/': 'List of profiles',
            'profiles/<int:pk>/': 'Detail of a profile',
            'seasons/': 'List of seasons',
            'seasons/<int:pk>/': 'Detail of a season',
            'seasons/<int:pk>/participants/': 'List of participants in the season',
            'playlists/': 'List of playlists',
            'playlists/<int:pk>/': 'Detail of a playlist',
        }
    })
