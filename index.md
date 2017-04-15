---
layout: page
title: "主页"
---

{% assign list-post-limit = 3 %}
{% include list_post.html %}

{% assign list-project-limit = 2 %}
{% include list_project.html %}

<script type="text/javascript">
var authorItem = $("#author-name");
var author = authorItem.text();
authorItem.empty();
authorItem.typetype("FireZ").backspace(5).typetype(author);
</script>
