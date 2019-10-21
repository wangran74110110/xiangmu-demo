import request from '@/api/request'

//执行登录
function getImageList(data){
  return request ({
    url: '/api/leju/admin/material/list',
    method:'post',
    data
  })
}

function delImage(data){
  return request ({
    url: '/api/leju/admin/material/del',
    method:'get',
    data
  })
}

function upImgs(data){
  return request ({
    url: '/api/leju/admin/material/upload',
    method:'post',
    data
  })
}

export default {
  getImageList,
  delImage,
  upImgs
}