// plugin/components/welcome_page-tag.js

var WxParse = require('../wxParse/wxParse.js');
var abotapi = require('../common/abotapi.js');

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

		callback_data:{
			type:String,
			value:''
		},

		items: {
			type: Array,
			value: [],
			observer(newVal, oldVal, changedPath) {
			  this.setData({items: newVal})
			}
		},   

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		get_default_imgid:false,

		platform:'cms',

		video_autoplay:false,
		videometa_width_height:[100, 100],
	
		current_title : '',
	
		current_params_str:'',
		wxa_share_img:'',
	
		welcome_page_bottom_bg_color:'#000',
		welcome_page_bottom_font_color:'#fff',
		welcome_page_bottom_font_size:'30rpx',
		welcome_page_bottom_icon_size:'40rpx',

		welcome_page_bottom_icon_list:null,


		//供前端传参使用
		imgid:'',
		parentid:'',
		platform:'',
		data_url:'',
		scene:''

	},

	lifetimes: {
	
	attached: function () {

	},
	moved: function () { 
		console.log('san生命周期函数');
	},
	detached: function () { 
		console.log('er生命周期函数');
	},		
	ready: function() {

		var that = this;

		var callback_data = that.properties.callback_data;
		
		console.log('组件中，ready函数======>>>>', callback_data);

		
    callback_data = JSON.parse(callback_data);
  

    that.set_welcome_page_to_wxml(that, callback_data);
		
	}
	
	
	},

	pageLifetimes: {

		// 组件所在页面的生命周期函数
		show: function () { 
			  
		},
	  },
	/**
	 * 组件的方法列表
	 */
	methods: {


		 //得到数据渲染页面
		set_welcome_page_to_wxml:function(that, callback_data){
		
			//console.log('进入回调 set_welcome_page_to_wxml', this.properties.callback_data);
			console.log('进入回调 set_welcome_page_to_wxml', callback_data);



	  
			//返回的数据不等于1 
			if (callback_data.code != 1) {
			  wx.showModal({
					title: '处理失败',
					content: '获取表单数据失败！',
				});
				
			  return;
			}

			var request_data = callback_data.request_params_data;

			if(request_data.platform){

				that.setData({
					platform:request_data.platform
				});

			}	



			//底部导航菜单
			if(callback_data.welcome_page_bottom_icon_list){

				that.setData({
					welcome_page_bottom_icon_list: callback_data.welcome_page_bottom_icon_list
				});

				//设置颜色
				if(callback_data.welcome_page_bottom_bg_color  && callback_data.welcome_page_bottom_font_color){
					that.setData({
						welcome_page_bottom_bg_color:callback_data.welcome_page_bottom_bg_color,
						welcome_page_bottom_font_color:callback_data.welcome_page_bottom_font_color
					});
				}

				//设置文字大小
				if(callback_data.welcome_page_bottom_icon_list.length == 1){
					that.setData({
						welcome_page_bottom_font_size:'60rpx',
						welcome_page_bottom_icon_size:'70rpx'
					});
				}
				else if(callback_data.welcome_page_bottom_icon_list.length == 2){
					that.setData({
						welcome_page_bottom_font_size:'45rpx',
						welcome_page_bottom_icon_size:'52rpx'
					});
				}
				if(callback_data.welcome_page_bottom_icon_list.length == 3){
					that.setData({
						welcome_page_bottom_font_size:'35rpx',
						welcome_page_bottom_icon_size:'40rpx'
					});
				}



			}

			

			
		
			
			var response_data = callback_data.data;


			console.log('that.data.platform ===>>>', that.data.platform);
			console.log('that.data.platform ===>>>', response_data);


			//渲染页面数据

			if(that.data.platform == 'cms'){

				if(response_data.logourl){
					that.setData({
						form_logourl: response_data.logourl
					});
				}
			
				if (response_data.intro) {
					that.setData({
						form_intro: response_data.intro
					});
				}
			
			
				//有title 就替换掉
				if(response_data.title){
					wx.setNavigationBarTitle({
						title: response_data.title,
					})
			
					that.setData({
						current_title:response_data.title
					});
				}
			
				//正文内容
				if(response_data.info){
					
					WxParse.wxParse('content', 'html', response_data.info, that, 15);
					//console.log('wwwww1111',response_data.content);
				}

			}
			else if(that.data.platform == 'pic'){

				that.setData({
					content_pic_image: response_data.image,
					content_pic_url: response_data.url,
				});

			}
	  
			


			//如果有视频，则显示
			if(response_data.video_url){
				that.setData({
					video_url: response_data.video_url,
					video_cover_url: response_data.video_cover_url,
				});

				if(response_data.video_autoplay){
					that.setData({
						video_autoplay: true
					});
				}
			}
		
		},


		//点击图片的跳转事件
		content_pic_click:function(e){
			var url = e.currentTarget.dataset.url;
		
			console.log('welcome page 图片类型内容，图片被点击，准备跳转至：'+url);
		

			this.triggerEvent('link_item_click', {url}, {});
		
		
		
		},

		//商品详情页跳转  《在插件里面，没有用处，因为没有 index/detail这样的路径》
		lookdetail: function (e) {
			console.log(e)
			var lookid = e.currentTarget.dataset.procuctid;
			console.log(lookid);
			wx.navigateTo({
			  url: "../index/detail?id=" + lookid.id
			})
		},


		videometa:function(e){
			console.log('videometa======>>>>>', e);
	
			var imgwidth = e.detail.width;
			var imgheight = e.detail.height;
	
	
			//宽高比  
			var ratio = imgwidth / imgheight;
	
			console.log(imgwidth, imgheight)
	
			var current_view_width = 750;
	
			current_view_width = current_view_width ;
	
			//计算的高度值  
			var current_view_height = current_view_width / ratio;
	
	
			//赋值给前端
			var videometa_width_height = [current_view_width, current_view_height];
	
			console.log('videometa_width_height====>>>>', videometa_width_height);
	
			this.setData({
				videometa_width_height: videometa_width_height
			});
	
		},

		//自定义页面底部导航跳转
		btn_to_page:function(e){
			console.log('btn_to_page ===>>>', e);

			var url = e.currentTarget.dataset.url;
			//abotapi.call_h5browser_or_other_goto_url(url);

			//wx.navigateTo({
			//	url: '/pages/index/index',
			//})

			console.log('btn_to_page ===>>>', url);


			this.triggerEvent('link_item_click', {url}, {});

		},

		//给a标签添加跳转和复制链接事件
    wxParseTagATap: function (e) {
			var self = this;
			

			console.log('components/welcome_page-tag===>>>富媒体内容中的链接被点击===>>>', e);

			var url = e.currentTarget.dataset.src;
			if(!url){
				return;
			}


			if(url.indexOf('copytext://') != -1){
				//如果是复制文本，则调用函数 copy_text
				var text = url.replace('copytext://', '');

				this.triggerEvent('copy_text', {text}, {});

			}
			else{
				//否则返回网址
				this.triggerEvent('link_item_click', {url}, {});
			}

			


		},
		  

	}
})
