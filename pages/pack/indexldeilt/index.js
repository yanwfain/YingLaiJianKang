// pages/indexldeilt/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clid:1,
    banner: [
      {
        img: 'http://47.94.16.158:8001/13.jpg'
      },
      {
        img: 'http://47.94.16.158:8001/13.jpg'
      },
      {
        img: 'http://47.94.16.158:8001/13.jpg'
      },
      {
        img: 'http://47.94.16.158:8001/13.jpg'
      }
    ],
  },
  btnsubmit:function(e){
    if(this.data.status>0){
      wx.showToast({
        title: '您已加入',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
        url: '/pages/pack/camp/index',
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: app.globalData.status,
      clid:options.id
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/getMarketingarticleType';
    var data = {
   
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          indexpage:res.data
        })
        var url = app.globalData.url + '/api/getMarketingarticleByTypeId';
        var data = {
          typeId:options.id
        }
        app.wxRequest('get', url, data, (res) => {
          console.log(res)
          wx.hideLoading()
      
          if (res.success) {
            if(res.data.shufflingImg){
              res.data.shufflingImg =   res.data.shufflingImg.split(',')
            }
            if(res.data.referenceAddress){
              res.data.referenceAddress =   res.data.referenceAddress.split(',')
            }
           
            console.log( res.data.shufflingImg )
            that.setData({
              pagedelit:res.data
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
  clockTba:function(e){
    this.setData({
      clid:e.currentTarget.dataset.id
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/getMarketingarticleByTypeId';
    var data = {
      typeId:e.currentTarget.dataset.id
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        if(res.data.shufflingImg){
          res.data.shufflingImg =   res.data.shufflingImg.split(',')
        }
        if(res.data.referenceAddress){
          res.data.referenceAddress =   res.data.referenceAddress.split(',')
        }
        that.setData({
          pagedelit:res.data
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
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据内容
      data: e.currentTarget.dataset.url,
      success: function (res) {
        wx.showToast({
          title: '链接复制成功',
        });
      }
    });
},
copyBtn1: function (e) {
  var that = this;
  wx.setClipboardData({
    //准备复制的数据内容
    data: e.currentTarget.dataset.url,
    success: function (res) {
      wx.showToast({
        title: '链接复制成功',
      });
    }
  });
},
copyBtn2: function (e) {
  var that = this;
  wx.setClipboardData({
    //准备复制的数据内容
    data: e.currentTarget.dataset.url,
    success: function (res) {
      wx.showToast({
        title: '链接复制成功',
      });
    }
  });
},
copyBtn3: function (e) {
  var that = this;
  wx.setClipboardData({
    //准备复制的数据内容
    data: e.currentTarget.dataset.url,
    success: function (res) {
      wx.showToast({
        title: '链接复制成功',
      });
    }
  });
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