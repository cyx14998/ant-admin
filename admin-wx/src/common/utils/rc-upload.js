
export default function (url, files, token, key, callback) {
    const xhr = new XMLHttpRequest();

    // registerListeners({ xhr, resolve, progress });

    xhr.open('POST', url);
    xhr.withCredentials = false;

    var formData, startDate;
    formData = new FormData();
    if (key !== null && key !== undefined) formData.append('key', key);
    formData.append('token', token);
    formData.append('file', files);
    //send just the file if no fields or filename is set
    xhr.addEventListener('load', () => {
        let response;
        try {
            response = JSON.parse(xhr.response);
            callback && callback(response);
        } catch (e) {
            response = xhr.response;
        }
    });
    return xhr.send(formData);
}