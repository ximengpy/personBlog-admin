<template>
  <div>
    <ArticleEdit @success="success" />
  </div>
</template>

<script>
  import {postArticle} from "../../api/table";
  import ArticleEdit from "./components/articleEdit";

  export default {
    name: "ArticleAdd",
    components:{ArticleEdit},
    data(){
      return {
      }
    },
    methods: {
      success() {
        this.$router.push('/article/articleManage')
      }
    }

    // beforeRouteLeave(to,form,next){
    //   this.$confirm('此操作将不会保存已编写的文章内容, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     center: true
    //   }).then(() => {
    //     next();
    //   }).catch(() => {

    //   });
    // }
  }

</script>

<style scoped>

</style>
