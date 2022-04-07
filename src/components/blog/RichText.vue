<template>
   <div>
        <mavon-editor
            v-model="content"
            ref="md"
            @change="change"
            style="min-height: 600px"
        />
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: "RichText",
    components: {
        mavonEditor,
    },
    data(){
      return {
        content:'', // 输入的markdown
        html:'',    // 及时转的html
        flag: false, //设置只监听一次
      }
    },
    watch: {
      value: {
        handler(val) {
          if( !this.flag) {
            console.log( 55555, val)
            this.content  =val
            this.flag = true
          }
          
        },
      }
    },

    props:["value"],
    methods: {
      change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
            this.$emit('input',this.html)
        },
    }
  }
</script>

<style scoped>
</style>
