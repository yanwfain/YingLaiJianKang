// pages/jiwang/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    listWulist:[
      {
        text:'散步',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'快走',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'跑步',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'跳舞',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'做操',
        isshow:false,
        id:5,
        textart:''

      },
      {
        text:'太极拳',
        isshow:false,
        id:6,
        textart:''

      },
      {
        text:'瑜伽',
        isshow:false,
        id:7,
        textart:''

      },
      {
        text:'健身',
        isshow:false,
        id:8,
        textart:''

      },
      {
        text:'游泳',
        isshow:false,
        id:9,
        textart:''

      },
      {
        text:'骑车',
        isshow:false,
        id:10,
        textart:''

      },
      {
        text:'爬山',
        isshow:false,
        id:11,
        textart:''

      },
      {
        text:'高尔夫球',
        isshow:false,
        id:12,
        textart:''

      },
      {
        text:'羽毛球',
        isshow:false,
        id:13,
        textart:''
      },
      {
        text:'乒乓球',
        isshow:false,
        id:14,
        textart:''
      },
      {
        text:'网球',
        isshow:false,
        id:15,
        textart:''
      },
      {
        text:'其他',
        isshow:false,
        id:16,
        textart:''
      },
    ],
    listWulist_arr:[],
    listWulist1:[
      {
        text:'早晨',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'上午',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'下午',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'晚上',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'时间不规律',
        isshow:false,
        id:5,
        textart:''

      }
    ],
    listWulist1_arr:[],
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
    var url = app.globalData.url + '/api/updateUserCamperExercise';
    var data = {
      userId:app.globalData.user_id,
      sportType:JSON.stringify(that.data.listWulist) ,
      slot:JSON.stringify(that.data.listWulist1) ,
      days:that.data.tab2?that.data.tab2:'',
      feeling:that.data.tab3?that.data.tab3:'',
      duration:that.data.tab4?that.data.tab4:'',
      
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
      tab4:e.currentTarget.dataset.id

    })
   
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
    var url = app.globalData.url + '/joinCamp/saveExercise';
    var data = {
      user_id:app.globalData.user_id,
      sport_type:JSON.stringify(that.data.listWulist) ,
      slot:JSON.stringify(that.data.listWulist1) ,
      days:that.data.tab2?that.data.tab2:'',
      feeling:that.data.tab3?that.data.tab3:'',
      duration:that.data.tab4?that.data.tab4:'',
      step:3,
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
    var url = app.globalData.url + '/joinCamp/saveExercise';
    var data = {
      user_id:app.globalData.user_id,
      sport_type:JSON.stringify(that.data.listWulist) ,
      slot:JSON.stringify(that.data.listWulist1) ,
      days:that.data.tab2?that.data.tab2:'',
      feeling:that.data.tab3?that.data.tab3:'',
      duration:that.data.tab4?that.data.tab4:'',
      step:3,
      piece:3,
      aim:4,
      id:that.data.jid?that.data.jid:''
    }

    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/xinli/index',
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
		var url = app.globalData.url + '/camper/getExerciseByUser';
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
          listWulist:JSON.parse(res.data.sport_type),
          listWulist1:JSON.parse(res.data.slot),
          tab2:res.data.days?res.data.days:'',
          tab3:res.data.feeling?res.data.feeling:'',
          tab4:res.data.duration?res.data.duration:'',

        })
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