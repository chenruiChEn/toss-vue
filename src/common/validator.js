const phoneReg = /^[1][1-9][0-9]{9}$/;

const pwdReg = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-zA-Z]).*$/;
// 手机号
export let phone = [
  {
    type: "string",
    required: true,
    message: "请输入手机号"
  },
  {
    type: "string",
    required: true,
    len: 11,
    message: "请输入正确的手机号"
  },
  {
    type: "string",
    required: true,
    message: "请输入正确手机号",
    validator: (rule, value) => {
      return phoneReg.test(value);
    }
  }
];

// 图形验证码
export let picCode = [
  {
    type: "string",
    required: true,
    message: "请输入图形验证码"
  },
  {
    type: "string",
    required: true,
    len: 4,
    message: "请输入4位图形验证码"
  }
];

//  密码
export let password = [
  {
    type: "string",
    required: true,
    message: "请输入密码"
  },
  {
    type: "string",
    required: true,
    min: 6,
    max: 15,
    message: "请输入6-10位密码"
  },
  {
    type: "string",
    required: true,
    message: "请输入包含字母和数字的密码",
    validator: (rule, value) => {
      return pwdReg.test(value);
    }
  }
];
