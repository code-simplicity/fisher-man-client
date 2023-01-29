import { defineConfig } from 'dumi';
// @ts-ignore
import path from 'path';
// @ts-ignore
import { repository } from './package.json';

export default defineConfig({
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  metas: [
    {
      name: 'keywords',
      content: 'AppAntDesignCom',
    },
    {
      name: 'description',
      content: 'App Ant Design Components',
    },
  ],
  outputPath: 'docs-dist',
  themeConfig: {
    name: '摸鱼君',
    logo: '',
    helmetIcon: '🍺',
    defaultLanguage: 'zh-CN',
    rtl: true,
    // 展示搜索框
    showSearch: true,
    // GitHub地址
    githubUrl: repository.url,
    prefersColor: { default: 'auto', switch: true },
    // 展示头部的GitHub的icon
    showGithubCorner: true,
    // 展示官网语言的切换
    showLanguageSwitcher: true,
    nav: {
      'zh-CN': [
        { title: '设计', link: '/design' },
        { title: '指南', link: '/guide' },
        { title: '组件', link: '/components/button' },
      ],
      'en-US': [
        { title: 'Design', link: '/design' },
        { title: 'Guide', link: '/guide' },
        { title: 'Components', link: '/components/button' },
      ],
    },
    footer: 'App Ant Design Components ❤ by Fisher Man',
  },
  // 编辑源码位置
  // clickToComponent: true,
  // 可以直接擦查看不被编译的源码 eval
  devtool: 'source-map',
  // 用 esbuild 做依赖预编译
  // mfsu: true,
  theme: {
    '@primary-color': '#a51d41',
  },
  // 样式设置
  styles: [],
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  alias: {
    'app-antd-components/lib': path.join(__dirname, 'src'),
    'app-antd-components/es': path.join(__dirname, 'src'),
  },
});
