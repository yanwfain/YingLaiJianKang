// pages/binlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  clickab:function(e){
    wx.navigateTo({
      url: '/pages/pack/audeis/index?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&img=' + e.currentTarget.dataset.img + '&audio=' + e.currentTarget.dataset.audio + '&type=' + '' + '&day=' + e.currentTarget.dataset.day,
    })
  },
  clickabs:function(e){
    wx.navigateTo({
      url: '/pages/pack/audeis/index?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&img=' + e.currentTarget.dataset.img + '&audio=' + e.currentTarget.dataset.audio + '&type=' + 1 + '&day=' + e.currentTarget.dataset.day,
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
    var that = this
    var url = app.globalData.url + '/api/selectHealingHeartByUserId';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          list:res.data
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