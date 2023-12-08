/**
 * @name 组件管理
 * @description 接口列表
 */

import { request } from '@umijs/max';

/** 组件管理表格 GET /generator/component */
export async function componentsList(
  params: Partial<COMPONENT_MANAGEMENT.Params>,
) {
  return request<API.Response>('/generator/component', {
    params,
    method: 'GET',
  });
}

/** 新建组件 POST /generator/component */
export async function componentsCreate(
  data: Partial<COMPONENT_MANAGEMENT.ComponentListItem>,
) {
  return request<API.Response>('/generator/component', {
    data,
    method: 'POST',
  });
}

/**   修改组件 PUT /generator/component */
export async function componentsUpdate(
  data: Partial<COMPONENT_MANAGEMENT.ComponentListItem>,
) {
  return request<API.Response>('/generator/component', {
    data,
    method: 'PUT',
  });
}

/** 删除组件 DELETE /generator/component/ */
export async function componentsDelete(id: number) {
  return request<API.Response>('/generator/component/' + id, {
    method: 'DELETE',
  });
}
