// pages/binlist/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    data:[
      {
        time:'9:00',
        hours:'9',
        minutes:'00',
        status:1
      },
      {
        time:'9:30',
        hours:'9',
        minutes:'30',
        status:1
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      time:''
    })
  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  bindSelect:function(e){
    console.log(e)//选择结果值
    this.setData({
      time:e.detail.selected
    })
  },
  xiapageFn:function(e){
    console.log(this.data.time)
    if(!this.data.time){
      wx.showToast({
        title: '请完善预约时间',
        icon:'none'
      })
      return
    }
    var that = this
    wx.requestSubscribeMessage({
      tmplIds: ['y4YAHWJw_V4W_JBJqk4b5mFyAUOx54ZLdudV_kA_Hbs'],
      success (res) {
        console.log(res)
        wx.navigateTo({
          url: '/pages/pagetwo/userxieyi/index?time=' + that.data.time,
        })
       }
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