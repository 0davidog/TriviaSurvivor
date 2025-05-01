from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserData

@receiver(post_save, sender=User)
def create_user_data(sender, instance, created, **kwargs):
    if created:
        UserData.objects.create(user=instance)


@receiver(post_save, sender=User)
def update_user_data(sender, instance, created, **kwargs):
    if not created:
        try:
            instance.userdata.save()
        except UserData.DoesNotExist:
            # In case it was deleted manually
            UserData.objects.create(user=instance)