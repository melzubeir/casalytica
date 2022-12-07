"""
casalytica settings for config project.
"""

from os import environ, path
from pathlib import Path
import logging
import re
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = environ.get('DJANGO_SECRET', 'changeme')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(environ.get('DEBUG', 1)))
ENVIRONMENT = environ.get('ENVIRONMENT', default='development')
USE_S3 = bool(int(environ.get('USE_S3', 0)))

# In production force https
if ENVIRONMENT == 'production':
    SECURE_BROWSER_XSS_FILTER = True
    X_FRAME_OPTIONS = 'DENY'
    SECURE_SSL_REDIRECT = False
    SECURE_HSTS_SECONDS = 3600
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_PROXY_SSL_HEADER = ('X-Forwarded-Proto', 'https')


LOGGING = {
    'version': 1,                       # the dictConfig format version
    'disable_existing_loggers': False,  # retain the default loggers
    'formatters': {
        'console': {
            'format': '%(name)-12s %(levelname)-8s %(message)s'
        },
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'formatter': 'file',
            'filename': 'general.log'
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        }
    }
}


logger = logging.getLogger(__name__)

if DEBUG:
    ALLOWED_HOSTS = ['*']
    TEMPLATE_DEBUG = True
else:
    ALLOWED_HOSTS = []
    ALLOWED_HOSTS.extend(
        filter(
            None,
            environ.get('ALLOWED_HOSTS', '').split(','),
        )
    )

CORS_ALLOWED_ORIGINS = [
    "https://www.casalytica.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "corsheaders",

    "debug_toolbar",
    "geoip2",

    "rest_framework",
    "rest_framework.authtoken",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "drf_spectacular",
    "drf_spectacular_sidecar",
    "django_ses",

    "core",
    "analytics",
    "user",


]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware"
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [path.join(BASE_DIR, 'templates')],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': environ.get('DB_HOST'),
        'NAME': environ.get('DB_NAME'),
        'USER': environ.get('DB_USER'),
        'PASSWORD': environ.get('DB_PASS'),
    }
}


# DeSo configs
nodeURL = environ.get('NODE_URL', 'https://node.deso.org/api/v0/')
casalyticaPublicKey = 'BC1YLiy1Ny1btpBkaNHBaUD5D9xX8PhdgeToPn3Fq95RhCMYQVW1Anw'
SKIP_DESO = bool(int(environ.get('SKIP_DESO', 0)))

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Validators
HEXA_RE = re.compile('^[A-Fa-f0-9]+$')
HEXA_VALID = RegexValidator(HEXA_RE, _('Enter a valid hex number '), 'invalid')


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "America/Chicago"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = 'media/'
MEDIA_ROOT = '/vol/web/media'
STATIC_ROOT = '/vol/web/static'
STATICFILES_DIRS = (path.join(BASE_DIR, 'static'),)

# geip2 path to database
GEOIP_PATH = environ.get('GEOIP_PATH')


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASS   ES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ]
}

SPECTACULAR_SETTINGS = {
    'COMPONENT_SPLIT_REQUEST': True,
    # 'SWAGGER_UI_DIST': 'SIDECAR',  # shorthand to use the sidecar instead
    # 'SWAGGER_UI_FAVICON_HREF': 'SIDECAR',
    # 'REDOC_DIST': 'SIDECAR',
    'TITLE': 'Casalytica API',
    'DESCRIPTION': 'analytics for on-chain content',
    'CONTACT': {'name': 'Casalytica', 'email': 'hello@casalytica.com'},
    'LICENSE': {'name': 'BSD-3-CLAUSE', 'url': 'https://github.com/melzubeir/casalytica/blob/master/LICENSE.txt'},
    'VERSION': '0.0.1',
    'SCHEMA_PATH_PREFIX': r'/v0',
    # "SWAGGER_UI_DIST": "//unpkg.com/swagger-ui-dist@3.35.1", # default
    # default is swagger favicon
    "SWAGGER_UI_FAVICON_HREF": STATIC_URL + "images/favicon.ico",
}


# USER MODEL & AUTHENTICATION BACKENDS

AUTH_USER_MODEL = 'core.User'
SITE_ID = 1


AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)


ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'https'
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = False
ACCOUNT_USER_MODEL_USERNAME_FIELD=None

# Email tings
DEFAULT_FROM_EMAIL = environ.get('DEFAULT_FROM_EMAIL', 'hello@casalytica.com')
EMAIL_BACKEND = 'django_ses.SESBackend'
AWS_REGION = environ.get('AWS_REGION', 'us-east-2')
AWS_SES_REGION_ENDPOINT = 'email.' + AWS_REGION + '.amazonaws.com'
AWS_SES_ACCESS_KEY_ID = environ.get('AWS_SES_ACCESS_KEY_ID', '')
AWS_SES_SECRET_ACCESS_KEY = environ.get('AWS_SES_SECRET_ACCESS_KEY', '')

# Login/logout redirects
LOGIN_REDIRECT_URL = 'home'
LOGOUT_REDIRECT_URL = 'home'

# CasaBot
CASABOT = environ.get('CASABOT', default='casalytica')
CASAPUBLICKEY = environ.get(
    'CASAPUBLICKEY', default='BC1YLiy1Ny1btpBkaNHBaUD5D9xX8PhdgeToPn3Fq95RhCMYQVW1Anw')
CASASEEDHEX = environ.get('CASASEEDHEX', default='')
