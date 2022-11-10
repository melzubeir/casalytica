# casalaytica - analytics for on-chain content

an application-layer API to track on-chain content impressions and views

---

decentralized social media is great, until you want to know how many impressions your post has. your content could be viewed on any one of the many apps serving deso content. so what to do?

imagine you're a node operator and want to get paid for promoting certain feeds. how would you account for it?

an applicaiton-layer off-chain api to track impressions being collected from all voluntarily participating apps would allow us to pool all the data and then pass it back to the participants as well.

for example, if i posted on entre and data is being collected from entre, desofy and diamondapp.. casalytica would then return to each participating app the totals of the post as well.

deso was made for creators, and creators deserve better analytics.


## installation

### prerequisites

- django 4.1
- python 3.9
- postgresql 14

### setup

```sh
docker-compose up -d --build
```


## usage

see full usage in code docs: [documentation](https://www.casalytica.com/api/docs/)


### casalytica



## license

bsd-3-clause license
