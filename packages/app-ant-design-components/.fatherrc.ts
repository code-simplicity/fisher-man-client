import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  // 以下为 esm 配置项启用时的默认值，有自定义需求时才需配置
  esm: {
    // 默认编译目录
    input: 'src',
    // 编译输出目录
    output: 'es',
    // 默认构建为 Browser 环境的产物
    platform: 'browser',
    // 默认使用 babel 以提供更好的兼容性
    transformer: 'babel',
    // 源码模式
    // sourcemap: true,
  },
  cjs: {
    // 默认编译目录
    input: 'src',
    // 编译输出目录
    output: 'lib',
    // 默认构建为 Node.js 环境的产物
    platform: 'node',
    // 默认使用 esbuild 以获得更快的构建速度
    transformer: 'babel',
    // 源码模式
    // sourcemap: true,
  },

  //
  // 打包的产物内通过按需加载形式引入 antd 。
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
