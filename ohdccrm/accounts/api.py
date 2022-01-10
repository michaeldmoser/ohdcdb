from rest_framework import generics, permissions
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer
from rest_framework.authtoken.models import Token

# Register api


class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })


# login api
class LoginApi(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })

# logout api


class LogoutApi(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()

        return Response(
            'User is logged out'
        )


# user api
class UserApi(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
