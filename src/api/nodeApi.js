import request from '@/utils/request'

export function addNodeApi(params) {
  return request({
    url: '/addNode',
    method: 'get',
    params
  })
}
