from django.contrib import admin
from .models import SpotifyToken

@admin.register(SpotifyToken)
class SpotifyTokenAdmin(admin.ModelAdmin):
    list_display = ('owner', 'last_refreshed', 'expires_at')
    search_fields = ('owner__username',)
    date_hierarchy = 'last_refreshed'
    ordering = ('-last_refreshed',)
