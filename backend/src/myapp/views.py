from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


# local imports
from .serializers import RegisterSerializer, LoginSerializer
from .models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_class = (AllowAny,)  # anyone can register

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            user = authenticate(
                username=request.data['email'], password=request.data['password'])

            payload = jwt_payload_handler(user)
            jwt_token = jwt_encode_handler(payload)

            response = {
                'success': 'True',
                'status code': status.HTTP_201_CREATED,
                'message': 'User registered successfully',
                'token': jwt_token,
                'email': user.email
            }

            return Response(response, status=status.HTTP_201_CREATED)

        else:
            response = {
                'success': 'False',

                'message': 'errors',
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)


class LoginView(CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            response = {
                'success': 'True',
                'status code': status.HTTP_200_OK,
                'message': 'User logged in successfully!',
                # because we have returned a token from the serializers class
                'token': serializer.data['token']
            }

            return Response(response, status=status.HTTP_200_OK)

        else:
            response = {
                'success': 'False',
                'status code': status.HTTP_401_UNAUTHORIZED,
                'message': 'Invalid Creadentials1 Please try again',
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def get(self, request, *args, **kwargs):
        try:
            user_profile = User.objects.get(
                username=self.request.user.username)
            status_code = status.HTTP_200_OK

            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'User Profile fetched successfully!',
                'data': [{
                    'email': user_profile.email,
                    'first_name': user_profile.first_name,
                    'last_name': user_profile.last_name,
                    'city': user_profile.city,
                    'state': user_profile.state,
                    'twitter': user_profile.twitter
                }]
            }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status coded': status_code,
                'message': 'User does not exists',
                'error': str(e)
            }

        return Response(response, status=status_code)
