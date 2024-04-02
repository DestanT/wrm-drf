from django.urls import path
from .views import RatingList, RatingDetail

urlpatterns = [
    path('ratings/', RatingList.as_view()),
    path('ratings/<int:pk>', RatingDetail.as_view()),
]
