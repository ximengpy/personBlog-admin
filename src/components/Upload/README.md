# 上传图片组件

使用示例

```html
<template>
  <div>
    <!-- 默认使用方式 -->
    <UploadImage :src="formData.pageAdImg" @change="onUpload" />

    <!-- 自定义提示、尺寸等参数，更多配置请看组件代码 -->
    <UploadImage uploadId="banner" :src="formData.banner" @change="onUpload" tip="尺寸规格：750px * 391px" width="375px" height="195px" :maxSize="10" :autoHeight="false" />
  </div>
</template>

<script>
import UploadImage from '@/components/Upload/Image.vue';

export default {
  components: {
    UploadImage
  },
  data() {
    return {
      formData: {
        logo: '',
        banner: ''
      }
    }
  },
  methods: {
    /**
     * 监听上传图片
     * @param {{ id: ''|'banner', src: string }} info
     */
    onUpload(info) {
      // info.id 就是组件绑定的 uploadId，多个上传组件的时候用来区分用，可传可不传
      this.formData[info.id] = info.src;
    }
  }
}
</script>
```

# 上传文件包裹组件

使用示例

```html
<template>
  <div>
    <!-- 默认使用方式 -->
    <UploadWrap @change="onUpload">
      <el-button>点击上传</el-button>
    </UploadWrap>
  </div>
</template>

<script>
import UploadWrap from '@/components/Upload/Wrap.vue';

export default {
  components: {
    UploadWrap
  },
  methods: {
    /**
     * 监听文件上传
     * @param {{ id: string, result: string }} info info.id 就是组件绑定的 uploadId，多个上传组件的时候用来区分用，可传可不传
     */
    onUpload(info) {
      console.log(info.result);
    }
  }
}
</script>
```