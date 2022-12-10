import { defineConfig } from '@umijs/max';
import routes from './config/routes';
import { proxy } from './config/proxy';
import { theme } from 'antd/lib';
import { convertLegacyToken } from '@ant-design/compatible/lib';

const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);

const { UMI_ENV } = process.env;

export default defineConfig({
  npmClient: 'pnpm',
  antd: {
    // dark: true,
    import: false, // 关闭自动导入
    configProvider: {
      message: {
        left: 200,
        bottom: 200,
        duration: 2,
        maxCount: 3,
        rtl: true,
      },
    },
    theme: {
      token: {
        // colorPrimary: '#ff1818',
      },
    },
  },
  // 加载器实现颜色的更改
  lessLoader: {
    lessOptions: {
      modifyVars: mapToken,
    },
    // modifyVars: mapToken,
  },
  // 配置代理
  proxy: proxy[UMI_ENV || 'dev'],
  // 开启Module Federation
  mfsu: {
    strategy: 'normal',
    shared: {
      react: {
        singleton: true,
      },
    },
  },
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
