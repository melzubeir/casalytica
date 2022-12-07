FROM python:3.9-alpine3.13
LABEL maintainer="elzubeir"

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./scripts /scripts
COPY ./app /app
COPY crontab /etc/cron.d/crontab
WORKDIR /app

ARG DEV=false
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk update && \
    apk add --update --no-cache curl bash postgresql-client jpeg-dev \
        chromium chromium-chromedriver \
        harfbuzz ttf-freefont freetype freetype-dev nss && \
    apk add --update --no-cache --virtual .tmp-build-deps \
        build-base postgresql-dev musl-dev zlib zlib-dev linux-headers && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ $DEV = "true" ]; \
        then /py/bin/pip install -r /tmp/requirements.dev.txt ; \
    fi && \
    rm -rf /tmp && \
    apk del .tmp-build-deps && \
    adduser \
        --disabled-password \
        --no-create-home \
        django-user && \
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    mkdir -p /vol/app && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts

RUN crontab /etc/cron.d/crontab

ENV PATH="/scripts:/py/bin:$PATH"

USER django-user

CMD ["run.sh"]
