"""
People Serializer
"""
from rest_framework import serializers
from .models import People


class PeopleSerializer(serializers.ModelSerializer):
    '''
    People Serializer
    '''
    class Meta:
        '''
        Meta class for people serializer
        '''
        model = People
        fields = '__all__'
