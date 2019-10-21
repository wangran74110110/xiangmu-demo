// 使用自己封装的api
import request from '@/api/request'
function getClassificationsList(data) {
   return request({
    url: '/api/leju/admin/kind/list',
    method: 'get',
    data
  })
}

function classificationsDel(data) {
    return request({
     url: '/api/leju/admin/kind/del',
     method: 'get',
     data
   })
 }

function classificationsSaveOrUpdate(data) {
    return request({
     url: '/api/leju/admin/kind/saveOrUpdate',
     method: 'post',
     data
   })
  }

export default{
    getClassificationsList,
    classificationsDel,
    classificationsSaveOrUpdate
}