from django.urls import path
from .views import SeasonParticipantList

urlpatterns = [
    path('participants/', SeasonParticipantList.as_view()),
]
