#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    sys.path.append('../../backend')
    #os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

    import django
    django.setup()

    from django.contrib.auth.models import User
    user = User.objects.create_user(
        'john', 'lennon@thebeatles.com', 'johnpassword')

    user.save()


if __name__ == '__main__':
    main()
