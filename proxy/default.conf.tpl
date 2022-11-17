upstream casalytica {
    server  unix:/vol/app/casalytica.sock;
}

upstream frontend {
    server  frontend:3000;
}


server {
    server_name casalytica.com www.casalytica.com casalytica.localhost;
    location /static {
        alias /vol/static/static;
    }

    location / {
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Url-Scheme $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_pass          http://frontend:3000;

        proxy_set_header X-Forwarded
    }

    location /api {
        uwsgi_pass                        casalytica;
        include                           /etc/nginx/uwsgi_params;
        client_max_body_size              10M;
    }

}
