---
layout: post
title: "Ruby 碎碎念"
date: "2017-02-03 17:26:14 +0800"
image_preview: "/images/2017-02-03-ruby-something/ruby.svg"
short_description: "\"送个Ruby给女友?\" \"醒醒! 哪来的女朋友.\""
---

**如何在Bundle添加Git源?**

Specifying a ref, branch, or tag for a git repository specified inline works exactly the same way

``` ruby
gem 'nokogiri', :git => 'https://github.com/rack/rack.git', :ref => '0bd839d'
gem 'nokogiri', :git => 'https://github.com/rack/rack.git', :tag => '2.0.1'
gem 'nokogiri', :git => 'https://github.com/rack/rack.git', :branch => 'rack-1.5'
```

Bundler can use HTTP(S), SSH, or git

``` ruby
gem 'rack', :git => 'https://github.com/rack/rack.git'
gem 'rack', :git => 'git@github.com:rack/rack.git'
gem 'rack', :git => 'git://github.com/rack/rack.git'
```

[More detail](http://bundler.io/git.html)
