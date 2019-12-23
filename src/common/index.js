import Clipboard from 'clipboard'
import moment from 'dayjs'
import {
  getMachineryCate,
  getBanners,
  getWechatSignature
} from '../../api/modules/auth'
import { uploadFile } from '../../api/modules/auth'
import { postError } from '../../api/modules/other'
import schema from 'async-validator'
import * as validatorObj from './validator'
export default {
  data() {
    return {
      lst_cate: [],
      validataHandle: null,
      images: [] //window.origin
    }
  },
  computed: {
    local() {
      return this.$store.state.user.local || {}
    }
  },
  methods: {
    videoPlay(url) {
      this.onEmit('app', 'videoPlay', url)
    },
    // 上传图片
    uploadPic(file, fn) {
      if (!file) return
      let obj = new FormData()
      obj.append('file', file)
      uploadFile(obj).then(res => {
        fn && fn(res)
      })
    },
    //错误上报
    postErrorHandle(params) {
      postError(params)
    },
    toActive(id) {
      this.$router.push('/article?id=' + id)
    },
    //获取主页轮播图
    getBannersHandle(call) {
      getBanners().then(res => {
        this.images = res.banners.map(v => {
          let origin = 'http://www.kzgcnj.com'
          return { url: origin + v.bannerImage, id: v.id }
        })
        call && call(res.banners)
      })
    },
    // 吊起拨打电话框
    openCall(userId) {
      if (this.isToken()) {
        this.onEmit('app', 'openCall', userId)
      } else {
        this.$router.push('/login')
      }
    },
    // 调起高德地图导航
    tuneMapLocation(lng, lat) {
      if (this.isToken()) {
        window.open(`https://uri.amap.com/marker?position=${lng},${lat}`)
      } else {
        this.$router.push('/login')
      }
    },
    // 时间格式解析
    dateRander(date, str) {
      if (!date) return ''
      return date
    },
    // 计算时间
    nowDate(date) {
      if (!date) return ''
      let times = Date.now() - moment(date).valueOf()
      times = times < 0 ? 0 : times
      let num = times / (1000 * 60)
      if (num / 60 / 24 > 1) {
        return (num / 60 / 24).toFixed(0) + '天前更新'
      } else if (num / 60 > 1) {
        return (num / 60).toFixed(0) + '小时前更新'
      } else {
        return num.toFixed(0) + '分钟前更新'
      }
    },
    newValidator(obj) {
      this.validataHandle = new schema(obj)
    },
    validator(obj, isToast = true) {
      if (!this.validator) return
      return new Promise((resolve, reject) => {
        this.validataHandle.validate(obj, (errors, fields) => {
          if (errors) {
            if (isToast) {
              let message = errors[0].message
              this.$toast(message)
            }
            reject(fields)
          } else {
            resolve()
          }
        })
      })
    },
    validatorPhone(value, isToast = true) {
      let validataHandle = new schema({ phone: validatorObj.phone })
      return new Promise((resolve, reject) => {
        validataHandle.validate({ phone: value }, (errors, fields) => {
          if (errors) {
            if (isToast) {
              let message = errors[0].message
              this.$toast(message)
            }
            reject(fields)
            validataHandle = null
          } else {
            resolve()
            validataHandle = null
          }
        })
      })
    },
    validators(value, validators, isToast = true) {
      return new Promise((resolve, reject) => {
        if (!validators || !validators.length || !value)
          return reject('参数错误')
        // 解析验证条件
        let obj = {}
        validators.forEach(v => {
          if (validatorObj[v]) obj[v] = validatorObj[v]
        })
        // 验证条件 没有
        if (!Object.values(obj).length) return reject('参数错误')
        let validataHandle = new schema(obj)
        validataHandle.validate({ phone: value }, (errors, fields) => {
          if (errors) {
            if (isToast) {
              let message = errors[0].message
              this.$toast(message)
            }
            reject(fields)
            validataHandle = null
          } else {
            resolve()
            validataHandle = null
          }
        })
      })
    },
    // 复制 - 交互
    copy(str) {
      var clipboard = new Clipboard('.el-copy', {
        text: function() {
          return str
        }
      })
      clipboard.on('success', e => {
        this.$toast('复制成功!')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$toast('该浏览器不支持复制!')
        // 释放内存
        clipboard.destroy()
      })
    },
    star(value) {
      let str = value.toString()
      if (str.length > 0 && str.length < 3) {
        return '*' + str.substring(1)
      } else if (str.length > 5 && str.length < 12) {
        return str.substr(0, 3) + '****' + str.substr(-4)
      } else if (str.length > 14) {
        return str.substr(0, 4) + '***********' + str.substr(-4)
      } else {
        return str
      }
    },
    isPasswd(s) {
      var patrn = /^(\w){6,15}$/
      if (!patrn.exec(s)) return false
      return true
    },
    isToken() {
      return this.$store.state.user.token
    },
    // 时间格式化
    dateFormater(value, formate) {
      if (value) {
        return moment(value).format(formate)
      }
      return value
    },
    // 获取类目列表
    getCateList(id) {
      let that = this
      return new Promise((resolve, reject) => {
        getMachineryCate(id)
          .then(res => {
            that.lst_cate = res.machineryTypeList
            resolve(res.machineryTypeList)
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    onShare(url) {
      // getWechatSignature({
      //   url: location.href.split('#')[0]
      // }).then(res => {
      //   wx.config({
      //     // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //     appId: res.appId, // 必填，公众号的唯一标识
      //     timestamp: res.timestamp, // 必填，生成签名的时间戳
      //     nonceStr: res.nonceStr, // 必填，生成签名的随机串
      //     signature: res.signature, // 必填，签名，见附录1
      //     jsApiList: [
      //       'updateAppMessageShareData',
      //       'updateTimelineShareData',
      //       'onMenuShareTimeline',
      //       'onMenuShareAppMessage'
      //     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      //   })
      //   wx.ready(function() {
      //     wx.updateAppMessageShareData({
      //       title: '我的机械微店', // 分享标题
      //       desc: '我的机械微店，机械档期位置全有，快来预订吧！', // 分享标题
      //       link: window.location.origin + '#' + url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //       imgUrl: window.location.origin + '/kzgc.jpeg',
      //       success: function() {
      //         // 设置成功
      //         alert('分享成功') //这里官网说已经不支持回调了
      //       },
      //       fail: function(res) {
      //         alert(JSON.stringify(res))
      //       }
      //     })
      //     wx.updateTimelineShareData({
      //       title: '我的机械微店', // 分享标题
      //       desc: '我的机械微店，机械档期位置全有，快来预订吧！', // 分享标题
      //       link: window.location.origin + '#' + url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //       imgUrl: window.location.origin + '/kzgc.jpeg',
      //       success: function() {
      //         // 设置成功
      //         alert('分享成功') //这里官网说已经不支持回调了
      //       },
      //       fail: function(res) {
      //         alert(JSON.stringify(res))
      //       }
      //     })
      //   })
      // })
    },
    getStoreShare(id) {
      getWechatSignature({
        url: location.href.split('#')[0]
      }).then(res => {
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function() {
          wx.updateAppMessageShareData({
            title: '我的机械微店', // 分享标题
            desc: '我的机械微店，机械档期位置全有，快来预订吧！', // 分享标题
            link: window.location.origin + '/#/store?id=' + id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: window.location.origin + '/kzgc.jpeg'
            // success: function() {
            //   // 设置成功
            //   alert('分享成功') //这里官网说已经不支持回调了
            // },
            // fail: function(res) {
            //   alert(JSON.stringify(res))
            // }
          })
          wx.updateTimelineShareData({
            title: '我的机械微店，机械档期位置全有，快来预订吧！', // 分享标题
            desc: '我的机械微店，机械档期位置全有，快来预订吧！', // 分享标题
            link: window.location.origin + '/#/store?id=' + id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: window.location.origin + '/kzgc.jpeg'
            // success: function() {
            //   // 设置成功
            //   alert('分享成功') //这里官网说已经不支持回调了
            // },
            // fail: function(res) {
            //   alert(JSON.stringify(res))
            // }
          })
          // wx.onMenuShareTimeline({
          //   title: '我的机械微店', // 分享标题
          //   desc: '我的机械微店，机械档期位置全有，快来预订吧！', // 分享标题
          //   link: window.location.origin + '/#/store?id=' + id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //   imgUrl: window.location.origin + '/kzgc.jpeg',
          //   success: function() {
          //     // 设置成功
          //     alert('分享成功') //这里官网说已经不支持回调了
          //   },
          //   fail: function(res) {
          //     alert(JSON.stringify(res))
          //   }
          // })
          // wx.onMenuShareAppMessage({
          //   title: '我的机械微店', // 分享标题
          //   desc: '我的机械微店，机械档期位置全有，快来预订吧！', // 分享标题
          //   link: window.location.origin + '/#/store?id=' + id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          //   imgUrl: window.location.origin + '/kzgc.jpeg',
          //   success: function() {
          //     // 设置成功
          //     alert('分享成功') //这里官网说已经不支持回调了
          //   },
          //   fail: function(res) {
          //     alert(JSON.stringify(res))
          //   }
          // })
        })
      })
    },
    isWeixin() {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    }
  }
}
