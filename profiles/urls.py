from django.urls import path
from profiles.views import ProfileList

urlpatterns = [
    path('profiles/', ProfileList.as_view()),
]
