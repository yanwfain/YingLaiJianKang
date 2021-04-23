// pages/jkjiancha/index.js
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
  listPgae:function(e){
    wx.navigateTo({
      url: '/pages/page/jianformpage/index?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
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
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/selectReportByUserId';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        for(var index in res.data.reportList){
          res.data.reportList[index].electrocardiogram = JSON.parse(res.data.reportList[index].electrocardiogram)
          res.data.reportList[index].neck = JSON.parse(res.data.reportList[index].neck)
          res.data.reportList[index].abdomen = JSON.parse(res.data.reportList[index].abdomen)
          res.data.reportList[index].fundus = JSON.parse(res.data.reportList[index].fundus)
          res.data.reportList[index].other = JSON.parse(res.data.reportList[index].other)
       
        }

        that.setData({
          
          listimg:res.data.reportList,
          allnun:  res.data.reportList[index].electrocardiogram.length + res.data.reportList[index].neck.length+res.data.reportList[index].abdomen.length+res.data.reportList[index].fundus.length+res.data.reportList[index].other.length
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