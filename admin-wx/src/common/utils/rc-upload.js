/**
 * 七牛云图片上传接口处理
 * @param url   url
 * @param files 文件list
 * @param token 七牛 token
 * @param key   七牛 key 也是上传之后生成的文件名
 * @param callback  callback
 */
export default function (url, files, token, key, callback) {
    const xhr = new XMLHttpRequest();

    // registerListeners({ xhr, resolve, progress });

    xhr.open('POST', url);
    xhr.withCredentials = false;

    var formData;
    formData = new FormData();
    if (key !== null && key !== undefined) formData.append('key', key);
    formData.append('token', token);
    formData.append('file', files);
    //send just the file if no fields or filename is set
    xhr.addEventListener('load', () => {
        let response;
        try {
            response = JSON.parse(xhr.response);
            callback && callback(response);     // 把接口返回的数据以callback的形式返回
        } catch (e) {
            response = xhr.response;
        }
    });
    return xhr.send(formData);
}