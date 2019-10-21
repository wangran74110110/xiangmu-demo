<template>
  <div class="classifications-detail">
    <el-dialog title :visible.sync="dialog" width="50%" height="40%">
      <h1>{{title}}</h1>
      <h3>商品信息</h3>
      <hr />
      <el-form :inline="true" :model="copyList" ref="copyList" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="中文名称" prop="ctitle">
              <el-input v-model="copyList.ctitle" placeholder="请输入中文名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="英文名称" prop="etitle">
              <el-input v-model="copyList.etitle" placeholder="请输入英文名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="封面图片" prop="img">
              <el-row :gutter="20">
            <el-col :span="8">
              <!-- <el-button @click="openMat(0)" type="primary" size="small">选择图片</el-button> -->
              <el-upload
                class="upload-demo"
                :action="Url.imgUpUrl"
                list-type="picture-card"
                :on-success="handleSucee"
              >
                <el-button size="small" type="primary">选择图片</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-col>
            <el-col :span="8">
              <img class="imgs" style="width:200px;height:200px;object-fit:contain" :src="Url.host + copyList.img" alt />
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
    </el-dialog>
  </div>
</template>

<script>
import classificationsApi from "@/api/classifications/classifications";
import Url from '@/api/url'
import { resetData } from "@/utils/index";
export default {
  props:{
    classificationsList:Array
  },
  name: "classifications-detail",
  data() {
    return {
      dialog: false,
      Url,
      title: "",
      // classificationsList:[],
      copyList:{},
      // classificationsDetail:{},
      search: {},
    };
  },
  methods: {
    // 商品编辑确定
    submit(){
      this.$refs.copyList.validate((valid) => {
          if (valid) {
            console.log(this.copyList.img ,"3333");
            classificationsApi.classificationsSaveOrUpdate({
              ...this.copyList
            })
            .then(res =>{
              if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
                this.$parent.getClassificationsList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
          })
       }else{
         var items = this.copyList.filter(item => !item.id);
         classificationsApi.classificationsSaveOrUpdate({
           ...items
         }).then(res =>{
           if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
                this.$parent.getclassificationsList();
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
        this.$nextTick(() =>{
          resetData(this,'copyList');
        })
      });
    },
      // 打开弹窗
    openDialog(id) {
      this.dialog = true;
      if (id) {
        this.title = "编辑";
        this.copyList = this.classificationsList.find(item => item.id == id);
      } else {
        this.title = "新增";
          resetData(this,'copyList');
      }
    },
    // 图片
    handleSucee(url){
      // console.log(url.data,"66666");
      this.copyList.img ="/" + url.data;
    },
    // 删除图片
    removeCover() {
      this.copyList.img = "";
    },
    // 删除列表
    removeList(id){
          classificationsApi.classificationsDel({
            id
          })
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
        });
        this.$parent.getClassificationsList();
    },
  },
  created() {
    
  }
};
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