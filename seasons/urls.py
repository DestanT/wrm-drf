from django.urls import path
from .views import SeasonList, SeasonDetail, SeasonParticipantList

urlpatterns = [
    path('seasons/', SeasonList.as_view()),
    path('seasons/<int:pk>', SeasonDetail.as_view()),
    path('seasons/<int:pk>/participants/', SeasonParticipantList.as_view()),
]
