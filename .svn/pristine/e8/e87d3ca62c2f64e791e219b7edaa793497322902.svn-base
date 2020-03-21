import Vue from 'vue';
import XEUtils from 'xe-utils';
import VXETablePluginElement from 'vxe-table-plugin-element';
import {
  // 实例
  VXETable,
  Icon,
  Column,
  Header,
  Footer,
  Resize,
  // 核心
  Table
} from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

// 按需加载的方式默认是不带国际化的，需要自行导入
VXETable.setup({
  i18n: (key, value) => XEUtils.get(zhCNLocat, key)
})
Vue.use(Icon)
  .use(Column)
  .use(Header)
  .use(Footer)
  .use(Resize)
  .use(Table);
VXETable.use(VXETablePluginElement);
import 'vxe-table-plugin-element/dist/style.css';
import './index.scss';

VXETable.renderer.add('CustomCell', {
  // 默认显示模板
  renderDefault(h, renderOpts, params) {
    const { templet, events, render } = renderOpts;
    const { row } = params;
    let domStr = '';
    if (render && typeof render === 'function') {
      return [render(h, row)];
    }
    if (typeof templet === 'string') {
      domStr = templet;
    }
    if (typeof templet === 'function') {
      domStr = templet(row);
    }
    return [h('div', {
      domProps: {
        innerHTML: domStr,
      },
      on: events,
    })];
  },
});