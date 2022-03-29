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
    # TODO: Implement an extra fields option so that we can do things like include @property fields
    #     extra_fields = ['full_name']

    # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(PeopleSerializer, self).get_field_names(
    #         declared_fields, info)

    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
