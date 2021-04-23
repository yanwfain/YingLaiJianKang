// pages/mesqlistshu/index.js
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
  whiteprotein:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/whiteprotein/index',
    })
  },
  protein:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/protein/index',
    })
  },
  redprotein:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/redprotein/index',
    })
  },
  feel:function(e){
    wx.navigateTo({
      url: '/pages/pack/feel/index',
    })
  },
  pressure:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/pressure/index',
    })
  },
  circumference:function(e){
    wx.navigateTo({
      url: '/pages/pack/circumference/index',
    })
  },
  ketone:function(e){
    wx.navigateTo({
      url: '/pages/page/ketone/index',
    })
  },
  weight:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/weight/index',
    })
  },
  jiakang:function(e){
    wx.reLaunch({
      url: '/pages/page/jiangkangda/index',
    })
  },
  nizhuan:function(e){
    wx.reLaunch({
      url: '/pages/pack/campThree/index',
    })
  },
  foedsIndex:function(e){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  memysql:function(e){
    wx.reLaunch({
      url: '/pages/page/mesqlistshu/index',
    })
  },
  jialilist:function(e){
    wx.reLaunch({
      url: '/pages/page/jiapage/index',
    })
  },
  glucoseFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/glucose/index',
    })
  },
  zaixianFn:function(e){
    wx.reLaunch({
      url: '/pages/pagetwo/zaixianzixun/index',
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