//const plugin = requirePlugin('yyb_selfform_plugin')

Page({
  data: {
    items: [],
    currentItem: 0,
    show_type:''
  },
  onLoad() {

    //plugin.sayHello()
    //const world = plugin.answer

  },
  addItem() {
    this.data.items.push(this.data.currentItem++)
    this.setData({
      items: this.data.items,
      currentItem: this.data.currentItem
    })
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },

  formSubmit(e){
    
    //会员属性
    var options = {
      sellerid:'pQNNmSkaq',
      form_type:'1',
      userid:'1234',
      checkstr:'aaaaaaaaaa'
    }

    //万能表单
    var options = {
      sellerid:'pmyxQxkkU',
      form_type:'2',
      form_token:'gwcuuk1411034699',      
      formid:'376',
    }

    var options = {
      sellerid:'pQNNmSkaq',
      form_type:'2',
      form_token:'gwcuuk1411034699',      
      formid:'292', //城市合伙人
    }

    var options888 = {
      sellerid:'pmyxQxkkU',
      form_type:'2',
      form_token:'"mrfuhd1546833814"',  
      formid:'325',
      openid:"oTESv4oN4pobHqg8LryZU3kF3YCc"
    }

    //CMS文章分类
    var options888 = {
      sellerid:'pmyxQxkkU',
      form_type:'3',
      form_token:'cugnmr1590638215',      
      formid:'4493',
    }

    //自定义提交数据的保存目标，并追加openid这个参数
    //在万能表单中，openid记录了用户上次填写的信息
    var options7777 = {
      sellerid:'pmyxQxkkU',
      form_type:'2',
      form_token:'mrfuhd1546833814',      
      formid:'342',
      submit_url: encodeURIComponent('https://yanyubao.tseo.cn/openapi/Jianghanyinhua/submit_data_notify_type'),
      openid:'oTESv4sCTCIMncMYUisOKRgNBTFg',
      userid:'1537',
      checkstr:'28bba0f22a29881ba291fb50f4152655',
      orderno:'abcd1234'
    }






      // options.formid = '411';
      // options.token = 'jkmvrh1410925238';
      // options.sellerid = 'pmyxQxkkU';

      //2021.3.9. 获取输入的参数的内容
      if(e.detail.value.sellerid){
        options.sellerid = e.detail.value.sellerid;
      }
      if(e.detail.value.form_token){
        options.form_token = e.detail.value.form_token;
      }
      if(e.detail.value.formid){
        options.formid = e.detail.value.formid;
      }
      if(e.detail.value.openid){
        options.openid = e.detail.value.openid;
      }
      
      var arr = Object.keys(options);

      var options_len = arr.length;


      if (options_len > 0){
        var params_str = '';
  
        for(var key in options){
            params_str += key+'='+options[key]+'&';
        }
        
        params_str = params_str.substr(0, params_str.length - 1);
        
      }


      console.log('oooopparams_str==', params_str);

      var show_type = this.data.show_type;

      console.log('wwwasdasda', show_type);
      
      if(show_type == 'plugin_page'){
        wx.navigateTo({

          url: 'plugin-private://wx00d1e2843c3b3f77/pages/selfform?'+ params_str
        
        })
      }
      else{
        wx.navigateTo({

          url: '../show_form/show_form?'+params_str
        
        })
    
      }


      

  },
  radioChange(e){

    console.log('wwwaa', e.detail.value);

    var type_url = e.detail.value;

    this.setData({
      show_type:type_url
    })


  }
  ,
  formSubmit_welcome_page(e){

    //默认参数：请求延誉宝CMS中的文章内容
    var options = {
      sellerid:'pQNNmSkaq',
      platform:'cms',
      //imgid:'7967',
      //imgid:'8044',
      imgid:'31'
    }

    //默认参数：请求延誉宝系统中的商城图片
    var options333 = {
      sellerid:'pQNNmSkaq',
      platform:'pic',
      imgid:'302',
    }

    //默认参数：请求指定的数据源网址
    var options444 = {
      sellerid:'pQNNmSkaq',
      parentid:'1234',
      data_url:encodeURIComponent('https://yanyubao.tseo.cn/openapi/Jianghanyinhua/get_order_scan_report_page?orderno=20170123172139NJVOPW&messageid=2968'),

    }

    //默认参数：模拟 - 通过小程序的带参小程序码打开
    var options555 = {
      sellerid:'pQNNmSkaq',
      scene:'7967@0@cms',
    }
    var options22 = {
      sellerid:'pQNNmSkaq',
      scene:'302@0@pic',
    }


    //2021.3.29. 获取输入的参数的内容

    if(e.detail.value.imgid){
      options.imgid = e.detail.value.imgid;
    }
    if(e.detail.value.parentid){
      options.parentid = e.detail.value.parentid;
    }
    if(e.detail.value.platform){
      options.platform = e.detail.value.platform;
    }

    if(e.detail.value.data_url){
      options.data_url = e.detail.value.data_url;
    }

    if(e.detail.value.scene){
      options.scene = e.detail.value.scene;
    }

    var arr = Object.keys(options);

    var options_len = arr.length;


    if (options_len > 0){
      var params_str = '';

      for(var key in options){
          params_str += key+'='+options[key]+'&';
      }
      
      params_str = params_str.substr(0, params_str.length - 1);
      
    }

    var show_type = this.data.show_type;

    console.log('准备跳转到自定义页面组件，参数：', params_str);
    
    if(show_type == 'plugin_page'){
      wx.navigateTo({

        url: 'plugin-private://wx00d1e2843c3b3f77/pages/welcome_page?'+ params_str
      
      })
    }
    else{
      wx.navigateTo({

        url: '../show_welcome_page/show_welcome_page?'+params_str
      
      })
  
    }
    

  }
  

})
