<template>
  <div class="pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.start"
          :page-sizes="page.sizes"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.count"
        ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props:{
      page:Object
  },
  data() { 
    return {

    }
  },
    methods:{
        handleSizeChange(v){
            this.page.limit = v;
            this.$emit('page-change')
        },
        handleCurrentChange(v){
            this.page.start = v;
            this.$emit('page-change')
        }
    },
    created() {
      console.log(this.page);
    },
 }
</script>

<style lang='scss' scoped>
</style>