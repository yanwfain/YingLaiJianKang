// pages/huizhang/index.js
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
    this.setData({
      id:options.id
    })
   
  },

  submite:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/weizhangfenxiang/index?type=' + 1,
    })
  },
  // pages/weizhangfenxiang/index
  huode:function(e){
    if(e.currentTarget.dataset.status>=1){
      wx.navigateTo({
        url: '/pages/pack/huode/index?id=' +  e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.status==0){
      wx.navigateTo({
        url: '/pages/pagetwo/weihuode/index?id=' +  e.currentTarget.dataset.id,
      })
    }
    
  },
  weihuode:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/weihuode/index',
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/getMedalListByUserId';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          userList:res.data.medalList,
          obtainNum:res.data.obtainNum
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