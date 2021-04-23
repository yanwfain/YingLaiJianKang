// pages/jiwang/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    isshow4:true,
    isstab:true,
    listWulist:[
      {
        text:'喜欢吃精米精面',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'喜欢吃粗粮',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'喜欢吃甜食',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'喜欢吃肉类',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'喜欢吃零食',
        isshow:false,
        id:5,
        textart:''

      },
      {
        text:'喜欢吃水果',
        isshow:false,
        id:6,
        textart:''

      },
      {
        text:'喜欢吃夜宵',
        isshow:false,
        id:7,
        textart:''

      },
      {
        text:'喜欢吃辣',
        isshow:false,
        id:8,
        textart:''

      },
      {
        text:'喜欢吃油炸食品',
        isshow:false,
        id:9,
        textart:''

      },
      {
        text:'三餐不规律',
        isshow:false,
        id:10,
        textart:''

      },
      {
        text:'常不吃早饭',
        isshow:false,
        id:11,
        textart:''

      },
      {
        text:'常暴饮暴食',
        isshow:false,
        id:12,
        textart:''

      },
      {
        text:'如有饮食禁忌，请填写',
        isshow:false,
        istext:false,
        id:13,
        textart:''
      },
      {
        text:'如有饮食过敏，请填写',
        isshow:false,
        istext:false,
        id:14,
        textart:''
      },
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
    var url = app.globalData.url + '/api/updateUserCamperHabits';
    var data = {
      userId:app.globalData.user_id,
      flourRice:JSON.stringify(that.data.listWulist) ,
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
        if(listWulist[index].id==13||listWulist[index].id==14){
          listWulist[index].istext = false
        }
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
        if(listWulist[index].id==13||listWulist[index].id==14){
          listWulist[index].istext = listWulist[index].istext?false:true
        }
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
    var url = app.globalData.url + '/joinCamp/saveHabits';
    var data = {
      user_id:app.globalData.user_id,
      flour_rice:JSON.stringify(that.data.listWulist) ,
      step:2,
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
    // for(var index in that.data.listWulist){
    //   if(that.data.listWulist[index].isshow){
    //     console.log(index)
    //     this.setData({
    //       isstab:true
    //     })
    //   }
    // }
    // console.log(this.data.isstab)
    // console.log(this.data.isshow4)
    // if(!this.data.isstab&&!this.data.isshow4){
    //   wx.showToast({
    //     title: '请完善信息',
    //     icon:'none'
    //   })
    //   return
    // }
    if(that.data.listWulist[12].isshow&&!that.data.listWulist[12].textart){
      wx.showToast({
        title: '请填写内容',
        icon:'none'
      })
      return
     }
     if(that.data.listWulist[13].isshow&&!that.data.listWulist[13].textart){
      wx.showToast({
        title: '请填写内容',
        icon:'none'
      })
      return
     }

     if(this.data.isshow4){
      that.data.listWulist[12].textart = ''
      that.data.listWulist[13].textart = ''
      that.setData({
        listWulist: that.data.listWulist
      })
     }
    var url = app.globalData.url + '/joinCamp/saveHabits';
    var data = {
      user_id:app.globalData.user_id,
      flour_rice:JSON.stringify(that.data.listWulist) ,
      step:2,
      piece:3,
      aim:4,
      id:that.data.jid?that.data.jid:''
    }

    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/yundong/index',
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
   
		var url = app.globalData.url + '/camper/getHabitsByUser';
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
          listWulist:JSON.parse(res.data.flour_rice),
        })
        for(var index in that.data.listWulist){
          if(that.data.listWulist[index].isshow){
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