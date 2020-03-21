/* eslint-disable no-useless-escape */
/**
 * 验证外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}


/**
 * 验证网址
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
  return reg.test(url);
}

/**
 * 验证身份证，支持一代、二代
 * @param {string} cardId
 * @returns {Boolean}
 */
export function validCardId(cardId) {
  const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
  return reg.test(cardId);
}

/**
 * 验证邮箱
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return reg.test(email);
}

/**
 * 验证手机号码
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone) {
  const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
  return reg.test(phone);
}

/**
 * 验证国内电话
 * @param {string} callNumber
 * @returns {Boolean}
 */
export function validCallNo(callNumber) {
  const reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
  return reg.test(callNumber);
}

/**
 * 验证手机或座机号码
 * @param {string} phone
 * @returns {Boolean}
 */
export function validlandLineOrPhone(phone) {
  return validPhone(phone) || validCallNo(phone);
}

/**
 * 验证护照
 * @param {string} callNumber
 * @returns {Boolean}
 */
export function validPassport(passport) {
  const reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
  return reg.test(passport);
}

/**
 * 验证ip(ipv4, ipv6)
 * @param {string} ip
 * @returns {Boolean}
 */
export function validIp(ip) {
  const reg = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i;
  const reg2 = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  return reg.test(ip) || reg2.test(ip);
}

/**
 * 验证社会统一信用代码
 * @param {string} creditCode
 * @returns {Boolean}
 */
export function validCreditCode(creditCode) {
  const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
  return reg.test(creditCode);
}

/**
 * 验证纯数字
 * @param {number} number
 * @returns {Boolean}
 */
export function validNumber(number) {
  const reg = /<(\w+)[^>]*>(.*?<\/\1>)?/;
  return reg.test(number);
}

/**
 * 验证浮点数
 * @param {number} number
 * @returns {Boolean}
 */
export function validFloatNumber(number) {
  const reg = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/g;
  return reg.test(number);
}

/**
 * 验证整数
 * @param {number} number
 * @returns {Boolean}
 */
export function validInt(number) {
  const reg = /^[-\+]?\d+$/g;
  return reg.test(number);
}

/**
 * 验证正整数
 * @param {number} number
 * @returns {Boolean}
 */
export function validPositiveInt(number) {
  const reg = /^[1-9]+\d*$/g;
  return reg.test(number);
}

/**
 * 验证字符串
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * 验证数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj;

  const keysArr = Object.keys(obj);
  return keysArr.length;
};

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1);
  const keysArr2 = Object.keys(obj2);
  if (keysArr1.length !== keysArr2.length) return false;
  if (keysArr1.length === 0 && keysArr2.length === 0) return true;
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
};
