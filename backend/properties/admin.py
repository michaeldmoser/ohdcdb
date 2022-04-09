'''Properties app admin'''
from django.contrib import admin

from .models import Properties


class PropertiesAdmin(admin.ModelAdmin):
    '''Admin model for Properties object'''
    fields = ['address1', 'address2', 'postalcode', 'acres']
    list_display = ['address1', 'acres']


admin.site.register(Properties, PropertiesAdmin)
