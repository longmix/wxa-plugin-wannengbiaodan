// miniprogram/pages/show_welcome_page/show_welcome_page.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		platform:'cms',

		//分享转发使用
		current_title : '',	
		current_params_str:'',
		wxa_share_img:'',

		//网络请求的表单数据
		callback_data:'',
		//是否显示表单数据
		show_welcome_page_tag:0

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		console.log('welcome welcome welcome ====>>', options);


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


		if(!options.platform){
			options.platform = this.data.platform;
		}



		
		

		var welcome_data_params = {
            data:{
              sellerid:options.sellerid,
              scene:options.scene,
              data_url : options.data_url,
			  			platform : options.platform,
							imgid: options.imgid,
							parentid: options.parentid,
							platform: options.platform
            }, 
            callback:this.welcome_page_callback};	

		//通过插件中的函数调用
		var my_plugin = requirePlugin('yyb_selfform_plugin');
		my_plugin.get_welcome_page_data(welcome_data_params);

	},

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
      title: '' + this.data.current_title,
			//path: share_url,
			imageUrl: this.data.wxa_share_img,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }

  },
  onShareTimeline: function () {

    return {
      title: this.data.current_title,
      query: this.data.current_params_str,
      imageUrl:this.data.wxa_share_img
    }
  },
  onAddToFavorites: function () {
    return this.onShareTimeline();
	},

	welcome_page_callback:function(callback_data){

		console.log('页面收到data中的回调数据 welcome_page_callback====>>>>', callback_data);
  
		if(callback_data.code != 1){
			console.log('数据状态码不对');
			return;
		}

		var callback_data_str = JSON.stringify(callback_data);


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

		//显示组件到界面
		this.setData({
		  callback_data:callback_data_str,
		  show_welcome_page_tag : 1
		});

		//渲染其他数据：标题
		if(callback_data.data.title){
			this.setData({
				current_title: callback_data.data.title
			});

			wx.setNavigationBarTitle({
				title: this.data.current_title,
			})

		}

		//渲染其他数据：分享的图片
		if(this.data.platform == 'cms'){
			this.setData({
				wxa_share_img: callback_data.data.pic
			});
		}
		else if(this.data.platform == 'pic'){
			this.setData({
				wxa_share_img: callback_data.data.image
			});
		}

		console.log('current_title ===>>>', this.data.current_title);
		console.log('wxa_share_img ===>>>', this.data.wxa_share_img);
		console.log('current_params_str ===>>>', this.data.current_params_str);

	},
	
	bottom_icon_click: function(e){
		console.log('bottom_icon_click===>>>', e);
		//console.log('bottom_icon_click===>>>', url);


		var url = e.detail.url;

		console.log('被点击的网址：' + url);



	}
	



})