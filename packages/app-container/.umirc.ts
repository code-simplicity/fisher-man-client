import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  mfsu: {
    strategy: 'normal',
    shared: {
      react: {
        singleton: true,
      },
    },
  }, // 开启Module Federation
  routes: [
    {
      path: '/',
      redirect: '/home',
      routes: [
        {
          name: '门户',
          path: '/app-portal',
          component: './Home',
          routes: [
            {
              path: '/app-portal/app-portal/*',
              microApp: 'app-portal',
            },
          ],
        },
      ],
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
  qiankun: {
    master: {
      apps: [
        {
          name: 'app-portal',
          entry: '//localhost:9001',
        },
        {
          name: 'app-user-center',
          entry: '//localhost:9002',
        },
      ],
    },
  },
});
