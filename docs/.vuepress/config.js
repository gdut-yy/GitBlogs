// .vuepress/config.js
module.exports = {
  // 网站的标题
  title: 'GitBlogs with Vue',
  // 网站的描述
  description: '成长没有偏旁，所以它才孤独。',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
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
          { text: '校选教材', link: '/module_book/edu/' },
          { text: '技术书籍', link: '/module_book/tech/' },
          { text: '泛技术书籍', link: '/module_book/tech-extra/' }
        ]
      },
      {
        text: '观影',
        items: [{ text: '电影', link: '/module_movie/movie/' }, { text: '电视剧', link: '/module_movie/tv/' }]
      },
      { text: 'Github', link: 'https://www.github.com/gdut-yy' }
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
      '/module_movie/movie/': [''],
      '/module_movie/tv/': ['']
    }
  }
}
