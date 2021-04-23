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
    
    ],
    listWulistckenk:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  notiro: function (e) {
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
      success: function () { }
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
    var listWulistckenk = this.data.listWulistckenk

    for(var index in listWulist){
 
      if(index ==  e.currentTarget.dataset.index){
        if(listWulist[index].isshow){
          listWulist[index].isshow = false
          for(var inds in listWulistckenk){
            if( listWulist[index].id ==listWulistckenk[inds].id ){
              listWulistckenk.splice(inds, 1)　   
            }
          }
        }else{
          listWulist[index].isshow = true
          listWulist[index].textart = e.detail.value?e.detail.value:''
          listWulistckenk.push(listWulist[index])
        }
      }
    }
    this.setData({
      listWulist:listWulist,
      listWulistckenk:listWulistckenk
    })
    console.log(this.data.listWulistckenk)
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
  
    var that = this
		var url = app.globalData.url + '/joinCamp/saveMedication';
    var data = {
      user_id:app.globalData.user_id,
      insulin:JSON.stringify(that.data.listYidao),
      oral:JSON.stringify(that.data.listKoufu),
      medicine:JSON.stringify(that.data.listWulist),
      insulin_ot:that.data.textartFn1?that.data.textartFn1:'',
      oral_ot:that.data.textartFn2?that.data.textartFn2:'',
      step:3,
      piece:2,
      aim:7,
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
    if(!this.data.tab&&this.data.listYidao.length==0&&this.data.listKoufu.length==0){
      wx.showToast({
        title: '请完善信息后提交',
        icon:'none'
      })
      return
    }
    var that = this
    that.setData({
      wuid:''
    })
		var url = app.globalData.url + '/joinCamp/saveMedication';
    var data = {
      user_id:app.globalData.user_id,
      insulin:JSON.stringify(that.data.listYidao),
      oral:JSON.stringify(that.data.listKoufu),
      medicine:JSON.stringify(that.data.listWulist),
      insulin_ot:that.data.textartFn1?that.data.textartFn1:'',
      oral_ot:that.data.textartFn2?that.data.textartFn2:'',
      step:3,
      piece:2,
      aim:7,
      id:that.data.jid?that.data.jid:''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/pagetwo/tangniaobfz/index',
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
    if(!this.data.wuid){
      var that = this
      var url = app.globalData.url + '/camper/getMedicationByUser';
      var data = {
        user_id:app.globalData.user_id,
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success&&res.data) {
          that.setData({
            jid:res.data.id,
            listYidao:JSON.parse(res.data.insulin),
            listKoufu:JSON.parse(res.data.oral),
            listWulist:JSON.parse(res.data.medicine),
            textartFn1:res.data.insulin_ot?res.data.insulin_ot:'',
            textartFn2:res.data.oral_ot?res.data.oral_ot:'',
          })
          if(that.data.listYidao.length==0&&that.data.listKoufu.length==0){
            that.setData({
              tab:1
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