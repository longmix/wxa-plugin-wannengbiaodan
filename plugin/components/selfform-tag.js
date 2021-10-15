// plugin/components/hello-component.js

var abotapi = require('../common/abotapi.js');
var WxParse = require('../wxParse/wxParse.js');
var util = require('../util/util');

Component({
    properties: {
      

      //网络请求的表单数据
      callback_data:{
        type:String,
        value:''
      },

      /*

      sellerid:{
          type: String,
          value:'',
      },
      
      form_token:{
        type: String,
        value:''
      },

      form_type:{
        type: Number,
        value:''
      },
      formid:{
        type: Number,
        value:''
      },
      
      submit_url:{
        type: Number,
        value:'888'
      },
      openid:{
         type:Number,
         value:''

      },*/

      /*current_date:{
        type:String,
        value:''
      },*/


      items: {
        type: Array,
        value: [],
        observer(newVal, oldVal, changedPath) {
          this.setData({items: newVal})
        }
      },

  },
    
  data: {
    A: [{
      B: 'init data.A[0].B'
    }],

    //从callback_data带回来的参数
    sellerid:'',
    form_token:'',
    form_type:'',
    formid:'',
    submit_url:'',
    openid:'',
    userid:'',
    checkstr:'',

    //从callback_data带回来的参数（以上参数都放在这一个对象中）
    request_data:{},

    callback_data_obj:null,


    imgList:{},
    supplier_input_list : '',
    
    current_date: "",

    indexs: '0',
    currentZone:'',
    
    maxlength: -1,
    height:0,
    submit_text:'',
    
    picker_list : [],



    region: ['上海市', '上海市', '黄浦区'],
    customItem: '全部',
    textarea_auto_height:false,


    //current_title:'',
    form_logourl:'',
    current_option_list:null,
    current_params_str:'',


    date_start_val:'',
    date_end_val:'',

    //存储日期时间控件选择的值
    timelist:{},


    //日期时间组件选择器
    date:'2019-01-01 13:37',
    disabled:false,//设置是否能点击 false可以 true不能点击
    //startDate: '2019-01-01 12:37',
    //endDate: '2019-03-12 12:38',
    placeholder:'请选择时间'


  }, // 私有数据，可用于模版渲染


  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {

      




 
     },
    moved: function () { 
        console.log('san生命周期函数');
    },
    detached: function () { 
        console.log('er生命周期函数');
    },
    ready: function() { 

      console.log('生命周期函数  ready');

      var that = this;




      //this.test001();

      var callback_data_str = that.properties.callback_data;
    
      
      var callback_data = JSON.parse(callback_data_str);

      if(!callback_data || !callback_data.request_params_data){
        console.log('错误的传入参数：====>>>', callback_data_str);
        return;
      }

      console.log('收到界面传递过来的参数===>>>', callback_data);

      var request_data = callback_data.request_params_data;

      this.setData({
        request_data: request_data,
        callback_data_obj : callback_data
      });

      if(request_data.submit_url){
        this.setData({
          submit_url:request_data.submit_url
        });
      }



      //==== 处理日期和时间 Begin ===
      //==== 见 line 793 关于 date 的判断



      var myDate = new Date();

      var myDate2 = new Date();
      myDate2.setDate(myDate2.getDate() + 5);

      //测试当前的时间函数
      //console.log('aaaaaaa====>>' + util.formatTime(myDate))
      //console.log('aaaaaaa====>>', util.formatTime(myDate) + " " + util.formatTime2(myDate))
  

      this.setData({
        date_start_val: util.formatTime(myDate) + " " + util.formatTime2(myDate),
        date_end_val: util.formatTime(myDate2) + " " + util.formatTime2(myDate),
        //date_start_val : '1900',
        //date_end_val : '2500',

        date: util.formatTime(myDate) + " " + util.formatTime2(myDate),
      });

      //==== 处理日期和时间 End ===

      
      



      //2020.5.7. 加载图片平铺广告 Begin
      abotapi.abotRequest({
        url: abotapi.globalData.http_server + 'index.php/openapi/SelfformData/get_ad_list',
        data: {
          sellerid: that.data.request_data.sellerid,
        },
        success: function (res) {
          if (res.data && (res.data.code == 1)) {
            var ad_img_list = res.data.ad_img_list;

            that.setData({
              ad_img_list: ad_img_list
            });


          }


        },
      });
      //2020.5.7. 加载图片平铺广告 End


      

      //渲染页面数据
      that.set_input_list_to_wxml(that, callback_data);
    
    


    }
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { 

        var sss = 1;
      console.log('yi生命周期函数',sss);

  }, // 此处attached的声明会被lifetimes字段中的声明覆盖
 

  pageLifetimes: {

    // 组件所在页面的生命周期函数
    show: function () { 
      

      /*
      setTimeout(() => {
        wx.hideLoading({
          success: (res) => {

          },
        })

      }, 3000);*/

      

      

    },
  },

  methods: {



    //日期时间控件被选择
    onPickerChange: function (e) {
      console.log('ssss timelist ===>>>>', this.data.timelist);

      var time_name = e.target.id;
      var timelist = this.data.timelist;

      timelist[time_name] = e.detail.dateString;

      this.setData({
        timelist: timelist
      })

      console.log('ssss timelist ===>>>>', this.data.timelist);

    },
    
    handleChange(e) {
      console.log('eeeeeeeeeeeeeeeeee',e.detail.date)


      this.setData({current_date: e.detail.date});

      
    },


    //----------------------selfform------



    get_selffrom_info:function() {

      var selfform_info = [];

      selfform_info.formid = this.data.form_token;

      selfform_info.token = this.data.request_data.form_token;
      selfform_info.sellerid = this.data.request_data.sellerid;

      return selfform_info;
      
    },

    
    /**
     * 获取表单数据
     */
    submitData: function (event) {
      console.log('====pppppppppp',event.detail.value);
      
      //读取表单的输入项和输入规则
      var supplier_input_list = this.data.supplier_input_list;
      
  
  
      //表单提交带的参数
      var data_value_list = event.detail.value;
      
  
  
      //获取前端的输入值
      var input_value_list = [];
  
      for (var key in data_value_list) {
  
        var form_value = data_value_list[key];
  
        
  
        if (!form_value) {
        
  
          var require = 0;
          var displayname = '';
          var reg_string = '';
        
          //判断是否符合规则
          for (var keys in supplier_input_list) {
            if (supplier_input_list[keys]['fieldname'] == key) {
             
  
              require = supplier_input_list[keys]['require'];
              displayname = supplier_input_list[keys]['displayname'];
              reg_string = supplier_input_list[keys]['regex'];
              break;
            }
  
            
           
          }
  
          //是否必须输入
          if (require == 1) {
            wx.showModal({
              title: '提示',
              content: displayname + '不能为空',
            })
            return;
          }
  
          //正则表达式
          if (reg_string) {
            if (!(reg_string.test(data_value_list))) {
              wx.showModal({
                title: '提示',
                content: displayname + '有误',
              })
              return;
            }
          }
  
  
  
        }
     
        input_value_list[key] = form_value;
       
        
      }
  
      //准备提交到服务器
      var sumbit_url = '';
      var submit_data = input_value_list;
      //var options = this.data.current_option;
      var options = this.data.request_data;
  
      //检查是否有隐藏域
      //var hidden_list = [];
      for(var key in options){
        if((key == 'form_type')||(key == 'submit_url')||(key == 'formid')
          || (key == 'cataid') || (key == 'sellerid') || (key == 'token')){
            //continue;
        }
  
        //hidden_list[key] = options[key];
        submit_data[key] = options[key];
      }
  
      //console.log('11111111111111111111====>>隐藏域：',hidden_list);
  
      //console.log('11111111111111111111====>> length ：',hidden_list.length);
  
      console.log('11111111111111111111====>>完整的提交数据01：', submit_data);
  
  
      //submit_data = submit_data.concat(hidden_list);
  
      
  
      //追加商户和会员的信息
      var basic_data = [];
  
      basic_data.sellerid = this.data.request_data.sellerid;


      //userid
      if (this.data.request_data.userid) {
        basic_data.userid = this.data.request_data.userid;
      }
      //userid
      if (this.data.request_data.checkstr) {
        basic_data.checkstr = this.data.request_data.checkstr;
      }

  
      //token
      if (this.data.request_data.form_token) {
        basic_data.token = this.data.request_data.form_token;
      }
  
      if (this.data.request_data.formid) {
        basic_data.formid = this.data.request_data.formid;
      }
  

      //openid
      if (this.data.request_data.openid) {
        basic_data.openid = this.data.request_data.openid;
      }
      
      //basic_data.openid = this.data.request_data.openid;

      console.log('openid===', this.data.request_data.openid);
      //basic_data.openid = 123;
      
  
      for (var key in basic_data){
        submit_data[key] = basic_data[key];
      }
  
      //将数组转为 | 分割分割 的 元素
      for (var key in submit_data) {
        if (typeof (submit_data[key]) == 'object'){
            console.log('88888123', submit_data[key]);
          submit_data[key] = submit_data[key].join('|');
        }
        
      }
  
      console.log('11111111111111111111====>>完整的提交数据02：', this.data.request_data.form_type);
      
      var data_submit_url = '';
      
      if(this.data.request_data.form_type == 1){
        //提交到会员扩展属性
       
        data_submit_url = abotapi.globalData.http_server + 'index.php/Yanyubao/ShopAppWxa/user_set_ext_info_list';
       
      }
      else if (this.data.request_data.form_type == 2) {
        //提交到微读客万能表单
        
        data_submit_url = abotapi.globalData.http_weiduke_server + 'index.php/openapi/SelfformData/submit_data_url_selfform';
        
      }
      else if (this.data.request_data.form_type == 3) {
        //提交到文章分类的自定义属性
        data_submit_url = abotapi.globalData.http_weiduke_server + 'index.php/openapi/SelfformData/submit_data_url_img_classify';
  
      }
  
      if(this.data.submit_url){
        data_submit_url = this.data.submit_url;
      }
  
      console.log('lllllllllllllllllllldata_submit_url', data_submit_url);
  
      var that = this;

      abotapi.abotRequest({
        url: data_submit_url,
        method: 'post',
        data: submit_data,
        success: function (res) {
  
          var res_data = res.data;
  
          if(res.data.code == 1){
            if(!res.data.msg){
              res.data.msg = '提交成功';
            }

            var message_text = res.data.msg;
  
            wx.showModal({
              title: '提交成功',
              content: message_text,
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  // app.call_h5browser_or_other_goto_url('/pages/welcome_page/welcome_page');

                  console.log('准备返回上一页');

                  var new_url = 'plugin-private://wx00d1e2843c3b3f77/pages/show_message?message_text=' + message_text;
                  new_url += '&wxa_shop_nav_font_color=' + that.data.callback_data_obj.shop_option_list.wxa_shop_nav_font_color;
                  new_url += '&wxa_shop_nav_bg_color=' + that.data.callback_data_obj.shop_option_list.wxa_shop_nav_bg_color;


                  //插件内部的页面跳转，必须使用完整的路径
                  wx.redirectTo({
                    url: new_url,
                    success:function(res){

                      console.log('navigateTo success ===>>> ', res);

                    },
                    fail:function(res){
                      console.log('navigateTo fail ===>>> ', res);
                    }

                  })
                  return;
                  
                 /*
                  wx.navigateBack({
                    delta: 1,  // 返回上一级页面。
                    success: function () {
                      console.log('成功！')
                    },
                    fail:function(res){
                      console.log('返回上一级失败！', res)
                    }
                  })*/
                } 
                else if (res.cancel) {
                  //app.call_h5browser_or_other_goto_url('/pages/welcome_page/welcome_page');
                  wx.navigateBack({
                    delta: 1,  // 返回上一级页面。
                    success: function () {
                      console.log('成功！')
                    }
                  })
                }
              }
            });
  
            
          }
          else{
            wx.showModal({
              title: '提交失败',
              content: res_data.msg,
            })
          }
  
          
        
        },
      });
    },


     /**
   * 获取行业数据
   */
  bindIndustryChange: function (event) {
  
    // var fieldname = event.currentTarget.dataset.fieldname

    // var value_name = fieldname + index;
    console.log('eventeventevent',event);
    var id = event.currentTarget.dataset.id;
    
    var options = event.currentTarget.dataset.options;
    var value = event.detail.value;
    var picker_list = this.data.picker_list;

    picker_list[id] = options[value];

    this.setData({
      picker_list: picker_list
    })

  },
   
   /**
     * 文件上传
     */
    chooseImg: function (e) {
     
      var that = this;
      var imgList = that.data.imgList;

      console.log('imagelist=====', imgList);
      var image_name = e.currentTarget.dataset.name;
      
      console.log('image_name====', image_name);
      
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
  
          
  
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var imgItem = res.tempFilePaths[0];
  
          wx.uploadFile({
            url: abotapi.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=upload_image_file_without_user',
            filePath: imgItem,
            name: 'file',
            formData: {
              sellerid: abotapi.get_sellerid(),
            },
            success: function (res) {
  
              that.setData({
                height:200,
              })
  
              var obj = JSON.parse(res.data);
              
  
              imgList[image_name] = obj.img_url;
              
              console.log('imglist-----name', obj);

              that.setData({
                imgList: imgList
              })
            }
          })
         
          
  
        }
      })
  
    },

    

     //渲染万能表单的列表
     set_input_list_to_wxml:function(that, callback_data){

      console.log('进入回调  set_input_list_to_wxml ===>>>>', callback_data);

      //返回的数据不等于1 
      if (callback_data.code != 1) {
        wx.showModal({
          title: '处理失败',
          content: '获取表单数据失败！',
        })
        return;
      }


      //有title 就替换掉
      if(callback_data.title){
        that.setData({
          current_title:callback_data.title
        });        
      }
      else{
        that.setData({
          current_title:callback_data.shop_option_list.wxa_shop_new_name
        });
      }

      //设置按钮和文字的颜色
      if(callback_data.shop_option_list && callback_data.shop_option_list.wxa_shop_nav_bg_color
        && callback_data.shop_option_list.wxa_shop_nav_font_color){
        that.setData({
          btn_background_color:callback_data.shop_option_list.wxa_shop_nav_bg_color,
          btn_text_color:callback_data.shop_option_list.wxa_shop_nav_font_color
        });
      }
      
      
  
  
      
      var data = callback_data.data;
      
      var imgList = that.data.imgList;
      //var timelist = that.data.timelist;
      
      console.log('imglist8======', callback_data);




      that.setData({
        submit_text: callback_data.submit_text
      });

      if(callback_data.logourl){
        that.setData({
          form_logourl: callback_data.logourl
        });
      }

      if (callback_data.intro) {
        that.setData({
          form_intro: callback_data.intro
        });
      }




      console.log('data123',data);











      for (var key in data) {
  
        //多项选择
        if (data[key]['inputtype'] == "checkbox"){
          data[key]['options'] = data[key]['options'].split("|");
          if (data[key]['fieldvalue']){
            data[key]['fieldvalue'] = data[key]['fieldvalue'].split("|");
          }
          
          var new_options = [];
          for (var key01 in data[key]['options']){
            if (data[key]['options'][key01] == ''){
             continue;
            }
            var obj = [];
            obj.push(data[key]['options'][key01]);
           
  
            new_options.push(obj);
            
            data[key]['new_option'] = new_options;
            if (data[key]['fieldvalue']){
              var is_cunzai = data[key]['fieldvalue'].indexOf(data[key]['options'][key01]);
  
              if (is_cunzai != -1) {
                obj.push(true);
  
              }
            }
            
  
            
            
           
          }
  
          
        }
        
  
        //省市区多级联动的渲染
        if (data[key]['inputtype'] == 'china_region') {
          that.setData({
            region: data[key]['fieldvalue'],
          })
        }
  
        //文件上传渲染
        if (data[key]['inputtype'] == 'file') {

          
          var fieldname = data[key]['fieldname'];



          console.log('inputfile====', imgList);

         // return ;

          imgList[fieldname] = data[key]['fieldvalue'];

         
          if (data[key]['fieldvalue']) {
            that.setData({
              height: 200,
            })
          }
        }

        //日期时间格式，设置选择的范围
        if (data[key]['inputtype'] == 'date') {

          data[key]['options'] = data[key]['options'].split("|");

          var day_start = 0;
          var day_ended = 5;

          if(data[key]['options'].length >= 2){
            day_start = data[key]['options'][0];
            day_ended = data[key]['options'][1];
          }

          console.log('日期范围为：'+day_start+' ~ '+day_ended);

          var myDate0 = new Date();

          var myDate1 = new Date();
          //myDate1.setDate(myDate1.getDate() + day_start);
          myDate1.setTime(myDate1.getTime() + (day_start * 24*60*60*1000));

          var myDate2 = new Date();
          //myDate2.setDate(myDate2.getDate() + day_ended);
          myDate2.setTime(myDate2.getTime() + (day_ended * 24*60*60*1000));

          data[key]['date_current'] = util.formatTime(myDate0) + " " + util.formatTime2(myDate0);

          data[key]['date_start_val'] = util.formatTime(myDate1) + " " + util.formatTime2(myDate1);
          data[key]['date_end_val'] = util.formatTime(myDate2) + " " + util.formatTime2(myDate2);

          console.log('日期时间格式为：', data[key]);
          

        }
  
        
        that.setData({
          imgList: imgList,
          //timelist:timelist
        })
  
        //如果是select  下拉框的话  就把options分隔
        if (data[key]['inputtype'] != 'select') {
          continue;
        }
        
        if (data[key]['options'] && (typeof (data[key]['options']) == 'string') && data[key]['options'].length){
          console.log('options=====>>>>>', data[key]['options']);
          data[key]['options'] = data[key]['options'].split("|");
        }
      }
  
      
      // =================下拉框 的 区分选择picker=======
      
      var picker_list = [];
      for (var key in data) {
  
        if (data[key]['inputtype'] == 'select') {
          if (data[key]['fieldvalue']) {
            var id = data[key]['id'];
            picker_list[id] = data[key]['fieldvalue'];
          } else {
            var id = data[key]['id'];
            picker_list[id] = data[key]['options'][0];
          }
  
        }
      }
      that.setData({
        picker_list: picker_list,
      })
      //====下拉框end====
  
  
      //前端需要循环的数据
      
      that.setData({
        supplier_input_list: data,
      })
      
  
      
  
      //有content 就替换掉
      if(callback_data.content){
          
        WxParse.wxParse('content', 'html', callback_data.content, that, 15);
        //console.log('wwwww1111',callback_data.content);
      }

  
    },


     // 省市区联动选择
     bindRegionChange: function (e) {
      var region = e.detail.value['0'] + '-' + e.detail.value['1'] + '-' + e.detail.value['2'];
      this.setData({
        region: region
      })
      
    },

    go_to_ad_img_url:function(e){ 
      console.log('go_to_img_url======>>>>', e);
  
      var url = e.currentTarget.dataset.url;
      //var that = this;
      //var var_list = Object();
  
      //abotapi.call_h5browser_or_other_goto_url(url, var_list, 'pages_index');

      console.log('广告图片的链接被点击===>>>' + url);

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
  

