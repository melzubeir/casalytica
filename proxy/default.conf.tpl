upstream casalytica {
    server  unix:/vol/app/casalytica.sock;
}


server {
    listen 80;

    root /vol/app/frontend;

    location /static {
        alias /vol/static/static;
    }

    location / {
        try_files $uri $uri/ /index.html =404;
    }
}

server {
    server_name api.casalytica.com;
    location / {
        uwsgi_pass                        casalytica;
        include                           /etc/nginx/uwsgi_params;
        client_max_body_size              10M;
    }
    location /static {
        alias /vol/static/static;
    }

}
