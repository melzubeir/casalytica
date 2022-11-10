server {
    listen ${LISTEN_PORT};

    charset utf-8;
    
    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass                        ${APP_HOST}:${APP_PORT};
        include                           /etc/nginx/uwsgi_params;
        client_max_body_size              10M;
    }

    location ~ \.php$ {
        fastcgi_pass      ${APP_HOST}:${APP_PORT};
        fastcgi_index     index.php;
        include           fastcgi.conf;
    }

}