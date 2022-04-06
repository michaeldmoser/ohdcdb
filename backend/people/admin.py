from django.contrib import admin

from .models import People


class PeopleAdmin(admin.ModelAdmin):
    '''Admin model for People object'''
    fields = ['first_name', 'last_name', 'mobile', 'email']
    list_display = ['first_name', 'last_name', 'mobile', 'email']


admin.site.register(People, PeopleAdmin)
