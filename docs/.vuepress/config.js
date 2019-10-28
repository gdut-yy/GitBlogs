// .vuepress/config.js
module.exports = {
  // 网站的标题
  title: 'GitBlogs with Vue',
  // 网站的描述
  description: '成长没有偏旁，所以它才孤独。',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'gdut-yy/GitBlogs',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'Github',
    // 以下为可选的编辑链接选项
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'gdut-yy/GitBlogs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'github-io',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 最大深度
    sidebarDepth: 4,
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'OJ杂烩',
        items: [
          { text: '原 CSDN', link: 'https://blog.csdn.net/gdut_yy/article/details/80045155' },
          {
            text: '剑指 Offer',
            link: '/module_oj/JIANZHIOffer/'
          },
          {
            text: '编程之美',
            link: '/module_oj/BIANCHENGZHIMEI/'
          },
          {
            text: '高级数据结构',
            link: '/module_oj/GAOJISHUJUJIEGOU/'
          },
          { text: 'HW-OJ', link: '/module_oj/HW-OJ/' },
          { text: 'LeetCode', link: 'https://leetcode-cn.com/' },
          { text: '牛客网', link: 'https://www.nowcoder.com/' }
        ]
      },
      {
        text: '阅读',
        items: [
          {
            text: '阅读',
            items: [
              { text: '技术书籍', link: '/module_book/tech/' },
              { text: '泛技术书籍', link: '/module_book/tech-extra/' },
              { text: '校选教材', link: '/module_book/edu/' },
              { text: '文学 & 小说', link: '/module_book/literature/' }
            ]
          },
          {
            text: 'CSS（建设中）',
            items: [
              { text: 'CSS 权威指南 4th（Github）', link: 'https://github.com/gdut-yy/CSS-The-Definitive-Guide-4th-zh' },
              { text: 'CSS 权威指南 4th（Preview）', link: 'http://gdut_yy.gitee.io/gitee-page/' }
            ]
          },
          {
            text: 'JavaScript',
            items: [
              { text: 'YDKJS-起步上路', link: '/module_book/JS/up&going/' },
              { text: 'YDKJS-作用域与闭包', link: '/module_book/JS/scope&closures/' },
              { text: 'YDKJS-this与对象原型', link: '/module_book/JS/this&objectprototypes/' },
              { text: 'YDKJS-类型与文法', link: '/module_book/JS/types&grammar/' },
              { text: 'YDKJS-异步与性能', link: '/module_book/JS/async&performance/' },
              { text: 'YDKJS-ES6与未来', link: '/module_book/JS/es6&beyond/' },
              { text: '轻量函数式 JavaScript', link: '/module_book/JS/Functional-Light-JS-zh/' }
            ]
          },
          { text: 'TODO', items: [{ text: '10 本书', link: '/module_book/todo/' }] }
        ]
      },
      {
        text: '观影',
        items: [{ text: '电影', link: '/module_movie/movie/' } /*{ text: '电视剧', link: '/module_movie/tv/' }*/]
      },
      {
        text: 'Wiki',
        items: [
          { text: '前端', link: '/module_wiki/frontend/' },
          { text: '后端', link: '/module_wiki/backend/' },
          { text: 'Android', link: '/module_wiki/android/' },
          { text: 'DevOps', link: '/module_wiki/devops/' }
        ]
      },
      {
        text: 'Blog',
        items: [
          { text: '年终总结', link: '/module_blog/year-end-summary/' },
          // { text: '百万级图片爬虫', link: '/module_blog/reptile/' },
          { text: '源码学习', link: '/module_blog/learn-source/' }
        ]
      }
    ],
    // 侧边栏
    sidebar: {
      // OJ 杂烩
      '/module_oj/': ['JIANZHIOffer/', 'BIANCHENGZHIMEI/', 'GAOJISHUJUJIEGOU/'],
      // 校选教材
      '/module_book/edu/': [
        '',
        'C-CHENGXUSHEJI/',
        'SHUJUJIEGOU/',
        'SUANFASHEJIYUFENXIJICHU/',
        'JISUANJIWANGLUO/',
        'JISUANJIZUCHENGYUANLI/',
        'RENGONGZHINENG/',
        'RUANJIANGONGCHENGDAOLUN/',
        'JISUANJICAOZUOXITONG/',
        'SHUJUKUXITONGGAILUN/',
        'BIANYIYUANLI/',
        'Java/',
        'C-Sharp/',
        'XINXIANQUANGAILUN/',
        'RENJIJIAOHU/',
        'Android-CHENGXUSHEJIJIAOCHENG/',
        'Android-YIDONGYINGYONGJICHUJIAOCHENG/',
        'Android-YINGYONGCHENGXUKAIFA/',
        'BigData-DASHUJU/',
        'BigData-SHUJUWAJUE/',
        'BigData-YUNJISUAN/',
        'BigData-SHISHIDASHUJU/',
        'BigData-SHUJUKESHIHUA/'
      ],
      // 技术书籍
      '/module_book/tech/': [
        '',
        'DAHUASHUJUJIEGOU/',
        'Algorithms4/',
        'DAHUASHEJIMOSHI/',
        'CleanCode/',
        'CleanArchitecture/',
        'EJ3/',
        'Java8Lambdas/',
        'FENBUSHIFUWUKUANGJIA/',
        'PaxosTOZooKeeper/',
        'PJWD3/',
        'MACHUGAOXIAO/',
        'NILIUERSHANG/'
      ],
      // 泛技术书籍
      '/module_book/tech-extra/': [
        '',
        'BIRAN/',
        'CHIDIAONAZHIQINGWA/',
        'GUIGUZHIMI/',
        'HEIKEYUHUAJIA/',
        'LANGCHAOZHIDIAN/',
        'MACTALK-KUAYUEBIANJIE/',
        'MACTALK-RENSHENGYUANBIANCHENG/',
        'QIANFANGDELU/',
        'RENYUESHENHUA/',
        'SHIKONG/',
        'WEILAISHIJIEDEXINGCUNZHE/'
      ],
      // JS-起步上路
      '/module_book/JS/up&going/': ['', 'foreword.md', 'ch1.md', 'ch2.md', 'ch3.md'],
      // JS-作用域与闭包
      '/module_book/JS/scope&closures/': [
        '',
        'ch1.md',
        'ch2.md',
        'ch3.md',
        'ch4.md',
        'ch5.md',
        'apA.md',
        'apB.md',
        'apC.md'
      ],
      // JS-this与对象原型
      '/module_book/JS/this&objectprototypes/': [
        '',
        'foreword.md',
        'ch1.md',
        'ch2.md',
        'ch3.md',
        'ch4.md',
        'ch5.md',
        'ch6.md',
        'apA.md'
      ],
      // JS-类型与文法
      '/module_book/JS/types&grammar/': ['', 'foreword.md', 'ch1.md', 'ch2.md', 'ch3.md', 'ch4.md', 'ch5.md', 'apA.md'],
      // JS-异步与性能
      '/module_book/JS/async&performance/': [
        '',
        'foreword.md',
        'ch1.md',
        'ch2.md',
        'ch3.md',
        'ch4.md',
        'ch5.md',
        'ch6.md',
        'apA.md',
        'apB.md'
      ],
      // JS-ES6与未来
      '/module_book/JS/es6&beyond/': [
        '',
        'foreword.md',
        'ch1.md',
        'ch2.md',
        'ch3.md',
        'ch4.md',
        'ch5.md',
        'ch6.md',
        'ch7.md',
        'ch8.md'
      ],
      // JS-轻量函数式 JavaScript
      '/module_book/JS/Functional-Light-JS-zh/': [
        '',
        'foreword.md',
        'preface.md',
        'ch1.md',
        'ch2.md',
        'ch3.md',
        'ch4.md',
        'ch5.md',
        'ch6.md',
        'ch7.md',
        'ch8.md',
        'ch9.md',
        'ch10.md',
        'ch11.md',
        'apA.md',
        'apB.md',
        'apC.md'
      ],
      // 10本书
      '/module_book/todo/': [
        '',
        'CJV-I10/',
        'PyTorch/',
        'ZHIXINGHEYI/',
        'YONGHUTIYANYAOSU/',
        'SpringBoot2/',
        'SpringCloud-Docker/',
        'Vuejs/',
        'TUMO-MySQL/',
        'ERP/'
      ],
      // 观影
      '/module_movie/': ['movie/', 'tv/'],
      // Wiki
      '/module_wiki/': ['frontend/', 'backend/', 'android/', 'devops/'],
      // Blog
      '/module_blog/': ['year-end-summary/', /*'reptile/',*/ 'learn-source/']
    }
  }
}
