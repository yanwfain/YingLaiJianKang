// pages/lookgift/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:"未初始化蓝牙适配器",
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    var that = this;
    var url = app.globalData.url + '/api/selectEquipment';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          indextxt:res.data
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
    wx.openBluetoothAdapter({
      success: function (res) {
        wx.showToast({
          title: '蓝牙同步成功，请保持体脂秤常亮',
          icon:'none'
        })
       
        app.ICDeviceManager.scanDevice(function ( model) {
          console.log(model);
          var macAddr = model.macAddr
          that.setData({
            macAddr:model.macAddr
          })
          app.ICDeviceManager.stopScan()
          app.ICDeviceManager.addDevice(macAddr,function (macAddr, code) {
            console.log(macAddr)
            console.log(code)
            if(macAddr){
              wx.showToast({
                title: '体脂秤连接及绑定成功',
                icon:'none'
              })

            }else{
              wx.showToast({
                title: '体脂秤连接失败，请重试',
                icon:'none'
              })
            }
          })
         });
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

    // wx.openBluetoothAdapter({
    //   mode: "peripheral",
    //   success:res=>{
    //     wx.createBLEPeripheralServer({
    //       success:res=>{
    //         //设置广播秤的蓝牙服务
    //         console.log("设置蓝牙服务")
    //       }
    //     })
    //   }
    // })
  },
  lianjie:function(e){
    var that = this
    if(e.currentTarget.dataset.id==4){
      wx.showModal({
        title: '提示',
        content: '即将自动连接的是智能体脂秤，请确保体脂秤常亮、手机蓝牙开启',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            wx.showLoading({
              title:'连接中，'
            })
            if(that.data.macAddr){
              var url = app.globalData.url + '/api/updateUserBindingEquipment';
              var data = {
                userId:app.globalData.user_id,
                eid:e.currentTarget.dataset.id,
                code:that.data.macAddr
              }
              app.wxRequest('post', url, data, (res) => {
                console.log(res)
                wx.hideLoading()
                if (res.success) {
    
                  wx.showToast({
                      title: '连接成功',
                    })
                  that.onLoad()
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
            }
           
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
     
    }
   
  },
  startBlue: function () {
    var _this = this;
    _this.onLoad()



  },
  showTip: function () {
    wx.showToast({
      title: '请打开蓝牙',
      icon: 'none',
      duration: 2500
    })
  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
    })
  },
  lanyatest1(event){
    var that = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log('初始化蓝牙适配器成功')
        //页面日志显示
        wx.showToast({
          title: '初始化蓝牙适配器成功',
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
        })
      }
    })
  },
 
  lanyatest2(event){
    var that = this;
    wx.getBluetoothAdapterState({
 
      success: function (res) {
 
        //打印相关信息
        console.log(JSON.stringify(res.errMsg) + "\n蓝牙是否可用：" + res.available);
        wx.showToast({
          title: '当前蓝牙可用',
          icon:'none'
        })
        // that.lanyatest3()
      },
      fail: function (res) {
 
        //打印相关信息
        console.log(JSON.stringify(res.errMsg) + "\n蓝牙是否可用：" + res.available);
 
      }
    })
  },
  lanyatest3(event){
    wx.showLoading({
      title: '正在搜索',
    })
   var that = this;
    wx.startBluetoothDevicesDiscovery({
      // FEE7
      // services: [''], //如果填写了此UUID，那么只会搜索出含有这个UUID的设备，建议一开始先不填写或者注释掉这一句
      success: function (res) {
        console.log(res)
       that.lanyatest4()
      }
    })
  },
  lanyatest4(event){
    var that = this;
    wx.getBluetoothDevices({
      success: function (res) {
        console.log(res)
        // console.log(res.devices.lengt)
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '周边共' +res.devices.length+'设备' ,
          icon:'none'
        })
        that.setData({
          info: "设备列表\n" + JSON.stringify(res.devices),
          devices: res.devices
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindstopFn: function (e) {
  
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/login/updateUserStatus';
    var data = {
      id:app.globalData.user_id,
      status:5
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.reLaunch({
          url: '/pages/index/index',
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
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
    this.startBlue()
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