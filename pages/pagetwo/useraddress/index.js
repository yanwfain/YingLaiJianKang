// pages/useraddress/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    region:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
  },
  detailInfo:function(e){
   this.setData({
    detailInfo:e.detail.value
   })
  },
  userName:function(e){
    this.setData({
      userName:e.detail.value
    })
   },
   telNumber:function(e){
    this.setData({
      telNumber:e.detail.value
    })
   },
   
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  bindfocus1: function (e) {
    this.setData({
      showId: e.currentTarget.dataset.id
    })
  },
  bindfocusone: function (e) {
    if (this.data.showId == 1) {
      this.setData({
        userName: ''
      })
    }
    if (this.data.showId == 2) {
      this.setData({
        telNumber: ''
      })
    }
    if (this.data.showId == 3) {
      this.setData({
        detailInfo: ''
      })
    }
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  submitens:function(e){
    if(!this.data.userName){
      wx.showToast({
        title: '请输入收货人',
        icon:'none'
      })
      return
    }
    if(!this.data.telNumber){
      wx.showToast({
        title: '请输入手机号',
        icon:'none'
      })
      return
    }
    if(this.data.telNumber.length!=11){
      wx.showToast({
        title: '请输入11位手机号',
        icon:'none'
      })
      return
    }
    if(!this.data.city){
      if(this.data.region.length<1){
        wx.showToast({
          title: '请选择城市地区',
          icon:'none'
        })
        return
      }
    }
    if(!this.data.detailInfo){
      wx.showToast({
        title: '请输入详细地址',
        icon:'none'
      })
      return
    }
    var that = this
		var url = app.globalData.url + '/joinCamp/saveSelf';
    var data = {
      user_id:app.globalData.user_id,
      name:that.data.userName,
      phone:that.data.telNumber,
      consignee_name:that.data.userName,
      consignee_phone:that.data.telNumber,
      city:that.data.region[0]?that.data.region[0]+'/'+that.data.region[1]+'/' + that.data.region[2]:that.data.city,
      address:that.data.detailInfo,
      step:2,
      piece:1,
      aim:7,
      id:that.data.jid?that.data.jid:''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pack/delitsriqi/index',
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
  binaddress: function (e) {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
        if (res.authSetting['scope.address']) {
          console.log("111")
          wx.chooseAddress({
            success(res) {
              that.setData({
                userName:res.userName,
                detailInfo:res.detailInfo,
                telNumber:res.telNumber,
                'region[0]':res.provinceName,
                'region[1]':res.cityName,
                'region[2]':res.countyName,
              })
              console.log(res.userName)
              console.log(res.postalCode)
              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              console.log(res.nationalCode)
              console.log(res.telNumber)
            }
          })
    
        } else {
          if (res.authSetting['scope.address'] == false) {
            console.log("222")
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)
              }
            })
          } else {
            console.log("eee")
            wx.chooseAddress({
              success(res) {
                console.log(res.userName)
                console.log(res.postalCode)
                console.log(res.provinceName)
                console.log(res.cityName)
                console.log(res.countyName)
                console.log(res.detailInfo)
                console.log(res.nationalCode)
                console.log(res.telNumber)
              }
            })
          }
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
		var url = app.globalData.url + '/camper/getSelfByUser';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
       that.setData({
         jid:res.data.id,
         userName:res.data.name,
         telNumber:res.data.phone,
         userName:res.data.consignee_name,
         telNumber:res.data.consignee_phone,
         city:res.data.city,
         detailInfo:res.data.address,
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