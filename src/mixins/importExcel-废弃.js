/*
 * @Descripttion:  Api接口服务
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-12 12:28:29
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-12 14:01:56
 */
// /*
//  * @Descripttion:  导入excel
//  * @version: 1.0
//  * @Author: zengying
//  * @Date: 2020-03-12 12:28:29
//  * @LastEditors: zengying
//  * @LastEditTime: 2020-03-12 14:00:20
//  */

// import XLSX from 'xlsx';

// export default {
//   methods: {
//     importfxx(obj) {
//       // 通过DOM取文件数据
//       this.file = obj;
//       let rABS = false; // 是否将文件读取为二进制字符串
//       const f = this.file;
//       let reader = new FileReader();
//       // if (!FileReader.prototype.readAsBinaryString) {
//       FileReader.prototype.readAsBinaryString = (p) => {
//         let binary = '';
//         rABS = false; // 是否将文件读取为二进制字符串
//         // const pt = this;
//         let wb; // 读取完成的数据
//         let outdata;
//         reader = new FileReader();
//         reader.onload = (e) => {
//           const bytes = new Uint8Array(reader.result);
//           const length = bytes.byteLength;
//           for (let i = 0; i < length; i++) {
//             binary += String.fromCharCode(bytes[i]);
//           }

//           if (rABS) {
//             wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
//               type: 'base64',
//             });
//           } else {
//             wb = XLSX.read(binary, {
//               type: 'binary',
//             });
//           }
//           outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);// outdata就是你想要的东西
//           this.da = [...outdata];

//           return this.da;
//         };
//         reader.readAsArrayBuffer(f);
//       };

//       if (rABS) {
//         reader.readAsArrayBuffer(f);
//       } else {
//         reader.readAsBinaryString(f);
//       }
//     },
//   },
// };
