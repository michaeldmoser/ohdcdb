'''
People objects api
'''
from rest_framework import viewsets, permissions

from .models import People
from .serializers import PeopleSerializer


class PeopleViewSet(viewsets.ModelViewSet):
    '''People ViewSet'''

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PeopleSerializer

    def get_queryset(self):
        return People.objects.all()  # pylint: disable=no-member

    def perform_create(self, serializer):
        serializer.save()