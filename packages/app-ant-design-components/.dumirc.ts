import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'App Ant Design Components',
    rtl: true,
    footer: 'App Ant Design Components ❤ by Fisher Man',
  },
  theme: {
    '@primary-color': '#a51d41',
  },
  locales: [{ id: 'zh-CN', name: '中文' }],
});
