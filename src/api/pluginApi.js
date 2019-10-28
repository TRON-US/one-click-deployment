import request from '@/utils/request'


// dbEngine setting
export function dbEngineApi(params) {
  return request({
    url: '/dbEngine',
    method: 'post',
    data: params
  })
}

// /transaction setting
export function transactionApi(params) {
  return request({
    url: '/transaction',
    method: 'post',
    data: params
  })
}

// /transaction setting
export function consensusApi(params) {
  return request({
    url: '/consensus',
    method: 'post',
    data: params
  })
}
