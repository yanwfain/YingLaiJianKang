// pages/pagetwo/shoplistWu/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    valNum: 1,
    arrId: [],
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit:function(e){
    wx.navigateTo({
      url: '/pages/pagetwo/zengdelit/index?specifications=' + '' + '&gouche=' + JSON.stringify(this.data.arrId)
    })
  },
  shoplist: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/cart/list';
    var data = {
      userId: app.globalData.user_id
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        for (var index in res.data.validList) {
          res.data.validList[index].ischenk = false

        }
        this.setData({
          validList: res.data.validList,
          invalidList: res.data.invalidList,
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
  },
  chenkFn: function (e) {
    var id = e.currentTarget.dataset.id
    var validList = this.data.validList
    var arrId = this.data.arrId
    var num = this.data.num;
    for (var index in validList) {
      if (validList[index].id == id) {
        validList[index].ischenk = validList[index].ischenk ? false : true
        if (validList[index].ischenk) {
          arrId.push(validList[index].id)
          num += Number(validList[index].cartNum)
        }
        if (!validList[index].ischenk) {
          num = num - validList[index].cartNum
          for (var idx in arrId) {
            if (arrId[idx] == id) {
              arrId.splice(idx, 1)
            }
          }
        }
      }
    }
    this.setData({
      validList: validList,
      arrId: arrId,
      num: num
    })
    if (arrId.length == validList.length) {
      this.setData({
        allChenk: true
      })
    } else {
      this.setData({
        allChenk: false
      })
    }
    // 查询金额
    this.picker()
    console.log(validList)
    console.log(arrId)
    console.log(num)
  },
  chenkAll: function (e) {
    this.setData({
      allChenk: this.data.allChenk ? false : true
    })
    var validList = this.data.validList
    var arrId = []
    var num = 0
    // 未选中的逻辑
    if (!this.data.allChenk) {
      for (var index in validList) {
        validList[index].ischenk = false
      }
      this.setData({
        validList: validList,
        arrId: [],
        num: 0
      })
    }
    // 选中的逻辑
    if (this.data.allChenk) {
      for (var index in validList) {
        validList[index].ischenk = true
        arrId.push(validList[index].id)
        num += Number(validList[index].cartNum)
      }
      this.setData({
        validList: validList,
        arrId: arrId,
        num: num
      })
    }
    // 查询金额
    this.picker()
  },
  // 查询金额
  picker: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/order/computedOrder';
    var data = {
      userId: app.globalData.user_id,
      cartIds: this.data.arrId,

    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          totalPrice:res.data.totalPrice
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
  },
  // 修改接口数量
  gouWunum: function (id, num) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/cart/num';
    var data = {
      num: num,
      id: id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
      // 查询金额
      if (that.data.arrId.length > 0) {
        that.picker()
      }
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
  },

  jieFn: function (e) {
    var validList = this.data.validList
    for (var index in validList) {
      if (e.currentTarget.dataset.id == validList[index].id) {
        if (validList[index].cartNum == 1) {
          wx.showToast({
            title: '下单数量不能小于1',
            icon: 'none'

          })
          return
        }
        var _num = validList[index].cartNum
        _num--
        validList[index].cartNum = _num
        // 接口修改商品数量
        this.gouWunum(e.currentTarget.dataset.id, _num)
      }
    }
    // 赋值数量

    this.setData({
      validList: validList,

    })
    // 重新计算数量

    var num = 0
    var validList = this.data.validList

    for (var index in validList) {
      if (validList[index].ischenk) {
        num += Number(validList[index].cartNum)
      }
    }
    this.setData({
      num: num

    })
    console.log(num)
    // 查询金额
    // if (this.data.arrId.length > 0) {
    //   this.picker()
    // }

  },
  jiaFn: function (e) {
    var validList = this.data.validList
    for (var index in validList) {
      if (e.currentTarget.dataset.id == validList[index].id) {
        if (validList[index].cartNum == 9999) {
          wx.showToast({
            title: '下单数量不能大于9999',
            icon: 'none'

          })
          return
        }
        var _num = validList[index].cartNum
        _num++
        validList[index].cartNum = _num
        // 接口修改商品数量
        this.gouWunum(e.currentTarget.dataset.id, _num)
      }
    }
    // 赋值数量
    this.setData({
      validList: validList,
    })
    // 重新计算数量
    var num = 0
    var validList = this.data.validList

    for (var index in validList) {
      if (validList[index].ischenk) {
        num += Number(validList[index].cartNum)
      }
    }
    this.setData({
      num: num

    })
    console.log(num)
    // 查询金额
    // if (this.data.arrId.length > 0) {
    //   this.picker()
    // }
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
    this.shoplist()
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