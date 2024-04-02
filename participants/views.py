from rest_framework import generics
from wrm_api.permissions import IsOwnerOrReadOnly
from .models import Season
from .serializers import SeasonParticipantSerializer


class SeasonParticipantList(generics.ListAPIView):
    queryset = Season.objects.all()
    serializer_class = SeasonParticipantSerializer
    permission_classes = [IsOwnerOrReadOnly]
