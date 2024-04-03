from django.urls import path
from .views import SeasonList, SeasonDetail

urlpatterns = [
    path('seasons/', SeasonList.as_view()),
    path('seasons/<int:pk>', SeasonDetail.as_view()),
]
