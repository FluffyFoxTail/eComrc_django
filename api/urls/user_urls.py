from django.urls import path

from api.views import user_views as views

urlpatterns = [
    path("", views.get_users, name="all_users"),
    path("register/", views.register_user, name="register_user"),
    path('login/', views.CustomTokenObtainPairView.as_view(),
         name='login_with_jwt'),
    path("profile/", views.get_user_profile, name="userInfo"),
]
