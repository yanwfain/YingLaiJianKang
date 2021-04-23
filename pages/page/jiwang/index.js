// pages/jiwang/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    dv:true,
    listWulist:[
      {
        text:'冠心病',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'心肌梗塞',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'眼底出血',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'黄斑病变',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'新生血管',
        isshow:false,
        id:5,
        textart:''

      },
      {
        text:'其他',
        isshow:false,
        id:6,
        textart:''

      },
    ],
    listWulist_arr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.pageid){
      this.setData({
        pageid:options.pageid
      })
    }
  },
  submiiti:function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.url + '/api/updateUserCamperHistory';
    var data = {
      userId:app.globalData.user_id,
      coronary:JSON.stringify(that.data.listWulist) ,
      other:that.data.textart?that.data.textart:'',
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
  tab: function (e) {
    var _index = e.currentTarget.dataset.index
		var listWulist = this.data.listWulist
		var arr = []
		for(var index in listWulist){
			if(_index== index){
				listWulist[index].isshow = listWulist[index].isshow?false:true
			}
			if(listWulist[index].isshow){
				arr.push(listWulist[index].id)
      }
      if(listWulist[5].isshow){
        this.setData({
          isshowtxt:true
        })
      }else{
        this.setData({
          isshowtxt:false
        })
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
  textartFn:function(e){
    this.setData({
      textart:e.detail.value
    })
  },
  tab4:function(e){
    this.setData({
      isshow4:this.data.isshow4?false:true
    })
    if(this.data.isshow4){
      for(var index in this.data.listWulist){
        this.data.listWulist[index].isshow=false
      }
      this.setData({
        textart:'',
        listWulist_arr:[],
        isshowtxt:false,
        listWulist:this.data.listWulist,
      })
    }
  },
  baocunsx: function (e) {
   
    var that =this
    var url = app.globalData.url + '/joinCamp/saveHistory';
    var data = {
      user_id:app.globalData.user_id,
      coronary:JSON.stringify(that.data.listWulist) ,
      other:that.data.textart?that.data.textart:'',
      step:5,
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
  xiapageFn: function (e) {
    var that =this
    if(that.data.isshowtxt&&!that.data.textart){
      wx.showToast({
        title: '请填写内容',
        icon:'none'
      })
      return
     }
    var url = app.globalData.url + '/joinCamp/saveHistory';
    var data = {
      user_id:app.globalData.user_id,
      coronary:JSON.stringify(that.data.listWulist) ,
      other:that.data.textart?that.data.textart:'',
      step:5,
      piece:2,
      aim:7,
      id:that.data.jid?that.data.jid:''
    }

    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/page/jiazu/index',
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
   
		var url = app.globalData.url + '/camper/getHistoryByUser';
    var data = {
      user_id:app.globalData.user_id,
      id:that.data.jid?that.data.jid:''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success&&res.data) {
        that.setData({
          jid:res.data.id,
          listWulist:JSON.parse(res.data.coronary),
          isshowtxt:res.data.other?true:false,
          textart:res.data.other?res.data.other:'',
        
        })
        var dv1 =JSON.parse(res.data.coronary) 
        for(var index in dv1){
          if(dv1[index].isshow){
            that.setData({
              dv:false
            })
          }
        }

        if(that.data.dv){
          that.setData({
            isshow4:true
          })
        }
				
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