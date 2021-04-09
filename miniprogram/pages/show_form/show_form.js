Page({
    
    /**
    var app = getApp();
    var WxParse = require('../../wxParse/wxParse.js');
     * 页面的初始数据
     */
    data: {

      //2021.3.9. 当前的sellerid
      current_sellerid:'',

      current_params_str:'',

      //网络请求的表单数据
      callback_data:'',
      //是否显示表单数据
      show_selfform_tag:0,

      //分享转发相关
      current_title:'',
      wxa_share_img:'',
      
  
    },
  
    /**
     * 生命周期函数--监听页面加载
     * 
     * sellerid
     * form_type
     * formid
     * submit_url
     * token
     * 
     */
    onLoad: function (options) {


      console.log('selfform=====>>>>>', options);
      

      var selfform_data_params = {
            data:{
              sellerid:options.sellerid, 
              form_token: options.form_token,
              formid : options.formid,
              form_type : options.form_type,

            }, 
            callback:this.__selfform_data_callback};


      if(options.openid){
        selfform_data_params.data.openid = options.openid;
      }

      if(options.userid){
        selfform_data_params.data.userid = options.userid;
      }
      if(options.checkstr){
        selfform_data_params.data.checkstr = options.checkstr;
      }

      //引用第三方插件的函数
      var my_plugin = requirePlugin('yyb_selfform_plugin');
      my_plugin.get_selfform_data(selfform_data_params);



      //=====分析参数=====
      if(options){
        var arr = Object.keys(options);

        var options_len = arr.length;


        if (options_len > 0){
          var params_str = '';
  
          for(var key in options){
            params_str += key+'='+options[key]+'&';
          }
          params_str = params_str.substr(0, params_str.length - 1);
  
          this.setData({
            current_params_str:params_str
          });
        }
      }
      //===== End ======

      
    },

    //=================onLoad结束==================
  
  
  
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
      return {
        title: this.data.current_title,
        path: 'pages/selfform/selfform?'+this.data.current_params_str, 
        imageUrl:this.data.wxa_share_img,
      }
  
    },
    /*朋友圈分享*/
    onShareTimeline: function () {
      
      return {
        title: this.data.current_title,
        query: this.data.current_params_str, 
        imageUrl:this.data.wxa_share_img
      }
    },
    /**加入收藏夹 */
    onAddToFavorites: function () {
      return this.onShareTimeline();
    },


    __selfform_data_callback:function(callback_data){

      console.log('页面收到data中的回调数据 welcome_page_callback====>>>>', callback_data);
  
      if(callback_data.code != 1){
        console.log('数据状态码不对');
        return;
      }

      var callback_data_str = JSON.stringify(callback_data);

      //显示组件到界面
      this.setData({
        callback_data:callback_data_str,
        show_selfform_tag : 1
      });


      //渲染其他数据：
      //渲染其他数据：标题 & 分享的图片
      if(callback_data.request_params_data.form_type == 1){
        //会员扩展属性
        this.setData({
          current_title: callback_data.shop_option_list.wxa_share_title,
          wxa_share_img: callback_data.shop_option_list.wxa_share_img
        });
      }
      else if(callback_data.request_params_data.form_type == 2){
        //万能表单
        this.setData({
          current_title: callback_data.title,
          wxa_share_img: callback_data.data.logourl
        });

      }
      else if(callback_data.request_params_data.form_type == 3){
        //CMS的文章分类
        this.setData({
          current_title: callback_data.title,
          wxa_share_img: callback_data.shop_option_list.wxa_share_img
        });

      }



      console.log('准备修改标题 setNavigationBarTitle ：===>>>'+this.data.current_title);

      wx.setNavigationBarTitle({
        title: this.data.current_title,
      })

      //头部导航的颜色
			if(callback_data.wxa_shop_nav_font_color && callback_data.wxa_shop_nav_bg_color){
				wx.setNavigationBarColor({
					frontColor: callback_data.wxa_shop_nav_font_color,
					backgroundColor: callback_data.wxa_shop_nav_bg_color,

					// animation: {
					//   duration: 40,
					//   timingFunc: 'easeIn'
					// }
				});
      }



      
    },



  })
  

    


