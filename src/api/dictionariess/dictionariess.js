// 使用自己封装的api
import request from '@/api/request'
function getDictionariessList(data) {
   return request({
    url: '/api/leju/admin/dict/list',
    method: 'get',
    data
  })
}

function dictionariessDel(data) {
    return request({
     url: '/api/leju/admin/dict/del',
     method: 'get',
     data
   })
 }

 function dictionariessDetail(data) {
  return request({
   url: '/api/leju/admin/dict/detail',
   method: 'get',
   data
 })
}

function dictionariessSaveOrUpdate(data) {
    return request({
     url: '/api/leju/admin/dict/saveOrUpdate',
     method: 'post',
     data
   })
  }

export default{
    getDictionariessList,
    dictionariessDel,
    dictionariessDetail,
    dictionariessSaveOrUpdate
}