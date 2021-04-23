// pages/jiwang/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    isshow4:true,
    listWulist:[
      {
        text:'愤怒',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'焦虑',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'烦躁',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'痛苦',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'抑郁',
        isshow:false,
        id:5,
        textart:''

      },
      {
        text:'沮丧',
        isshow:false,
        id:6,
        textart:''

      }
    ],
    listWulist_arr:[],
   
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
    var url = app.globalData.url + '/api/updateUserCamperPsychology';
    var data = {
      userId:app.globalData.user_id,
      pressure:that.data.tab2?that.data.tab2:'',
      duration:that.data.tab3?that.data.tab3:'',
      energy:that.data.tab5?that.data.tab5:'',
      sleepTime:that.data.tab6?that.data.tab6:'',
      sleep:that.data.tab7?that.data.tab7:'',
      emotion:JSON.stringify(that.data.listWulist) ,
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

  tab4:function(e){
    this.setData({
      isshow4:this.data.isshow4?false:true
    })
    var listWulist = this.data.listWulist
    if(this.data.isshow4){
      for(var index in this.data.listWulist){
        this.data.listWulist[index].isshow=false
  
      }
      console.log(listWulist)
      this.setData({
        listWulist_arr:[],
        listWulist:listWulist

      })
      }
   
    },
  tab: function (e) {
    var _index = e.currentTarget.dataset.index
		var listWulist = this.data.listWulist
		var arr = []
		for(var index in listWulist){
			if(_index== index ){
        listWulist[index].isshow = listWulist[index].isshow?false:true
			}
			if(listWulist[index].isshow){
				arr.push(listWulist[index].id)
      }
		}
		console.log(arr)
    this.setData({
      listWulist:listWulist,
      listWulist_arr:arr,
    })
    if(arr.length>0){
      this.setData({
        isshow4:false
      })
    }
  },
  tab1: function (e) {
    var _index = e.currentTarget.dataset.index
		var listWulist1 = this.data.listWulist1
		var arr = []
		for(var index in listWulist1){
			if(_index== index ){
        listWulist1[index].isshow = listWulist1[index].isshow?false:true
			}
			if(listWulist1[index].isshow){
				arr.push(listWulist1[index].id)
      }
		}
		console.log(arr)
    this.setData({
      listWulist1:listWulist1,
      listWulist1_arr:arr,
    })
    if(arr.length>0){
      this.setData({
        isshow4:false
      })
    }
  },
  tab2: function (e) {
    this.setData({
      tab2:e.currentTarget.dataset.id
    })
  },
  tab3: function (e) {
    this.setData({
      tab3:e.currentTarget.dataset.id

    })
  },
  tab5: function (e) {
    this.setData({
      tab5:e.currentTarget.dataset.id

    })
  },
  tab6: function (e) {
    this.setData({
      tab6:e.currentTarget.dataset.id

    })
  },
  tab7: function (e) {
    this.setData({
      tab7:e.currentTarget.dataset.id
    })
  },
  textartFn:function(e){
    var _index = e.currentTarget.dataset.index
    var listWulist = this.data.listWulist
    listWulist[_index].textart = e.detail.value
    this.setData({
      listWulist:listWulist
    })
    console.log(listWulist)
  },
  baocunsx: function (e) {
    var that = this
    var url = app.globalData.url + '/joinCamp/savePsychology';
    var data = {
      user_id:app.globalData.user_id,
      pressure:that.data.tab2?that.data.tab2:'',
      duration:that.data.tab3?that.data.tab3:'',
      energy:that.data.tab5?that.data.tab5:'',
      sleep_time:that.data.tab6?that.data.tab6:'',
      sleep:that.data.tab7?that.data.tab7:'',
      emotion:JSON.stringify(that.data.listWulist) ,
      step:4,
      piece:3,
      aim:4,
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
  xiapageFn: function (e) {
    var that = this
    if(!that.data.tab2||!that.data.tab3||!that.data.tab3||!that.data.tab5||!that.data.tab6||!that.data.tab7){
      wx.showToast({
        title: '请完善信息',
        icon:'none'
      })
      return
    }
  
    var url = app.globalData.url + '/joinCamp/savePsychology';
    var data = {
      user_id:app.globalData.user_id,
      pressure:that.data.tab2?that.data.tab2:'',
      duration:that.data.tab3?that.data.tab3:'',
      energy:that.data.tab5?that.data.tab5:'',
      sleep_time:that.data.tab6?that.data.tab6:'',
      sleep:that.data.tab7?that.data.tab7:'',
      emotion:JSON.stringify(that.data.listWulist) ,
      step:4,
      piece:3,
      aim:4,
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
    wx.showLoading({
      title:'加载中'
    })
    var that = this
		var url = app.globalData.url + '/camper/getPsychologyByUser';
    var data = {
      user_id:app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
        console.log()
        that.setData({
          jid:res.data.id,
          tab2 :res.data.pressure?res.data.pressure:'',
          tab3 :res.data.duration?res.data.duration:'',
          tab5 :res.data.energy?res.data.energy:'',
          tab6 :res.data.sleep_time?res.data.sleep_time:'',
          tab7 :res.data.sleep?res.data.sleep:'',
          listWulist :JSON.parse(res.data.emotion) ,
        })
        var list = JSON.parse(res.data.emotion)
        for(var index in list){
          if(list[index].isshow){
            that.setData({
              isshow4:false
            })
          }
        }
      
      } else {
        that.setData({
          isshow4:false
        })
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