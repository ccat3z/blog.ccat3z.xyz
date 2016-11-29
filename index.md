---
layout: page
---

### [ <span id="section-post-title" hidetext='<a href="/posts">更多精彩的文章</a>' origtext="一些生活的点滴"></span> ]

{% assign list-post-limit = 3 %}
{% include list_post.html %}

---

### [ <span id="section-project-title" hidetext='<a href="/projects">更多精妙复杂的设计</a>' origtext="以及一些微小的工作"></span> ]

{% assign list-project-limit = 3 %}
{% include list_project.html %}

<script type="text/javascript">
var authorItem = $("#author-name");
var author = authorItem.text();
authorItem.empty();
authorItem.typetype("FireZ").backspace(5).typetype(author);
var typetypeList = ["section-post-title", "section-project-title"];
for (id in typetypeList) {
    (function() {
        var item = $("#" + typetypeList[id]);
        var itemTitle = item.attr("origText");
        console.log(itemTitle);
        item.empty();
        item.typetype(itemTitle, {
            e: 0.04,
            t: 100,
            keypress: function() {},
            callback: function() {
                item.mouseenter(function() {
                    item.empty();
                    item.html(item.attr("hideText"));
                });
                item.mouseleave(function() {
                    item.empty();
                    item.html(item.attr("origText"));
                });
            }
        })
    })();
}
</script>
