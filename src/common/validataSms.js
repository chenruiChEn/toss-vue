import { getSMS, validateSMS } from '../../api/modules/auth'
export default {
  data() {
    return {
      time: 0
    }
  },
  methods: {
    timer() {
      this.time = 60
      let timer = setInterval(() => {
        this.time -= 1
        if (this.time === 0) {
          clearInterval(timer)
        }
      }, 1000)
    },
    // 发送短信验证码
    getSms(phone, smsType) {
      return new Promise((resolve, reject) => {
        if (this.time > 0) return reject('请稍后在试')
        this.validatorPhone(phone)
          .then(() => {
            getSMS({
              smsType: smsType || 'login',
              phoneNumber: phone
            })
              .then(res => {
                this.timer()
                this.$toast('获取验证码成功')
                return resolve()
              })
              .catch(e => {
                return reject(e)
              })
          })
          .catch(e => {
            return reject(e)
          })
      })
    },
    validataSms(phone, validateCode, smsType) {
      return new Promise((resolve, reject) => {
        if (!phone || !validateCode) return reject('参数错误')
        this.validatorPhone(phone)
          .then(() => {
            validateSMS({
              phoneNumber: phone,
              smsType: smsType || 'login',
              validateCode: validateCode
            })
              .then(() => {
                return resolve()
              })
              .catch(e => {
                this.$toast('验证码错误')
                return reject(e)
              })
          })
          .catch(e => {
            return reject(e)
          })
      })
    }
  }
}
