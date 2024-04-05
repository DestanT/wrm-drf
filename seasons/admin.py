from django.contrib import admin
from .models import Season, SeasonParticipant

@admin.register(Season)
class SeasonAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_on', 'ended_on')
    list_filter = ('name', 'participants__username')
    search_fields = ('name', 'description')
    date_hierarchy = 'created_on'
    ordering = ('-created_on',)

@admin.register(SeasonParticipant)
class SeasonParticipantAdmin(admin.ModelAdmin):
    list_display = ('season', 'user', 'joined_on')
    list_filter = ('season', 'user')
    search_fields = ('season__name', 'user__username')
    date_hierarchy = 'joined_on'
    ordering = ('-joined_on',)
