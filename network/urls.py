
from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('admin', admin.site.urls),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("<int:grad_id>", views.profile, name="profile"),
    path("summary", views.summary, name="summary"),
    path("memoriam/<str:person>", views.memoriam, name="memoriam"),
]
