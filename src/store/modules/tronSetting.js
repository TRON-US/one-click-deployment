import {
  originSettingApi,
  configSettingApi
} from '@/api/settingApi'


const state = {
  originSetting: {},
  configSetting: {}
}

const mutations = {
  SET_ORIGINCONFIG: (state, data) => {
    state.originSetting = data
  },
  SET_CONFIGSETTING: (state, data) => {
    state.configSetting = data
  },

}

const actions = {

  // get setting info
  getOriginConfig({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      originSettingApi().then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_ORIGINCONFIG', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getConfigSetting({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      configSettingApi().then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_CONFIGSETTING', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
