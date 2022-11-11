upstream casalytica {
    server  unix:/vol/app/casalytica.sock;
}


server {
    server_name casalytica.com www.casalytica.com casalytica.localhost;
    location /static {
        alias /vol/static/static;
    }

    location / {
        uwsgi_pass                        casalytica;
        include                           /etc/nginx/uwsgi_params;
        client_max_body_size              10M;
    }

}
