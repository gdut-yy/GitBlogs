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
    sidebar: "auto",
    // sidebar: null,
  },
};

function getNav() {
  return [
    mod_guide(),
    mod_config(),
    mod_blog(),
    mod_oj(),
    // mod_read(),
    // mod_movie(),
  ];
}

function mod_guide() {
  return {
    text: "指南",
    link: "/module_guide/guide_about/",
  };
}

function mod_config() {
  return {
    text: "配置",
    items: [
      {
        text: "Git 配置",
        link: "/module_config/config_git/",
      },
      {
        text: "VSCode 配置",
        link: "/module_config/config_vscode/",
      },
      {
        text: "JDK 配置",
        link: "/module_config/config_jdk/",
      },
      {
        text: "Maven 配置",
        link: "/module_config/config_maven/",
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

function mod_blog() {
  return {
    text: "Blog",
    items: [
      // { text: "年终总结", link: "/module_blog/year-end-summary/" },
      { text: "minipack 源码学习", link: "/module_blog/blog-minpack/" },
      {
        text: "Twitter 雪花算法",
        link: "/module_blog/blog-snowflakeid/",
      },
      {
        text: "JMH 可视化",
        link: "/module_blog/blog-jmh/",
      },
      {
        text: "JSON 基准测试（Java）",
        link: "/module_blog/blog-java-json-benchmark/",
      },
      {
        text: "架构&方案",
        items: [
          {
            text: "一张图片胜过千言万语",
            link: "/module_blog/blog-arch/",
          },
        ],
      },
      {
        text: "DXF-性能",
        items: [
          {
            text: "性能概览",
            link: "/module_blog/blog-performance/",
          },
          {
            text: "基准测试（Benchmark）",
            link: "/module_blog/blog-perf/",
          },
          {
            text: "消息队列（MQ）",
            link: "/module_blog/blog-perf/",
          },
          {
            text: "缓存（Cache）",
            link: "/module_blog/blog-perf/",
          },
        ],
      },
      {
        text: "DFX-安全",
        items: [
          {
            text: "安全概览",
            link: "/module_blog/blog-security/",
          },
          {
            text: "跨站脚本攻击（XSS）",
            link: "/module_blog/blog-sec-xss/",
          },
          {
            text: "跨站点请求伪造（CSRF）",
            link: "/module_blog/blog-sec-csrf/",
          },
          {
            text: "服务器端请求伪造（SSRF）",
            link: "/module_blog/blog-sec-ssrf/",
          },
          {
            text: "CRLF 注入攻击",
            link: "/module_blog/blog-sec-inject-crlf/",
          },
          {
            text: "XML 注入攻击",
            link: "/module_blog/blog-sec-inject-xml/",
          },
          {
            text: "SQL 注入攻击",
            link: "/module_blog/blog-sec-inject-sql/",
          },
          {
            text: "URL 不安全跳转",
            link: "/module_blog/blog-sec-unsafe-url/",
          },
          {
            text: "反序列化攻击",
            link: "/module_blog/blog-sec-deserialization/",
          },
          {
            text: "文件上传下载",
            link: "/module_blog/blog-sec-file-upload/",
          },
        ],
      },
      // {
      //   text: "领域驱动设计 DDD",
      //   link: "/module_blog/blog-ddd/",
      // },
      // {
      //   text: "低代码",
      //   link: "/module_blog/blog-lowcode/",
      // },
    ],
  };
}
