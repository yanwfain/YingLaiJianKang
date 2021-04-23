// pages/activation/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    
  },
  code:function(e){
    console.log(e)
    this.setData({
      code:e.detail.value
    })
  },
  whyFn:function(e){
    this.setData({
      isshow:true
    })
  },
  isshowFn:function(e){
    this.setData({
      isshow:false
    })
  },
  submit:function(e){
    if(!this.data.code){
      wx.showToast({
        title: '请输入激活码',
        icon:'none'
      })
      return
    }

    wx.showLoading({
      title:'激活中'
    })
    var that = this
    var url = app.globalData.url + '/sales/activeCode';
    var data = {
      user_id:app.globalData.user_id,
      code:this.data.code
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/page/jihuo/index',
        })
      } else {
        wx.showToast({
          title: res.error_message,
          icon:'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
   
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