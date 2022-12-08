/**
 * 代理环境配置
 */
const serveUrlMap: any = {
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
 */
export const proxy: any = {
  dev: {
    '/ucenter': {
      target: serveUrlMap[UMI_ENV],
      changeOrigin: true,
      pathRewrite: { '^/ucenter': 'ucenter' },
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
