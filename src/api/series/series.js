// 使用自己封装的api
import request from '@/api/request'
function getSeriesList(data) {
   return request({
    url: '/api/leju/admin/series/list',
    method: 'get',
    data
  })
}

// function seriesDetail(data) {
//     return request({
//      url: '/api/leju/admin/series/list',
//      method: 'get',
//      data
//    })
//  }

 function seriesDel(data) {
  return request({
   url: '/api/leju/admin/series/del',
   method: 'get',
   data
 })
}

function seriesSaveOrUpdate(data) {
    return request({
     url: '/api/leju/admin/series/saveOrUpdate',
     method: 'post',
     data
   })
  }

export default{
    getSeriesList,
    seriesDel,
    seriesSaveOrUpdate
}