import request from '@/utils/request'
/**
 * 上传图片
 * @param {FormData} formData 上传图片`FormData`值
 * @example
 * ```js
 * const formData = new FormData();
 * formData.append('img', file);
 * uploadImg(formData).then(res => console.log(res))
 * ```
 */
 export function uploadImg(formData) {
  return request('POST', '/upload/articleSurface', formData, {
    // 文件上传不需要配置请求头，所以清除掉
    headers: {
      'codeMode': ''
    }
  })
}