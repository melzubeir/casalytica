import React from 'react';

function Landing() {
  return (
<div>
<h2>decentralized social has an impression problem</h2>
<p>
one of the great things about decentralization is that content gets to live on, resisting
censorship. but, there's no way to know your reach as of yet. unlike linkedin or twitter,
your deso content is on-chain.. which means it can be viewed by people on any of the many
apps accessing this trove of decentralized social content.
</p>

<h2>what is casalytica exactly?</h2>
<p>
casalytica is an api service for all deso (and other blockchains with on-chain content)
to report their impressions. this is done by communicating directly with our api or using
an npm package for easier integration with your web/mobile app.
</p>
<p>
in return, we provide you with the ability to query casalytica to get the total impressions
reported by all other deso apps.
</p>

<h3>is that it? just impressions?</h3>
<p>
there's more. the more participating apps, the richer the insights we are able to produce.
see our roadmap.
</p>

<h3>identifying the opportunity</h3>
<p>
there's an opportunity here, and that is to highlight the effect of on-chain content on a
creator's reach.
</p>

<h3>ok, let's compare</h3>
<p>
it may be easier to explain how this compares with any user experience on social media and
reasonable expectations.
</p>

<h4>twitter</h4>
<div className="row">
<div>
  <img src="https://user-images.githubusercontent.com/66845648/204166740-ec9cb4ea-1c97-4048-9d55-63b31462b4fd.png"
          alt="desocialworld" width="300" height="300" />
</div>
<div>
    <img src ="https://user-images.githubusercontent.com/66845648/204166861-ceabed9b-1e64-4d2e-8ba7-0a9f7cb63786.png"
          alt="desofy" width="300" height="300" />
</div>
</div>
<p>
twitter shows you the analytics of every tweet, including impressions, yet you don't find that on
DeSocialWorld or Desofy or Diamond even.
</p>

<h4>linkedin</h4>
<img src="https://user-images.githubusercontent.com/66845648/204166258-10fcf08d-ef22-4209-b193-00680e208e6c.png"
      alt="linkedin" width="300" height="300" />
<p>
let's take a look at linkedin here for a second. immediately under the post, it tells you the
impressions of your post. if you click on it, you get more details. our best alternative to this is entre,
which for the most part keeps their content on their node. but what if i wanted to render that content
on another app?
</p>
</div>
  );
}

export default Landing;
