/**
 * 文件下载
 * @param obj
 * @param name 文件名
 */
//XXX 错误写法 需要重构
export function download(obj: any, name: string) {
  const url = window.URL.createObjectURL(new Blob([obj], { type: 'application/zip' }));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  // const fileName = name + '.zip';
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}