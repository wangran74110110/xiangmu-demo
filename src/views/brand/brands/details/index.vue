<template>
  <div class="classifications-detail">
    <el-dialog title :visible.sync="dialog" width="50%" height="40%">
      <h1>{{title}}</h1>
      <h3>商品信息</h3>
      <hr />
      <el-form :inline="true" :model="detailsList" ref="detailsList" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="中文名称" prop="ctitle">
              <el-input v-model="detailsList.cname" placeholder="请输入中文名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="英文名称" prop="etitle">
              <el-input v-model="detailsList.ename" placeholder="请输入英文名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="描述信息" prop="ctitle">
              <el-input v-model="detailsList.descr" placeholder="描述信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="封面图片" prop="coverImg">
              <el-row :gutter="20">
            <el-col :span="8">
              <el-button @click="openMat" type="primary" size="small">选择图片</el-button>
            </el-col>
            <el-col :span="8">
              <img class="imgs" style="width:200px;height:200px;object-fit:contain" :src="detailsList.coverImg" alt />
            </el-col>
          </el-row>
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
import brandApi from "@/api/brand/brand";
import Url from '@/api/url'
import { resetData } from "@/utils/index";
import Materials from '@/views/brand/brands/imgs/index';
export default {
  components: {
    Materials,
  },
  props:{
    
  },
  name: "Brand-detail",
  data() {
    return {
      dialog: false,
      Url,
      title: "",
      detailsList:{},
      search: {},
    };
  },
  methods: {
    // 商品编辑确定
    submit(){
      this.$refs.detailsList.validate((valid) => {
          if (valid) {
            brandApi.brandSaveOrUpdate({
              ...this.detailsList
            })
            .then(res =>{
              if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
                this.$parent.getBrandList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
          })
       }else{
         brandApi.brandSaveOrUpdate(

         ).then(res =>{
           if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
                this.$parent.getBrandList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
         })
       }
      })
   },
   cancelSubmit() {
      this.$confirm("尚未保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.dialog = false
        this.$nextTick(() =>{
          resetData(this,'');
        })
      });
    },
      // 打开弹窗
    openDialog(id) {
      this.dialog = true;
      if (id) {
        this.title = "编辑";
        brandApi.brandDetail({
          id
        }).then(res =>{
          // console.log(res,);
          this.detailsList = res.data;
        })
      } else {
        this.title = "新增";
          resetData(this,'detailsList');
      }
    },
    // 图片
    handleSucee(url){
      // console.log(url.data,"66666");
      this.detailsList.img ="/" + url.data;
    },
    // 删除图片
    removeCover() {
      this.detailsList.img = "";
    },
    // 删除列表
    removeList(id){
          brandApi.brandDel({
            id
          })
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
        });
        this.$parent.getBrandList();
    },
    // 打开素材库
     openMat(){
    this.$refs.mat.openDialog()
  },
  // 传进来的图片
  handleCoverSel(url){
    this.detailsList.coverImg = url;
    console.log(url)
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