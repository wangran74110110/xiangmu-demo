<template>
  <div class="material-main">
    <el-dialog
        title="选择素材"
        :visible.sync="dialogs"
        width="60%"
        @close="handleClose"
        append-to-body>
        <div class="content">
      <div class="card">
        <div slot="header">
          <el-upload class="btn-upload" :action="Url.imgUpUrl" :on-success="handleSucee">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div>
            <el-input v-model="selImgUrl" placeholder=""></el-input>
          <!-- <el-button @click='handleCopy(selImgUrl,$event)'>copy</el-button>-->
          </div> 
        </div>
        <MyPagination :page="page" @page-change = "handSuc"></MyPagination>
        <el-row :gutter="30">
          <el-col class="img-block-fk" :span="6" v-for="item in imgList" :key="item.id">
            <el-card @click.native="sel(item.id,Url.host+'/'+item.dir+'/'+item.fileName)" class="img-card" :class="{'selected':item.id == selId}" shadow="hover">
              <el-image
                style="width: 90%; height: 150px"
                :src="Url.host+'/'+item.dir+'/'+item.fileName"
                fit="contain"
              ></el-image>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>    
        <span slot="footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleSel">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import materialApi from "@/api/material/material";
import MyPagination from "@/components/common/pagination";
import pageMixin from "@/mixins/pageMixin";
import Url from "@/api/url";
import _ from "lodash";
import { resetData,resetVmData } from "@/utils/index";
// import clip from '@/utils/clipboard' 
export default {
  name: "ArticleMaterial",
  mixins: [pageMixin],
  components: {
    MyPagination
  },
  data() {
    return {
      dialogs: false,
      Url,
      search: {},
      imgList: {},
      editId: "", //标识哪个被编辑
      page: {
        limit: 12,
        sizes: [12, 24]
      },
      selId:'',
      selImgUrl:'',
    };
  },
  created() {
  },
  methods: {
    openDialog(){
        this.dialogs = true;
        this.getImgList();
    },
    getImgList() {
      var params = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      };
      params = _.pickBy(params, item => item);
      // console.log(this.search);
      // console.log(params);

      materialApi.getImageList(params).then(({data}) => {
        this.imgList = data.list;
        console.log(data,"img");
        this.page.start = data.pageNumber;
        this.page.limit = data.pageSize;
        this.page.count = data.totalRow;
      });
    },
    handleSucee(url) {
      console.log(url,"444");
      //成功后刷新列表
      this.getImgList();
    },
    // 刷新page
    handSuc(){
      this.getImgList()
    },
    doSearch() {
      resetData(this, "page");
      this.getImgList();
    },
    doResetSearch() {
      resetData(this, "search");
      this.getImgList();
    },
    handleClose(){
         //重置所有表单
        resetVmData(this);
        this.dialogs = false;
    },
    handleSel(){
        var url = this.selImgUrl;
        this.$emit('handle-cover-sel',url);
        this.handleClose();
    },
    // handleCopy(v,event){
    //     clip(v, event);
    // },
    sel(id,url){
        this.selId = this.selId == id?'':id;
        console.log(this.selId,"id");
        // 如果选中了才有
        if(this.selId){
            this.selImgUrl = url;
        }else{
            this.selImgUrl = '';
        }
    }
    
  }
};
</script>
<style lang="css">
     .img-block-fk{
            position: relative;
      }
        .img-block-fk .selected::after{
            position: absolute;
            left: 0;
            top: 0;
            content: '√';
            display: block;
            font-size: 30px;
            color: #67C23A;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 200px;
            background-color: rgba(0,0,0,.4);
        }
</style>

<style lang='scss' scoped>
.material-main {
  .card {
    margin: 30px;
    box-sizing: border-box;
    ::v-deep .el-card__body {
      text-align: center;
    }
  }
  .content {
    .img-block {
      margin: 20px auto;
      height: 400px;
      }
      
      .tool-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .title {
          font-size: 14px;
          color: #333;
          &.unnamed {
            color: #909399;
          }
        }
        .size {
          font-size: 12px;
          color: #333;
        }
      }
    }
  
}
</style>
