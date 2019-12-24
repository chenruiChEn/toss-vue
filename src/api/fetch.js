import axios from "axios";
// import router from '@/router/index'
// import { getLocalValue, removeLocalValue } from '../common/utils'

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
});

// request拦截器
service.interceptors.request.use(
  config => {
    // const token = getLocalValue('token')
    // if (token) {
    //   config.headers['token'] = token
    // }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    // if (response.status === 200) {
    return response.data;
    // }
  },
  error => {
    // if (error.response) {
    //   let response = error.response
    //   if (response.status === 401) {
    //     removeLocalValue('token')
    //     router.replace('/login')
    //   } else if (response.status !== 200) {
    //     let errors =
    //       response.data.errors && response.data.errors.length
    //         ? response.data.errors[0].message
    //         : '接口报错'
    //     Toast(errors)
    //     return Promise.reject(response.data)
    //   }
    // }
    return Promise.reject(error);
  }
);
export default service;
