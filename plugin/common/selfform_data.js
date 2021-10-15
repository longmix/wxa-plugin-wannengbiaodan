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

const get_selfform_data = (params) => {

  var request_params_data = params.data;

  console.log('组件内函数 get_selfform_data 的参数：', request_params_data);


  //根据 sellerid  form_token formid  form_type，发起请求，获取表单的字段列表，
  //并保存到localstorage，然后返回这个storage 的 key


  if (!request_params_data.sellerid) {
    wx.showToast({
      title: '缺少sellerid参数',
    })
    return;

  }

  console.log('当前sellerid====>>>>' + request_params_data.sellerid);


  //===========================================
  if (request_params_data.form_type == 1) {


    console.log('开始调用  get_input_list_form_type_1');

    get_input_list_form_type_1(request_params_data, params.callback);

  }
  //===========================================

  //===========================================
  else if (request_params_data.form_type == 2) {

    console.log('formtype=====22');

    if (!request_params_data.formid) {
      wx.showModal({
        title: '错误提示',
        content: '缺少参数：表单主键！',
      })

      return;

    }

    if (!request_params_data.form_token) {
      wx.showModal({
        title: '错误提示',
        content: '缺少参数：项目标识！',
      })

      return;
    }

    console.log('开始调用  get_input_list_form_type_2');

    get_input_list_form_type_2('selfform', 
        request_params_data,
        params.callback);
  }
  //===========================================

  //===========================================
  else if (request_params_data.form_type == 3) {

    if (!request_params_data.formid) {
      wx.showModal({
        title: '错误，缺少参数！',
        content: '错误，缺少参数！',
      })


    }

    if (!request_params_data.form_token) {
      wx.showModal({
        title: '错误，缺少参数！',
        content: '错误，缺少参数！',
      })

      

      return;
    }

    console.log('开始调用  get_input_list_form_type_2 添加参数 img_classify');

    get_input_list_form_type_2('img_classify', 
        request_params_data, 
        params.callback);
  }
  //===========================================

  //setData({ current_option: options });



};



module.exports = {
  get_selfform_data: get_selfform_data,

};




/**
 *获取扩展属性 
  */
function get_input_list_form_type_1(request_params_data, get_input_list_callback){
  console.log('进入  get_input_list_form_type_1');

  var post_data = {
    sellerid: request_params_data.sellerid,
    //userid: userid,
  };

  if(request_params_data.userid){
    post_data.userid = request_params_data.userid;
  }
  if(request_params_data.checkstr){
    post_data.checkstr = request_params_data.checkstr;
  }


  
  // http://192.168.0.88/yanyubao_server/index.php/openapi/SupplierData/supplier_input_list

  abotapi.abotRequest({
    url: abotapi.globalData.http_server + 'openapi/SupplierData/supplier_input_list',
    data: post_data,
    success: function (res) {


      var callback_data = res.data;

      callback_data.request_params_data = request_params_data;

      if(request_params_data.sellerid){
        __get_seller_setting(request_params_data.sellerid, callback_data, get_input_list_callback);
      }
      else{
        typeof get_input_list_callback == "function" && get_input_list_callback(callback_data);
      }
      
      
      
    },
    fail:function(){
    }

  });
}

/**
 *获取会员扩展属性 
  */
function get_input_list_form_type_2 (form_type_str, request_params_data, get_input_list_callback) {
  
  console.log('进入  get_input_list_form_type_2====');


  var post_data = {
    formid: request_params_data.formid,
    token: request_params_data.form_token,
    selfform_type: form_type_str, //'selfform',
  };

  if(request_params_data.openid){
    post_data.openid = request_params_data.openid;
  }



  //http://192.168.0.88/yanyubao_server/index.php/openapi/SupplierData/supplier_input_list

  
  abotapi.abotRequest({
    url: abotapi.globalData.http_weiduke_server + 'index.php/openapi/SelfformData/get_selfform_option',
    method: 'post',
    data: post_data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {


      console.log('resssssss',res);

      var callback_data = res.data;

      callback_data.request_params_data = request_params_data;

      if(request_params_data.sellerid){
        __get_seller_setting(request_params_data.sellerid, callback_data, get_input_list_callback);
      }
      else{
        typeof get_input_list_callback == "function" && get_input_list_callback(callback_data);
      }
      
      

      
    },
    fail:function(){

    }
  });
}


function __get_seller_setting(sellerid, callback_data, welcome_page_callback){
  // 获取 welcome_page_bottom_icon_list
  abotapi.set_sellerid(sellerid);

  abotapi.set_option_list_str(function(option_list){

    //将全局的商城设置变量传出去
    callback_data.shop_option_list = option_list;

    //针对个别的设置，也做出判断

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

