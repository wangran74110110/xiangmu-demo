<template>
  <div class="series-detail">
    <el-dialog title :visible.sync="dialog" width="50%" height="40%">
      <h1>{{title}}</h1>
      <h3>文章信息</h3>
      <hr />
      <el-form :inline="true" :model="detailsList" ref="detailsList" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="中文名" prop="cname">
              <el-input v-model="detailsList.cname" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="英文名" prop="ename">
              <el-input v-model="detailsList.ename" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="描述信息" prop="descr">
              <el-input v-model="detailsList.descr" placeholder="请输入标题"></el-input>
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
import seriesApi from "@/api/series/series";
import Url from '@/api/url'
import { resetData } from "@/utils/index";
export default {
  components: {
  },
  props:{
    seriesList:Array
  },
  name: "Series-detail",
  data() {
    return {
      dialog: false,
      Url,
      title: "",
      detailsList:{},
      search: {}
    };
  },
  methods: {
    // 编辑确定
    submit(){
      this.$refs.detailsList.validate((valid) => {
          if (valid) {
            seriesApi.seriesSaveOrUpdate({
              ...this.detailsList
            })
            .then(res =>{
              if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
              this.$parent.getSeriesList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
          })
       }else{
         seriesApi.seriesSaveOrUpdate({
           ...this.detailsList
         }).then(res =>{
           if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
                this.$parent.getSeriesList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
         })
       }
      })
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
    openDialog(id) {
      this.dialog = true;
      if (id) {
        this.title = "编辑";
        this.detailsList = this.seriesList.find(item => item.id == id)
      } else {
        this.title = "新增";
          resetData(this,'detailsList');
      }
    },
    // 删除列表
    removeList(articleId){
          seriesApi.articleDel({
            id:articleId
          })
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
        });
        this.$parent.getArticleList();
    },
  },
   
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