import { convertLegacyToken } from '@ant-design/compatible';
import { defineConfig } from '@umijs/max';
import { theme } from 'antd/lib';
import routes from './config/routes';
import { proxy } from './config/proxy';

const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);
const { UMI_ENV } = process.env;

export default defineConfig({
  antd: {
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
  },
  // 多语言配置
  locale: {
    default: 'en-US',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  // layout: {
  //   title: '统一用户中心',
  // },
  // 开启Module Federation
  mfsu: {
    strategy: 'normal',
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  routes: routes,
  npmClient: 'pnpm',
  qiankun: {
    slave: {},
  },
  // 配置代理
  proxy: proxy[UMI_ENV || 'dev'],
});
