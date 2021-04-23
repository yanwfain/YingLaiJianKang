// pages/addAddress/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.goid){
        this.setData({
          goid:options.goid,
          id:options.id
        })
        var that = this
        var url = app.globalData.url + '/orderc/getAddressById';
        var data = {
          id:options.id
        }
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          wx.hideLoading()
          if (res.success) {
            that.setData({
              userName:res.data.receiver,
              telNumber:res.data.phone,
              zone:res.data.zone,
              detailInfo:res.data.address,
              
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

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  deleFn:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址么',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '删除中',
          })
        
          var url = app.globalData.url + '/orderc/deleteAddress';
          var data = {
            id:that.data.id
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.success) {
              wx.navigateBack({
                delta:1,  // 返回上上一级页面。
                success: function () {
                  console.log('成功！')
                }
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
  addressFn:function(e){
  
    var that = this
    if(!that.data.userName){
      wx.showToast({
        title: '请填写收货人姓名',
        icon:'none'
      })
      return
    }
    if(!that.data.telNumber){
      wx.showToast({
        title: '请填写收货人手机号',
        icon:'none'
      })
      return
    }
    if(!that.data.zone){
      if(that.data.region.length<1){
        wx.showToast({
          title: '请选择城市',
          icon:'none'
        })
        return
      }
    }
   
    if(!that.data.detailInfo){
      wx.showToast({
        title: '请填写详细地址',
        icon:'none'
      })
      return
    }
    // let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
    // let prevPage = pages[pages.length - 3]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。                  
    // prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
    //   userName:that.data.userName,
    //   provinceName:that.data.region[0],
    //   cityName:that.data.region[1],
    //   countyName:that.data.region[2],
    //   detailInfo:that.data.detailInfo,
    //   telNumber:that.data.telNumber
    // })
    var that = this
    var url = app.globalData.url + '/orderc/saveAddress';
    var data = {
      id:that.data.id?that.data.id:'',
      user_id:app.globalData.user_id,
      address:that.data.detailInfo,
      zone:that.data.region[0]?that.data.region[0] + that.data.region[1]  + that.data.region[2] :that.data.zone,
      status:1,
      phone:that.data.telNumber,
      receiver:that.data.userName
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateBack({
          delta:2,  // 返回上上一级页面。
          success: function () {
            console.log('成功！')
          }
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
                'region[0]':res.provinceName,
                'region[1]':res.cityName,
                'region[2]':res.countyName,
                detailInfo:res.detailInfo,
                telNumber:res.telNumber
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