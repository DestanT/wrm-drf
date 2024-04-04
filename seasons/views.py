from rest_framework import generics
from wrm_api.permissions import IsAdminOrReadOnly
from .models import Season, SeasonParticipant
from .serializers import SeasonSerializer, SeasonParticipantSerializer


class SeasonList(generics.ListAPIView):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [IsAdminOrReadOnly]


class SeasonDetail(generics.RetrieveUpdateAPIView):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [IsAdminOrReadOnly]


class SeasonParticipantList(generics.ListAPIView):
    serializer_class = SeasonParticipantSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        season_id = self.kwargs.get('pk')
        return SeasonParticipant.objects.filter(season=season_id)
