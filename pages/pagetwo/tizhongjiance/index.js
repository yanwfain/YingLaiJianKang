// pages/tizhongjiance/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    remsg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.redirectTo({
    //   url: '/pages/jilutizhong/index',
    // })
    var that = this
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log('初始化蓝牙适配器成功')
        //页面日志显示
        that.setData({
          remsg:1
        })
        wx.showToast({
          title: '请上体脂秤',
        })
        app.ICDeviceManager.scanDevice(function (model) {
          console.log(model);
          var macAddr = model.macAddr
          app.ICDeviceManager.stopScan()
          wx.showToast({
            title: '体脂秤连接成功',
            icon:'none'
          })
          app.ICDeviceManager.addDevice(macAddr, function (macAddr, code) {
            wx.showLoading({
              title:'结果生成中'
            })
          })
        });
      },
      fail: function (res) {
        console.log('请打开蓝牙和定位功能')
        that.setData({
          remsg:2
        })
        wx.showToast({
          title: '请打开蓝牙和定位功能',
          icon:'none'
        })
      }
    })
   

  },
  startBlue: function () {
    var _this = this;
    _this.lanyatest1()
  },
  lanyatest1(event) {
    var that = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log('初始化蓝牙适配器成功')
        //页面日志显示
        wx.showToast({
          title: '蓝牙适配器成功',
        })
        that.lanyatest2()
      },
      fail: function (res) {
        console.log('请打开蓝牙和定位功能')
        that.setData({
          shulanYa: false
        })
        wx.showToast({
          title: '请打开蓝牙和定位功能',
          icon:'none'
        })
      }
    })
  },

  lanyatest2(event) {
    var that = this;
    wx.getBluetoothAdapterState({

      success: function (res) {

        //打印相关信息
        console.log(JSON.stringify(res.errMsg) + "\n蓝牙是否可用：" + res.available);
        wx.showToast({
          title: '当前蓝牙可用',
          icon: 'none'
        })
        // that.lanyatest3()
      },
      fail: function (res) {

        //打印相关信息
        console.log(JSON.stringify(res.errMsg) + "\n蓝牙是否可用：" + res.available);

      }
    })
  },
  istrue: function (e) {
    this.setData({
      ishows: true
    })
  },
  delsl: function (e) {
    this.setData({
      ishows: false
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
    
    app.ICDeviceManager.setDelegate({
      onReceiveMeasureStepData: (device, step, model) => {
        wx.hideLoading({
          success: (res) => { },
        })
        console.log(model)
        app.globalData.weightData = model
        wx.redirectTo({
          url: '/pages/page/jilutizhong/index',
        })
      },
      onReceiveWeightData: function (device, model) {
        wx.hideLoading({
          success: (res) => { },
        })
        app.globalData.weightData = model
        wx.redirectTo({
          url: '/pages/page/jilutizhong/index',
        })
      }
    });
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