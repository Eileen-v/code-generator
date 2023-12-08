/**
 * @name 代码生成
 * @description 接口列表
 */

import { request } from '@umijs/max';

/** 数据库表格 GET /generator/table */
export async function tableList(params: { databaseId: number }) {
  return request('/generator/table', {
    method: 'GET',
    params,
  });
}

/**  重置数据源  GET /generator/table/origin */
export async function tableOrigin() {
  return request('/generator/table/origin', {
    method: 'GET',
  });
}

/** 代码预览 GET /generator/file/preview */
export async function filePreview(data: CODE_GENERATION.FilePreviewParams) {
  return request('/generator/file/preview', {
    method: 'POST',
    data,
  });
}

/**  下载zip文件  GET /generator/file/download */
export async function downloadFile(data: CODE_GENERATION.FilePreviewParams) {
  return request('/generator/file/download', {
    data,
    method: 'POST',
    responseType: 'blob',
  });
}
