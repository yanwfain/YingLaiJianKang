// pages/jilutizhong/index.js
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
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' );
    var hour = date.getHours()
    var minute = date.getMinutes()<10?'0'+ date.getMinutes():date.getMinutes()
    var second = date.getSeconds()<10?'0'+ date.getSeconds():date.getSeconds()
    this.setData({
      weightData: app.globalData.weightData,
      timeData:M + '月' + D + ' ' + hour+ ':' + minute,
      mTime:Y+'-'+M+'-'+D + ' ' + hour +':'+ minute
    })
    var that = this
    var url = app.globalData.url + '/api/selectRecentWeightDataByUserId';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      console.log((4-5)*-1)
      wx.hideLoading()
      if (res.success&&res.data) {
        that.setData({
          lists:res.data,
       
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
  xiapageFn:function(e){
    var that = this
    var url = app.globalData.url + '/api/saveWeight';
    var data = {
      taskId:4,

      userId:app.globalData.user_id,
      bmi:this.data.weightData.bmi,
      fat:this.data.weightData.bodyFatPercent,
      muscle:this.data.weightData.musclePercent,
      water:this.data.weightData.moisturePercent,
      visceralFat:this.data.weightData.visceralFat,
      metabolic:this.data.weightData.bmr,
      weight:this.data.weightData.weight_kg,
      mTime:this.data.mTime
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateBack({
          delta: 1,
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
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  startBlue: function () {
    var _this = this;
    _this.lanyatest1()
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