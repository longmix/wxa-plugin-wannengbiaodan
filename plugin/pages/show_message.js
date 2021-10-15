// plugin/pages/show_message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message_text:''
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * /pages/show_message?message_text=hello123&wxa_shop_nav_font_color=123&wxa_shop_nav_bg_color=123
   * 
   */
  onLoad: function (options) {
    console.log('show_message.js');

    this.setData({
      message_text: options.message_text
    });

    //头部导航的颜色
    if(options.wxa_shop_nav_font_color && options.wxa_shop_nav_bg_color){
      wx.setNavigationBarColor({
        frontColor: options.wxa_shop_nav_font_color,
        backgroundColor: options.wxa_shop_nav_bg_color,

        // animation: {
        //   duration: 40,
        //   timingFunc: 'easeIn'
        // }
      });
    }



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

  }
})