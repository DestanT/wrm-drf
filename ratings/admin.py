from django.contrib import admin
from .models import Rating

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('owner', 'score', 'playlist', 'created_at')
    list_filter = ('owner', 'playlist__season__name')
    search_fields = ('owner__username', 'playlist__name', 'playlist__season__name')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
