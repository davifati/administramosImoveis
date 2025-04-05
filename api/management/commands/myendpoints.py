from django.core.management.base import BaseCommand
from django.urls import get_resolver

class Command(BaseCommand):
    help = 'Lista todos os endpoints registrados no Django'

    def handle(self, *args, **kwargs):
        urls = get_resolver().reverse_dict
        for pattern, view in urls.items():
            if isinstance(view, list):
                for v in view:
                    self.stdout.write(f'{pattern} -> {v}')
            else:
                self.stdout.write(f'{pattern} -> {view}')
