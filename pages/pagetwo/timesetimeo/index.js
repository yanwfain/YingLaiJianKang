// pages/timesetimeo/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: {
      day: '',
      hour: '',
      minute: '',
      second: ''
    },
    is_timestatus:true,
    isok:false,
    isChecked1:false,
    isChecked2:false,
    arr :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    // var serverTime = timestamp / 1000;
    var serverTime = timestamp +7200000  ;
    this.startCountdown(serverTime)//倒计时调用
    wx.showLoading({
      title: '加载中',
    })
   
  },
  submtin:function(e){
    var that = this
    clearInterval(that.data.interval);
    var timestamp = Date.parse(new Date());
    // var serverTime = timestamp / 1000;
    var serverTime = timestamp +7200000  ;
    this.setData({
      isok:!this.data.isok?true:false
    })
    this.startCountdown(serverTime,this.data.isok)//倒计时调用
  },
  changeSwitch1: function (e) {
    console.log(e)
    this.setData({
      isChecked1: e.detail.value
    })
  },
  changeSwitch2: function (e) {
    console.log(e)
    this.setData({
      isChecked2: e.detail.value
    })
    wx.showLoading({
      title: '加载中',
    })
    var that =this
    var url = app.globalData.url + '/api/updateMeasurementReminder';
    var data = {
      id:e.target.dataset.id,
      isOpen:e.target.dataset.isopen==0?1:0
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
       
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
    // this.data.arr[e.target.dataset.index].chend = e.detail.value
   
    // this.setData({
    //   arr: this.data.arr
    // })
  },
  startCountdown: function (endTime,isok) {
    if (!endTime){
      this.setData({
        is_timestatus: false
      })
      return
    }
   
    var that = this;
    var timestamp = Date.parse(new Date());
    // var serverTime = timestamp / 1000;
    var serverTime = timestamp ;
    
    console.log(serverTime)
    console.log(timestamp)
    console.log(endTime)
    // var millisecond = (endTime - serverTime) * 1000;
    var millisecond = endTime - serverTime;
    // var millisecond =10000;
    console.log(millisecond)
    
    that.transformRemainTime(millisecond);
    if(!isok){
      return
    }
    that.setData({
      interval: setInterval(function () {
        // console.log('循环中');
        millisecond -= 1000;
        if (millisecond <= 0) {
          clearInterval(that.data.interval);
          that.setData({
            countdown: {
              day: '00',
              hour: '00',
              minute: '00',
              second: '00'
            },
            is_timestatus: false
          });
          return;
        }

        that.transformRemainTime(millisecond);
      }, 1000)
    })
  
  },
  // 剩余时间(毫秒)处理转换时间
  transformRemainTime: function (millisecond) {
    var that = this;
    var countdownObj = that.data.countdown;
    // 秒数
    var seconds = Math.floor(millisecond / 1000);
    // 天数
    countdownObj.day = that.formatTime(Math.floor(seconds / 3600 / 24));
    // 小时
    countdownObj.hour = that.formatTime(Math.floor(seconds / 3600 % 24));
    // 分钟
    countdownObj.minute = that.formatTime(Math.floor(seconds / 60 % 60));
    // 秒
    countdownObj.second = that.formatTime(Math.floor(seconds % 60));
    that.setData({
      countdown: countdownObj
    });
  },
  //格式化时间为2位
  formatTime: function (time) {
    if (time < 10)
      return '0' + time;
    return time;
  },
  goshop:function(e){
    wx.navigateTo({
      url: '/pages/shopicker/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    var that = this
    clearInterval(that.data.interval);
  },
  submitAdd:function(e){
    wx.navigateTo({
      url: '/pages/pack/addtixin/index',
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
    var that =this
    var url = app.globalData.url + '/api/selectMeasurementReminderByUserId';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          list:res.data
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
    // this.startCountdown(serverTime,this.data.isok)//倒计时调用
    // if(this.data.times){
    //   console.log(this.data.times)
    //   for(var index in this.data.arr){
    //     if(this.data.xmTitle ==this.data.arr[index].xmTitle&&this.data.txTime ==this.data.arr[index].txTime ){
    //       wx.showToast({
    //         title: '请勿重复添加相同提醒',
    //         icon:'none'
    //       })
    //       return
    //     }
    //   }
    //   var arrindex = {
    //     times:this.data.times,
    //     xmTitle:this.data.xmTitle,
    //     txTime:this.data.txTime,
    //     chend:false
    //   };
    //   this.data.arr.push(arrindex)
    //   this.setData({
    //     arr:this.data.arr
    //   })
    //   console.log(this.data.arr)
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.startCountdown(serverTime,this.data.isok)//倒计时调用
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