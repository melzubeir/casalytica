#!/bin/sh

set -e

python manage.py wait_for_db
python /scripts/nltk.py
python manage.py collectstatic --noinput
python manage.py migrate

#uwsgi --socket casalytica.sock --chmod-socket=777 --workers 4 --master --enable-threads --module config.wsgi
uwsgi --ini uwsgi.ini
