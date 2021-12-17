from django.contrib import admin
from .models import CreateUserModel, LikeModel, ReviewModel

# Register your models here.
admin.site.register(CreateUserModel)
admin.site.register(ReviewModel)
admin.site.register(LikeModel)