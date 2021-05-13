// pages/campThree/index.js
// import IMController from '../../../controller/im.js'
// import { connect } from '../../../redux/index.js'
// import formatTime from '../../../utils/util.js'
let app = getApp()
let store = app.store
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
    console.log(app.globalData.startTinmesr)
    console.log(app.globalData.startDate)
    this.gettime()
  },
  gettime() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    console.log(176,M)
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //获取当日时
    var H = date.getHours()<10?'0'+ date.getHours():date.getHours()
    //获取当日分
    var S = date.getMinutes()<10?'0'+ date.getMinutes():date.getMinutes()
    this.startDate = Y + '-' + M + '-' + D
    this.date = Y + '-' + M + '-' + D
    this.hour = H + ':'+ S
    this.time = H + ':'+ S
    this.startYear = Y
    this.startTinmesr = H + ':' + S

    console.log("当前时间：" + Y + '-' + M + '-' + D  , this.startDate);
  },

  huizhang:function(e){
    wx.navigateTo({
      url: '/pages/pack/huizhang/index',
    })
  },
  jifenmx:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/scorlji/index',
    })
  },
  jiakang:function(e){
    wx.reLaunch({
      url: '/pages/page/jiangkangda/index',
    })
  },
  nizhuan:function(e){
    wx.reLaunch({
      url: '/pages/pack/campThree/index',
    })
  },
  shujutimeFn:function(e){
    // wx.requestSubscribeMessage({
    //   tmplIds: ['UHlhSupKI9tEHvl15hgS7tB3zqgcqFcCaWebuOnl67M','1q7XE7jETEGjw2TizIq0PaxpptbnujTtJc_DUv7ItWk','UWBuUG3Ujl4tP2Bu5qIZ1CbFa7BxP6tXBLPKtG4rtds'],
    //   success (res) {
    //     console.log(res)
    //     wx.navigateTo({
    //       url: '/pages/guanli/index',
    //     })

    //    }
    // })
    wx.navigateTo({
      url: '/pages/pagetwo/timesetimeo/index',
    })
  },
  foedsIndex:function(e){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  memysql:function(e){
    wx.reLaunch({
      url: '/pages/page/mesqlistshu/index',
    })
  },
  clickFns:function(e){
    if(e.currentTarget.dataset.id==1){
      wx.navigateTo({
        url: '/pages/pagetwo/yinshirj/index',
      })
    }
    if(e.currentTarget.dataset.id==2){
      wx.navigateTo({
        url: '/pages/page/jinriyundong/index',
      })
    }
    if(e.currentTarget.dataset.id==3){
      wx.navigateTo({
        url: '/pages/pagetwo/yongyaojilu/index',
      })
    }
    if(e.currentTarget.dataset.id==4){
      wx.navigateTo({
        url: '/pages/pagetwo/zhunjiajt/index',
      })
    }
    if(e.currentTarget.dataset.id==5){
      wx.navigateTo({
        url: '/pages/pagetwo/xinliliaoyu/index',
      })
    }
    if(e.currentTarget.dataset.id==6){
      wx.navigateTo({
        url: '/pages/pack/duibizhaopian/index',
      })
    }
    if(e.currentTarget.dataset.id==7){
      wx.navigateTo({
        url: '/pages/pack/huayan/index',
      })
    }
    if(e.currentTarget.dataset.id==8){
      wx.navigateTo({
        url: '/pages/page/jianchan/index',
      })
    }
  },
  zaixianFn:function(e){
    wx.reLaunch({
      url: '/pages/pagetwo/zaixianzixun/index',
    })
  },
  xieqgoFn: function (e) {
    if(e.currentTarget.dataset.id==1||e.currentTarget.dataset.id==2){
      wx.navigateTo({
        url: '/pages/pagetwo/xuetang/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==3){
      wx.navigateTo({
        url: '/pages/page/jiluxieya/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==4){
      wx.navigateTo({
        url: '/pages/pagetwo/tizhongjiance/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==5){
      wx.navigateTo({
        url: '/pages/page/jilifuwei/index?id=' + e.currentTarget.dataset.id,
      })
    }
    if(e.currentTarget.dataset.id==6){
      wx.navigateTo({
        url: '/pages/page/jiluganshou/index?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  goFnxie:function(e){
    wx.navigateTo({
      url: '/pages/page/jiluxieya/index',
    })
  },
  qutizhangFn:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/tizhongjiance/index',
    })
  },
  quwanchfu:function(e){
    wx.navigateTo({
      url: '/pages/page/jilifuwei/index',
    })
  },
  subGoganshou:function(e){
    wx.navigateTo({
      url: '/pages/page/jiluganshou/index',
    })
  },
  jialilist:function(e){
    wx.reLaunch({
      url: '/pages/page/jiapage/index',
    })
  },
  shenJi:function(e){
    wx.navigateTo({
      url: '/pages/pack/shenJi/index?pid=' + this.data.userList.productId,
    })
  },
  chongxiRuyin:function(e){
    wx.reLaunch({
      url: '/pages/pack/camp/index',
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
        app.globalData.doctorId = res.data.userData.doctorId,
        app.globalData.dietitianId = res.data.userData.dietitianId,
        that.setData({
          userList:res.data.userData
        })
        var arr = res.data.userData.endTime
        var date = new Date(arr.replace(/-/g, '/'));
        console.log(date)
        // 到期时间
        var time1 = date.getTime();
        // 当前时间
        var timestamp = Date.parse(new Date());
        console.log(time1)
        console.log(timestamp)
        // 到期后三天
        var timestampTwo = time1 + 259200000
        // 判断是否到期
        if(time1<timestamp){
          that.setData({
            isGuo:true
          })
        }
        // 判断到期后是否过3天续费时间
        if(timestampTwo<timestamp){
          that.setData({
            isThree:true
          })
        }else{
          var timeMl =(timestampTwo - timestamp)/86400000
          var timeMli = Math.ceil(timeMl)
          console.log(Math.ceil(timeMl))
          this.setData({
            timeMli:timeMli
          })
        }
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
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/selectTodayTaskByUserId';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          listdaywu:res.data
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
    // app.globalData.nim.destroy({
    //   done: function () {
    //     console.log('destroy nim done !!!')
    //     wx.hideLoading()
    //   }
    // })
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

  },
})
