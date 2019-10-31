import request from '@/utils/request'

// add
export function addNote(params) {
  return request({
    url: '/nodeInfo',
    method: 'post',
    params
  })
}

// delete
export function deleteNote(params) {
  return request({
    url: '/nodeInfo',
    method: 'delete',
    params
  })
}

// edit nodeInfo
export function editNote(params) {
  return request({
    url: '/nodeInfo',
    method: 'PUT',
    params
  })
}


// node status
export function nodeInfo(params) {
  return request({
    url: '/nodeInfo',
    method: 'get',
    params
  })
}

// allNode Info
export function allNodeInfo(params) {
  return request({
    url: '/allNodeInfo',
    method: 'get',
    params
  })
}


// deployNode Info
export function deployNodeApi(params) {
  return request({
    url: '/deployNode',
    method: 'post',
    params
  })
}
