// pages/rixietang/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    listYidao: [],
    listKoufu: [],
    listWulist:[
      {
        text:'降脂药',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'降尿酸药',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'降压药',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'激素类药',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'其他药物',
        isshow:false,
        id:5,
        textart:''

      },
    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title:'加载中'
    })
    var url = app.globalData.url + '/api/selectTaskMedication';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
          for(var index in res.data.campList){
            res.data.campList[index].insulin = JSON.parse(res.data.campList[index].insulin)
            res.data.campList[index].oral = JSON.parse(res.data.campList[index].oral)
          }
          for(var index in res.data.taskList){
            res.data.taskList[index].insulin = JSON.parse(res.data.taskList[index].insulin)
            res.data.taskList[index].oral = JSON.parse(res.data.taskList[index].oral)
          }
          console.log(res.data)
          that.setData({
            list_1:res.data.campList,
            list_2:res.data.taskList,
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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  remark:function(e){
    this.setData({
      remark:e.detail.value
    })
  },
  listywu: function (e) {
    // e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pagetwo/yaowulist/index?id=' + e.currentTarget.dataset.id,
    })
    this.setData({
      wuid:''
    })
  },
  tab: function (e) {
    this.setData({
      tab: e.currentTarget.dataset.id,
      typetxtars2:'',
      typetxtars1:'',
      listYidao:[],
      listKoufu:[]
    })
  },
  tab1: function (e) {
    console.log(e)
    // e.currentTarget.dataset.index
    var listWulist = this.data.listWulist
    for(var index in listWulist){
      if(index ==  e.currentTarget.dataset.index){
        if(listWulist[index].isshow){
          listWulist[index].isshow = false
        }else{
          listWulist[index].isshow = true
          listWulist[index].textart = e.detail.value
        }
       
      }
    }
    this.setData({
      listWulist:listWulist
    })
  },
  textartFn:function(e){
    var listWulist = this.data.listWulist
    for(var index in listWulist){
      if(index ==  e.target.dataset.index){
        listWulist[index].textart = e.detail.value
      }
    }
    this.setData({
      listWulist:listWulist
    })
    console.log(listWulist)
  },
  baocunsx: function (e) {
    wx.reLaunch({
      url: '/pages/page/listxinxi/index',
    })
  },
  xiapageFn: function (e) {
    var that = this;
    if(!this.data.remark){
      wx.showToast({
        title: '请选择用药日期',
        icon:'none'
      })
      return
    }
    wx.showLoading({
      title:'加载中'
    })
    var url = app.globalData.url + '/api/saveTaskMedication';
    var data = {
      mTime:this.data.date,
      remark:this.data.remark?this.data.remark:'',
      insulinOt:this.data.textartFn1?this.data.textartFn1:'',
      oralOt:this.data.textartFn?this.data.textartFn2:'',
      insulin:JSON.stringify(this.data.listYidao),
      oral:JSON.stringify(this.data.listKoufu),
      userId:app.globalData.user_id,
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
          })
        },500)
        
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
  delelist:function(e){
    if(e.currentTarget.dataset.type==1){
      var listYidao = this.data.listYidao
      listYidao.splice(e.currentTarget.dataset.index, 1)　
      this.setData({
        listYidao:listYidao
      })
    }
    if(e.currentTarget.dataset.type==2){
      var listKoufu = this.data.listKoufu
      listKoufu.splice(e.currentTarget.dataset.index, 1)　
      this.setData({
        listKoufu:listKoufu
      })
    }
    if(this.data.listYidao.length!=0||this.data.listKoufu!=0||this.data.typetxtars1==1||this.data.typetxtars2==2){

      this.setData({
        tab:''
      })
    }
  },
  delelist1:function(e){
      this.setData({
        typetxtars1:''
      })
  },
  delelist2:function(e){
    this.setData({
      typetxtars2:''
    })
},
allnum:function(zaoNum,zhongNum,wanNum,shuiNum,type,index){

  if(zaoNum){
    if(zaoNum==''){
      zaoNum = 0
    }else{
      zaoNum = parseInt(zaoNum)
    }
  }else{
    zaoNum = 0
  }
  if(zhongNum){
    if(zhongNum==''){
      zhongNum = 0
    }else{
      zhongNum = parseInt(zhongNum)
    }
  }else{
    zhongNum = 0
  }
  if(wanNum){
    if(wanNum==''){
      wanNum = 0
    }else{
      wanNum = parseInt(wanNum)
    }
  }else{
    wanNum = 0
  }
  if(shuiNum){
    if(shuiNum==''){
      shuiNum = 0
    }else{
      shuiNum = parseInt(shuiNum)
    }
  }else{
    shuiNum = 0
  }
  var all = zaoNum + zhongNum + wanNum + shuiNum
  if(type==1){
    var listYidao = this.data.listYidao
    listYidao[index].allnum = all
    this.setData({
      listYidao:listYidao
    })
  }
  if(type==2){
    var listKoufu = this.data.listKoufu
    listKoufu[index].allnum = all
    this.setData({
      listKoufu:listKoufu
    })
  }
},
  zaoinp:function(e){
    if(e.target.dataset.type==1){
      var listYidao = this.data.listYidao
      listYidao[e.target.dataset.index].zaoNum = e.detail.value
      this.setData({
        listYidao:listYidao
      })
      var n = e.target.dataset.index
      console.log(n)
      var t = e.target.dataset.type
      this.allnum(listYidao[n].zaoNum,listYidao[n].zhongNum,listYidao[n].wanNum,listYidao[n].shuiNum,t,n)
      console.log(this.data.listYidao)
    }
    if(e.target.dataset.type==2){
      var listKoufu = this.data.listKoufu
      listKoufu[e.target.dataset.index].zaoNum = e.detail.value
      this.setData({
        listKoufu:listKoufu
      })
      var n = e.target.dataset.index
      var t = e.target.dataset.type
      this.allnum(listKoufu[n].zaoNum,listKoufu[n].zhongNum,listKoufu[n].wanNum,listKoufu[n].shuiNum,t,n)
      console.log(this.data.listKoufu)
    }
  },
  zhonginp:function(e){
    if(e.target.dataset.type==1){
      var listYidao = this.data.listYidao
      listYidao[e.target.dataset.index].zhongNum = e.detail.value
      this.setData({
        listYidao:listYidao
      })
      var n = e.target.dataset.index
      var t = e.target.dataset.type
      this.allnum(listYidao[n].zaoNum,listYidao[n].zhongNum,listYidao[n].wanNum,listYidao[n].shuiNum,t,n)
      console.log(this.data.listYidao)
    }
    if(e.target.dataset.type==2){
      var listKoufu = this.data.listKoufu
      listKoufu[e.target.dataset.index].zhongNum = e.detail.value
      this.setData({
        listKoufu:listKoufu
      })
      var n = e.target.dataset.index
      var t = e.target.dataset.type
      this.allnum(listKoufu[n].zaoNum,listKoufu[n].zhongNum,listKoufu[n].wanNum,listKoufu[n].shuiNum,t,n)
      console.log(this.data.listKoufu)
    }
  },
  waninp:function(e){
    if(e.target.dataset.type==1){
      var listYidao = this.data.listYidao
      listYidao[e.target.dataset.index].wanNum = e.detail.value
      this.setData({
        listYidao:listYidao
      })
      var n = e.target.dataset.index
      var t = e.target.dataset.type
      this.allnum(listYidao[n].zaoNum,listYidao[n].zhongNum,listYidao[n].wanNum,listYidao[n].shuiNum,t,n)
      console.log(this.data.listYidao)
    }
    if(e.target.dataset.type==2){
      var listKoufu = this.data.listKoufu
      listKoufu[e.target.dataset.index].wanNum = e.detail.value
      this.setData({
        listKoufu:listKoufu
      })
      var n = e.target.dataset.index
      var t = e.target.dataset.type
      this.allnum(listKoufu[n].zaoNum,listKoufu[n].zhongNum,listKoufu[n].wanNum,listKoufu[n].shuiNum,t,n)
      console.log(this.data.listKoufu)
    }
  },
  shuiinp:function(e){
    var n = e.target.dataset.index
    var t = e.target.dataset.type
    if(e.target.dataset.type==1){
      var listYidao = this.data.listYidao
      listYidao[e.target.dataset.index].shuiNum = e.detail.value
      this.setData({
        listYidao:listYidao
      })
      this.allnum(listYidao[n].zaoNum,listYidao[n].zhongNum,listYidao[n].wanNum,listYidao[n].shuiNum,t,n)
      console.log(this.data.listYidao)
    }
    if(e.target.dataset.type==2){
      var listKoufu = this.data.listKoufu
      listKoufu[e.target.dataset.index].shuiNum = e.detail.value
      this.setData({
        listKoufu:listKoufu
      })
      this.allnum(listKoufu[n].zaoNum,listKoufu[n].zhongNum,listKoufu[n].wanNum,listKoufu[n].shuiNum,t,n)
      console.log(this.data.listKoufu)
    }
  },
  textartFn2:function(e){
    this.setData({
      textartFn2:e.detail.value
    })
  },
  textartFn1:function(e){
    this.setData({
      textartFn1:e.detail.value
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
   
    if (this.data.typeId == 1&&this.data.wuid) {
      var listYidao = this.data.listYidao
      for(var index in listYidao){
        if(listYidao[index].id==this.data.wuid){
          wx.showToast({
            title: '请勿重复添加同类药物',
            icon:'none'
          })
          return
        }
      }
     
      var list = {
        id: this.data.wuid,
        text: this.data.text,
        typeId: this.data.typeId,
        zaoNum: '',
        zhongNum: '',
        wanNum: '',
        shuiNum: '',
        allnum:''
      }
      listYidao.push(list)
      console.log(listYidao)

      this.setData({
        listYidao:listYidao
      })
    }
    if (this.data.typeId == 2&&this.data.wuid) {
      var listKoufu = this.data.listKoufu
      for(var index in listKoufu){
        if(listKoufu[index].id==this.data.wuid){
          wx.showToast({
            title: '请勿重复添加同类药物',
            icon:'none'
          })
          return
        }
      }
      var list = {
        id: this.data.wuid,
        text: this.data.text,
        typeId: this.data.typeId,
        zaoNum: '',
        zhongNum: '',
        wanNum: '',
        shuiNum: '',
        allnum:''

      }
      listKoufu.push(list)
      console.log(listKoufu)
      this.setData({
        listKoufu:listKoufu
      })
    }
    if(this.data.listYidao.length!=0||this.data.listKoufu!=0||this.data.typetxtars1==1||this.data.typetxtars2==2){
      this.setData({
        tab:''
      })
    }
  },
	// onPageScroll:function(e){
  //   console.log(e)
	// 	this.setData({
	// 		pickerShow:false
	// 	})
  // },
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