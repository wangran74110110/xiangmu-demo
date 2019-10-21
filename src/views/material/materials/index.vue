<template>
  <div class="material">
    <!-- 上传 -->
    <el-upload
      class="upload-demo"
      :action="Url.imgUpUrl"
      :on-success="handleSucee"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <!-- 图片显示 -->
    <el-row class="demo-image" :gutter="30">
      <el-col :span="6" class="block" v-for="item in imgList" :key="item.id">
        <el-card class="demonstration" shadow="never">
          <el-image
            class="imgs"
            style="width: 200px; height: 200px"
            :src="Url.host+'/'+item.fullPath"
          ></el-image>
          <div style="padding: 10px;" class="box">
            <p class="addTime">
              {{item.addTime}}
            </p>
            <div class="bottom clearfix">
              <el-button type="info" @click="look(item.id)" round class="look" size="mini">查看</el-button>
              <el-button type="danger" @click="del(item.id)" round class="del" size="mini">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
      <!-- 图片显示 -->
    <el-dialog class="dialog" :visible.sync="centerDialogVisible" width="50%" center>
        <img class="bigImgs" :src="url" alt="">
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <pagination :page="page" @page-change="handlePageChange"></pagination>
  </div>
</template>

<script>
import materialApi from "@/api/material/material";
import Url from "@/api/url";
import pageMixin from "@/mixins/pageMixin";
import pagination from "@/components/common/pagination";
export default {
  name: "Material",
  mixins: [pageMixin],
  components: {
    pagination
  },
  data() {
    return {
      Url,
      imgList: [],
      // 显示大图
      url:'',
      centerDialogVisible:false,
      page: {
        limit: 8,
        sizes: [8, 16, 20]
      }
    };
  },
  methods: {
    gitImgList() {
      materialApi
        .getImageList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(({ data }) => {
          // this.imgList = data.list.forEach(ele => {
          //   ele.show = false;
          // });
            this.imgList = data.list;
            console.log(data);
            this.page.start = data.pageNumber,
            this.page.count = data.totalRow,
            this.page.limit = data.pageSize
        });
    },
    // 上传成功后刷新列表
    handleSucee() {
      this.gitImgList();
    },
    // 点击分页更新列表
    handlePageChange() {
      // console.log("111")
      this.gitImgList();
    },
    // 查看
    look(id) {
      this.centerDialogVisible = true;
      var obj = this.imgList.find(ele => ele.id == id);
      this.url = this.Url.host + "/" + obj.fullPath;
    },
    
    // 删除
    del(id) {
      materialApi
        .delImage({
          id
        })
        .then(res => {
          if (res.code == "S") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.gitImgList();
          }
        });
    }
  },
  created() {
    this.gitImgList();
  }
};
</script>

<style lang='scss' scoped>
::v-deep .el-card__body {
  padding: 0;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .box,
  .imgs {
    margin: 0 auto;
    .inputs {
      display: flex;
    }
    .heightTitle{
      display: block;
      height: 30px;
    }
  }
  .clearfix {
    .el-button {
      margin-left: 0;
    }
  }
}
.dialog{
  .bigImgs{
    width: 600px;
    height: 600px;
  }
}
</style>