from rest_framework import generics, permissions
from .models import Season
from .serializers import SeasonSerializer


class SeasonList(generics.ListAPIView):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SeasonDetail(generics.RetrieveUpdateAPIView):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
