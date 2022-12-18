/**
 * 代理环境配置
 */
export const serveUrlMap: any = {
  dev: 'http://localhost:5012/',
  uat: 'http://localhost:5012/',
  prod: 'http://localhost:5012/',
};

// 获取当前的环境, 默认dev
const { UMI_ENV = 'dev' } = process.env;
console.log('当前的环境UMI_ENV', UMI_ENV);

/**
 * 配置代理地址
 * 配置统一的前缀进行代理设置
 * 不过后端统一解决了跨域的配置，后期的话仔通过Nginx进行跨域限制就行
 */
export const proxy: any = {
  dev: {
    '/uceter': {
      target: serveUrlMap[UMI_ENV],
      changeOrigin: true,
      pathRewrite: { '^/uceter': 'uceter' },
    },
  },
  uat: {
    '/auth': {
      target: serveUrlMap[UMI_ENV],
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '',
      },
    },
  },
  prod: {
    '/auth': {
      target: serveUrlMap[UMI_ENV],
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '',
      },
    },
  },
};
