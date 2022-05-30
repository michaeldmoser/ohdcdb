"""
Organiztion Serializer
"""
from rest_framework import serializers
from .models import Organization


class OrganizationSerializer(serializers.ModelSerializer):
    '''
    Organiztion Serializer
    '''

    class Meta:
        '''
        Meta class for people serializer
        '''
        model = Organization
        fields = '__all__'
