<template>
  <el-table
      :data="diaryList"
      style="width: 100%">
    <el-table-column
        label="时间"
        width="180"
        prop="date"
    >
    </el-table-column>
    <el-table-column
        label="内容"
        width="300"
        prop="txt"
    >
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <img v-if="scope.row.img" :src="scope.row.img" height="50" alt="">
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getDiary,deleteDiary} from "@/api/table";

  export default {
    name: "DiaryManage",
    data() {
      return {
        diaryList: []
      }
    },
    methods:{
      handleDelete(index,row){
        deleteDiary(row._id)
          .then(()=>{
            this.getList();
          })
      },

      getList(){
        getDiary().then(res => {
          this.diaryList = res.data;
        })
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style scoped>

</style>
