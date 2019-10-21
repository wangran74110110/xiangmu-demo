import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { removeToken } from '@/utils/myAuth'
import qs from 'qs';

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
// service: axios的实例对象
// interceptors:拦截器
// request:请求
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 登陆之前的检查 拦截器
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    if(res.tokenCode == 5000){
      Message({
        message: '登陆超时,请重新登陆!',
        type: 'error',
        duration: 3 * 1000
      })
      // 清楚本地凭据
      removeToken();
      router.replace({path:'/login'});
      return  Promise.reject()
    }else{

      return res
    }
    // 登陆的拦截器
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
// 请求分为get/post
// axios对于get和post的参数的处理方式是不同的
function http(config){
  if(config.method.toLowerCase() === 'post'){
    // 针对对象 是无法直接处理的 ; qs是一个js库,可以方便的对对象进行序列化处理
    // myAjax  {name:'zx',age:20} ==> name=zs&age=20
    config.data = qs.stringify(config.data,{arrayFormat: 'repeat',allowDots: true});
  }else{
    config.params = config.data;
  }
  return service(config);
}

export default http
