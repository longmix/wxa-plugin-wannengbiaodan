/**
 * 这个文件中函数用于被插件内部调用，原理见： 
 * https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html
 * “导出到插件”
 * 
 * 特别提示：这里的函数是被引用到插件里面去执行的，而不是在你的小程序中执行的，
 * 所以这里的代码权限等同于小程序插件的代码权限，例如不能跳转网页
 * 
 * @param {} url 
 * @param {*} var_list 
 * @param {*} ret_page 
 */


import abotapi from 'abotapi.js';


module.exports = {
  link_item_click: function(url){

    console.log('bottom_icon_click===>>>', url);

    console.log('被点击的网址：' + url);
    
    //因为不能跳转网页，所以这里只能复制到剪切板
    wx.setClipboardData({
      data: url,
    });

    wx.showToast({
      title: '网址已复制',
    })


    //abotapi.call_h5browser_or_other_goto_url(url);
    wx.navigateTo({
      url: 'plugin-private://wx00d1e2843c3b3f77/pages/h5browser/h5browser?url=' + encodeURIComponent(url),
      success:function(res){
        console.log('success===>>>>', res);
      },
      fail:function(res){
        console.log('fail===>>>', res);
      },
      complete:function(res){
        console.log('complete====>>>>', res);
      }
    })


  },
  copy_text:function(text){
    console.log('copy_text===>>>', text);
		//console.log('bottom_icon_click===>>>', url);

    console.log('准备复制的内容：' + text);
    
    wx.setClipboardData({
      data: text,
    })


  },

  greeting(str) {
    return 'Greetings from miniprogram!===>>>'+str;
  },

  


}
