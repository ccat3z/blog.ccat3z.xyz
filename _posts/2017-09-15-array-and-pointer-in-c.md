---
layout: post
title: "数组名和指针的区别"
date: "2017-09-15 18:31:04 +0800"
tag: ["C"]
short_description: "数组是数组, 指针是指针"
---

> 转自[zhanjindong](https://github.com/zhanjindong)的[越简单越好：数组名和指针的区别](http://www.cnblogs.com/zhanjindong/archive/2013/02/15/2912892.html)

我相信很多人都跟我一样被某些书害的不浅，在C语言中一直还把指针跟数组名混为一谈。其实它们跟本就是两样的东西，指针就是指针，数组就是数组，网上也有很多大牛作过很多非常深入的讨论，但是个人感觉有时候把问题想得太复杂了反而不好，尤其是对于新手，因为我们新手很难搞懂编译器背着我们到底都干了些什么。我们有时候应该透过现象看本质，但有时候也不要太钻牛角尖，一口吃不出个胖子，必要时“难得糊涂”，站在抽象的角度去看事情，很多所谓的“本质”归根到底就是“规则”，让我们返朴归真看看标准是怎么说的，对于新手关于数组和指针的区别和以及什么时候“相同”只要记住《c专家编程》中提到的三个标准和三个例外就可以了：

> 规则1. 表达式中的数组名被编译器当作一个指向该数组第一个元素的指针。
> 
> 规则2. 下标总是与指针的偏移量相同。
>
> 规则3. 在函数参数的声明中，数组名被编译器当作指向该数组的第一个元素的指针。

在下列的情况下，对数组的引用不能用指向该数组第一个元素的指针来代替：

> 例外1. 数组作为sizeof()的操作数，显然此时需要的是整个数组的大小，而不是所指向第一个元素的大小
>
> 例外2. 使用&操作符取数组的地址
>
> 例外3. 数组是一个字符串常量初始化值

一个很简单的例子：

``` c
#include <stdio.h>

char ga[]="abcdrfghik";

void method(char ca[])//or char *ca
{
    printf(" addr of arrary param = %#x \n",&ca);
    //规则3
    printf(" (*ca) = %c \n",*ca);
    printf(" addr (ca[0]) = %#x \n",&(ca[0]));
    printf(" addr (ca[1]) = %#x \n",&(ca[1]));
    printf("++ca = %#x \n\n",++ca);
}
int main(void)
{
    //例外2 这个只是数组和指针能够互换的一个例外。这里ga代表数组，这个获取的数组的地址
    printf(" addr of arrary param = %#x \n",&ga);
    //规则1
    printf(" (*ga) = %c \n",*ga);
    printf(" addr (ga[0]) = %#x \n",&(ga[0]));
    printf(" addr (ga[1]) = %#x \n",&(ga[1]));
    //例外1
    printf(" sizeof ga = %d \n\n",sizeof(ga));


    method(ga);

    return 0;
}
```

另外，

“数组名被改写成一个指针的参数”规则并不是递归定义的。数组的数组会被改写成“数组的指针”而不是“指针的指针”

比如`char c[8][10]`所被改写对应的形参为`char (*)[10]`，为“数组的指针”。

一个简单的例子：

``` c
#include <stdio.h>
#include <malloc.h>

method(int a[3][2])
{
    int i=0;
    int j=0;
    for(i=0;i<=2;i++)
    {
        for(j=0;j<=1;j++)
        {
            printf("%d\n",a[i][j]);
        }

    }

    for(i=0;i<=2;i++)
    {
        for(j=0;j<=1;j++)
        {
            printf("%d\n",*(*(a+i)+j));
        }

    }

    int k=0;
    for(k=0;k<=5;k++)
    {
        //a是指向 int (*)[2] 的行指针，*a即为二位数组的首行首元素的地址
        printf("%d\n",*(*a+k));
    }
}
int main(void)
{

    int a[3][2]={% raw %}{{1, 2}, {3, 4},{5, 6}}{% endraw %};
    method(a);

    return 0;
}
```
 

至于更深层的知识水到自然渠成。

