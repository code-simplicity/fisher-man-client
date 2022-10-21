import { defineConfig } from "umi";

export default defineConfig({
  npmClient: "pnpm",
  plugins: [
    "@umijs/plugins/dist/antd",
    "@umijs/plugins/dist/locale",
    "@umijs/plugins/dist/tailwindcss",
    "@umijs/plugins/dist/dva",
  ],

  antd: {},
  mfsu: {
    strategy: "normal",
    shared: {
      react: {
        singleton: true,
      },
    },
  },

  // 开启Module Federation
  // 多语言配置
  locale: {
    default: "en-US",
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: "-",
  },

  routes: [
    {
      path: "/",
      redirect: "/login",
    },

    {
      path: "/login",
      component: "./Login",
    },
  ],

  tailwindcss: {},
  dva: {},
});
