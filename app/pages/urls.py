from django.urls import re_path

import pages.views as p



urlpatterns = [
    re_path(r'$', p.HomePageView.as_view(), name='home'),
]
