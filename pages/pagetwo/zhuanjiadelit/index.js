// pages/renwudelit/index.js
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
      id:options.id,
      type:options.type,
      video:options.video,
      name:options.name,
      integral:options.integral
    })
  },
  binclick:function(e){
    var that = this
    var url = app.globalData.url + '/api/saveLectureRoomRecord';
    var data = {
      userId:app.globalData.user_id,
      lectureId:this.data.id
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        // wx.navigateBack({
        //   delta: 1,
        // })
        that.setData({
          isModels:true
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
  deles:function(e){
    this.setData({
      isModels:false
    })
  },
  jixsuFn:function(e){
    this.setData({
      isModels:false
    })
    wx.navigateBack({
      delta: 1,
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