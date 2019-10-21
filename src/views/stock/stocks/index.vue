<template>
  <div class="stock-main">
    <el-card class="box-card header" shadow="hover">
      <div slot="header" class="clearfix">
        <span>搜索部分</span>
      </div>
      <el-row :gutter="20" class="title-input">
        <el-select v-model="search.goodsId" placeholder="请选择商品">
          <el-option
            v-for="item in commodityList"
            :key="item.id"
            :label="item.gname"
            :value="item.id">
          </el-option>
        </el-select>
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
      <el-table :data="stockList" v-loading="loading" border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="skuCode" label="商品编号" width="120"></el-table-column>
        <el-table-column prop="price" label="价格" width="120"></el-table-column>
        <el-table-column prop="hot" label="推荐" width="120"></el-table-column>
        <el-table-column prop="count" label="库存数量" width="120"></el-table-column>
        <el-table-column prop="coverImg" label="封面图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" min-width="80" height="120" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button type="success" @click="goEdit(scope.row.id,scope.row.goodsId)" size="small">编辑</el-button>
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
    <Detail ref="detail" :commodityList="commodityList" :colorsList="colorsList" :seriesList="seriesList"></Detail>
  </div>
</template>

<script>
import stockApi from "@/api/stock/stock";
// 商品
import commodityApi from "@/api/commodity/commodity";
// 字典
import dictionariesApi from '@/api/dictionariess/dictionariess'
// 系列
import seriesApi from '@/api/series/series'
import pageMixin from "@/mixins/pageMixin"
import MyPagination from "@/components/common/pagination"
import Detail from './details/index';
// 没有default 就得用{}代替
import { resetData } from "@/utils/index";
import _ from "lodash";
export default {
  name: "Stock",
  components:{
    MyPagination,
    Detail
  },
  mixins:[pageMixin],
  data() {
    return {
      loading: false,
      // 库存数据
      stockList: [],
      // 商品
      commodityList:[],
      // 颜色
      colorsList:[],
      // 系列
      seriesList:[],
      search: {},
    };
  },
  methods: {
    // page页
    handlePageChange() {
      this.getStockList()
    },
    // 查询
    doSearch() {
      resetData(this, "page");
      this.getStockList();
    },
    // 查看
    handleClick() {},
    // 打开编辑窗口
    goEdit(id,goodsId){
      this.$refs.detail.openDialog(id,goodsId);
    },
    // 新增
    goAdd(){
      this.$refs.detail.openDialog();
    },
    // 删除
    romList(id){
      this.$refs.detail.removeList(id);
    },
    // 获取商品id
    getCommodityList(){
        commodityApi.getCommodityList()
        .then(res =>{
          this.commodityList = res.data.list;
          console.log(res.data,"商品");
        })
    },
    // 系列
    getSeriesList(){
        seriesApi.getSeriesList()
        .then(res =>{
          this.seriesList = res.data;
          console.log(res.data,"系列");
        })
    },
    // 字典/颜色
    getDictionariesList(){
        dictionariesApi.getDictionariessList()
        .then(res =>{
          this.colorsList = res.data.list;
          console.log(res.data,"颜色/字典");
        })
    },
    // 获取库存数据
    getStockList() {
        this.loading = true;
        var params = {
          start: this.page.start,
          limit: this.page.limit,
          ...this.search //es6  展开运算符 合并属性
        };
        // 对为null和不存在的属性进行过滤
        params = _.pickBy(params, item => item);
        // 合并搜索条件
        stockApi.getSkuList(params)
        .then(({data}) => {
          //es6的解构
          this.stockList = data;
          console.log(data,"库存");
          this.loading = false;
        });
    }
    
  
  },
      created() {
        this.getStockList();
        this.getCommodityList();
        this.getDictionariesList();
        this.getSeriesList();
      }
};
</script>

<style lang='scss' scoped>
.stocks-main {
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