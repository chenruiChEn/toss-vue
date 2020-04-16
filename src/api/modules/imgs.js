import request from "@/api/fetch";
import OSS from "ali-oss";

//获取图片列表
export function getImgsList(params) {
  return request({
    url: "/imgs",
    method: "get",
    params
  });
}

//获取图片列表
export function putImg(params) {
  return request({
    url: "/imgs",
    method: "put",
    params
  });
}

//获取图片列表
export function deleteImg(params) {
  return request({
    url: "/imgs",
    method: "delete",
    params
  });
}

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAIlWpo381YTD4Z',
  accessKeySecret: '9bnpDVMinmDbj1Jge2TQKdOb7P5xYx',
  secure: true,
  bucket: 'skychen'
});

//上传图片
export async function uploadImg(file, onProgress) {
  return new Promise((resolve, reject) => {
    let ext = file.name.split(".").pop();
    let path = `web-upload/${file.name.substring(
      0,
      8
    )}-${new Date().getTime()}.${ext}`;
    client
      .multipartUpload(path, file, {
        progress: async function(p) {
          onProgress &&
            onProgress({
              percent: Math.floor(p * 100)
            });
        }
      })
      .then(function() {
        resolve(path);
      })
      .catch(function(err) {
        console.log(err);
        reject(err);
      });
  });
}

//上传图片
export async function upload(path,event) {
  return new Promise((resolve, reject) => {
    const buffer = new OSS.Buffer(event.target.result);
    client.put(path, buffer)
      .then(function() {
        resolve(path);
      })
      .catch(function(err) {
        reject(err);
      });
  });
}
