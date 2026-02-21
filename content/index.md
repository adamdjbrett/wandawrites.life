---
title: Refreshing Words
layout: home.njk
excerpt: Words by Wanda Cato Brett
---

_"Words Create Worlds." ~ Rabbi Abraham Joshua Heschel_

<ul>
{% for post in collections.post | reverse %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <small>{{ post.date | readableDate }}</small>
  </li>
{% endfor %}
</ul>
