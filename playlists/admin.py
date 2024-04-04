from django.contrib import admin
from .models import Playlist

@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'type', 'added_on')
    list_filter = ('owner', 'type', 'added_on')
    search_fields = ('name', 'owner__username')
    date_hierarchy = 'added_on'
    ordering = ('-added_on',)
