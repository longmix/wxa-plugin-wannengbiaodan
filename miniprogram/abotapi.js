
//调用H5browser打开网页
function call_h5browser_or_other_goto_url (url, var_list=null, ret_page='') {
  console.log('call_h5browser_or_other_goto_url : url && var_list :'+url);
  console.log(var_list);

  console.log('url==============00000', url);
  
 

  //判断各种跳转条件
  if (url.indexOf('switchTab') == 0) {
    var arr = url.split(" ");

    console.log('switchTab ========>>>> ', arr);

    if (arr.length >= 2) {
      var new_url = arr[1];
      wx.switchTab({
        url: new_url,
      })
    }
  }
  else if (url.indexOf('navigateTo') == 0) {
    var arr = url.split(" ");

    console.log('navigateTo ========>>>> ', arr);

    if (arr.length >= 2) {
      var new_url = arr[1];

      console.log('navigateTo ========>>>> ', new_url);

      wx.navigateTo({
        
        url: new_url
      })
    }
  }
  else if (url.indexOf('redirectTo') == 0) {
    var arr = url.split(" ");

    console.log('redirectTo ========>>>> ', arr);

    if (arr.length >= 2) {
      var new_url = arr[1];
      wx.redirectTo({
        url: new_url,
      })
    }
  }  
  else if ((url.indexOf('https://') == 0) || (url.indexOf('http://') == 0)) {
    if (url.indexOf('#redirectTo') != -1){
      //如果指定了跳转方式为 #redirectTo
      url = url.replace(/#redirectTo/, '');
      wx.redirectTo({
        url: '/pages/h5browser/h5browser?url=' + encodeURIComponent(url) + '&ret_page=' + ret_page,
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/h5browser/h5browser?url=' + encodeURIComponent(url) + '&ret_page=' + ret_page,
      })
    }
    
  }
  else if (url.indexOf('miniprogram') == 0) {
    var arr = url.split(" ");
    if (arr.length >= 3) {
      var appid = arr[2];
      var pagepath = arr[3];
      var extraData = null;
      if (arr[4]) {
        extraData = arr[4];
      }

      var extraData_obj = null;
      if (extraData) {
        extraData_obj = JSON.parse(extraData);
      }

      //console.log('1111111111111', extraData)

      wx.navigateToMiniProgram({
        appId: appid,
        envVersion: 'release',
        path: pagepath,
        extraData: extraData_obj,
        success(res) {
          // 打开成功
        },
        fail: function (res) {
          wx.showModal({
            title: '跳转小程序失败',
            content: res.errMsg,
            showCancel: false
          })

          console.log('跳转小程序失败：', res);
        }
      })
    }
  }
  else if (url.indexOf('tel:') == 0) {
    url = url.replace(/tel:/, '');

    wx.makePhoneCall({
      phoneNumber: url,
    })
  }
  else {
    wx.navigateTo({
      url: url
    })
  }
};


module.exports = {
  call_h5browser_or_other_goto_url,

}
