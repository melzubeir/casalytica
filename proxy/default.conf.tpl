upstream casalytica {
    server  unix:/vol/app/casalytica.sock;
}

# upstream frontend {
#     server  frontend:3000;
# }


server {
    server_name casalytica.com www.casalytica.com api.casalytica.com casalytica.localhost;
    location /static {
        alias /vol/static/static;
    }

    # location / {
    #     proxy_pass          http://frontend;
    # }

    location / {
        uwsgi_pass                        casalytica;
        include                           /etc/nginx/uwsgi_params;
        client_max_body_size              10M;
    }

}
