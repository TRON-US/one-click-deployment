const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  originSetting: state => state.tronSetting.originSetting,
  configSetting: state => state.tronSetting.configSetting
}
export default getters
