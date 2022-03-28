<template>
  <el-upload
      class="avatar-uploader"
      :action="file"
      list-type="picture-card"
      :file-list="imageUrl"
      multiple
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
  >
    <i class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  import {baseFile} from '../../utils/baseUrl'
  export default {
    name: "Upload",
    props: ['imgSrc'],
    data() {
      return {
        file: '',
        imageUrl: []
      };
    },
    created() {
      // console.log(this.imgSrc)
      this.file = baseFile
      // this.file
      this.imageUrl = this.imgSrc
    },
    methods: {
      handleAvatarSuccess(res, file,arr) {

        // this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl.push({name: file.name,url: res.surface})
        this.$emit("uploadSuccess",  this.imageUrl);
        // this.imageUrl = arr.map(item => {return  item.response.surface})
      },
      beforeAvatarUpload(file) {
        const isType = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);

        if (!isType) {
          this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
        }
        return isType;
      }
    }
  }
</script>

<style scoped>

</style>
