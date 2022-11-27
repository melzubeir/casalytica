
<a href="https://api.casalytica.com/"><img align="right" src="https://img.shields.io/badge/casalytica-api-blueviolet"></a>

<p align="center">
<img src="https://raw.githubusercontent.com/melzubeir/casalytica/master/app/static/images/casalytica-github-social-banner.png" alt="Casalytica">
</p>

an application-layer API to track on-chain content impressions and views

---

decentralized social media is great, until you want to know how many impressions your post has. your content could be viewed on any one of the many apps serving deso content. so what to do?

imagine you're a node operator and want to get paid for promoting certain feeds. how would you account for it?

an applicaiton-layer off-chain api to track impressions being collected from all voluntarily participating apps would allow us to pool all the data and then pass it back to the participants as well.

for example, if i posted on entre and data is being collected from entre, desofy and diamondapp.. casalytica would then return to each participating app the totals of the post as well.

deso was made for creators, and creators deserve better analytics.


## installation

casalytica is fully dockerized and can be run with docker-compose. the production server is run behind a
nginx reverse proxy server.

### tech stack

#### backend
- django 4.1
- python 3.9
- postgresql 14

#### frontend
- react

#### deployment
- nginx
- docker

### aws ec2 setup

settings up an aws ec2 instance (amazon linux 2)

- install git

```bash
sudo yum install git -y
```

- install docker and dependencies

```bash
sudo amazon-linux-extras install docker -y
sudo systemctl enable docker.service
sudo systemctl start docker.service
sudo usermod -aG docker ec2-user
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### build

- clone the repo

```sh
git clone git@github.com:melzubeir/casalytica.git
```

- for development

```sh
docker-compose up -d --build
```

- for production

```sh
docker-compose -f docker-compose-prod.yml up --build -d
```

## data fixtures

we populate the database with the currently known nodes and their creators, which were grabbed from
the deso appstate


- copy the data fixtures temporarily to the container

```sh
cp docs/data_fixtures.json app/
```

- for production

```sh
docker-compose -f docker-compose-prod-yml exec app python manage.py loaddata data_fixtures.json
```

- for development

```sh
docker-compose exec app python manage.py loaddata data_fixtures.json
```

## usage

```sh
curl -X 'POST' \
  'https://api.casalytica.com/v0/impression/' \
  -H 'accept: application/json' \
  -H 'Authorization: Token f3558c2d4b4260f775d01c9d52120b26d98df922' \
  -H 'Content-Type: application/json' \
  -d '{
   "posts":[
      {
         "post_hash":"7943910c8f962fb578752d517fde54bc3c2677d75aaaf798ab60fb086ae1097f"
      },
      {
         "post_hash":"dd1f8d67859243cb0e6182fc210c3ce7ca464401b8b25cad2176d9a277f23d1d"
      },
      {
         "post_hash":"3fbdcd120f83c0ad6c7ca12ef66806de981b3a605c65217149b9dc222799b69e"
      }
   ],
   "source_app":1,
   "remote_addr":"4.2.2.1",
   "referer":"https://www.google.com/",
   "user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
}'
```


see full usage in code docs: [documentation](https://api.casalytica.com/)


### casalytica



## license

bsd-3-clause license
