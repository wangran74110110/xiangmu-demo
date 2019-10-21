<template>
  <div class="article-detail">
    <el-dialog title :visible.sync="dialog" width="50%" height="40%" @close="handleClose">
      <h1>{{title}}</h1>
      <h3>文章信息</h3>
      <hr />
      <el-form :inline="true" :model="detailsList" ref="detailsList" class="demo-form-inline">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="detailsList.title" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input v-model="detailsList.author" placeholder="请输入作者"></el-input>
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
            <el-form-item label="分类" prop="kindIds">
              <el-select v-model="detailsList.kindIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in classificationList"
                  :key="item.id"
                  :label="item.ctitle"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="颜色1" prop="color1">
              <el-color-picker v-model="detailsList.color1" active-change :predefine="predefineColors"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="颜色2" prop="color2">
              <el-color-picker v-model="detailsList.color2" active-change :predefine="predefineColors"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="颜色3" prop="color3">
              <el-color-picker v-model="detailsList.color3" active-change :predefine="predefineColors"></el-color-picker>
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
import articleApi from "@/api/article/article";
import classificationApi from '@/api/classifications/classifications'
import Url from '@/api/url'
import { resetData } from "@/utils/index";
import MarkdownEditor from "@/components/MarkdownEditor";
import Materials from '@/views/article/imgs/index';
export default {
  components: {
    Materials,
    MarkdownEditor,
  },
  props:{
    classificationList:Array
  },
  name: "Brand-detail",
  data() {
    return {
      dialog: false,
      Url,
      title: "",
      detailsList:{},
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
    // 编辑确定
    submit(){
      this.$refs.detailsList.validate((valid) => {
        this.detailsList.content1 = this.getMd().val;
          this.detailsList.content2 = this.getMd().html;
          console.log(this.detailsList.coverImg,"0909")
          if (valid) {
            articleApi.articleSaveOrUpdate({
              ...this.detailsList
            })
            .then(res =>{
              if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
              this.$parent.getArticleList();
              this.dialog = false
            } else {
              this.$message.error("保存失败!");
            }
          })
       }else{
         this.detailsList.content1 = this.getMd().val;
          this.detailsList.content2 = this.getMd().html;
         articleApi.articleSaveOrUpdate({
           ...this.detailsList
         }).then(res =>{
           if (res.code == "S") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //通过父类刷新列表
                this.$parent.getArticleList();
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
    openDialog(articleId) {
      this.dialog = true;
      if (articleId) {
        this.title = "编辑";
        articleApi.articleDetail({
          id:articleId
        }).then(res =>{
          console.log(res.data,"7777");
          this.detailsList = res.data;
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
    removeList(articleId){
          articleApi.articleDel({
            id:articleId
          })
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
        });
        this.$parent.getArticleList();
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