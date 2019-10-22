import request from '@/utils/request'

export function branchSaveApi(params) {
  return request({
    url: '/savebranch',
    method: 'get',
    params
  })
}

export function branchGetApi(params) {
  return request({
    url: '/getbranch',
    method: 'get',
    params
  })
}
