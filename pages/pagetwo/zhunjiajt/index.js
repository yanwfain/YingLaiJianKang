// pages/zhunjiajt/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  click:function(e){
    this.setData({
      tid:e.currentTarget.dataset.id
    })
  },
  zhuanjiadelit:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/zhuanjiadelit/index?id=' + e.currentTarget.dataset.id + '&video=' + e.currentTarget.dataset.url + '&type=' + '' + '&name=' + e.currentTarget.dataset.name + '&integral=' + e.currentTarget.dataset.integral,
    })
  },
  yiwanFn:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/zhuanjiadelit/index?id=' + e.currentTarget.dataset.id + '&video=' + e.currentTarget.dataset.url+ '&type=' + 1 + '&name=' + e.currentTarget.dataset.name,
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
    var url = app.globalData.url + '/api/selectLectureRoomByUserId';
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