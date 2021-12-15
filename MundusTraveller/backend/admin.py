from django.contrib import admin
from .models import CreateUserModel, ReviewModel

# Register your models here.
admin.site.register(CreateUserModel)
admin.site.register(ReviewModel)