import mysidebar from './config/sidebar'

export default {
  // base : '/vitepress-blog/',
  themeConfig: {
    siteTitle: 'Simplemw\'s blog',
    logo: 'images/touxiang.png',
    nav: [
      { text: '首页', link: '/' },
      // {
      //   text: '框架',
      //   link: '/guide/',
      // },
      {
        text: '知识体系',
        items: [
          {
            // Title for the section.
            text: '前端',
            items: [
              { text: '待学习', link: '/' },
            ]
          },
          {
            // Title for the section.
            text: '后端',
            items: [
              { text: 'JAVA', link: '/guide/' },
            ]
          }
        ]
      },
      // {
      //   text: '分类',
      //   items: [
      //     {
      //       items: [
      //         { text: 'Section A Item A', link: '...' },
      //         { text: 'Section B Item B', link: '...' }
      //       ]
      //     }
      //   ]
      // },
      { text: '关于', link: 'other/about' },
    ],
    sidebar: mysidebar.sidebar,
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  },
  lastUpdated: false,
  //忽略死链接
  ignoreDeadLinks: true
}