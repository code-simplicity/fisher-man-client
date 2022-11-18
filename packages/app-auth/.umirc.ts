import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  npmClient: 'pnpm',
  plugins: [
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/locale',
    '@umijs/plugins/dist/tailwindcss',
    '@umijs/plugins/dist/dva',
    '@umijs/plugins/dist/model',
  ],
  antd: {
    // dark: true,
    configProvider: {},
  },
  // 加载器实现颜色的更改
  // lessLoader: {
  //   modifyVars: {
  //     '@ant-prefix': 'fisher',
  //     'primary-color': '#a70000',
  //   },
  //   javascriptEnabled: true,
  // },
  mfsu: {
    strategy: 'normal',
    shared: {
      react: {
        singleton: true,
      },
    },
  },

  // 开启Module Federation
  // 多语言配置
  locale: {
    default: 'en-US',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  routes,
  tailwindcss: {},
  dva: {},
  model: {},
  title: '摸鱼君登陆',
  targets: {
    ie: 11,
  },
});
