from django.contrib import admin

from usuarios.models.usuario import Perfil, User


admin.site.register(User)
admin.site.register(Perfil)
