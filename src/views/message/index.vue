<template>
  <el-table
      :data="messageList"
      style="width: 100%">
    <el-table-column
        label="用户名"
        width="180"
        prop="user.user"
    >
    </el-table-column>
    <el-table-column
        label="内容"
        width="180"
    >
      <template slot-scope="scope">
        <span>{{getText(scope.row.content)}}</span>
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
  import {getMessageList, deleteMessage} from '../../api/table';

  export default {
    name: "MessageDelete",
    data() {
      return {
        messageList: []
      }
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm('即将删除该用户及其留言等数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            deleteMessage(row._id)
              .then(res => {
                this.messageList.splice(index, 1);
                this.$message({
                  message: "删除成功",
                  type: 'success',
                  duration: 2000
                });
              })
              .catch(() => {
                this.$message({
                  message: "删除失败",
                  type: 'error',
                  duration: 2000
                });
              })
          })
          .catch(() => {

          })

      },
      getMessageList() {
        getMessageList().then(res => {
          this.messageList = JSON.parse(JSON.stringify(res.data));
        });
      },
      getText(content) {
        let div = document.createElement("div");
        div.innerHTML = content;
        return div.innerText
      }
    },
    mounted() {
      this.getMessageList();
    }
  }
</script>


<style scoped>

</style>
