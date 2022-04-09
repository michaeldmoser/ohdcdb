'''
People objects api
'''
from rest_framework import viewsets, permissions
from rest_framework import filters

from .models import People
from .serializers import PeopleSerializer


class PeopleViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    '''People ViewSet'''

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PeopleSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'email']
    queryset = People.objects.all().order_by('first_name',  # pylint: disable=no-member
                                             'last_name')

    def perform_create(self, serializer):
        serializer.save()
