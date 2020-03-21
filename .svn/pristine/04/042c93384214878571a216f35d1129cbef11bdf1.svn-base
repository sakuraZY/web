/*
 * @Author: huwei*
 * @Date: 2020-03-09 20:18:23
 * @
# Description: 查询字典业务名称
 */
import { transferValueToName } from '@/apis/sysmgr/dicItem';

export default {
  data() {
    return {
    //   parentPnode: 'YGDY',
      dicData: '',
    };
  },
  mounted() {
    transferValueToName('业务申请名称', [this.dicValue]).then(({ code, msg, resData }) => {
      if (code === 0) {
        this.dicData = resData.dicItem['0'];
      } else {
        this.$message.error(msg);
      }
    }, (err) => {
      throw new Error(err);
    });
  },
  methods: {
  },
};
