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
  import UploadImage from '@/components/Upload/Image.vue';
  import config from '@/utils/config'
  export default {
    name: "ArticleEdit",
    components:{ UploadImage },
    data(){
      return {
        file: '',
        config,
        form : {
          title : this.defaultData.title||"",
          img: this.defaultData.img || [],
          intro: this.defaultData.intro || '',
          link: this.defaultData.link || '',
          account: this.defaultData.account|| [],
          act1: this.defaultData.act1 || '',
          act2: this.defaultData.act2 || '',
          pwd1: this.defaultData.pwd1 || '',
          pwd2: this.defaultData.pwd2 || ''

        },
        rules : {
          title : [{ required: true, message: '请输入title' }],
          img:  [{ required: true, message: '请输入title' }],
          intro: [{ required: true, message: '请输入title' }],
          link:  [{ required: true, message: '请输入title' }],
        }
      }
    },
    props : ["defaultData"],
    watch:{
      defaultData(val){
        this.form = {
          title : val.title,
          img: val.img,
          intro: val.intro ,
          link: val.link ,
          account: val.account,
          act1: val.act1 ,
          act2: val.act2 ,
          pwd1: val.pwd1,
          pwd2: val.pwd2
        }
      }
    },
    created() {
    },
    methods:{
      toAdd() {
        this.form.account.push({
          act:'',
          pwd: '',
          info: ''
        })
      },
      onUpload(data) {
        this.form.img = [data.src]
        this.file = data.src ? config.apiUrl + data.src: data.src
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
