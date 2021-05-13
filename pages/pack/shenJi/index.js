// pages/pack/shenJi/index.js
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
      pid:options.pid
    })
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/selectUpgradePackage';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          listshop:res.data
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
  subMold:function(e){
    this.setData({
      isModel:true
    })
  },
  tabOne:function(e){
    
    this.setData({
      tid: e.currentTarget.dataset.id,
      txtOne:e.currentTarget.dataset.txt,
      picker:e.currentTarget.dataset.picker
    })
  },
  catabs:function(e){
    this.setData({
      isModel:false
    })
  },
  submitnotation:function(e){
    if(!this.data.tid){
      wx.showToast({
        title: '请选择逆转营升级方案',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pagetwo/zidelit/index?txtOne=' + this.data.txtOne + '&picker=' + this.data.picker + '&shopid=' + this.data.tid + '&typeids=' + 1 + '&specifications=' + 1,
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