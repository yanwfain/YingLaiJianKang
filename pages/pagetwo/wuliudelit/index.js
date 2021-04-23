// pages/lookgift/index.js
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/kuaidi100/findKuaiDiCode';
    var data = {
      code:options.code,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          indextxt:res.data
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
  notiro:function(e){
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () {}
    })
  },
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据内容
      data: e.currentTarget.dataset.order,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
},
submit:function(e){
  wx.showLoading({
    title: '加载中',
  })
  var that = this
  var url = app.globalData.url + '/login/updateUserStatus';
  var data = {
    id:app.globalData.user_id,
    status:4
  }
  app.wxRequest('POST', url, data, (res) => {
    console.log(res)
    wx.hideLoading()
    if (res.success) {
      wx.navigateBack({
        delta:1,  // 返回上上一级页面。
        success: function () {
          console.log('成功！')
        }
      })
    } else {
      wx.showToast({
        title: res.data,
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