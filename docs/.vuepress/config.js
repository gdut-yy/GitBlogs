// .vuepress/config.js
module.exports = {
  title: "GitBlogs with Vue",
  base: "/doc-gitblogs/",
  description: "成长没有偏旁，所以它才孤独。",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    repo: "gdut-yy/GitBlogs",
    repoLabel: "Github",
    docsRepo: "gdut-yy/GitBlogs",
    docsBranch: "github-io",
    editLinks: true,
    editLinkText: "帮助我们改善此页面！",
    lastUpdated: "Last Updated",
    sidebarDepth: 4,
    nav: getNav(),
    sidebar: getSideBar(),
  },
};

function getNav() {
  return [
    mod_oj(),
    mod_read(),
    mod_movie(),
    // mod_wiki(),
    // mod_blog(),
    mod_learn(),
  ];
}

function mod_learn() {
  return {
    text: "学习",
    items: [
      {
        text: "JS & CSS & HTML",
        items: [
          {
            text: "《你不知道的 JavaScript》",
            link: "https://gdut_yy.gitee.io/doc-ydkjs/up&going/ch1.html",
          },
          {
            text: "《轻量函数式 JavaScript》",
            link: "https://gdut_yy.gitee.io/doc-fljs/",
          },
          {
            text: "《CSS 权威指南 4th》",
            link: "https://gdut_yy.gitee.io/doc-csstdg4/",
          },
        ],
      },
      {
        text: "Java",
        items: [
          {
            text: "《OnJava8》",
            link: "https://gdut_yy.gitee.io/doc-onjava8/",
          },
          {
            text: "《Effective Java 3rd》",
            link: "https://gdut_yy.gitee.io/doc-ej3/",
          },
          {
            text: "《Java 8 函数式编程》",
            link: "https://gdut_yy.gitee.io/doc-java8/",
          },
          {
            text: "《Java 9 模块化开发》",
            link: "https://gdut_yy.gitee.io/doc-java9/",
          },
        ],
      },
      {
        text: "Architecture",
        items: [
          {
            text: "《代码整洁之道》",
            link: "https://gdut_yy.gitee.io/doc-cleancode/",
          },
          {
            text: "《架构整洁之道》",
            link: "https://gdut_yy.gitee.io/doc-cleanarch/",
          },
          {
            text: "《重构 改善既有代码的设计 2nd》",
            link: "https://gdut_yy.gitee.io/doc-refact2/",
          },
          {
            text: "《A Philosophy of Software Design》",
            link: "https://gdut_yy.gitee.io/doc-aposd/",
          },
        ],
      },
      {
        text: "DDD",
        items: [
          {
            text: "《领域驱动设计》",
            link: "https://gdut_yy.gitee.io/doc-ddd/",
          },
          {
            text: "《实现领域驱动设计》",
            link: "https://gdut_yy.gitee.io/doc-iddd/",
          },
        ],
      },
      {
        text: "Other",
        items: [
          {
            text: "《人件 3rd》",
            link: "https://gdut_yy.gitee.io/doc-pw/",
          },

          {
            text: "《Security Patterns in Practice》",
            link: "https://gdut_yy.gitee.io/doc-spip/",
          },
        ],
      },
    ],
  };
}

function mod_oj() {
  return {
    text: "OJ杂烩",
    items: [
      {
        text: "原 CSDN",
        link: "https://blog.csdn.net/gdut_yy/article/details/80045155",
      },
      {
        text: "《剑指 Offer》",
        link: "/module_oj/JIANZHIOffer/",
      },
      {
        text: "《编程之美》",
        link: "/module_oj/BIANCHENGZHIMEI/",
      },
      {
        text: "《高级数据结构》",
        link: "/module_oj/GAOJISHUJUJIEGOU/",
      },
      // { text: "HW-OJ", link: "/module_oj/HW-OJ/" },
      {
        text: "LeetCode 题集",
        link: "https://gdut_yy.gitee.io/doc1-leetcode/",
      },
    ],
  };
}

function mod_read() {
  return {
    text: "阅读",
    items: [
      {
        text: "阅读",
        items: [
          { text: "技术书籍", link: "/module_book/tech/" },
          { text: "泛技术书籍", link: "/module_book/tech-extra/" },
          // { text: "文学 & 小说", link: "/module_book/literature/" },
        ],
      },
    ],
  };
}

function mod_movie() {
  return {
    text: "观影",
    items: [
      {
        text: "电影",
        link: "/module_movie/movie/",
      },
      // { text: "电视剧", link: "/module_movie/tv/" },
    ],
  };
}

function mod_wiki() {
  return {
    text: "Wiki",
    items: [
      // { text: "前端", link: "/module_wiki/frontend/" },
      // { text: "后端", link: "/module_wiki/backend/" },
      // { text: "Android", link: "/module_wiki/android/" },
      { text: "DevOps", link: "/module_wiki/devops/" },
    ],
  };
}

function mod_blog() {
  return {
    text: "Blog",
    items: [
      { text: "年终总结", link: "/module_blog/year-end-summary/" },
      { text: "源码学习", link: "/module_blog/learn-source/" },
    ],
  };
}

function getSideBar() {
  return {
    // OJ 杂烩
    "/module_oj/": ["JIANZHIOffer/", "BIANCHENGZHIMEI/", "GAOJISHUJUJIEGOU/"],
    // 技术书籍
    "/module_book/tech/": [
      "",
      "DAHUASHUJUJIEGOU/",
      "Algorithms4/",
      "DAHUASHEJIMOSHI/",
      "Java8Lambdas/",
      "FENBUSHIFUWUKUANGJIA/",
      "PaxosTOZooKeeper/",
      "PJWD3/",
      "MACHUGAOXIAO/",
      "NILIUERSHANG/",
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
      "WEILAISHIJIEDEXINGCUNZHE/",
    ],
    // 观影
    "/module_movie/": ["movie/", "tv/"],
    // Wiki
    "/module_wiki/": ["frontend/", "backend/", "android/", "devops/"],
    // Blog
    "/module_blog/": ["year-end-summary/", /*'reptile/',*/ "learn-source/"],
  };
}
