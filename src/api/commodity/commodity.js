// 使用自己封装的api
import request from '@/api/request'
function getCommodityList(data) {
   return request({
    url: '/api/leju/admin/goods/list',
    method: 'get',
    data
  })
}

function commodityDel(data) {
    return request({
     url: '/api/leju/admin/goods/del',
     method: 'get',
     data
   })
 }

 function commodityDetail(data) {
  return request({
   url: '/api/leju/admin/goods/detail',
   method: 'get',
   data
 })
}

function commoditySaveOrUpdate(data) {
    return request({
     url: '/api/leju/admin/goods/saveOrUpdate',
     method: 'post',
     data
   })
  }

export default{
    getCommodityList,
    commodityDel,
    commodityDetail,
    commoditySaveOrUpdate
}