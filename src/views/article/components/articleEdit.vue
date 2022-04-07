<template>
  <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
  >
    <el-form-item label="分类" prop="type">
      <el-select class="w_300" v-model="form.type" placeholder="请选择分类">
        <el-option label="原创" value="原创"></el-option>
        <el-option label="转载" value="转载"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input class="w_300" v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="标签"  prop="tag">
      <el-select class="w_300" v-model="form.tag" placeholder="请选择标签">
        <el-option v-for="(item, index) in tagList" :key="index" :label="item.tag" :value="item._id"></el-option>
  
      </el-select>
    </el-form-item>
    <el-form-item label="内容"  prop="content">
      <RichText v-model="form.content" ref="richText"></RichText>
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

  import RichText from "../../../components/blog/RichText";
  import Upload from "../../../components/blog/Upload";
  import { getArticleTag, postArticle } from '@/api/table'
  import { modifyData } from '@/utils/index'
  export default {
    name: "ArticleEdit",
    components:{Upload,RichText},
    props : ["defaultData"],
    data(){
      return {
        tagList: [],
        form : {
          title : "",
          type : "",
          tag : "",
          content : "",
        },
        rules : {
          type : [{ required: true, message: '请选择type' }],
          title : [{ required: true, message: '请输入title' }],
          tag : [{ required: true, message: '请输入tag' }],
          content : {
            validator : (rule,value,cb)=>{
              (function(){
                cb()
              }).call(this.$refs.richText);
            },
            required : true
          },
        }
      }
    },
    watch:{
      defaultData(val){
        modifyData(this.form, val)
      }
    },
    mounted() {
      modifyData(this.form, this.defaultData)
      this._getArticleTag()
    },
    methods:{

      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.sendArticle()
          } else {
            return false;
          }
        });
      },
      //发表发送请求
      async sendArticle() {
        const res = await postArticle(this.form)
        if(!res.code) {
          this.$message.success('发表成功')
          this.$emit('success')
        }
      },
      //获取tag
      async _getArticleTag() {
        const res = await getArticleTag()
        if(!res.code) {
          this.tagList = res.data
        }
      }
    },
  }
</script>

<style scoped>
.w_300 {
  width: 300px;
}
</style>
