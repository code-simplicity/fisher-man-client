import { defineConfig } from '@umijs/max';
import routes from './config/routes';
import { theme } from 'antd/lib';
import { convertLegacyToken } from '@ant-design/compatible';

const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);
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
});
