/**
 * @File: 日期格式化工具
 * @Author: qiwei
 * @Date: 2020-01-10 18:06:49
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-02-26 21:29:48
 */
import moment from 'moment';

moment.locale('ZH_CN');

/**
 * 日期格式化
 * @param {Date} date 日期
 * @param {Number} type 格式类型编号，默认为0, 即'YYYY-MM-DD'
 */
export const formatDate = (date, type = 0) => {
  const dateType = [
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY年MM月DD日 HH时mm分ss秒',
    'YYYY/MM/DD',
    'YYYY/MM/DD HH:mm:ss',
    'YYYY年MM月DD日',
    'YYYY-MM-DD h:mm:ss A',
    'YYYY年MM月DD日 h时mm分ss秒 A',
    'YYYYMMDDHHmmss',
  ];
  return moment(date).format(dateType[type]);
};

/**
 * 获取相对时间
 * @param {Number} num 相差数值
 * @param {Number} type 类型编号
 * @param {Date} date 相对日期，默认为当前时间
 */
export const getRelativeTime = (num, type = 0, date = new Date()) => {
  const dateType = [
    'day',
    'year',
    'month',
    'hour',
    'minute',
    'second',
    'week',
    'quarter',
    'isoWeek',
  ];
  return moment(date).add(num, dateType[type]);
};
