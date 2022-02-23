from django.contrib.auth.models import User
from django.db.models.signals import pre_save

# change username to user email
def updateUsername(sender, instance, **kwargs):
    user = instance
    user.username = user.email if user.email else user.username


pre_save.connect(updateUsername, sender=User)
