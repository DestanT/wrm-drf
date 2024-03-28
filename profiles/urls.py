from django.urls import path
from profiles.views import ProfileList, ProfileDetail

urlpatterns = [
    path('profiles/', ProfileList.as_view()),
    path('profiles/<int:pk>/', ProfileDetail.as_view()),
]
