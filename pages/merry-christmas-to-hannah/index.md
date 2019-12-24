---
title: Merry Christmas to Hannah
layout: page
options: hide-nav
---

<div class="christmas-card" onclick="goToContent()">
<p>&nbsp;</p>
<p class="title">
Merry Christmas
</p>
<p>Click to open</p>
<div class="icons">
  <img class="icon" src="./icons/white/liubingxie.svg" />
  <img class="icon" src="./icons/white/shengdanhua.svg" />
  <img class="icon" src="./icons/white/shengdanlaoren.svg" />
  <img class="icon" src="./icons/white/shengdanlu.svg" />
  <img class="icon" src="./icons/white/shengdanqiu.svg" />
  <img class="icon" src="./icons/white/shengdanshu.svg" />
  <img class="icon" src="./icons/white/shengdantangguo.svg" />
  <img class="icon" src="./icons/white/shoutao.svg" />
  <img class="icon" src="./icons/white/xueren.svg" />
</div>
</div>

<style>
@font-face {
    font-family: 'PW Christmas';
    src: url('./PWChristmasfont.ttf') format('truetype');
}

.christmas-card {
  padding: 20px;
  background: #FC423E;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 250px;
  padding: 40px;
  align-items: center;
  cursor: pointer;
}

.christmas-card p {
  margin: 0;
}

.christmas-card .title {
  font-family: 'PW Christmas'!important;
  font-size: 35px!important;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.christmas-card .icons {
  position: absolute;
  bottom: 2px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2px
  overflow: hidden;
}

.christmas-card .icon {
  margin: 0;
  padding: 0;
  width: 40px;
  height: 40px;
}
</style>

<script>
function goToContent () {
  router.push("./content.html");
}
</script>
