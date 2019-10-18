import request from '@/utils/request'

export function branchSave(params) {
  return request({
    url: '/savebranch',
    method: 'get',
    params
  })
}
