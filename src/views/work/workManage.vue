<template>
  <div>
    <el-table
        :data="workList"
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
          prop="createTime"
      >
      </el-table-column>
      <el-table-column
          label="介绍"
          width="180"
          prop="intro"
      >
      </el-table-column>
      <el-table-column
          label="链接"
          width="180"
          prop="link"
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
      <work-edit
          @handleSubmit="handleSubmit"
          :default-data="defaultData"
      ></work-edit>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from "../../components/blog/pagination";
  import {
    getWork,
    deleteWork,
    updateWork} from '../../api/table'
  import workEdit from "./components/workEdit";
  export default {
    name: "WorkManage",
    components:{Pagination,workEdit},
    data(){
      return {
        workList : [],

        //分页
        total:0,

        //编辑
        dialogVisible : false,
        defaultData : {},

        //
        PaginationIndex : 1,
        PaginationSize : 5
      }
    },
    inject: ['reload'],
    methods:{
      handleEdit(index,row){
        this.defaultData = row;
        // console.log(this.defaultData)
        this.dialogVisible = true;
      },
      handleDelete(index,row){
        deleteWork(row._id).then(res=>{
          if (res.code === 0) {
            this.$message({
              message: "删除成功",
              type: 'success',
              duration : 2000
            });
            this.workList.splice(index,1);
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
        updateWork(this.defaultData._id,data)
          .then(res=>{
            console.log(res)
            if (res.code === 0) {
              this.$message({
                message: "更新成功",
                type: 'success',
                duration : 2000
              });
              this.reload()
              // setTimeout(()=>{
              //   this.changeworkList();
              //   this.handleClose();
              // },1000)
            }else{
              this.$message({
                message: "更新失败",
                type: 'error',
                duration : 2000
              });
            }
          })
          .catch(()=>{
            // this.$message({
            //   message: "更新失败",
            //   type: 'error',
            //   duration : 2000
            // });
          });
      },
      handleClose(){
        this.dialogVisible = false;
      },

      changeworkList(){
        getWork()
          .then(res=>{
            this.workList = res.data;
          });
      },
    },
    mounted() {

      //请求初始文章
      this.changeworkList();
    }
  }

</script>

<style scoped>

</style>
