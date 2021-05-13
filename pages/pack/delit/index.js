// pages/delit/index.js
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
    console.log(options)
    this.setData({
      typeid:options.typeid,
      orderId:options.orderId
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/getOrderInfoById';
    var data = {
      id:options.id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          orderlist:res.data
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
  },
  copy(e){
    wx.setClipboardData({
        data: e.currentTarget.dataset.code,
        success: function (res) {
            wx.getClipboardData({
                success: function (res) {
                    wx.showToast({
                        title: '复制成功'
                    })
                }
            })
        }
    })
},
  querenFn:function(e){
    
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认收货',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          var url = app.globalData.url + '/api/takeOrder';
          var data = {
            orderNum: e.currentTarget.dataset.code
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              that.setData({
                movieList: [],
                page: 1,
                pageSize: 15,
              })
              that.getMore()
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  wuliu:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/wuliudelit/index?code=' + this.data.orderlist.deliveryId ,
    })
  },
  lijiFn:function(e){
    wx.reLaunch({
      url: '/pages/pack/campTwo/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  bincapadd:function(e){
    wx.showToast({
      title: '生成订单后不可修改',
      icon:'none'
    })
  },
  deleorder:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该订单么',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var url = app.globalData.url + '/orderc/deleteOrder';
          var data = {
            id:that.data.orderlist.id,
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              wx.navigateBack({
                delta: 1,
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  tabtixin:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/remindDelivery';
    var data = {
      orderNum: e.currentTarget.dataset.code
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '提醒成功',
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
  },
  zaicinioad:function(e){
   wx.reLaunch({
     url: '/pages/pack/camp/index',
   })
  },
  wapyzhi:function(e){
    var that = this
    var url = app.globalData.url + '/wxPay/pay';
    var data = {
      // cost: 0.01,
       cost:  this.data.orderlist.cost,
      openid: app.globalData.openId,
      orderId:this.data.orderlist.id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)

      wx.requestPayment({
        'timeStamp': res.timestamp,
        'nonceStr': res.nonce_str,
        'package': res.package,
        'signType': 'MD5',
        'paySign': res.sign,
        'success': function (res) {
          console.log(res);
          wx.showToast({
            title: "支付成功",
          })
          wx.redirectTo({
            url: '/pages/pack/delit/index?orderId=' + that.data.orderlist.id + '&typeid=' + that.data.typeid + '&id=' + that.data.orderlist.id ,
          })
        },
        'fail': function (res) {
          console.log(res)
          wx.showToast({
            title: "支付失败",
            icon:'none'
          })
        }
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
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