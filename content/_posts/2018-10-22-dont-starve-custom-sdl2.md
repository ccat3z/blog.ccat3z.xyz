---
layout: post
title: "饥荒系列自定义SDL2"
date: "2018-10-22 20:57:29 +0800"
tag: ["Game"]
description: "玩到可持续发展"
image: "/images/2018-10-22-dont-starve-custom-sdl2/image.jpg"
---

> 转自 [Klei Forums](https://forums.kleientertainment.com/forums/topic/30218-crash-on-linux-steam-without-error/?do=findComment&comment=387425)

玩饥荒的时候发现一个问题, 在Linux下不支持IME. 猜了下估计是饥荒内置sdl2库版本太低还不支持IME, (Arch Linux官方repo里的SDL2也因为编译时没开IME支持导致一些SDL2应用没法使用输入法). 编译了一个发现鼠标不能用了... 在Klei论坛找了很久发现有人逆向后发现饥荒修改了SDL2库里mouse event的结构体. 我转来备份一下修改方法(主要是第3 - 8步). 我自己修改后支持IME的sdl2.0.4库可以在[这里](https://mega.nz/#!1gIXCaBb!MGLQfMJEcX3sAoAyo-K6SCochTMmSEBa4Dqa7D8D3Bk)下载.

以下是原贴

Well if it crashes for you because the included libSDL2 won't work with your graphics drivers then maybe you could fix the issue by compiling your own SDL2. Here's how (this assumes 64 bit linux and steam version of the game):

1. ​Download libsdl2 from www.libsdl2.org

1. unpack it

1. open `<SDL2 root>/include/SDL_events.h`

1. go to line 218, look at the lines till line 259 and whenever you encounter this line:
  ``` c
  Uint32 which;       /**< The mouse instance id, or SDL_TOUCH_MOUSEID */
  ```
  ​delete it

1. Save the file

1. open `<SDL2 root>/src/events/SDL_mouse.c`

1. go to line 261, look at the lines till line 316 and whenever you encounter any of these lines:
  ``` c
  event.motion.which = mouseID;
  event.button.which = mouseID;
  event.wheel.which = mouseID;
  ```
  ​delete it
  
1. Save the file

1. go to the SDL2 root

1. run in terminal from the SDL2 root:
  ``` sh
  ./configure --prefix=`pwd`/output --host=i686-linux-gnu "CFLAGS=-m32" "CXXFLAGS=-m32" "LDFLAGS=-m32"
  make -j9
  make install
  mkdir ~/.local/share/Steam/SteamApps/common/dont_starve/bin/lib32/backup
  mv ~/.local/share/Steam/SteamApps/common/dont_starve/bin/lib32/libSDL2*so* ~/.local/share/Steam/SteamApps/common/dont_starve/bin/lib32/backup/
  cp output/lib/libSDL2*so* ~/.local/share/Steam/SteamApps/common/dont_starve/bin/lib32/
  ```

1. I don't know what distro you're on but you'll need to install some dependencies of SDL2 as well as tools to build libraries, if you're on ubuntu, look here under "build dependencies" there's a list of stuff you need and I think
  ``` sh
  sudo apt-get build-dep libsdl2
  ```
  will automatically install them. After you're done try if your game works, if it does - woohoo - we both had the same problem. If it doesn't, run
  ``` sh
  cp ~/.local/share/Steam/SteamApps/common/dont_starve/bin/lib32/backup/* ~/.local/share/Steam/SteamApps/common/dont_starve/bin/lib32/
  rm -r ~/.local/share/Steam/SteamApps/common/dont_starve/bin/lib32/backup
  ```
  to restore the original libSDL2 files.

​I'm not sure this is very healthy advice though. It's probably an overcomplicated solution for a simple problem... Also - I skimmed through your previous posts and it seems your game segfaults only AFTER it has initialized GL, so I have no Idea if this will help.