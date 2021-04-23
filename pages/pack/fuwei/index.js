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
      xid:options.xid
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
    var that = this
    if(!that.data.onlods){
    
      that.setData({
        onlods:true
      })
      return
    }
    const value = e.detail.value;
    const key = e.currentTarget.id;
    const data = {};
    data[key] = value;
    this.setData(data);
  },
  submitens:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '基本信息确认无误请点击保存进行提交',
      cancelColor:'再看看',
      confirmText:'保存',
      cancelText:'取消',
      cancelColor:'#000000',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        
          var url = app.globalData.url + '/joinCamp/saveBase';
          var data = {
            user_id:app.globalData.user_id,
            waist:that.data.weight,
            step:7,
            piece:1,
            aim:7,
            id:that.data.jid?that.data.jid:''
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              wx.reLaunch({
                url: '/pages/page/listxinxi/index',
              })
            } else {
              wx.showToast({
                title: res.msg,
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this
		var url = app.globalData.url + '/camper/getBaseByUser';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
       that.setData({
         jid:res.data.id,
         weight :res.data.waist?res.data.waist:85,
       })
      } else {
        wx.showToast({
          title: res.msg,
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