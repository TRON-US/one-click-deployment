import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
import en from './en-US'
import zh from './zh-CN'
Vue.use(VueI18n)

const messages = {
  'en-US': en,
  'zh-CN': zh
}

let curBrowserLang = navigator.language || navigator.userLanguage;
let curLanAbbreviation = curBrowserLang.substr(0, 2);
var languageAry = ['zh-CN', 'en-US'];
if (languageAry.indexOf(curLanAbbreviation) < 0) {
  curLanAbbreviation = 'en-US';
}
console.log(curLanAbbreviation)
const i18n = new VueI18n({
  locale: curLanAbbreviation, // 设置默认语言
  messages
})
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n
