<template>
  <div class="commodity-main">
    <el-card class="box-card header" shadow="hover">
      <div slot="header" class="clearfix">
        <span>搜索部分</span>
      </div>
      <el-row :gutter="20" class="title-input">
        <el-col :span="6">
          <el-select v-model="search.kindId" placeholder="请选择分类">
                <el-option
                v-for="item in classificationList"
                :key="item.id"
                :label="item.ctitle"
                :value="item.id">
                </el-option>
            </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="col-btn">
          <el-button size="small" type="primary" @click="doSearch">查询</el-button>
          <el-button size="small" type="primary" @click="doReset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 内容 -->
    <el-card class="box-card center" shadow="never">
      <el-button type="primary" @click="goAdd">添加</el-button>
      <el-table :data="commodityList" v-loading="loading" border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="gname" label="名称" width="100"></el-table-column>
        <el-table-column prop="descr" label="描述" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="brandId" label="品牌id" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="colorIds" label="颜色id" width="80"></el-table-column>
        <el-table-column prop="coverImg" label="图片" width="180" >
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" width="160" height="120" />
          </template>
        </el-table-column>
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
    <Detail ref="detail" :brandList="brandList" :classificationList="classificationList" :dictionariessList="dictionariessList"></Detail>
  </div>
</template>

<script>
import commodityApi from "@/api/commodity/commodity";
import dictionariessApi from "@/api/dictionariess/dictionariess";
import classificationApi from '@/api/classifications/classifications'
import brandApi from "@/api/brand/brand";
import pageMixin from "@/mixins/pageMixin"
import MyPagination from "@/components/common/pagination"
// 没有default 就得用{}代替
import { resetData } from "@/utils/index";
import Detail from './details/index';
import Url from '@/api/url'
import _ from "lodash";
export default {
  name: "Brand",
  components:{
    MyPagination,
    Detail
  },
  mixins:[pageMixin],
  data() {
    return {
      Url,
      loading: false,
      // 商品数据
      commodityList: [],
      // 分类列表
      classificationList:[],
      // 字典列表
      dictionariessList:[],
      // 品牌列表
      brandList: [],
      search: {},
      // regionDataPlus,
    };
  },
  methods: {
    // page页
    handlePageChange() {
      this.getCommodityList()
    },
    // 查询
    doSearch() {
      resetData(this, "page");
      this.getCommodityList();
    },
      // 重置
    doReset(){
      this.search = {};
      this.getCommodityList();
    },
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
    // 获取品牌id
    getBrandList() {
        brandApi.getBrandList()
        .then(({data}) => {
          this.brandList = data.list;
          console.log(this.brandList,"品牌");
        });
    },
    // 获取字典颜色
    getDictionariessList() {
        dictionariessApi.getDictionariessList()
        .then(({data}) => {
          //es6的解构
          this.dictionariessList = data.list;
          console.log(this.dictionariessList,"颜色")
        });
    },
    // 获取分类
    getClassificationList(){
        classificationApi.getClassificationsList()
        .then(res =>{
          this.classificationList = res.data;
          console.log(res.data,"分类");
        })
    },
    // 获取商品数据
    getCommodityList() {
        this.loading = true;
        var params = {
          start: this.page.start,
          limit: this.page.limit,
          ...this.search //es6  展开运算符 合并属性
        };
        // 对为null和不存在的属性进行过滤
        params = _.pickBy(params, item => item);
        // 合并搜索条件
        commodityApi.getCommodityList(params)
        .then(({data}) => {
          //es6的解构
          this.commodityList = data.list;
          this.page.count = data.totalRow,
          this.page.limit= data.pageSize,
          
          console.log(data,"商品");
          this.loading = false;
        });
    }
    
  
  },
      created() {
        this.getCommodityList();
        this.getClassificationList();
        this.getBrandList();
        this.getDictionariessList();
      }
};
</script>

<style lang='scss' scoped>
.commodity-main {
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