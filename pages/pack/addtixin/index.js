// pages/addtixin/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerProDataf: [
      {
        name: '请选择'
      },
      {
        name: '服药提醒'
      },
      {
        name: '血糖提醒'
      }
    ],
    pickerProDataf1: [
      {
        name: '请选择'
      },
      {
        name: '空腹'
      },
      {
        name: '早餐前'
      },
      {
        name: '午餐前'
      },
      {
        name: '午餐后'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  submites: function (e) {
    var that = this
    if(that.data.countryIndex==0||!that.data.countryIndex){
      wx.showToast({
        title: '请选择提醒项目',
        icon:'none'
      })
      return
    }
    if(!that.data.time){
      wx.showToast({
        title: '请选择提醒时间',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/insertMeasurementReminder';
    var data = {
      userId:app.globalData.user_id,
      mProject:that.data.pickerProDataf[that.data.countryIndex].name,
      mType:that.data.pickerProDataf1[that.data.countryIndex1].name,
      mTime:that.data.time,
      isOpen:0
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        // that.setData({
        //   list:res.data
        // })
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: res.error_message,
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    // const pages = getCurrentPages()
    // const prevPage = pages[pages.length - 2] // 上一页// 调用上一个页面的setData 方法，将数据存储
    // prevPage.setData({
    //   xmTitle: that.data.pickerProDataf[that.data.countryIndex].name,
    //   txTime:that.data.pickerProDataf1[that.data.countryIndex1].name,
    //   times:that.data.time
    // })
    
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