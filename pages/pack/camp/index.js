// pages/camp/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islistpick:true,
    isgoudw:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    })
    var that = this
    var url = app.globalData.url + '/sales/getGoodsLis';
    var data = {
      user_id:app.globalData.user_id,
      
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          listshop:res.data
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
    //预览图片，放大预览
    preview(event) {
      console.log(event.currentTarget.dataset.src)
      let currentUrl = event.currentTarget.dataset.img
      var list =[]
      list.push(currentUrl)
      wx.previewImage({
        current: currentUrl, // 当前显示图片的http链接
        urls: list // 需要预览的图片http链接列表
      })
    },
  submitnotation:function(e){
    if(this.data.tid==0){
      this.setData({
        tid:9999
      })
    }
  
    if(!this.data.tid){
      wx.showToast({
        title: '请选择逆转营方案',
        icon:'none'
      })
      return
    }
    if(!this.data.cid){
      wx.showToast({
        title: '请选择使用方式',
        icon:'none'
      })
      return
    }
    if(this.data.cid==2){
      if(!this.data.bid){
        wx.showToast({
          title: '请选择礼品卡样式',
          icon:'none'
        })
        return
      }
    }
    // bid: e.currentTarget.dataset.id,
    // ltxt:e.currentTarget.dataset.txt
    if(this.data.cid==1){
      wx.navigateTo({
        url: '/pages/pagetwo/zidelit/index?txtOne=' + this.data.txtOne + '&picker=' + this.data.picker + '&shopid=' + this.data.tid + '&typeids=' + 1 + '&specifications=' + 1,
      })
    }
    if(this.data.cid==2){
      wx.navigateTo({
        url: '/pages/pagetwo/zengdelit/index?txtOne=' + this.data.txtOne + '&picker=' + this.data.picker + '&specifications=' + 2 + '&shopid=' + this.data.tid + '&typeids=' + 1 + '&bid=' + this.data.bid + '&ltxt=' + this.data.ltxt,
      })
    }
  
  },
  tabOne:function(e){
    
    this.setData({
      tid: e.currentTarget.dataset.id,
      txtOne:e.currentTarget.dataset.txt,
      picker:e.currentTarget.dataset.picker
    })
    wx.showLoading({
      title:'加载中'
    })
    var that = this
    var url = app.globalData.url + '/api/selectGiftCardList';
    var data = {
      type:e.currentTarget.dataset.id
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          listshopimg:res.data
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
  tabTwo:function(e){

    if(this.data.userList.status!=0&&this.data.userList.status&&e.currentTarget.dataset.id==1){
      wx.showToast({
        title: '您目前已经是入营状态',
        icon:'none'
      })
      return
    }
    this.setData({
      cid: e.currentTarget.dataset.id,
      txtTwo:e.currentTarget.dataset.txt
    })
  },
  tabThree:function(e){
    this.setData({
      bid: e.currentTarget.dataset.id,
      ltxt:e.currentTarget.dataset.txt
    })
  },
  subMold:function(e){
    this.setData({
      isModel:true
    })
  },
  catabs:function(e){
    this.setData({
      isModel:false
    })
  },
  indexFn:function(e){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  collegeFn:function(e){
    wx.redirectTo({
      url: '/pages/pack/college/index',
    })
  },
  campFn:function(e){
    wx.redirectTo({
      url: '/pages/pack/camp/index',
    })
  },
  shoppingFn:function(e){
    wx.redirectTo({
      url: '/pages/pagetwo/shopping/index',
    })
  },
  myFn:function(e){
    wx.redirectTo({
      url: '/pages/page/my/index',
    })
  },
  jihuoorderFn:function(e){
    // if(this.data.userList.status!=0&&this.data.userList.status){
    //   wx.showToast({
    //     title: '您目前已经是入营状态',
    //     icon:'none'
    //   })
    //   return
    // }
    wx.navigateTo({
      url: '/pages/pack/activation/index',
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
    var url = app.globalData.url + '/api/getUserInfo';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          userList:res.data.userData
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    this.onShow()
    wx.stopPullDownRefresh()
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