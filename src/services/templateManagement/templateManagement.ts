/**
 * @name 模板管理
 * @description 接口列表
 */

import { request } from '@umijs/max';

/** 模板管理表格  GET /generator/group */
export async function templateList() {
  return request<TEMPLATE_MANAGEMENT.TemplateList>('/generator/group', {
    method: 'GET',
  });
}

/** 新建模板 POST /generator/group */
export async function templateCreate(
  data: Partial<TEMPLATE_MANAGEMENT.Params>,
) {
  return request<API.Response>('/generator/group', {
    data,
    method: 'POST',
  });
}

/** 修改模板 POST /generator/group */
export async function templateUpdate(
  data: Partial<TEMPLATE_MANAGEMENT.Params>,
) {
  return request<API.Response>('/generator/group', {
    data,
    method: 'PUT',
  });
}

/** 删除模板 POST /generator/group */
export async function templateDelete(id: number) {
  return request<API.Response>('/generator/group/' + id, {
    method: 'DELETE',
  });
}

/** 上传模板  POST /generator/file/importFile*/
export async function importTemplate(params: {
  groupId?: number | undefined;
  file?: any;
}) {
  return request<API.Response>('/generator/file/importFile', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: params,
  });
}

/** 导出模板  POST /generator/file/importFile*/
export async function exportTemplate(groupId: number) {
  return request<Blob>(`/generator/file/export?groupId=${groupId}`, {
    method: 'GET',
    responseType: 'blob',
  });
}

/** 属性配置表格 GET /generator/attribute */
export async function attributeList(params: { groupId: number }) {
  return request<API.Response>('/generator/attribute', {
    method: 'GET',
    params,
  });
}

/** 新建属性配置 POST /generator/group */
export async function attributeCreate(
  data: Partial<TEMPLATE_MANAGEMENT.Attribute>,
) {
  return request<API.Response>('/generator/attribute', {
    data,
    method: 'POST',
  });
}

/** 修改属性配置 PUT /generator/group */
export async function attributeUpdate(
  data: Partial<TEMPLATE_MANAGEMENT.Attribute>,
) {
  return request<API.Response>('/generator/attribute', {
    data,
    method: 'PUT',
  });
}

/** 删除属性配置 DELETE /generator/attribute */
export async function attributeDelete(id: number) {
  return request<API.Response>('/generator/attribute/' + id, {
    method: 'DELETE',
  });
}

/** 第二步--下一步按钮--把此模板的属性配置传给后端 PUT /generator/attribute/updateByGroup */
export async function updateByGroup(data: any) {
  return request('/generator/attribute/updateByGroup', {
    data,
    method: 'PUT',
  });
}

/** 编辑模板--代码编辑器左侧菜单  GET /generator/file/tree*/
export async function fileTree(params: { groupId: number }) {
  return request<API.Response>('/generator/file/tree', {
    method: 'GET',
    params,
  });
}

/** 编辑模板--新建文件 POST /generator/file */
export async function fileCreate(data: any) {
  return request<API.Response>('/generator/file', {
    data,
    method: 'POST',
  });
}

/** 编辑模板--修改文件 PUT /generator/file */
export async function fileUpdate(data: any) {
  return request<API.Response>('/generator/file', {
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'PUT',
  });
}

/** 编辑模板--删除文件 DELETE /generator/file */
export async function fileDelete(id: number) {
  return request<API.Response>('/generator/file/' + id, {
    method: 'DELETE',
  });
}
