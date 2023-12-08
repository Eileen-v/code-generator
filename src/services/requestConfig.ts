// import { getToken } from '@/utils/token';
import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0, // 不提示错误
  WARN_MESSAGE = 1, // 警告信息提示
  ERROR_MESSAGE = 2, // 错误信息提示
  NOTIFICATION = 3, // 通知提示
  REDIRECT = 9, // 页面跳转
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  status?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  errorConfig: {
    // TODO: errorThrower 异常抛出
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'AxiosError') {
        const errorInfo: ResponseStructure | undefined = error.response.data;
        if (errorInfo) {
          const { errorMessage } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.error({
                message: '错误',
                description: errorMessage,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error('服务器异常，请稍后再试');
          }
        }
      }
    },
  },
  // // // 请求拦截器
  // requestInterceptors: [
  //   (config: RequestOptions) => {
  //     // 拦截请求配置，进行个性化处理。
  //     const authHeader =
  //       config.jwt !== true ? { Authorization: getToken() } : {};
  //     const headers = { ...config.headers, ...authHeader };
  //     return { ...config, headers };
  //   },
  // ],
  // TODO: responseInterceptors 响应拦截器
};
