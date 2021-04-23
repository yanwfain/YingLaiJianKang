// pages/startantFn/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    // isloadview:true 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(function(e){
      that.setData({
        isload:true
      })
    },300)
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/getDeclarationCamp';
    var data = {
      type:2
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          indexpage:res.data.declarationCamp
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
  bunnotFn:function(e){
    var that = this
    setTimeout(function(){
      that.setData({
        isload:false
      })
    })
    if(!that.data.isload){
      this.setData({
        isloadview:false
      })
    }
 
  },  
  intextvalFn:function(e){
    this.setData({
      textearval:e.detail.value
    })
  },
  bindressing:function(e){
    if(!this.data.textearval){
      wx.showToast({
        title: '请填写入营宣言',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pagetwo/ressing/index?tit=' + this.data.textearval,
    })
  },
  substopFn:function(e){
    if(!this.data.textearval){
      wx.showToast({
        title: '请填写入营宣言',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/login/updateUserDeclaration';
    var data = {
      id:app.globalData.user_id,
      declaration:that.data.textearval
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/videozhi/index',
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    this.onShow()
    wx.stopPullDownRefresh()
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