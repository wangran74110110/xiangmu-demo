<template>
  <div class="commodity-detail">
    <el-dialog title :visible.sync="dialog" width="80%" height="90%">
      <h1>{{title}}</h1>
      <h3>商品信息</h3>
      <hr />
      <el-form :inline="true" :model="detailList" ref="detailList" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="商品名称" prop="gname">
              <el-input v-model="detailList.gname" placeholder="请输入商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品描述" prop="descr">
              <el-input v-model="detailList.descr" placeholder="请输入商品描述"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原产地" prop="pOriginCity">
              <el-input v-model="detailList.pOriginCity" placeholder="请输入原产地"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="24">
            <el-col :span="8">
            <el-form-item label="分类" prop="kinds">
              <el-select v-model="kinds" multiple placeholder="请选择">
                <el-option
                  v-for="item in classificationList"
                  :key="item.id"
                  :label="item.ctitle"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="颜色">
              <el-select v-model="colors" multiple placeholder="请选择">
                <el-option
                  v-for="item in dictionariessList"
                  :key="item.id"
                  :label="item.descr"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌">
              <el-select v-model="detailList.brandId" placeholder="请选择">
                <el-option
                  v-for="item in brandList"
                  :key="item.id"
                  :label="item.cname"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
         <el-col :span="12">
            <el-form-item label="图片">
               <el-col :span="8">
                <el-button @click="openMat" type="primary" size="small">选择图片</el-button>
              </el-col>
            <el-col :span="8">
              <img class="imgs" style="width:200px;height:200px;object-fit:contain" :src="detailList.coverImg" alt />
            </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="24">
            <el-col :span="8">
            <el-form-item label="进价" prop="priceIn">
              <el-input v-model="detailList.priceIn" placeholder="请输入进价"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="售价" prop="priceOut">
              <el-input v-model="detailList.priceOut" placeholder="请输入售价"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前价格" prop="priceNow">
              <el-input v-model="detailList.priceNow" placeholder="请输入当前价格"></el-input>
            </el-form-item>
          </el-col>
       </el-row>
        <el-form-item style="display:block">
          <el-button @click="cancelSubmit">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
      <Materials ref="mat" @handle-cover-sel="handleCoverSel"></Materials>
    </el-dialog>
  </div>
</template>

<script>
import commodityApi from "@/api/commodity/commodity";
import Materials from '@/views/commodity/commoditys/imgs/index';
import { resetData } from "@/utils/index";
import Url from '@/api/url'
export default {
  props:{
    // 分类
    classificationList:Array,
    // 字典
    dictionariessList:Array,
    // 品牌
    brandList:Array,
  },
  components:{
    Materials
  },
  name: "commodity-detail",
  data() {
    return {
      dialog: false,
      Url,
      kinds:[],  //分类
      colors:[],  //颜色
      title: "",
      detailList:{},
      newList:{},
      search: {},
    };
  },
  methods: {
    // 商品编辑确定
    submit(){
      var kindIds = [];
      kindIds = this.kinds;
      console.log(kindIds,"ks")
      var colorIds = [];
      colorIds = this.colors;
      // console.log(this.newList,"new")
      delete this.detailList.colors;
      delete this.detailList.kinds;
      delete this.detailList.brand;
      this.detailList.kindIds = kindIds;
      this.detailList.colorIds = colorIds;
      console.log(this.detailList,"new")
      this.$refs.detailList.validate((valid) => {
          if (valid) {
            commodityApi.commoditySaveOrUpdate({
              ...this.detailList
              })
            .then(res =>{
              if (res.code == true) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.$parent.getCommodityList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
          })
       }else{
         this.detailList.filter(item => !item.id)
         commodityApi.commoditySaveOrUpdate({
           ...this.detailList
         }).then(res =>{
              if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.$parent.getCommodityList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
          })
        }
      })
   },
  //  编辑取消
   cancelSubmit() {
      this.$confirm("尚未保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.dialog = false
      });
    },
      // 打开弹窗
    openDialog(id) {
      this.dialog = true;
      this.kinds = [];
      this.colors = [];
      if (id) {
        this.title = "编辑";
        commodityApi.commodityDetail({
            id
          })
          .then(res => {
            // console.log(res,"333");
            this.detailList = res.data;
            this.detailList.kinds.filter(item => {
                 var k = item.kindId;
                 this.kinds.push(k)
            });
            console.log(this.detailList.colors,"color")
            this.detailList.colors.filter(item => {
                 var c = item.id;
                 this.colors.push(c)
            });
          });
      } else {
        this.title = "新增";
        resetData(this,'detailList');
      }
    },
    // 打开素材库
     openMat(){
    this.$refs.mat.openDialog()
  },
  // 传进来的图片
  handleCoverSel(url){
    // console.log(this.detailList,"43434")
    this.detailList.coverImg = url;
    console.log(url,"333")
   },
    // handleSucee(url){
    //   console.log(url.data,"66666");
    //   this.detailList.coverImg ="/" + url.data;
    // },
    // 删除列表
    removeList(id){
          commodityApi.commodityDel({
            id
          }).then(res =>{
                this.$message({
                  message: '删除成功',
                  type: 'success'
            });
          })
        this.$parent.getCommodityList();
    },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
.commodity-detail {
  width: 80%;
  height: 90%;
  .cost-button-group {
    float: right;
    margin-right: 20px;
    .el-button {
      margin: 0 30px;
      color: orange;
    }
  }
  .form .form-card {
    border: none;
  }
}
h2{
  margin-top: 20px;
}
h3{
  margin-top: 20px;
}
</style>