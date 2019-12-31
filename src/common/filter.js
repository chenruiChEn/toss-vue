import moment from "dayjs";
/**
 * 隐藏姓名 手机号 身份证 银行卡 等中间字符信息
 * @param str
 * @returns {*}
 */
export function star(value) {
  let str = value.toString();
  if (str.length > 0 && str.length < 3) {
    return "*" + str.substring(1);
  } else if (str.length > 5 && str.length < 12) {
    return str.substr(0, 3) + "****" + str.substr(-4);
  } else if (str.length > 14) {
    return str.substr(0, 4) + "***********" + str.substr(-4);
  } else {
    return str;
  }
}

/**
 * 格式化时间
 * @param time
 * @param format
 * @returns {*}
 */
export function timeFormat(time, format) {
  if (!time) return "";
  format = format != null ? format : "YYYY-MM-DD HH:mm:ss";
  return moment(time).format(format);
}
/* 格式化显示手机号 159 9999 9999 */
export function telFormat(tel) {
  if (!tel) return "";
  let startTel = tel.slice(0, 3);
  let midTel = tel.slice(3, 7);
  let endTel = tel.slice(7, 11);
  return `${startTel} ${midTel} ${endTel}`;
}

/**
 * 格式化时间 -> 转化为天
 * @param time
 * @param format
 * @returns {*}
 */
export function timeFormatToDays(time) {
  if (!time) return "";
  return moment(time).diff(moment(), "days") + 1;
}
