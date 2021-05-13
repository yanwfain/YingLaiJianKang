// pages/binlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    canvasHeidht: wx.getSystemInfoSync().windowHeight - 46,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      time:options.time
    })
  },
  clickdels:function(e){
    this.setData({
      isfied:true
    })
  },
    // 手写签名
  onHnadwritingComplete:function(e){
    console.log(e)
    this.setData({
      isfied:false,
      imgurl:e.detail
    })
  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  clckcheckbox:function(e){
    this.setData({
      checked:!this.data.checked?true:false
    })
  },
  delsfn:function(e){
    wx.redirectTo({
      url: '/pages/index/index',
    })
      // success: function (e) { 
      //   console.log(e)
      //   // var page = getCurrentPages().pop(); 
      //   // if (page == undefined || page == null) return; 
      //   // page.onLoad(); 
      // } 
    this.setData({
      ismodelsub:false
    })
  },
  xiapageFn:function(e){
    if(!this.data.checked){
      wx.showToast({
        title: '请阅读并勾选用户协议',
        icon:'none'
      })
      return
    }
    if(!this.data.imgurl){
      wx.showToast({
        title: '请完善手写签名',
        icon:'none'
      })
      return
    }
    var str = this.data.time
    var arr = str.split(/[ ]+/);
    var that = this
    console.log(arr)

    wx.showLoading({
      title:'上传中'
    })
    console.log(that.data.imgurl)
    wx.uploadFile({
      url: app.globalData.url + '/imgUpload/upload',      //此处换上你的接口地址
      filePath: that.data.imgurl,
      name: 'upload',
      formData: {
        'user': 'test'  //其他额外的formdata，可不写
      },
      success: function (res) {
        wx.showLoading({
          title: '上传中.',
        })
        if (res.statusCode == 200) {
       
          var datas = JSON.parse(res.data);
          var url = app.globalData.url + '/joinCamp/saveTreatment';
          var data = {
            user_id:app.globalData.user_id,
            day:arr[0],
            clock:arr[1],
            autograph:datas.data
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              that.setData({
                ismodelsub:true
              })
            } else {
              wx.showToast({
                title: res.data,
                icon:'none'
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
      },
      fail: function (res) {
        console.log('fail');
        console.log(res)
        wx.hideLoading({
          success: (res) => { },
        })
      },
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