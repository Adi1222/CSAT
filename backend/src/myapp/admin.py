from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.


class MyUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name',
                    'last_name', 'is_superuser', 'twitter')
    list_filter = ('is_superuser', 'twitter')
    fieldsets = (
        ('User Credentials', {
            "fields": (
                'username', 'email', 'password'
            ),
        }),
        ('Personal Details', {
            "fields": (
                'first_name', 'last_name', 'twitter'
            )
        }),
        ('Location Details', {
            "fields": (
                'city', 'state'
            )
        }),
        ('Rights', {
            "fields": (
                'is_staff', 'is_superuser'
            )
        })
    )


admin.site.site_header = 'Sentiment Analysis'
admin.site.register(User, MyUserAdmin)
admin.site.unregister(Group)
