import { requestConfig } from '@/services/requestConfig';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import Footer from './components/Footer';

/**
 * ProLayout 支持的api
 *
 * @see https://procomponents.ant.design/components/layout
 */
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    avatarProps: {
      render: (_, avatarChildren) => {
        return <></>;
      },
    },
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            // onSettingChange={(settings) => {
            //   setInitialState((preInitialState) => ({
            //     ...preInitialState,
            //     settings,
            //   }));
            // }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理、请求拦截器、响应拦截器
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...requestConfig,
};
