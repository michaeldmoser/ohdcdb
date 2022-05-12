'''
People objects api
'''
from rest_framework import viewsets, permissions
from rest_framework import filters
from rest_framework.response import Response

from .models import People
from .serializers import PeopleSerializer, PeopleListSerializer


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

    def get_serializer_class(self):
        if self.action == 'list':
            return PeopleListSerializer

        return PeopleSerializer
