<template>
  <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
      class="work-form"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="介绍"  prop="intro">
      <el-input type="textarea" v-model="form.intro"></el-input>
    </el-form-item>
    <el-form-item label="链接"  prop="link">
      <el-input  v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item label="账号">
      <div class="account-info">
        <el-button type="primary" @click="toAdd">添加</el-button>
        <ul class="account-list">
          <li class="list-title">
            <span class="title-text">账号</span>
            <span class="title-text">密码</span>
          </li>
          <li
            v-for="(item, index) in form.account"
            :key="index"
            class="list-item">
            <el-input class="account-input" type="text" placeholder="请输入账号" v-model="item.act" />
            <el-input class="account-input" placeholder="请输入密码" v-model="item.pwd" />
            <el-input class="account-input" placeholder="备注" v-model="item.info" />
          </li>
        </ul>
      </div>
    </el-form-item>
    <el-form-item label="图片">
      <UploadImage :src="file" @change="onUpload" width="200px" height="100px" />

    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          @click="onSubmit('form')"
      >发表文章</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { modifyData } from '@/utils/index'
  import UploadImage from '@/components/Upload/Image.vue';
  import config from '@/utils/config'
  export default {
    name: "ArticleEdit",
    props: {
      defaultData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components:{ UploadImage },
    data(){
      return {
        file: '',
        config,
        form : {
          title :"",
          img: [],
          intro: '',
          link:  '',
          account:  [],
          act1: '',
          act2: '',
          pwd1:  '',
          pwd2:  ''

        },
        rules : {
          title : [{ required: true, message: '请输入title' }],
          img:  [{ required: true, message: '请输入title' }],
          intro: [{ required: true, message: '请输入title' }],
          link:  [{ required: true, message: '请输入title' }],
        }
      }
    },
    watch:{
      defaultData(val){
        modifyData(this.form, val)
        this.getPic(this.defaultData.img)

      }
    },
    mounted() {
        modifyData(this.form, this.defaultData)
        this.getPic(this.defaultData.img)
    },

    methods:{
      toAdd() {
        this.form.account.push({
          act:'',
          pwd: '',
          info: ''
        })
      },
      getPic(src) {
        this.file = src ? config.apiUrl + src: src
      },
      onUpload(data) {
        this.form.img = data.src
        this.getPic(data.src)
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("handleSubmit", this.form);
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">
.work-form {
  & .account-info {
    & .list-title {
      & .title-text {
        display: inline-block;
        width: 166px;
      }
    }
    & .list-item {
      display: flex;
    }
  }
}

</style>
