
// pages/rixietang/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageid:options.pageid
    })
  },
  submiiti:function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/updateUserCamperMedicine';
    var data = {
      userId:app.globalData.user_id,
      cold:that.data.tab1?that.data.tab1:'',
      scorched:that.data.tab2?that.data.tab2:'',
      sweating:that.data.tab3?that.data.tab3:'',
      phlegm:that.data.tab4?that.data.tab4:'',
      throat:that.data.tab5?that.data.tab5:'',
      stool:that.data.tab6?that.data.tab6:'',
      ecchymosis:that.data.tab7?that.data.tab7:'',
      sighing:that.data.tab8?that.data.tab8:'',
      allergy:that.data.tab9?that.data.tab9:'',
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
      wx.navigateBack({
        delta: 1,
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
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  tab1:function(e){
      this.setData({
        tab1:e.currentTarget.dataset.id

      })
  },
  tab2:function(e){
    this.setData({
      tab2:e.currentTarget.dataset.id

    })
},
tab3:function(e){
  this.setData({
    tab3:e.currentTarget.dataset.id

  })
},
tab4:function(e){
  this.setData({
    tab4:e.currentTarget.dataset.id

  })
},
tab5:function(e){
  this.setData({
    tab5:e.currentTarget.dataset.id

  })
},
tab6:function(e){
  this.setData({
    tab6:e.currentTarget.dataset.id

  })
},
tab7:function(e){
  this.setData({
    tab7:e.currentTarget.dataset.id

  })
},
tab8:function(e){
  this.setData({
    tab8:e.currentTarget.dataset.id

  })
},
tab9:function(e){
  this.setData({
    tab9:e.currentTarget.dataset.id

  })
},
  baocunsx:function(e){
    var that = this
    var url = app.globalData.url + '/joinCamp/saveMedicine';
    var data = {
      user_id:app.globalData.user_id,
      cold:that.data.tab1?that.data.tab1:'',
      scorched:that.data.tab2?that.data.tab2:'',
      sweating:that.data.tab3?that.data.tab3:'',
      phlegm:that.data.tab4?that.data.tab4:'',
      throat:that.data.tab5?that.data.tab5:'',
      stool:that.data.tab6?that.data.tab6:'',
      ecchymosis:that.data.tab7?that.data.tab7:'',
      sighing:that.data.tab8?that.data.tab8:'',
      allergy:that.data.tab9?that.data.tab9:'',
      step:7,
      piece:2,
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
   
  
  },
  xiapageFn:function(e){
    if(!this.data.tab1||!this.data.tab2||!this.data.tab3||!this.data.tab4||!this.data.tab5||!this.data.tab6||!this.data.tab7||!this.data.tab8||!this.data.tab9){
      wx.showToast({
        title: '请完善信息',
        icon:'none'
      })
      return
    }
    var that = this
    var url = app.globalData.url + '/joinCamp/saveMedicine';
    var data = {
      user_id:app.globalData.user_id,
      cold:that.data.tab1?that.data.tab1:'',
      scorched:that.data.tab2?that.data.tab2:'',
      sweating:that.data.tab3?that.data.tab3:'',
      phlegm:that.data.tab4?that.data.tab4:'',
      throat:that.data.tab5?that.data.tab5:'',
      stool:that.data.tab6?that.data.tab6:'',
      ecchymosis:that.data.tab7?that.data.tab7:'',
      sighing:that.data.tab8?that.data.tab8:'',
      allergy:that.data.tab9?that.data.tab9:'',
      step:7,
      piece:2,
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
    var that = this
   
		var url = app.globalData.url + '/camper/getMedicineByUser';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
        that.setData({
          tab1:res.data.cold?res.data.cold:'',
          tab2:res.data.scorched?res.data.scorched:'',
          tab3:res.data.sweating?res.data.sweating:'',
          tab4:res.data.phlegm?res.data.phlegm:'',
          tab5:res.data.throat?res.data.throat:'',
          tab6:res.data.stool?res.data.stool:'',
          tab7:res.data.ecchymosis?res.data.ecchymosis:'',
          tab8:res.data.sighing?res.data.sighing:'',
          tab9:res.data.allergy?res.data.allergy:'',
          jid:res.data.id?res.data.id:''
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