import request from "@/api/fetch";

//获取图片列表
export function getImgsList(params) {
  return request({
    url: "/imgs",
    method: "get",
    params
  });
}
