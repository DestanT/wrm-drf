from rest_framework import generics, permissions
from .models import Season, SeasonParticipant
from .serializers import SeasonSerializer, SeasonParticipantSerializer


class SeasonList(generics.ListAPIView):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SeasonDetail(generics.RetrieveUpdateAPIView):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SeasonParticipantList(generics.ListAPIView):
    serializer_class = SeasonParticipantSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        season_id = self.kwargs.get('pk')
        return SeasonParticipant.objects.filter(season=season_id)
