import type { RequestConfig } from '@umijs/max';
import type { RequestOptions } from '@@/plugin-request/request';
import { message } from 'antd';

/**
 * 错误状态
 */
enum ErrorShowType {
  OK = 200, //成功响应
  CREATED = 201, // 该请求已成功，并因此创建了一个新的资源。这通常是在POST请求，或是某些PUT请求之后返回的响应。
  ACCEPTED = 202, // 请求已经接收到，但还未响应，没有结果
  PARTIAL_CONTENT = 206, // 服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件。
  AMBIGUOUS = 300, // 被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。
  MOVED_PERMANENTLY = 301, //被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一
  FOUND = 302, // 请求的资源现在临时从不同的 URI 响应请求。
  SEE_OTHER = 303, // 对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。
  NOT_MODIFIED = 304, // 如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。
  BAD_REQUEST = 400, // 语义有误，当前请求无法被服务器理解；请求参数有误。
  UNAUTHORIZED = 401, // 当前请求需要用户验证。
  FORBIDDEN = 403, // 服务器已经理解请求，但是拒绝执行它。
  NOT_FOUND = 404, // 请求失败，请求所希望得到的资源未被在服务器上发现。
  METHOD_NOT_ALLOWED = 405, // 请求行中指定的请求方法不能被用于请求相应的资源
  PROXY_AUTHENTICATION_REQUIRED = 407, //与401响应类似，只不过客户端必须在代理服务器上进行身份验证。
  REQUEST_TIMEOUT = 408, // 请求超时
  CONFLICT = 409, // 由于和被请求的资源的当前状态之间存在冲突，请求无法完成。
  INTERNAL_SERVER_ERROR = 500, // 服务器遇到了不知道如何处理的情况。
  NOT_IMPLEMENTED = 501, // 此请求方法不被服务器支持且无法被处理。
  BAD_GATEWAY = 502, // 此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。
  SERVICE_UNAVAILABLE = 503, // 服务器没有准备好处理请求。
  GATEWAY_TIMEOUT = 504, // 当服务器作为网关，不能及时得到响应时返回此错误代码。
  HTTP_VERSION_NOT_SUPPORTED = 505, // 服务器不支持请求中所使用的HTTP协议版本。
}

/**
 * 后端返回的数据响应格式
 */
interface ResponseStructure {
  success: boolean;
  data: any;
  code: number;
  message: any;
  error?: any;
}

// @ts-ignore
/**
 * 网络请求统一配置和处理
 */
export const appRequestConfig: RequestConfig = {
  // 请求的统一配置
  timeout: 60 * 1000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 错误处理
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { success, data, code, message } = res;
      if (!success) {
        // 错误消息
        const error: any = new Error(message);
        // 错误，名称
        error.name = 'AppBizError';
        // 错误信息收集
        error.info = { code, message, data };
        // 抛出异常
        throw error;
      }
    },
    // 错误接收和处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === 'AppBizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { message, code } = errorInfo;
          // 提示不同的错误信息
          switch (code) {
            case ErrorShowType.OK:
              break;
            case ErrorShowType.CREATED:
              break;
            case ErrorShowType.FORBIDDEN:
              message.error(message);
              break;
            case ErrorShowType.INTERNAL_SERVER_ERROR:
              message.error(message);
              break;
            default:
              message.error(message);
          }
        } else if (error.response) {
          // 请求成功也做出响应 但是状态码超出2xx范围
          message.error(`Response status:${error.response.status}`);
        } else if (error.request) {
          // 请求成功，并未收到响应
          message.error('None response! Please retry');
        } else {
          // 请求错误
          message.error('Request error, please retry');
        }
      }
    },

    // 请求拦截
    requestInterceptors: [
      (config: RequestOptions) => {
        // 拦截请求配置，进行个性化处理
        const url = config.url.concat(`?token = 123`);
        return { ...config, url };
      },
    ],

    // 响应拦截
    responseInterceptors: [
      (response: { data: any }) => {
        const { data } = response;
        if (!data.success) {
          message.error('请求失败');
        }
        return response;
      },
    ],
  },
};
