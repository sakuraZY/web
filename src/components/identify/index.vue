<!--
 * @Description: 验证码图片
 * @Author: wangjiayu
 * @Date: 2020-03-19 15:18:28
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-20 14:27:38
 -->

<template>
  <div class="s-canvas" @click="getTempIdentifyCode">
    <canvas
      id="s-canvas"
      :width="contentWidth"
      :height="contentHeight">
    </canvas>
  </div>
</template>
<script>
export default {
  name: 'Identify',
  props: {
    identifyCode: String,
    fontSizeMin: {
      type: Number,
      default: 20,
    },
    fontSizeMax: {
      type: Number,
      default: 35,
    },
    backgroundColorMin: {
      type: Number,
      default: 180,
    },
    backgroundColorMax: {
      type: Number,
      default: 240,
    },
    colorMin: {
      type: Number,
      default: 50,
    },
    colorMax: {
      type: Number,
      default: 160,
    },
    lineColorMin: {
      type: Number,
      default: 40,
    },
    lineColorMax: {
      type: Number,
      default: 180,
    },
    dotColorMin: {
      type: Number,
      default: 0,
    },
    dotColorMax: {
      type: Number,
      default: 255,
    },
    contentWidth: {
      type: Number,
      default: 112,
    },
    contentHeight: {
      type: Number,
      default: 45,
    },
  },
  data() {
    return {
      tempIdentifyCode: this.identifyCode || this.getIdentifyCode(),
    };
  },
  methods: {
    // 验证数据是否正确
    checkIdentifyCode(val) {
      // 不区分大小写
      if (!val || val.toLocaleUpperCase() !== this.tempIdentifyCode.toLocaleUpperCase()) {
        return false;
      }
      return true;
    },
    // 获取验证码
    getTempIdentifyCode() {
      this.tempIdentifyCode = this.getIdentifyCode();
    },
    // 用来生成随机整数
    getRandom(min, max) {
      let minNum = Number(min);
      let maxNum = Number(max);
      // 确保 maxNum 始终大于 minNum
      if (minNum > maxNum) {
        const temp = minNum;
        minNum = maxNum;
        maxNum = temp;
      }
      return Math.floor(Math.random() * (maxNum - minNum) + minNum);
    },
    // 获取随机验证码
    getIdentifyCode() {
      const codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let identifyCode = '';
      for (let i = 0; i < 4; i += 1) {
        const ran = this.getRandom(0, 62);
        identifyCode += codeStr.charAt(ran);
      }
      return identifyCode;
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      const r = this.randomNum(min, max);
      const g = this.randomNum(min, max);
      const b = this.randomNum(min, max);
      return `rgb(${r},${g},${b})`;
    },
    // 绘制图片
    drawPic() {
      const canvas = document.getElementById('s-canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'bottom';
      // 绘制背景
      ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax);
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 绘制文字
      for (let i = 0; i < this.tempIdentifyCode.length; i += 1) {
        this.drawText(ctx, this.tempIdentifyCode[i], i);
      }
      // this.drawLine(ctx);
      this.drawDot(ctx);
    },
    // 绘制文字
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
      ctx.font = `${this.randomNum(this.fontSizeMin, this.fontSizeMax)}px SimHei`;
      const x = (i + 1) * (this.contentWidth / (this.tempIdentifyCode.length + 1));
      const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
      const deg = this.randomNum(-45, 45);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    },
    // 绘制干扰线
    drawLine(ctx) {
      for (let i = 0; i < 3; i += 1) {
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
        ctx.beginPath();
        ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
        ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
        ctx.stroke();
      }
    },
    // 绘制干扰点
    drawDot(ctx) {
      for (let i = 0; i < 30; i += 1) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    },
  },
  watch: {
    tempIdentifyCode() {
      this.drawPic();
    },
  },
  mounted() {
    this.drawPic();
  },
};
</script>
