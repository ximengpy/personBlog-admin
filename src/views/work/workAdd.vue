<template>
  <div class="common">
    <work-edit
        @handleSubmit="handleSubmit"
        v-loading.fullscreen.lock="fullscreenLoading"
        :default-data="{}"
    ></work-edit>
  </div>
</template>

<script>
  import {postWork} from "../../api/table";
  import WorkEdit from "./components/workEdit";
// import WorkEdit from './components/workEdit.vue';

  export default {
    name: "WorkAdd",
    components:{WorkEdit},
    data(){
      return {
        fullscreenLoading : false
      }
    },
    methods:{
      handleSubmit(data){
        console.log(data)
        this.fullscreenLoading = true;
        postWork(data).then(res=>{
          this.$message({
            message: "上传成功",
            type: 'success',
            duration : 2000
          });
          // setTimeout(()=>{
          //   this.fullscreenLoading = false;
          //   window.location.reload();
          // },1000)
        }).catch(()=>{
          this.$message({
            message: "上传失败",
            type: 'error',
            duration : 2000
          });
        })
      }
    },

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
.common {
  padding: 40px;
  width: 80%;
}
</style>
