# 指南

**原文链接: [https://gdut-yy.github.io/doc-gitblogs/module_guide/guide_about/](https://gdut-yy.github.io/doc-gitblogs/module_guide/guide_about/)**

本项目前身只是 Github 仓库上的一个 [README.md](https://github.com/gdut-yy/GitBlogs)，始于 2018.07.26。

## 前言

![](./emoji.jpg)

> 读书，不是非做不可的事。而是想要去做的事。  
> 今后你们可能会碰到很多很多你们不知道的事。  
> 也会碰到很多你们觉得美好的、开心的、不可思议的事物。  
> 这时候作为一个人，自然想了解更多，学习更多。  
> 失去好奇心和求知欲的人，不能称为人，连猴子都不如。  
> 连自己生存的这个世界都不想理解。还能做什么呢？  
> 不论如何学习，只要人活着，就有很多不懂的东西。  
> 这个世界上有很多大人好像什么都懂的样子，那都是骗人的。  
> 进了大学也好，进了好公司也好，  
> 如果有活到老学到老的想法，那就有无限的可能性。  
> 失去好奇心的那一瞬间，人就死了。  
> 读书不是为了考试，而是为了成为出色的大人。
>
> —— 日剧 《女王的教室》

## 本地开发 & 阅读

```sh
# install vuepress
yarn global add vuepress

# git clone to local
git clone -b github-io https://github.com/gdut-yy/GitBlogs.git
cd GitBlogs

# start develop
yarn docs:dev
```

## 为什么不是...?

### Nuxt

VuePress 能做的事情，Nuxt 理论上确实能够胜任，但 Nuxt 是为构建应用程序而生的，而 VuePress 则专注在以内容为中心的静态网站上，同时提供了一些为技术文档定制的开箱即用的特性。

### Docsify / Docute

这两个项目同样都是基于 Vue，然而它们都是完全的运行时驱动，因此对 SEO 不够友好。如果你并不关注 SEO，同时也不想安装大量依赖，它们仍然是非常好的选择！

### Hexo

Hexo 最大的问题在于他的主题系统太过于静态以及过度地依赖纯字符串，同时，Hexo 的 Markdown 渲染的配置也不是最灵活的。

### GitBook

GitBook 最大的问题在于当文件很多时，每次编辑后的重新加载时间长得令人无法忍受。它的默认主题导航结构也比较有限制性，并且，主题系统也不是 Vue 驱动的。GitBook 背后的团队如今也更专注于将其打造为一个商业产品而不是开源工具。

（全文完）
