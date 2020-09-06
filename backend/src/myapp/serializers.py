from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from rest_framework_jwt.settings import api_settings

# local imports
from .models import User

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name',
                  'city', 'state', 'twitter', 'password']
        extra_kwargs = {'first_name': {'required': True},
                        'last_name': {'required': True}}

        validators = [
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['email'],  # no two emails should be same
                message='email should be unique'
            )
        ]

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            city=validated_data['city'],
            state=validated_data['state'],
            twitter=validated_data['twitter']
        )
        user.set_password(validated_data['password'])
        user.save()  # user created i.e registered
        user.password = '**hidden**'
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data['email']
        password = data['password']
        user = authenticate(username=email, password=password)

        if user is None:
            # raise some exception
            raise serializers.ValidationError(
                'A user with this email/username and password is not found')

        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exist')
        return {
            'email': user.email,
            'token': jwt_token
        }
