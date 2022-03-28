<template>
  <div>
    <el-table
        :data="articleList"
        style="width: 100%">
      <el-table-column
          label="标题"
          width="180"
          prop="title"
      >
      </el-table-column>
      <el-table-column
          label="时间"
          width="180"
          prop="date"
      >
      </el-table-column>
      <el-table-column
          label="分类"
          width="180"
          prop="type"
      >
      </el-table-column>
      <el-table-column
          label="标签"
          width="180"
          prop="tag"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
        :close-on-click-modal="false"
    >
      <ArticleEdit
          @handleSubmit="handleSubmit"
          :default-data="defaultData"
      ></ArticleEdit>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from "../../components/blog/pagination";
  import {
    getArticleInfo,
    getArticle,
    deleteArticle,
    updateArticle} from '../../api/table'
  import ArticleEdit from "./components/articleEdit";
  export default {
    name: "ArticleManage",
    components:{Pagination,ArticleEdit},
    data(){
      return {
        articleList : [],

        //分页
        total:0,

        //编辑
        dialogVisible : false,
        defaultData : null,

        //
        PaginationIndex : 1,
        PaginationSize : 5
      }
    },
    methods:{
      handleEdit(index,row){
        this.dialogVisible = true;
        this.defaultData = row;
      },
      handleDelete(index,row){
        deleteArticle(row._id).then(res=>{
          if (res.data.code === 0) {
            this.$message({
              message: "删除成功",
              type: 'success',
              duration : 2000
            });
            this.articleList.splice(index,1);
          }
        }).catch(()=>{
          this.$message({
            message: "删除失败",
            type: 'error',
            duration : 2000
          });
        })
      },

      handleSubmit(data){
        updateArticle(this.defaultData._id,data)
          .then(res=>{
            if (res.data.code === 0) {
              this.$message({
                message: "更新成功",
                type: 'success',
                duration : 2000
              });
              setTimeout(()=>{
                this.changeArticleList();
                this.handleClose();
              },1000)
            }else{
              this.$message({
                message: "更新失败",
                type: 'error',
                duration : 2000
              });
            }
          })
          .catch(()=>{
            this.$message({
              message: "更新失败",
              type: 'error',
              duration : 2000
            });
          });
      },
      handleClose(){
        this.dialogVisible = false;
      },

      changeArticleList(){
        getArticle()
          .then(res=>{
            this.articleList = res.data;
          });
      },

      changeArticleInfoTotal(){
        getArticleInfo()
          .then(res=>{
            this.total = res.data?res.data.num:0;
          });
      }
    },
    mounted() {
      //请求文章信息
      this.changeArticleInfoTotal();

      //请求初始文章
      this.changeArticleList();
    }
  }

</script>

<style scoped>

</style>
