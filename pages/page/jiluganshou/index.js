// pages/jiluganshou/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listWulist:[
      // {
      //   text:'无不适',
      //   isshow:false,
      //   id:1,
      //   textart:''
      // },
      {
        text:'头痛',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'头晕',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'呕吐',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'出汗',
        isshow:false,
        id:5,
        textart:''

      },
      {
        text:'心悸',
        isshow:false,
        id:6,
        textart:''

      },
      {
        text:'胸闷',
        isshow:false,
        id:7,
        textart:''

      },
      {
        text:'疲乏',
        isshow:false,
        id:8,
        textart:''

      },
      {
        text:'嗜睡',
        isshow:false,
        id:9,
        textart:''

      },
      {
        text:'胃部不适',
        isshow:false,
        id:10,
        textart:''

      },
      {
        text:'消化不良',
        isshow:false,
        id:11,
        textart:''

      },
      {
        text:'腹胀',
        isshow:false,
        id:12,
        textart:''

      },
      {
        text:'恶心',
        isshow:false,
        id:13,
        textart:''
      },
      {
        text:'肌肉抽筋',
        isshow:false,
        id:14,
        textart:''
      },
      {
        text:'身上发冷',
        isshow:false,
        id:15,
        textart:''
      },
      {
        text:'睡眠困难',
        isshow:false,
        id:16,
        textart:''
      },
      {
        text:'头脑不清晰',
        isshow:false,
        id:17,
        textart:''
      },
      {
        text:'注意力不集中',
        isshow:false,
        id:18,
        textart:''
      },
      {
        text:'呼吸有味道',
        isshow:false,
        id:19,
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
      taskId:options.id
    })
  },
  tab_wu:function(e){
      this.setData({
        wuid:this.data.wuid?false:true
      })
      if(this.data.wuid){
     
        var listWulist = this.data.listWulist
        var arr = []
        for(var index in listWulist){
            listWulist[index].isshow = false
        }
        this.setData({
          listWulist:listWulist,
          listWulist_arr:[],
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
        wuid:false
      })
    }
    if(arr.length>0){
      this.setData({
        isshow4:false
      })
    }
  },
  tab1:function(e){
    this.setData({
      tab1:e.currentTarget.dataset.id

    })
  },
  tab2:function(e){
    this.setData({
      tab2:e.currentTarget.dataset.id

    })
  },
  tab3:function(e){
    this.setData({
      tab3:e.currentTarget.dataset.id

    })
  },
  tab4:function(e){
    this.setData({
      tab4:e.currentTarget.dataset.id

    })
  },
  tab5:function(e){
    this.setData({
      tab5:e.currentTarget.dataset.id

    })
  },
  other:function(e){
    this.setData({
      other:e.detail.value
    })
  },
  jixsuFn:function(e){
    this.setData({
      isModels:false
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  submitens:function(e){
    if(!this.data.tab1){
      wx.showToast({
        title: '请完善饥饿感',
        icon:'none'
      })
      return
    }
    if(!this.data.tab2){
      wx.showToast({
        title: '请完善乏力程度',
        icon:'none'
      })
      return
    }
    if(!this.data.tab3){
      wx.showToast({
        title: '请完善情绪',
        icon:'none'
      })
      return
    }
    if(!this.data.tab4){
      wx.showToast({
        title: '请完善大便情况',
        icon:'none'
      })
      return
    }
    if(!this.data.tab5){
      wx.showToast({
        title: '请完善小便情况',
        icon:'none'
      })
      return
    }
    // for(var index in this.data.listWulist){
    //   if(!this.data.listWulist[index].isshow&&!this.data.wuid){
    //     wx.showToast({
    //       title: '请完善身体状况信息',
    //       icon:'none'
    //     })
    //     return
    //   }
    // }
   
    var that = this
    var url = app.globalData.url + '/api/saveFeeling';
    var data = {
      userId:app.globalData.user_id,
      taskId:that.data.taskId,
      hunger:that.data.tab1,
      weakness:that.data.tab2,
      emotion:that.data.tab3,
      defecate:that.data.tab4,
      urinate:that.data.tab5,
      condition: JSON.stringify(that.data.listWulist) ,
      other:that.data.other
      
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          isModels:true,
          jifensnum:res.data.score
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