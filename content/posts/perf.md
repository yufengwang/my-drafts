+++
title = "前端性能优化"
author = ["wenhu"]
date = 2023-02-15T23:28:00+08:00
tags = ["fe"]
draft = false
+++

待补充...


## 性能监测 {#性能监测}

监测方式: devtool performance tab, lighthouse 插件

window.performance， 可编程的性能 api


## 以用户为中心的性能指标 {#以用户为中心的性能指标}

-   Load
-   DCL
-   FP
    First Paint 首次绘制
-   FCP
    First contentful paint 首次内容绘制
-   LCP
    Largest contentful paint 最大内容绘制
-   FMP
-   FID
    First input delay 首次输入延迟
-   TTI
    Time to Interactive 可交互时间
-   TBT
    Total blocking time 总阻塞时间
-   CLS
    Cumulative layout shift 累积布局偏移


## 网络层面优化 {#网络层面优化}

1.  减少请求次数，减少请求体积
2.  使用 http2
3.  静态资源使用 CDN
4.  Gzip 压缩


## Webpack 性能优化 {#webpack-性能优化}


## HTML 优化 {#html-优化}

-   将 CSS 放在文件头部，JavaScript 文件放在底部

-   使用字体图标 iconfont 代替图片图标，压缩字体文件


## React 性能优化 {#react-性能优化}

1.  shouldComponentUpdate，不需要更新时，return false，避免 re-render
2.  使用 React.PureComponent，自动比较 props 和 state


## 图片优化 {#图片优化}


### 图片格式 {#图片格式}

-   JPEG/JPG

有损压缩、体积小、加载快、不支持透明

-   WebP

WebP 像 JPEG 一样对细节丰富的图片信手拈来，像 PNG 一样支持透明，像 GIF 一样可以显示动态图片——它集多种图片文件格式的优点于一身。

缺点：有兼容性问题


### 优化手段 {#优化手段}

-   图片延迟加载

当图片出现在浏览器的可视区域时，才去加载真正的图片

-   雪碧图(CSS Sprites)

它可取图像的一部分来使用，使得使用一个图像文件替代多个小文件成为可能。相较于一个小图标一个图像文件，单独一张图片所需的 HTTP 请求更少，对内存和带宽更加友好


## JavaScript 优化 {#javascript-优化}

-   使用位操作