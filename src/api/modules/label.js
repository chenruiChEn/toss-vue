import request from "@/api/fetch";
/**
 * 发送短信验证码
 * @param {String} token
 * @param {String} phoneNumber
 * @param {String} smsType  -短信类型,login:登陆,forget:忘记密码, register:注册
 */
export function getSMS(params) {
  return request({
    url: "/sms",
    method: "get",
    params
  });
}
