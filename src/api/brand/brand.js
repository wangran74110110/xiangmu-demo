// 使用自己封装的api
import request from '@/api/request'
function getBrandList(data) {
   return request({
    url: '/api/leju/admin/brand/list',
    method: 'get',
    data
  })
}

function brandDetail(data) {
    return request({
     url: '/api/leju/admin/brand/detail',
     method: 'get',
     data
   })
 }

 function brandDel(data) {
  return request({
   url: '/api/leju/admin/brand/del',
   method: 'get',
   data
 })
}

function brandSaveOrUpdate(data) {
    return request({
     url: '/api/leju/admin/brand/saveOrUpdate',
     method: 'post',
     data
   })
  }

export default{
    getBrandList,
    brandDetail,
    brandDel,
    brandSaveOrUpdate
}