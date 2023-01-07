import { requestConfig } from '@/config';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };

/**
 * 配置request请求
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 */
export const request = {
  ...requestConfig,
};
