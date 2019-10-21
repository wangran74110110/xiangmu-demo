// 使用自己封装的api
import request from '@/api/request'
function getSkuList(data) {
   return request({
    url: '/api/leju/admin/sku/list',
    method: 'get',
    data
  })
}

function skuDetail(data) {
    return request({
     url: '/api/leju/admin/sku/detail',
     method: 'get',
     data
   })
 }

 function skuDel(data) {
  return request({
   url: '/api/leju/admin/sku/del',
   method: 'get',
   data
 })
}

function skuSaveOrUpdate(data) {
    return request({
     url: '/api/leju/admin/sku/saveOrUpdate',
     method: 'post',
     data
   })
  }

  function skuColorsByGoodsId(data) {
    return request({
     url: '/api/leju/admin/sku/colorsByGoodsId',
     method: 'post',
     data
   })
  }
export default{
    getSkuList,
    skuDetail,
    skuDel,
    skuSaveOrUpdate,
    skuColorsByGoodsId
}