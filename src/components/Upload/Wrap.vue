<template>
  <div class="upload-wrap" v-loading="showLoading && loading">
    <slot></slot>
    <div class="upload-input" @click="checkUpload"></div>
    <input style="display:none" type="file" ref="uploadinput" :accept="accept.toString()" @click="beforeUpload" @change="onUpload()">
  </div>
</template>
<script>
/**
 * 上传包裹组件，用法看`README.md`
 */
import { uploadImg } from '@/api/common';
export default {
  name: 'UploadWrap',
  props: {
    //上传图片点击设置埋点数据
    point: {
      type: String,
      default: ''
    },
    /** 组件`id`,多个组件使用时区分用 */
    uploadId: {
      type: String | Number,
      default: '',
    },
    /** 上传文件类型 */
    accept: {
      type: Array,
      default: () => ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
    },
    /** 上传文件最大体积（M） */
    maxSize: {
      type: Number,
      default: 5,
    },
    /**
     * 上传文件名
     * @example
     * ```js
     * const formData = new FormData();
     * formData.append(this.uploadFileName, file);
     * ```
     */
    uploadFileName: {
      type: String,
      default: 'file',
    },
    /** 是否展示加载遮罩效果 */
    showLoading: {
      type: Boolean,
      default: true,
    },
    /** 上传时接口函数，默认是上传图片`uploadImg`，传参方式参考`uploadImg` */
    uploadFn: {
      type: Function,
      default: null
    },
    // 上传前的判断
    beforeUploadFn: {
      type: Function,
      default: null,
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    // 上传前检验
    beforeUpload(){
      if(this.point && this.point.length) {
        this.$setPoint(this.point)
      }
      if (this.beforeUploadFn && typeof this.beforeUploadFn === "function"){
        return this.beforeUploadFn()
      }
      return true
    },
    // 模拟上传
    checkUpload(){
      if(!this.beforeUpload()) return
      this.$refs.uploadinput.click();
    },
    /** 上传图片 */
    async onUpload() { 
      if (this.loading) return;
      /**
       * @type {Array<string>}
       */
      const accept = this.accept;
      /**
       * @type {HTMLInputElement}
       */
      const input = this.$refs.uploadinput;

      /**
       * @type {File}
       */
      const file = input.files[0];
      // console.log('上传图片文件 >>', file);

      // 用完就清空
      input.value = '';

      // 判断文件类型
      if (accept.indexOf(file.type) < 0) {
        this.$message.warning('文件格式只支持：' + accept.toString());
        return;
      }

      // 判断大小
      if (file.size > this.maxSize * 1024 * 1024) {
        this.$message.warning(`上传的文件不能大于 ${this.maxSize}M`);
        return;
      }

      const formData = new FormData();

      formData.append(this.uploadFileName, file);

      this.loading = true;
      const uploadFunction = this.uploadFn || uploadImg;
      const res = await uploadFunction(formData);
      this.loading = false;
      // console.log('上传文件 >>', res);
      if (res.code === 1) {
        const result = res.data;
        this.$emit('change', {
          id: this.uploadId,
          result: result,
        });
      } else {
        this.$message.error('上传失败');
      }
    },
    // ==================================== 二、数据请求类 ================================
    // ==================================== 三、跳转类 ====================================
    // ==================================== 四、小工具类 ==================================
  },
};
</script>
<style lang="scss">
.upload-wrap {
  width: 100%;
  position: relative;
  z-index: 1;
  .upload-input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 10;
    cursor: pointer;
  }
}
</style>