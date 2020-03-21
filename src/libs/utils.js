/*
 * @Author: huwei*
 * @Date: 2020-03-08 12:04:40
 * @
# Description: 增加身份证转化方法
 */
import store from '@/store';
import {
  TOKEN_KEY, COOKIE_KEY, LGUSER_KEY, METHODS_KEY, GSVER_KEY, USER_KEY,
} from './authTypes';

export const getApiPojo = () => ({
  [GSVER_KEY]: 'ios1.0',
  [METHODS_KEY]: 'frame',
  [LGUSER_KEY]: store.state.user[USER_KEY],
  [COOKIE_KEY]: store.state.user[COOKIE_KEY],
  [TOKEN_KEY]: store.state.user.token,
});

export const getApiPojoJstring = () => {
  const userJson = Object.assign({}, getApiPojo());
  const arr = Object.keys(userJson);
  const narr = arr.map(item => `${item}=${userJson[item]}`);
  return narr.join('&');
};

export const transNumToId = (ostr, toValue = false) => {
  if (!ostr) {
    return '';
  }
  const str = ostr.toString();
  const IdArray = [
    { value: '1', label: '身份证' },
    { value: '2', label: '港澳台身份证' },
    { value: '3', label: '护照' },
    { value: '4', label: '户口簿' },
    { value: '5', label: '军官证(士兵证)' },
    { value: '6', label: '组织机构代码' },
    { value: '7', label: '营业执照' },
    { value: '8', label: '统一社会信用代码证' },
    { value: '9', label: '其他' },
  ];
  const arr = IdArray.filter((item) => {
    let t = false;
    if (item.value === str || item.label === str) {
      t = true;
    }
    return t;
  });
  if (toValue) {
    return arr[0].value;
  }
  return arr[0].label;
};

export const coverArray = (array = [], pidStr = 'pId', idStr = 'id', chindrenStr = 'children') => {
  const coverArr = [];
  const hash = {};
  const arr = array.map((item) => {
    hash[item[idStr]] = { ...item };
    return hash[item[idStr]];
  });
  arr.forEach((item) => {
    const parentNode = hash[item[pidStr]];
    if (parentNode) {
      if (!parentNode[chindrenStr]) {
        parentNode[chindrenStr] = [];
      }
      parentNode[chindrenStr].push(item);
    } else {
      coverArr.push(item);
    }
  });
  return coverArr;
};

export const valueEquals = (a, b) => {
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
