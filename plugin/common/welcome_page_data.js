/**
 * 
 * @param {*} params 
 * 
 * data {sellerid, token, formid, form_type}
 * callback 
 * 
 * 在插件显示之前，先获取网络请求的数据
 * 
 */

var abotapi = require('abotapi.js');





const get_welcome_page_data = (params) => {

  //获取调用组件的参数

  
  var request_params_data = params.data;

  console.log('组件内函数 get_welcome_tag 的参数：', request_params_data);

  //options.scene = '2176@0@cms';
  //options.data_url = 'https://yanyubao.tseo.cn/openapi/Jianghanyinhua/get_order_scan_report_page?orderno=20170123172139NJVOPW&messageid=2968';


  //===== 检查参数 ====
  if(!request_params_data.platform){
    request_params_data.platform = 'cms';
  }

  if(!request_params_data.parentid){
    request_params_data.parentid = 0;
  }


  if (!request_params_data.sellerid) {
    wx.showToast({
      title: '缺少sellerid参数',
    })
    return;

  }


  //===== 如果是请求指定数据源，则直接处理 ====
  if(request_params_data.data_url){
    //2、 指定网址
    

    __get_img_from_data_url(request_params_data, params.callback);

    return;

  }


  //===== 如果是通过带参二维码进来的，则先分解 ====

  if (request_params_data.scene != null) {
    //1、指定渠道
    var url_value = decodeURIComponent(request_params_data.scene);

    console.log(url_value);

    var url_data = url_value.split('@');
    console.log(url_data);

    if (url_data.length < 3) {
      wx.showToast({
        title: '带参数不对',
      })
    
      return;
    }

    request_params_data.imgid = url_data[0];
    request_params_data.parentid = url_data[1];
    request_params_data.platform = url_data[2];

  
  }


  //===== 检查参数 ====
  if(!request_params_data.platform){
    request_params_data.platform = 'cms';
  }

  if(!request_params_data.parentid){
    request_params_data.parentid = 0;
  }


  if (!request_params_data.sellerid) {
    wx.showToast({
      title: '缺少sellerid参数',
    })
    return;

  }


  

  if(!request_params_data.imgid){
    wx.showModal({
      title: '处理失败',
      content: '缺少参数imgid或者data_url',
    });


    return;
  }



  if(request_params_data.platform == 'cms'){
      
    __get_img_from_weiduke(request_params_data, params.callback);
  }
  else if(request_params_data.platform == 'pic'){
    __get_pic_from_yanyubao(request_params_data, params.callback);
    //this.setData({platform:'pic'});
  }
  else{
    wx.showToast({
      title: '未识别内容类型',
    })
  }


};


module.exports = {
  get_welcome_page_data: get_welcome_page_data,

};









/**
 * 从weiduke获取图片
 */
function __get_img_from_weiduke(request_params_data, welcome_page_callback){

  var url = abotapi.globalData.http_weiduke_server + 'index.php/openapi/ArticleImgApi/article_detail.shtml';
  var data = {
    token: request_params_data.token,
    id: request_params_data.imgid,
    //openid: request_params_data.openid
  };

  if(request_params_data.openid){
    data.openid = request_params_data.openid;
  }
  if(request_params_data.userid){
    data.userid = request_params_data.userid;
  }
  if(request_params_data.checkstr){
    data.checkstr = request_params_data.checkstr;
  }


  var cbSuccess = function (res) {

      var callback_data = res.data;

      callback_data.request_params_data = request_params_data;

      if(request_params_data.sellerid){
        __get_seller_setting(request_params_data.sellerid, callback_data, welcome_page_callback);
      }
      else{

        typeof welcome_page_callback == "function" && welcome_page_callback(callback_data);

      }

      

      
  };
  var cbError = function (res) {
    wx.hideLoading();

  };
  abotapi.httpPost(url, data, cbSuccess, cbError);
    //========End====================
}

function __get_pic_from_yanyubao(request_params_data, welcome_page_callback){

  var url = abotapi.globalData.http_server + 'index.php/openapi/SupplierData/get_swiper_pic_url';
  var data = {
    sellerid: request_params_data.sellerid,
    swiperid:request_params_data.imgid
  };

  //如果调用组件传参的时候传了userinfo
  if(request_params_data.openid){
    data.openid = request_params_data.openid;
  }
  if(request_params_data.userid){
    data.userid = request_params_data.userid;
  }
  if(request_params_data.checkstr){
    data.checkstr = request_params_data.checkstr;
  }

  var cbSuccess = function (res) {

    var callback_data = res.data;

    callback_data.request_params_data = request_params_data;

    if(request_params_data.sellerid){
      __get_seller_setting(request_params_data.sellerid, callback_data, welcome_page_callback);
    }
    else{

      typeof welcome_page_callback == "function" && welcome_page_callback(callback_data);

    }

  };
  var cbError = function (res) {
    wx.hideLoading();

  };
  abotapi.httpPost(url, data, cbSuccess, cbError);





}

function __get_img_from_data_url(request_params_data, welcome_page_callback){

  console.log('准备请求网址数据：', decodeURIComponent(request_params_data.data_url));

  var post_data = {};

  if(request_params_data.parentid){
    post_data.parentid = request_params_data.parentid;
  }

  if(request_params_data.openid){
    post_data.openid = request_params_data.openid;
  }
  if(request_params_data.userid){
    post_data.userid = request_params_data.userid;
  }
  if(request_params_data.checkstr){
    post_data.checkstr = request_params_data.checkstr;
  }


  var cbSuccess = function (res) {

    var callback_data = res.data;

    callback_data.request_params_data = request_params_data;

    if(request_params_data.sellerid){
      __get_seller_setting(request_params_data.sellerid, callback_data, welcome_page_callback);
    }
    else{

      typeof welcome_page_callback == "function" && welcome_page_callback(callback_data);

    }

  };

  var cbError = function (res) {
    wx.hideLoading();

  };

  abotapi.httpPost(decodeURIComponent(request_params_data.data_url), post_data, cbSuccess, cbError);
    //========End====================
}

function __get_seller_setting(sellerid, callback_data, welcome_page_callback){
  // 获取 welcome_page_bottom_icon_list
  abotapi.set_sellerid(sellerid);

  abotapi.set_option_list_str(function(option_list){

    //将全局的商城设置变量传出去
    callback_data.shop_option_list = option_list;

    //针对个别的设置，也做出判断

    if(option_list.welcome_page_bottom_icon_list){
      console.log('获取到底部导航菜单====>>>>', option_list.welcome_page_bottom_icon_list);
      callback_data.welcome_page_bottom_icon_list = option_list.welcome_page_bottom_icon_list;
    }

    //设置底部导航的颜色风格
    if(option_list.welcome_page_bottom_icon_style && (option_list.welcome_page_bottom_icon_style == 1)){
      //底色变成文字的颜色，文字变成底色
      callback_data.welcome_page_bottom_bg_color = option_list.wxa_shop_nav_font_color;
      callback_data.welcome_page_bottom_font_color = option_list.wxa_shop_nav_bg_color;

    }
    else{
      callback_data.welcome_page_bottom_bg_color = option_list.wxa_shop_nav_bg_color;
      callback_data.welcome_page_bottom_font_color = option_list.wxa_shop_nav_font_color;

    }


    //获取页面标题颜色
    if (option_list && option_list.wxa_shop_nav_font_color && option_list.wxa_shop_nav_bg_color) {
      callback_data.wxa_shop_nav_bg_color = option_list.wxa_shop_nav_bg_color;
      callback_data.wxa_shop_nav_font_color = option_list.wxa_shop_nav_font_color;
    }

    typeof welcome_page_callback == "function" && welcome_page_callback(callback_data);

  });


}