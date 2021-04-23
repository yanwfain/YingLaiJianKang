// pages/jinriyundong/index.js
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

  },
  clickab:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/renwudelit/index?id=' + e.currentTarget.dataset.id +'&type=' +''  + '&video=' + e.currentTarget.dataset.url,
    })
  },
  listclick:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/renwudelit/index?id=' + e.currentTarget.dataset.id + '&type=' + 1 + '&video=' + e.currentTarget.dataset.url,
    })
  },
  qitasubm:function(e){ 
    wx.navigateTo({
      url: '/pages/pack/addrenwulist/index',
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
    var url = app.globalData.url + '/api/selectDailyMovementByUserId';
    var data = {
      userId:app.globalData.user_id,
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