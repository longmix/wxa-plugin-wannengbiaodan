/**
 * 这个文件中函数用于被插件内部调用，原理见： 
 * https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html
 * “导出到插件”
 * 
 * @param {} url 
 * @param {*} var_list 
 * @param {*} ret_page 
 */


 import abotapi from 'abotapi.js';


module.exports = {
  link_item_click: abotapi.call_h5browser_or_other_goto_url,

  greeting(str) {
    return 'Greetings from miniprogram!===>>>'+str;
  },

  


}
