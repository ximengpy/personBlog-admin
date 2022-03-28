<template>
  <div class="kch-upload-image fvertical">
    <div class="kch-upload-box fcc" :style="{'width': width, 'min-height': height }" v-loading="loading">
      <template v-if="src">
        <img class="upload-image" :src="src" alt="" :style="{ 'height': autoHeight ? undefined : height }">
        <div class="upload-option fcc">
          <i class="el-icon-delete" @click="removeImg()" />
        </div>
      </template>
      <template v-else>
        <div style="font-size: 0px; line-height: 1;">
          <i class="el-icon-plus upload-icon-plus"></i>
          <p class="upload-text" v-if="text">{{ text }}</p>
        </div>
        <input class="upload-input" type="file" name="picture" ref="uploadInput" :accept="accept.toString()" @change="onUpload()">
      </template>
    </div>
    <p class="upload-tip pdl_20" v-if="tip">{{ tip }}</p>
  </div>
</template>
<script>
import { uploadImg } from '@/api/common';

/**
 * 上传图片组件
 */
export default {
  name: 'UploadImage',
  components: {},
  props: {
    /** 组件上传图片路径 */
    src: {
      type: String,
      default: '',
    },
    /** 组件`id` */
    uploadId: {
      type: [String, Number],
      default: '',
    },
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '100px',
    },
    /** 是否自动高度（针对图片） */
    autoHeight: {
      type: Boolean,
      default: true,
    },
    /** 图片上传提示 */
    tip: {
      type: [String, Number],
      default: '',
    },
    /** 上传文字 */
    text: {
      type: [String, Number],
      default: '',
    },
    /** 上传文件类型 */
    accept: {
      type: Array,
      default: () => ['image/jpg', 'image/png', 'image/jpeg', 'image/gif']
    },
    /** 上传图片最大体积（M） */
    maxSize: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      /** 加载动画 */
      loading: false,
    }
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    /** 清除当前图片 */
    removeImg() {
      this.$emit('change', {
        id: this.uploadId,
        src: '',
      });
    },
    // ==================================== 二、数据请求类 ================================
    /** 上传图片 */
    async onUpload() {
      /**
       * @type {Array<string>}
       */
      const accept = this.accept;
      /**
       * @type {HTMLInputElement}
       */
      const input = this.$refs['uploadInput'];

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

      formData.append('file', file);

      this.loading = true;
      const res = await uploadImg(formData);
      this.loading = false;
      // console.log('上传图片 >>', res);
      if (res.code === 0) {
        const result = res.surface;
        this.$emit('change', {
          id: this.uploadId,
          src: result,
        });
      } else {
        this.$message.error('上传图片失败');
      }
    },
    // ==================================== 三、跳转类 ====================================
    // ==================================== 四、小工具类 ==================================
  }
}
</script>

<style lang="scss">
@import "@/styles/theme.scss";

@mixin time() {
  transition: 0.2s all;
}
.kch-upload-image {
  width: 100%;
  .kch-upload-box {
    text-align: center;
    background: #f5f5f5;
    border: 1px dashed #dbdbdb;
    border-radius: 4px;
    position: relative;
    @include time();
    &:hover {
      border-color: $themeColor;
      .upload-option {
        opacity: 1;
      }
    }
    .upload-icon-plus {
      font-size: 24px;
      color: #666;
    }
    .upload-text {
      font-size: 14px;
      color: #666;
      line-height: 14px;
      padding-top: 8px;
    }
    .upload-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    }
    .upload-image {
      display: block;
      width: 100%;
      height: 100%;
    }
    .upload-option {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-color: rgba(0,0,0,0.5);
      opacity: 0;
      @include time();
      font-size: 22px;
      color: #fff;
      i {
        cursor: pointer;
      }
    }
  }
  .upload-tip {
    font-size: 14px;
    color: #ccc;
  }
}
</style>