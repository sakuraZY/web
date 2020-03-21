/*
 * @Author: huwei*
 * @Date: 2020-03-08 22:24:02
 * @
# Description: 叫号getKeyCode 缓存叫号避免重复叫号
 */
import { requestKey } from '@/apis/buildingTable/building';
import { formatDate } from '@/libs/date';

export default {
  data() {
    return {
      typeName: '流程实例',
      rkey: 'W',
      keyCode: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.keyCode = sessionStorage[this.$route.path.split('/')[1]];
    });
  },
  methods: {
    getKeyCode() {
      if (!this.keyCode) {
        requestKey(this.rkey).then((data) => {
          const { code, msg, resData } = data;
          if (code === 0) {
            let str = resData.reqkey.toString();
            let arr = str.split('');
            const len = arr.length;
            if (4 - len > 0) {
              for (let i = 0; i < 4 - len; i += 1) {
                arr.unshift('0');
              }
            }
            if (4 - len < 0) {
              arr = arr.slice(0, 4);
            }
            str = arr.join('');
            const today = formatDate(new Date());
            this.keyCode = `${this.rkey}${today.split('-').join('')}${str}`;
            // 把当前号缓存浏览器本地
            this.$nextTick(() => {
              sessionStorage[this.$route.path.split('/')[1]] = this.keyCode;
            });
          } else {
            this.$message.error(msg);
          }
        }, (err) => {
          throw new Error(err);
        });
      }
    },
  },
};
