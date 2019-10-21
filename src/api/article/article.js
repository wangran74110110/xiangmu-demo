// 使用自己封装的api
import request from '@/api/request'
function getArticleList(data) {
   return request({
    url: '/api/leju/admin/article/list',
    method: 'get',
    data
  })
}

function articleDetail(data) {
    return request({
     url: '/api/leju/admin/article/detail',
     method: 'get',
     data
   })
 }

 function articleDel(data) {
  return request({
   url: '/api/leju/admin/article/del',
   method: 'get',
   data
 })
}

function articleSaveOrUpdate(data) {
    return request({
     url: '/api/leju/admin/article/saveOrUpdate',
     method: 'post',
     data
   })
  }

export default{
    getArticleList,
    articleDetail,
    articleDel,
    articleSaveOrUpdate
}