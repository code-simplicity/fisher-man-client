import { defineConfig } from '@umijs/max';
import routes from './config/routes';
import { proxy } from './config/proxy';

const { UMI_ENV } = process.env;

export default defineConfig({
  npmClient: 'pnpm',
  antd: {
    // dark: true,
    configProvider: {},
  },
  // 配置代理
  proxy: proxy[UMI_ENV || 'dev'],
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
  /**
   * 网络请求配置
   */
  request: {},
});
