<template>
  <div class="series-main">
    <el-card class="box-card header" shadow="hover">
      <div slot="header" class="clearfix">
        <span>搜索部分</span>
      </div>
      <el-row :gutter="20" class="title-input">
        <el-col :span="6">
          <el-input size="small" v-model="search.name" placeholder="请输入名称"></el-input>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" :offset="8" class="col-btn">
          <el-button size="small" type="primary" @click="doSearch">查询</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 内容 -->
    <el-card class="box-card center" shadow="never">
      <el-button type="primary" @click="goAdd">添加</el-button>
      <el-table :data="seriesList" v-loading="loading" border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="id" label="id" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cname" label="中文名" width="160"></el-table-column>
        <el-table-column prop="ename" label="英文名" width="160"></el-table-column>
        <el-table-column prop="descr" label="描述信息" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button type="success" @click="goEdit(scope.row.id)" size="small">编辑</el-button>
            <el-button type="danger" @click="romList(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block page">
        <my-pagination :page="page" @page-change="handlePageChange"></my-pagination>
      </div>
    </el-card>
    <!-- 由于业务逻辑复杂 可以把部分组件分离出来 -->
    <Detail ref="detail" :seriesList="seriesList"></Detail>
  </div>
</template>

<script>
import seriesApi from "@/api/series/series";
import pageMixin from "@/mixins/pageMixin"
import MyPagination from "@/components/common/pagination"
import Detail from './details/index';
// 没有default 就得用{}代替
import { resetData } from "@/utils/index";
import _ from "lodash";
export default {
  name: "series",
  components:{
    MyPagination,
    Detail
  },
  mixins:[pageMixin],
  data() {
    return {
      loading: false,
      // 学员数据
      seriesList: [],
      search: {},
      // regionDataPlus,
    };
  },
  methods: {
    // page页
    handlePageChange() {
      this.getSeriesList()
    },
    // 查询
    doSearch() {
      resetData(this, "page");
      this.getSeriesList();
    },
    // 查看
    handleClick() {},
    // 打开编辑窗口
    goEdit(id){
      this.$refs.detail.openDialog(id);
    },
    // 新增
    goAdd(){
      this.$refs.detail.openDialog();
    },
    // 删除
    romList(id){
      this.$refs.detail.removeList(id);
    },
    // 获取系列数据
    getSeriesList() {
        this.loading = true;
        var params = {
          start: this.page.start,
          limit: this.page.limit,
          ...this.search //es6  展开运算符 合并属性
        };
        // 对为null和不存在的属性进行过滤
        params = _.pickBy(params, item => item);
        // 合并搜索条件
        seriesApi.getSeriesList(params)
        .then(res => {
          //es6的解构
          this.seriesList = res.data;
          this.page.count = res.totalRow,
          this.page.limit= res.pageSize,
          
          console.log(res,"333");
          this.loading = false;
        });
    }
  },
  created() {
      this.getSeriesList();
    }
};
</script>

<style lang='scss' scoped>
.seriess-main {
  .box-card {
    margin: 0 30px;
    .title-input {
      ::v-deep .el-input__inner {
        width: 200px;
      }
    }
    .el-col {
      margin: 6px auto;
      text-align: center;
    }
    .el-date-editor {
      width: 200px;
    }
    .col-btn {
      margin-left: 33.33%;
    }
  }
}
.el-card.box-card.center {
  margin: 30px;
}
</style>