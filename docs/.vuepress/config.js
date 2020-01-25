// .vuepress/config.js
module.exports = {
  // 网站的标题
  title: "GitBlogs with Vue",
  // 网站的描述
  description: "成长没有偏旁，所以它才孤独。",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "gdut-yy/GitBlogs",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "Github",
    // 以下为可选的编辑链接选项
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: "gdut-yy/GitBlogs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "github-io",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面！",
    // 最后更新时间
    lastUpdated: "Last Updated",
    // 最大深度
    sidebarDepth: 4,
    // 导航栏
    nav: [
      {
        text: "学习",
        items: [
          {
            text: "你不知道的 JavaScript",
            link: "http://gdut_yy.gitee.io/doc-ydkjs/up&going/ch1.html"
          },
          {
            text: "轻量函数式 JavaScript",
            link: "http://gdut_yy.gitee.io/doc-fljs/"
          },
          {
            text: "CSS 权威指南 4th",
            link: "http://gdut_yy.gitee.io/doc-csstdg4/"
          },
          {
            text: "OnJava8(Java编程思想5th)",
            link: "http://gdut_yy.gitee.io/doc-onjava8/"
          },
          {
            text: "Effective Java 3rd",
            link: "http://gdut_yy.gitee.io/doc-ej3/"
          },
          {
            text: "代码整洁之道",
            link: "http://gdut_yy.gitee.io/doc-cleancode/"
          },
          {
            text: "架构整洁之道",
            link: "http://gdut_yy.gitee.io/doc-cleanarch/"
          },
          { text: "领域驱动设计", link: "http://gdut_yy.gitee.io/doc-ddd/" }
        ]
      },
      {
        text: "OJ杂烩",
        items: [
          {
            text: "原 CSDN",
            link: "https://blog.csdn.net/gdut_yy/article/details/80045155"
          },
          {
            text: "剑指 Offer",
            link: "/module_oj/JIANZHIOffer/"
          },
          {
            text: "编程之美",
            link: "/module_oj/BIANCHENGZHIMEI/"
          },
          {
            text: "高级数据结构",
            link: "/module_oj/GAOJISHUJUJIEGOU/"
          },
          { text: "HW-OJ", link: "/module_oj/HW-OJ/" },
          { text: "LeetCode", link: "https://leetcode-cn.com/" },
          { text: "牛客网", link: "https://www.nowcoder.com/" }
        ]
      },
      {
        text: "阅读",
        items: [
          {
            text: "阅读",
            items: [
              { text: "技术书籍", link: "/module_book/tech/" },
              { text: "泛技术书籍", link: "/module_book/tech-extra/" },
              { text: "校选教材", link: "/module_book/edu/" },
              { text: "文学 & 小说", link: "/module_book/literature/" }
            ]
          }
          // {
          //   text: "TODO",
          //   items: [{ text: "10 本书", link: "/module_book/todo/" }]
          // }
        ]
      },
      {
        text: "观影",
        items: [
          {
            text: "电影",
            link: "/module_movie/movie/"
          } /*{ text: '电视剧', link: '/module_movie/tv/' }*/
        ]
      },
      {
        text: "Wiki",
        items: [
          { text: "前端", link: "/module_wiki/frontend/" },
          { text: "后端", link: "/module_wiki/backend/" },
          { text: "Android", link: "/module_wiki/android/" },
          { text: "DevOps", link: "/module_wiki/devops/" }
        ]
      },
      {
        text: "Blog",
        items: [
          { text: "年终总结", link: "/module_blog/year-end-summary/" },
          // { text: '百万级图片爬虫', link: '/module_blog/reptile/' },
          { text: "源码学习", link: "/module_blog/learn-source/" }
        ]
      }
    ],
    // 侧边栏
    sidebar: {
      // OJ 杂烩
      "/module_oj/": ["JIANZHIOffer/", "BIANCHENGZHIMEI/", "GAOJISHUJUJIEGOU/"],
      // 校选教材
      "/module_book/edu/": [
        "",
        "C-CHENGXUSHEJI/",
        "SHUJUJIEGOU/",
        "SUANFASHEJIYUFENXIJICHU/",
        "JISUANJIWANGLUO/",
        "JISUANJIZUCHENGYUANLI/",
        "RENGONGZHINENG/",
        "RUANJIANGONGCHENGDAOLUN/",
        "JISUANJICAOZUOXITONG/",
        "SHUJUKUXITONGGAILUN/",
        "BIANYIYUANLI/",
        "Java/",
        "C-Sharp/",
        "XINXIANQUANGAILUN/",
        "RENJIJIAOHU/",
        "Android-CHENGXUSHEJIJIAOCHENG/",
        "Android-YIDONGYINGYONGJICHUJIAOCHENG/",
        "Android-YINGYONGCHENGXUKAIFA/",
        "BigData-DASHUJU/",
        "BigData-SHUJUWAJUE/",
        "BigData-YUNJISUAN/",
        "BigData-SHISHIDASHUJU/",
        "BigData-SHUJUKESHIHUA/"
      ],
      // 技术书籍
      "/module_book/tech/": [
        "",
        "DAHUASHUJUJIEGOU/",
        "Algorithms4/",
        "DAHUASHEJIMOSHI/",
        "CleanCode/",
        "CleanArchitecture/",
        "Java8Lambdas/",
        "FENBUSHIFUWUKUANGJIA/",
        "PaxosTOZooKeeper/",
        "PJWD3/",
        "MACHUGAOXIAO/",
        "NILIUERSHANG/"
      ],
      // 泛技术书籍
      "/module_book/tech-extra/": [
        "",
        "BIRAN/",
        "CHIDIAONAZHIQINGWA/",
        "GUIGUZHIMI/",
        "HEIKEYUHUAJIA/",
        "LANGCHAOZHIDIAN/",
        "MACTALK-KUAYUEBIANJIE/",
        "MACTALK-RENSHENGYUANBIANCHENG/",
        "QIANFANGDELU/",
        "RENYUESHENHUA/",
        "SHIKONG/",
        "WEILAISHIJIEDEXINGCUNZHE/"
      ],
      // 10本书
      "/module_book/todo/": [
        "",
        "CJV-I10/",
        "PyTorch/",
        "ZHIXINGHEYI/",
        "YONGHUTIYANYAOSU/",
        "SpringBoot2/",
        "SpringCloud-Docker/",
        "Vuejs/",
        "TUMO-MySQL/",
        "ERP/"
      ],
      // 观影
      "/module_movie/": ["movie/" /*"tv/"*/],
      // Wiki
      "/module_wiki/": ["frontend/", "backend/", "android/", "devops/"],
      // Blog
      "/module_blog/": ["year-end-summary/", /*'reptile/',*/ "learn-source/"]
    }
  }
};
