<template>
  <div class="dictionariess-detail">
    <el-dialog title :visible.sync="dialog" width="50%" height="50%">
      <h1>{{title}}</h1>
      <h3>商品信息</h3>
      <hr />
      <el-form :inline="true" :model="dictionariessDetail" ref="dictionariessDetail" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="内容" prop="text">
              <el-color-picker v-model="dictionariessDetail.text" active-change :predefine="predefineColors"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="描述" prop="descr">
              <el-input v-model="dictionariessDetail.descr" placeholder="请输入描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="父类id" prop="pId">
              <el-input v-model="dictionariessDetail.pId" placeholder="请输入父类id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="类型/属性分类" prop="type">
              <el-input v-model="dictionariessDetail.type" placeholder="请输入类型"></el-input>
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
import dictionariessApi from "@/api/dictionariess/dictionariess";
import { resetData } from "@/utils/index";
export default {
  props:{
    
  },
  name: "dictionariess-detail",
  data() {
    return {
      dialog: false,
      title: "",
      dictionariessDetail:{},
      search: {},
      color:null,
       predefineColors: [
          '#E11212',
          '#141212',
          '#1733D5',
        ]
    };
  },
  methods: {
    // 商品编辑确定
    submit(){
      this.$refs.dictionariessDetail.validate((valid) => {
          if (valid) {
            dictionariessApi.dictionariessSaveOrUpdate({
              ...this.dictionariessDetail
            })
            .then(res =>{
              if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
              this.$parent.getDictionariessList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
          })
       }else{
         var list = this.dictionariessDetail.filter(item => !item.id)
         dictionariessApi.dictionariessSaveOrUpdate({
              ...list
         })
         .then(res =>{
           if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
              this.$parent.getDictionariessList();
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
        resetData(this,'dictionariessDetail');
      });
    },
      // 打开弹窗
    openDialog(id) {
      this.dialog = true;
      if (id) {
        this.title = "编辑";
        //   根据id获取学员id
        dictionariessApi.dictionariessDetail({
            id
          })
          .then(res => {
            this.dictionariessDetail = res.data;
            // this.color = res.data.text
          });
      } else {
        this.title = "新增";
        // this.color = null;
        resetData(this,'dictionariessDetail');
      }
    },
    // 删除列表
    removeList(id){
          dictionariessApi.dictionariessDel({
            id
          })
            this.$message({
              message: '删除成功!',
              type: 'success'
        });
        this.$parent.getDictionariessList()
    },
  },
  created() {
    
  }
};
</script>

<style lang='scss' scoped>
.dictionariess-detail {
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
  .el-row{
     display: flex;
    align-items: center;
    .el-form-item__content{
      width: 100%;
    }
  }
}
h2{
  margin-top: 20px;
}
h3{
  margin-top: 20px;
}
</style>