/**
 * @File: 公共辅助工具
 * @Author: qiwei
 * @Date: 2020-01-10 18:08:16
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-03-19 16:35:55
 */
import pinyin from 'js-pinyin';

pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
/**
 * 判断当前是否支持sessionStorage
 */
const supportStorage = () => {
  let res = false;
  if (typeof window.sessionStorage === 'object') {
    res = true;
  }
  return res;
};

/**
* 判断当前是否支持localStorage
*/
const supportLSStorage = () => {
  let res = false;
  if (typeof window.localStorage === 'object') {
    res = true;
  }
  return res;
};
/**
 * 存储数值----sessionStorage
 * @param {String} name  该存储的标识名，请注意唯一性
 * @param {String,JSON} value  该存储的具体值
 * @param {Boolean} type  该存储具体值的类型，设置为true则是说明具体值是非字符串格式，反正则不是
 * @returns 无返回值
 *
 */
export const setItem = (name, value, type) => {
  if (supportStorage()) {
    let newVal = value;
    if (type) {
      newVal = JSON.stringify(value);
    }
    window.sessionStorage.setItem(name, newVal);
  }
};
/**
 * 获取数值----sessionStorage
 * @param {String} name  该存储的标识名，请注意唯一性
 * @param {Boolean} type  该存储具体值的类型，设置为true则是说明具体值是非字符串格式，反正则不是
 * @returns name对应的值
 */
export const getItem = (name, type) => {
  let value = '';
  if (supportStorage()) {
    value = window.sessionStorage.getItem(name);
    if (type && value !== null && value !== '') {
      value = JSON.parse(value);
    }
  }
  return value;
};
/**
 * 存储数值----localStorage
 * @param {String} name  该存储的标识名，请注意唯一性
 * @param {String,JSON} value  该存储的具体值
 * @param {Boolean} type  该存储具体值的类型，设置为true则是说明具体值是非字符串格式，反正则不是
 * @returns 无返回值
 *
 */
export const setLSItem = (name, value, type) => {
  if (supportLSStorage()) {
    let newVal = value;
    if (type) {
      newVal = JSON.stringify(value);
    }
    window.localStorage.setItem(name, newVal);
  }
};
/**
 * 获取数值----localStorage
 * @param {String} name  该存储的标识名，请注意唯一性
 * @param {Boolean} type  该存储具体值的类型，设置为true则是说明具体值是非字符串格式，反正则不是
 * @returns name对应的值
 */
export const getLSItem = (name, type) => {
  let value = '';
  if (supportLSStorage()) {
    value = window.localStorage.getItem(name);
    if (type && value !== null && value !== '') {
      value = JSON.parse(value);
    }
  }
  return value;
};
/**
 * 值的全拼/首字母是否包含过滤的字符
 * @param {String} filter 过滤
 * @param {String} value 值
 */
export const isIncludesFilter = (filter = '', value = '') => {
  if (!filter || !value) {
    return true;
  }
  const camelCharsDataValue = pinyin.getCamelChars(value).toLowerCase();
  const fullCharsDataValue = pinyin.getFullChars(value).toLowerCase();
  return [value, camelCharsDataValue, fullCharsDataValue]
    .some(item => item.includes(filter.toLowerCase()));
};
/**
 * 使用全拼/首字母模糊过滤符合的数据
 * @param {Arra} arr 待过滤数组
 * @param {String} filter 过滤
 * @param {String} field 待比较的对象key值
 */
export const filterData = (arr = [], filter = '', field = '') => arr.filter((item) => {
  const dataValue = item[field];
  return isIncludesFilter(filter, dataValue);
});
/**
 * 使用全拼/首字母模糊过滤符合的数据包含父
 * @param {Arra} arr 待过滤数组
 * @param {String} filter 过滤
 * @param {String} field 待比较的对象key值
 * @param {String} parentKey 父节点对象象key值
 */
export const filterDataHasParent = (arr = [], filter = '', field = '', parentKey = 'pId') => {
  if (!Array.isArray(arr) || !arr.length || !filter || !field) {
    return [];
  }
  const obj = {};
  const dataFilter = [];
  arr.forEach((item) => {
    obj[item.id] = item;
  });
  arr.forEach((item) => {
    if (!item[field]) {
      return;
    }
    const dataValue = item[field];
    const hasExit = isIncludesFilter(filter, dataValue);
    if (!hasExit) {
      return;
    }
    if (!dataFilter.includes(item)) {
      dataFilter.push(item);
      // 加载符合条件节点的父节点
      let parentItem = obj[item[parentKey]];
      while (parentItem) {
        if (!dataFilter.includes(parentItem)) {
          dataFilter.push(parentItem);
        }
        parentItem = obj[parentItem[parentKey]];
      }
    }
  });
  return dataFilter;
};

/**
 * 获取某个日期时间n天前/后的时间
 * @param {Date} iDate，需要进行转换的某个日期
 * @param {Number} n,天数:正数为n天后，负数为n天前
 */
export const getNDaysBeforeEndDate = (iDate, n) => {
  const timestamp = new Date(iDate).getTime();
  // 获取n天前/后的日期
  const newDate = new Date(timestamp + n * 24 * 3600 * 1000);
  return newDate;
};
/**
 * 下载流
 * @param {Blob} stream 流
 * @param {String} fileSuffix 文件后缀(格式)
 * @param {String} fileName 文件名
 */
export const downloadStream = (stream, fileSuffix = 'txt', fileName = 'download') => {
  const blob = new Blob([stream]);
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  downloadElement.download = `${fileName}.${fileSuffix}`;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  window.URL.revokeObjectURL(href);
};
/**
 * 将树形结构数组转成对象形式
 * @param {Array} arr 数组
 * @param {String} key 主键
 * @param {String} childrenKey 子节点key
 * @param {Boolean} needCopy 是否需要拷贝对象（浅拷贝）
 */
export const hashArray = (arr, key = 'id', childrenKey = 'children', needCopy = false) => {
  const hashMap = {};
  if (!Array.isArray(arr)) {
    return hashMap;
  }
  const mapArr = (array) => {
    array.forEach((item) => {
      if (!item[key]) {
        return;
      }
      if (needCopy) {
        hashMap[item[key]] = { ...item };
      } else {
        hashMap[item[key]] = item;
      }
      if (!Array.isArray(item[childrenKey]) || !item[childrenKey].length) {
        return;
      }
      mapArr(item[childrenKey]);
    });
  };
  mapArr(arr);
  return hashMap;
};

export const transtionToDoubleArray = (arr, colCount = 4) => {
  const num = Math.ceil(arr.length / colCount);
  const temp = [];
  for (let i = 0; i < num; i += 1) {
    temp[i] = arr.slice(i * colCount, i * colCount + colCount);
  }
  return temp;
};
