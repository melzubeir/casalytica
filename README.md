# casalaytica - analytics for on-chain content

[![casalytica api](https://img.shields.io/badge/casalytica-api-blueviolet)](https://www.casalytica.com/api/docs/)


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

- django 4.1
- python 3.9
- postgresql 14
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

- for development

```sh
docker-compose up -d --build
```

- for production

```sh
docker-compose -f docker-compose-prod.yml up --build -d
```

## usage

see full usage in code docs: [documentation](https://www.casalytica.com/api/docs/)


### casalytica



## license

bsd-3-clause license
