// pages/jiluxieya/index.js
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
      taskId:options.id
    })
    this.gettime()
  },
  gettime() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    console.log(176,M)
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //获取当日时
    var H = date.getHours()<10?'0'+ date.getHours():date.getHours()
    //获取当日分
    var S = date.getMinutes()<10?'0'+ date.getMinutes():date.getMinutes()
    this.setData({
      date_time: Y + '-' + M + '-' + D,
      value_time:H + ':' + S
    })
    // this.startDate = Y + '-' + M + '-' + D
    this.date = Y + '-' + M + '-' + D
    this.hour = H + ':'+ S
    this.time = H + ':'+ S
    this.startYear = Y
    // this.startTinmesr = H + ':' + S

    console.log("当前时间：" + Y + '-' + M + '-' + D  , this.startDate);
  },
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value_time: e.detail.value
    })
  },
  remark:function(e){
    this.setData({
      remark:e.detail.value
    })
  },
  higher:function(e){
    this.setData({
      higher:e.detail.value
    })
  },
  lower:function(e){
    this.setData({
      lower:e.detail.value
    })
  },
  heartRate:function(e){
    this.setData({
      heartRate:e.detail.value
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
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      value_time: e.detail.value
    })
  },
  submit:function(e){
    if(!this.data.higher){
      wx.showToast({
        title: '请输入收缩压',
        icon:'none'
      })
    }
    if(!this.data.lower){
      wx.showToast({
        title: '请输入舒张压',
        icon:'none'
      })
    }
    if(!this.data.heartRate){
      wx.showToast({
        title: '请输入心率',
        icon:'none'
      })
    }
    if(!this.data.date_time){
      wx.showToast({
        title: '请选择日期',
        icon:'none'
      })
      return
    }
    if(!this.data.value_time){
      wx.showToast({
        title: '请选择时间',
        icon:'none'
      })
      return
    }
    var that = this
    var url = app.globalData.url + '/api/savePressure';
    var data = {
      taskId:that.data.taskId,
      higher:that.data.higher,
      lower:that.data.lower,
      heartRate:that.data.heartRate,
      userId:app.globalData.user_id,
      remark:that.data.remark?that.data.remark:'',
      mTime:that.data.date_time + ' ' + that.data.value_time
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        
        that.setData({
          isModels:true,
          jifensnum:res.data.score
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