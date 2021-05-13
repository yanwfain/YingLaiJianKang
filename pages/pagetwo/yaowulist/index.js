// pages/yaowulist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id:1,
        text:'诺和锐',
      },
      {
        id:2,
        text:'优泌乐',
      },
      {
        id:3,
        text:'达美康',
      },
    ],
    list1:[
      {
        id:1,
        text:'甲苯磺丁脲片',
      },
      {
        id:2,
        text:'氯磺丙脲片',
      },
      {
        id:3,
        text:'格列本脲片（非优降糖）',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeId:options.id
    })
   this.chaxun()

  },
  chaxun:function(e){
    if(this.data.typeId==1){
      wx.setNavigationBarTitle({
        title: '选择胰岛素' 
      })
      var that = this;
   
      wx.showLoading({
        title:'加载中'
      })
      var url = app.globalData.url + '/api/selectDrugByType';
      var data = {
        type:0,
        name:this.data.keyword?this.data.keyword:''
      }
      app.wxRequest('get', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          that.setData({
            list:res.data.typeList
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
    }
    if(this.data.typeId==2){
      wx.setNavigationBarTitle({
        title: '选择口服药' 
      })
      var that = this;
   
      wx.showLoading({
        title:'加载中'
      })
      var url = app.globalData.url + '/api/selectDrugByType';
      var data = {
        type:1,
        name:this.data.keyword?this.data.keyword:''
      }
      app.wxRequest('get', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          that.setData({
            list:res.data.typeList
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
    }
  },
  listywu:function(e){
    var that = this
    let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
    let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。 

    if(that.data.typeId==1){
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        typeId:that.data.typeId,
        typetxtars1:1,
      })
    }
    if(that.data.typeId==2){
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        typeId:that.data.typeId,
        typetxtars2:2,
      })
    }       
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
  capclick:function(e){
    var that = this
    let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
    let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。 
                              
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      typeId:that.data.typeId,
      text: e.currentTarget.dataset.text,
      wuid: e.currentTarget.dataset.id,
      unit:e.currentTarget.dataset.unit
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
  bindconfirm:function(e){
    var that = this;
    var discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
    console.log('内容为', discountName)
    this.setData({
      keyword: discountName,
      isshowModel: false
    })
    this.setData({
      list:[]
    })
    this.chaxun()
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