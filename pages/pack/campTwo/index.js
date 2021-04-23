// pages/camp/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islistpick:true,
    isgoudw:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  indexFn:function(e){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  collegeFn:function(e){
    wx.redirectTo({
      url: '/pages/pack/college/index',
    })
  },
  campFn:function(e){
    wx.redirectTo({
      url: '/pages/pack/camp/index',
    })
  },
  shoppingFn:function(e){
    wx.redirectTo({
      url: '/pages/pagetwo/shopping/index',
    })
  },
  myFn:function(e){
    wx.redirectTo({
      url: '/pages/page/my/index',
    })
  },
  jihuoorderFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/activation/index',
    })
  },
  subStopone:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/userdelit/index',
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