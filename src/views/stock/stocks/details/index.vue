<template>
  <div class="stock-detail">
    <el-dialog title :visible.sync="dialog" width="50%" height="40%" @close="handleClose">
      <h1>{{title}}</h1>
      <h3>库存信息</h3>
      <hr />
      <el-form :inline="true" :model="detailsList" ref="detailsList" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="商品">
              <el-select v-model="detailsList.goodsId" placeholder="请选择商品">
                <el-option
                  v-for="item in commodityList"
                  :key="item.id"
                  :label="item.gname"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品编号" prop="skuCode">
              <el-input v-model="detailsList.skuCode" placeholder="请输入商品编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="颜色">
              <el-select v-model="detailsList.colorId" placeholder="请选择颜色">
                <el-option
                  v-for="item in colorsList"
                  :key="item.id"
                  :label="item.descr"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
           <el-form-item label="系列">
              <el-select v-model="detailsList.seriesId" placeholder="请选择系列">
                <el-option
                  v-for="item in seriesList"
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
            <el-form-item label="价格" prop="price">
              <el-input v-model="detailsList.price" placeholder="请输入价格"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="是否推荐" prop="hot">
              <el-switch
                v-model="detailsList.hot"
                @change="changeSw"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="高度" prop="height">
              <el-input v-model="detailsList.height" placeholder="请输入高度"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="区域" prop="area">
              <el-input v-model="detailsList.area" placeholder="请输入区域"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库存数量" prop="count">
              <el-input v-model="detailsList.count" placeholder="请输入数量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="封面图片">
              <el-row :gutter="20">
            <el-col :span="18">
              <el-button @click="openMat" type="primary" size="small">选择图片</el-button>
            </el-col>
            <el-col :span="8">
              <img class="imgs" style="width:200px;height:200px;object-fit:contain" :src="detailsList.coverImg" alt />
            </el-col>
            <el-col :span="4">
              <el-button v-if="detailsList.coverImg" style="color:red" type="text" @click="removeCover">删除</el-button>
            </el-col>
          </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="editor-box">
          <MarkdownEditor ref="md"></MarkdownEditor>
        </div>
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
import stockApi from "@/api/stock/stock";
import Url from '@/api/url'
import { resetData } from "@/utils/index";
import MarkdownEditor from "@/components/MarkdownEditor";
import Materials from '@/views/stock/stocks/imgs/index';
export default {
  components: {
    Materials,
    MarkdownEditor,
  },
  props:{
    // 商品
    commodityList:Array,
    // 颜色
    colorsList:Array,
    // 系列
    seriesList:Array
  },
  name: "Brand-detail",
  data() {
    return {
      dialog: false,
      Url,
      title: "",
      detailsList:{},
      hot:'',
    };
  },
  methods: {
    // 滑块变化
    changeSw(){
      if(this.detailsList.hot == false){
        this.hot = 0;
      }else{
        this.hot = 1;
      }
    },
    // 编辑确定
    submit(){
      this.$refs.detailsList.validate((valid) => {
        this.detailsList.content1 = this.getMd().val;
          this.detailsList.content2 = this.getMd().html;
          if(this.hot == 1){
            this.detailsList.hot = 1;
          }else{
            this.detailsList.hot = 0;
          }
          if (valid) {
            stockApi.skuSaveOrUpdate({
              ...this.detailsList
            })
            .then(res =>{
              if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
              console.log(this.detailsList,"000")
              this.$parent.getStockList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
          })
       }else{
         this.detailsList.filter(item => !item.id);
         this.detailsList.content1 = this.getMd().val;
          this.detailsList.content2 = this.getMd().html;
         stockApi.skuSaveOrUpdate({
           ...this.detailsList
         }).then(res =>{
           if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
                this.$parent.getStockList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
         })
       }
      })
   },
  //  关闭弹窗
   handleClose(){
        // this.dialog = false
          resetData(this,"detailsList")
          // 清空富文本
          this.resetEditor();
      },
      // 取消按钮
   cancelSubmit() {
      this.$confirm("尚未保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.dialog = false;
        this.resetEditor();
        this.$nextTick(() =>{
          resetData(this,'');
        })
      });
    },
      // 打开弹窗
    openDialog(id,goodsId) {
      this.dialog = true;
      console.log(goodsId,"goodsId");
      if (id,goodsId) {
        this.title = "编辑";
        stockApi.skuDetail({
          goodsId:goodsId,
          id:id
        }).then(res =>{
          console.log(res.data,"7777");
          this.detailsList = res.data;
          if(res.data.hot == 1){
            this.detailsList.hot = true;
          }else{
            this.detailsList.hot = false;
          }
          this.$nextTick(() =>{
              this.setMd(this.detailsList.content1);
            })
        })
      } else {
        this.title = "新增";
          resetData(this,'detailsList');
      }
    },
    // 图片
    // handleSucee(url){
    //   console.log(url.data,"66666");
    //   this.detailsList.img ="/" + url.data;
    // },
    // 删除图片
    removeCover() {
      this.detailsList.coverImg = "";
    },
    // 删除列表
    removeList(stockId){
          stockApi.skuDel({
            id
          })
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
        });
        this.$parent.getStockList();
    },
    // 打开素材库
     openMat(){
    this.$refs.mat.openDialog()
  },
  // 传进来的图片
  handleCoverSel(url){
    this.detailsList.coverImg = url;
    console.log(this.detailsList.coverImg,"5566");
   },
  //  获取md内容
   getMd(){
          var html = this.$refs.md.getHtml();
          var val = this.$refs.md.getValue();
          return {
              html,
              val
          }
      },
      setMd(v){
          this.$refs.md.setValue(v);
      },
      // 重置文本
      resetEditor(){
        this.$refs.md.setValue('');
    },
  },
  // 打开素材库
   
    created() {
      
    }
}

</script>

<style lang='scss' scoped>
.classifications-detail {
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
  .imgs{
    margin-left: 100px;
  }
  .del{
    margin-left: 50px;
  }
}
h2{
  margin-top: 20px;
}
h3{
  margin-top: 20px;
}
</style>