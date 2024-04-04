from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('owner', 'created_at')
    search_fields = ('owner__username',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
