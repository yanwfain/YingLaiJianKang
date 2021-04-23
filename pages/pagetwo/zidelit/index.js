// pages/zidelit/index.js
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
      txtOne:options.txtOne,
      cost:options.picker,
      specifications:options.specifications,
      typeids:options.typeids,
      shopid:options.shopid,
    })
    var that = this
    var url = app.globalData.url + '/api/cart/add';
    var data = {
      userId:app.globalData.user_id,
      productId:this.data.shopid,
      cartNum :this.data.cartNum?this.data.cartNum:'1',
      isNew:1,
    }
    if(this.data.typeids){
      // data.specifications= 2
      // data.giftcard=1
    } 
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          cartIds:res.data.cartId
        })
        var url = app.globalData.url + '/api/order/confirm';
        var data = {
          userId:app.globalData.user_id,
          cartIds:res.data.cartId
    
        }
        
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          wx.hideLoading()
          if (res.success) {
            that.setData({
              pagedelit:res.data.cartList,
              contldelit:res.data
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/order/create';
    var data = {


      userId: app.globalData.user_id,
  
      // userRemark:this.data.userRemark?this.data.userRemark:'', //备注
      // couponId:this.data.couponId?this.data.couponId:'', //优惠劵id
      cartIds:this.data.cartIds,
      orderType : 0,
      giftcard : this.data.bid? this.data.bid:'',
      specifications : that.data.specifications
    }
    app.wxRequest('POST', url, data, (res1) => {
      console.log(res1)
      wx.hideLoading()
      if (res1.success) {
        var url = app.globalData.url + '/wxPay/pay';
        var data = {
          cost: that.data.contldelit.cost,
          // cost:  this.data.cost,
         
          openid: app.globalData.openId,
          orderId:res1.data.id
        }
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)

          wx.requestPayment({
            'timeStamp': res.timestamp,
            'nonceStr': res.nonce_str,
            'package': res.package,
            'signType': 'MD5',
            // 'package': res.data.paySign.packageValue,
            'paySign': res.sign,
            'success': function (res) {
              console.log(res);
              wx.showToast({
                title: "支付成功",
              })
              setTimeout(function (e) {
                wx.navigateTo({ 
                  url: '/pages/pack/delit/index?typeid=' + 1 + '&id=' + res1.data.id,
                })
              }, 800)
            },
            'fail': function (res) {
              console.log(res)
              wx.showToast({
                title: "支付失败",
                icon:'none'
              })
              setTimeout(function (e) {
                wx.navigateTo({
                  url: '/pages/pack/delit/index?typeid=' + 1 + '&id=' + res1.data.id,
                })
              }, 800)

            }
          })
        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
          console.log(err.errMsg)
        })
      } else {
        wx.showToast({
          title: res1.data,
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