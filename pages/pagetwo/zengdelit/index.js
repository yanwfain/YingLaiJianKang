// pages/zengdelit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartIdslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      txtOne:options.txtOne,
      cost:options.picker,
      specifications:options.specifications,
      typeids:options.typeids,
      shopid:options.shopid,
      bid:options.bid,
     
      gouche:JSON.parse(options.gouche),
      ltxt:options.ltxt,
      unique:options.unique
    })
    if(options.gouche){
      this.setData({
        cartIdslist:JSON.parse(options.gouche),
      })
    }
    if(this.data.shopid){
      var that = this
      var url = app.globalData.url + '/api/cart/add';
      var data = {
        userId:app.globalData.user_id,
        productId:this.data.shopid,
        cartNum :this.data.cartNum?this.data.cartNum:'1',
        isNew:1,
        // productAttrUnique:options.unique
      }
      if(this.data.typeids){
        // data.specifications= 2
        // data.giftcard=1
      } else{
        data.productAttrUnique = options.unique
      }
      
      
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          that.data.cartIdslist.push(res.data.cartId)
          that.setData({
            cartIds:res.data.cartId,
            cartIdslist: that.data.cartIdslist
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
    }
    if(this.data.gouche){
      var that = this
      var url = app.globalData.url + '/api/order/confirm';
      var data = {
        userId:app.globalData.user_id,
        cartIds:this.data.cartIdslist
  
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
    }
   
  },
  deNolFn:function(e){
    wx.showToast({
      title: '不满足条件无法使用',
      icon:'none'
    })
  },
  chckedFn:function(e){
    this.setData({
      pickerYou:e.currentTarget.dataset.couponprice,
      youId:e.currentTarget.dataset.id
    })
  },
  queFn:function(e){
    wx.showLoading({
      title: '加载中',
    })

    var that = this
    var url = app.globalData.url + '/api/order/computedOrder';
    var data = {
      userId:app.globalData.user_id,
      cartIds:this.data.cartIdslist,
      couponId:this.data.youId
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          tidpicker:1,
          pickerCont:res.data,
          pickerYouindex:this.data.pickerYou,
          youIdindex:this.data.youId,
          modelis:false
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
  deledishide:function(e){
    this.setData({
      modelis:false
    })
  },
  deleyouFn:function(e){
    this.setData({
      pickerYou:'',
      pickerYouindex:'',
      youIdindex:'',
      modelis:false,
      tidpicker:''
    })
  },
  clickYouFn:function(e){
    this.setData({
      modelis:true
    })
  },
  bincapadd:function(e){
    wx.navigateTo({
      url: '/pages/pack/addresslist/index',
    })
  },
  userRemark:function(e){
    this.setData({
      userRemark:e.detail.value
    })
  },
  submit:function(e){
    if(!this.data.userAdder){
      wx.showToast({
        title: '请选择地址',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/order/create';
    var data = {
      userId: app.globalData.user_id,
      receiver:that.data.userAdder.receiver,
      zone:that.data.userAdder.zone +that.data.userAdder.address ,
      phone:that.data.userAdder.phone,
      // userRemark:this.data.userRemark?this.data.userRemark:'', //备注
      // couponId:this.data.couponId?this.data.couponId:'', //优惠劵id
      cartIds:this.data.cartIdslist,
    }
    if(this.data.typeids){
      data.orderType = 3
      data.giftcard = this.data.bid
      data.specifications = that.data.specifications
    }
    if(!this.data.typeids){
      data.orderType =1
      data.userRemark = this.data.userRemark?this.data.userRemark:'' //备注
      data.couponId = this.data.youId?this.data.youId:'' //优惠劵id
    }
    app.wxRequest('POST', url, data, (res1) => {
      console.log(res1)
      wx.hideLoading()
      if (res1.success) {
        var url = app.globalData.url + '/wxPay/pay';
        var data = {
          cost:that.data.contldelit.cost,
           // cost:  this.data.cost,
          openid: app.globalData.openId,
          orderId:res1.data.id
        }
        if(that.data.tidpicker){
          data.cost = that.data.pickerCont.cost
        }else{
          data.cost = that.data.contldelit.cost
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
              if(that.data.specifications){
                setTimeout(function (e) {
                  wx.redirectTo({
                    url: '/pages/pack/delit/index?typeid=' + 2+ '&id=' + res1.data.id,
                  })
                }, 800)
              }else{
                if(that.data.tidpicker){
                  setTimeout(function (e) {
                    wx.redirectTo({
                      url: '/pages/pack/chengtrue/index?cost=' + that.data.pickerCont.cost + '&id=' + res1.data.id
                    })
                  }, 800)
                }else{
                  setTimeout(function (e) {
                    wx.redirectTo({
                      url: '/pages/pack/chengtrue/index?cost=' + that.data.contldelit.cost + '&id=' + res1.data.id
                    })
                  }, 800)
                }
               
              }
            },
            'fail': function (res) {
              console.log(res)
              wx.showToast({
                title: "支付失败",
                icon:'none'
              })
              setTimeout(function (e) {
                wx.redirectTo({
                  url: '/pages/pack/delit/index?typeid=' + 2+ '&id=' + res1.data.id,
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
          title: res.data,
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
    var url = app.globalData.url + '/orderc/getUserInuse';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          userAdder:res.data
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
    if(this.data.unique){
      var that = this;
      var url = app.globalData.url + '/api/getCouponsListByUserId';
      var data = {
        userId:app.globalData.user_id,
      }
      app.wxRequest('GET', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          that.setData({
            noOverdueList:res.data.noOverdueList,
            expiredList:res.data.expiredList,
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
      })
    }
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