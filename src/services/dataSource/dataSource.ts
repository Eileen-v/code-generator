/**
 * @name 数据源管理
 * @description 接口列表
 */

import { request } from '@umijs/max';

/** 数据源管理表格 GET /generator/database */
export async function databaseList(params:Partial<DATA_SOURCE.Params>) {
  return request<API.Response>('/generator/database', {
    params,
    method: 'GET',
  });
}

/** 新建数据源 POST /generator/database */
export async function databaseCreate(data: Partial<DATA_SOURCE.DataSourceListItem>) {
  return request<API.Response>('/generator/database', {
    data,
    method: 'POST',
  });
}

/**  修改数据源 PUT /generator/database */
export async function databaseUpdate(data: Partial<DATA_SOURCE.DataSourceListItem>) {
  return request<API.Response>('/generator/database', {
    data,
    method: 'PUT',
  });
}

/**  删除数据源 DELETE /generator/database/  */
export async function databaseDelete(id: number) {
  return request<API.Response>('/generator/database/' + id, {
    method: 'DELETE',
  });
}