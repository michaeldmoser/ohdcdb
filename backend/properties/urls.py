'''Properties app urls'''

from rest_framework import routers

from .api import PropertiesViewSet

router = routers.DefaultRouter()
router.register('api/properties',  PropertiesViewSet, basename='properties')

urlpatterns = router.urls
