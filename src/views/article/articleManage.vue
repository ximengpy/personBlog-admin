<template>
  <div class="article-manage">
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
        <template slot-scope="{row}">
          {{formatDate(row.date)}}
        </template>
      </el-table-column>
      <el-table-column
          label="分类"
          width="180"
          prop="type"
      >
      </el-table-column>
      <el-table-column
          label="分类"
          width="180"
      >
      <template slot-scope="{row}">
        {{row.tag.tag}}
      </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm
            confirm-button-text='好的'
            cancel-button-text='不用了'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除当前文章？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button  size="mini" type="danger" slot="reference" >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination class="mgt_30" :pageInfo ="pages" @change="getData" />
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
        :close-on-click-modal="false"
    >
      <ArticleEdit
          :default-data="defaultData"
          @success="success"
      ></ArticleEdit>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from "@/components/Pagination/index.vue";
  import {
    getArticleList,
    deleteArticle,
    updateArticle} from '../../api/table'
  import {usePageInfo} from '@/utils/hooks'
  import { formatDate } from '@/utils/index'
  import ArticleEdit from "./components/articleEdit";
  export default {
    name: "ArticleManage",
    components:{Pagination,ArticleEdit},
    data(){
      return {
        articleList : [],
        pages: usePageInfo(),
        loading: false,
        //编辑
        dialogVisible : false,
        defaultData : null,

        //
        PaginationIndex : 1,
        PaginationSize : 5
      }
    },
    methods:{
      formatDate,
      handleEdit(index,row){
        this.defaultData = row;
        this.dialogVisible = true;
      },
      async handleDelete(index,row){
        const res = await deleteArticle(row._id)
        if( !res.code) {
          this.$message.success('删除成功')
          this.getData()
        }
  
      },
      handleClose(){
        this.dialogVisible = false;
      },
      success() {
        this.getData()
        this.handleClose()
      },



      async getData(){
      this.loading = true
      const res =await getArticleList(this.pages)
      this.loading = false
      if( !res.code) {
        this.articleList = res.data.list || []
        this.pages.total = res.data.total
      }
      }
    },
    mounted() {
      //请求文章信息
      this.getData();
    }
  }

</script>

<style scoped lang="scss">
.article-manage {
  padding: 20px;
  width: 60%;
  .mgt_30 {
    margin-top: 30px;
  }
}
</style>
