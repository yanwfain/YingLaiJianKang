// pages/shenggao/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weight: 85,
    styles: {
      line: '#969696',
      bginner: '#fbfbfb',
      bgoutside: '#F2F2F2',
      font: '#404040',
      fontColor: '#404040',
      fontSize: 16
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      xid:options.xid,
      taskId:options.id
    })
  },
  sishow:function(e){
    this.setData({
      isshows:true
    })
  },
  isshowfas:function(e){
    this.setData({
      isshows:false
    })
  },
  bindvalue(e) { //滑动回调
    const value = e.detail.value;
    const key = e.currentTarget.id;
    const data = {};
    data[key] = value;
    this.setData(data);
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
  jixsuFn:function(e){
    this.setData({
      isModels:false
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  submitens:function(e){
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
    var url = app.globalData.url + '/api/saveWaist';
    var data = {
      taskId:that.data.taskId,
      waistline:that.data.weight,
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
  deles:function(e){
    this.setData({
      isModels:false
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