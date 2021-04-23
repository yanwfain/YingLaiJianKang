// pages/rixietang/index.js
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
        text:'微血管瘤',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'软渗出、硬渗出',
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
    listWulist1:[
      {
        text:'手脚麻凉、手套袜套样感、踩棉花感、蚁行感、痛温觉下降等感觉异常',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'频繁腹胀、腹泻、便秘或交替出现 ',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'皮肤针刺样、烧灼样等疼痛',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'出汗异常',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'排尿障碍、尿潴留、尿失禁',
        isshow:false,
        id:5,
        textart:''

      },
      {
        text:'性欲减退、阳痿 ',
        isshow:false,
        id:6,
        textart:''

      },
      {
        text:'休息时心率增快，体位性低血压',
        isshow:false,
        id:7,
        textart:''

      },
      {
        text:'其他',
        isshow:false,
        id:8,
        textart:''

      },
    ],
    listWulist1_arr:[],
    listWulist2:[
      {
        text:'蛋白尿',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'尿微量白蛋白/肌酐比值 ',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'肾功能异常(肌酐、尿素氮增高)',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'其他',
        isshow:false,
        id:4,
        textart:''

      }
    ],
    listWulist2_arr:[],
    listWulist3:[
      {
        text:'凉、麻、痛等感觉异常',
        isshow:false,
        id:1,
        textart:''
      },
      {
        text:'间歇性跛行',
        isshow:false,
        id:2,
        textart:''

      },
      {
        text:'静息痛',
        isshow:false,
        id:3,
        textart:''

      },
      {
        text:'足背动脉搏动明显减弱或消失 ',
        isshow:false,
        id:4,
        textart:''

      },
      {
        text:'足部苍白 ',
        isshow:false,
        id:5,
        textart:''

      },
      {
        text:'足趾冰凉、皮肤温度低 ',
        isshow:false,
        id:6,
        textart:''

      },
      {
        text:'与体位有关的皮肤呈暗红色 ',
        isshow:false,
        id:7,
        textart:''

      },
      {
        text:'皮肤溃疡、坏疽 ',
        isshow:false,
        id:8,
        textart:''

      },
      {
        text:'其他 ',
        isshow:false,
        id:9,
        textart:''

      },
    ],
    listWulist3_arr:[],
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
    var url = app.globalData.url + '/api/updateUserCamperComplication';
    var data = {
      userId:app.globalData.user_id,
      retinopathy:JSON.stringify(that.data.listWulist) ,
      peripheral_neuropathy:that.data.textart?that.data.textart:'',
      numbness:JSON.stringify(that.data.listWulist1),
      abdominal_distention:that.data.textart1?that.data.textart1:'',
      pain:JSON.stringify(that.data.listWulist2),
      sweating:that.data.textart2?that.data.textart2:'',
      urination:JSON.stringify(that.data.listWulist3),
      impotentia:that.data.textart3?that.data.textart3:'',
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
  tab1: function (e) {
    var _index = e.currentTarget.dataset.index
		var listWulist1 = this.data.listWulist1
		var arr = []
		for(var index in listWulist1){
			if(_index== index){
				listWulist1[index].isshow = listWulist1[index].isshow?false:true
			}
			if(listWulist1[index].isshow){
				arr.push(listWulist1[index].id)
      }
      if(listWulist1[7].isshow){
        this.setData({
          isshowtxt1:true
        })
      }else{
        this.setData({
          isshowtxt1:false
        })
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
  textartFn1:function(e){
    this.setData({
      textart1:e.detail.value
    })
  },
  tab2: function (e) {
    var _index = e.currentTarget.dataset.index
		var listWulist2 = this.data.listWulist2
		var arr = []
		for(var index in listWulist2){
			if(_index== index){
				listWulist2[index].isshow = listWulist2[index].isshow?false:true
			}
			if(listWulist2[index].isshow){
				arr.push(listWulist2[index].id)
      }
      if(listWulist2[3].isshow){
        this.setData({
          isshowtxt2:true
        })
      }else{
        this.setData({
          isshowtxt2:false
        })
      }
		}
		console.log(arr)
    this.setData({
      listWulist2:listWulist2,
      listWulist2_arr:arr,
    })
    if(arr.length>0){
      this.setData({
        isshow4:false
      })
    }
  },
  textartFn2:function(e){
    this.setData({
      textart2:e.detail.value
    })
  },
  tab3: function (e) {
    var _index = e.currentTarget.dataset.index
		var listWulist3= this.data.listWulist3
		var arr = []
		for(var index in listWulist3){
			if(_index== index){
				listWulist3[index].isshow = listWulist3[index].isshow?false:true
			}
			if(listWulist3[index].isshow){
				arr.push(listWulist3[index].id)
      }
      if(listWulist3[8].isshow){
        this.setData({
          isshowtxt3:true
        })
      }else{
        this.setData({
          isshowtxt3:false
        })
      }
		}
		console.log(arr)
    this.setData({
      listWulist3:listWulist3,
      listWulist3_arr:arr,
    })
    if(arr.length>0){
      this.setData({
        isshow4:false
      })
    }
  },
  textartFn3:function(e){
    this.setData({
      textart3:e.detail.value
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
      for(var index in this.data.listWulist1){
        this.data.listWulist1[index].isshow=false
      }
      for(var index in this.data.listWulist2){
        this.data.listWulist2[index].isshow=false
      }
      for(var index in this.data.listWulist3){
        this.data.listWulist3[index].isshow=false
        
      }
      this.setData({
        textart3:'',
        textart2:'',
        textart1:'',
        textart:'',
        listWulist_arr:[],
        listWulist1_arr:[],
        listWulist2_arr:[],
        listWulist3_arr:[],
        isshowtxt:false,
        isshowtxt1:false,
        isshowtxt2:false,
        isshowtxt3:false,
        listWulist:this.data.listWulist,
        listWulist1:this.data.listWulist1,
        listWulist2:this.data.listWulist2,
        listWulist3:this.data.listWulist3,

      })
    }
  },
  baocunsx: function (e) {
    var that = this
   
		var url = app.globalData.url + '/joinCamp/saveComplication';
    var data = {
      user_id:app.globalData.user_id,
      retinopathy:JSON.stringify(that.data.listWulist) ,
      peripheral_neuropathy:that.data.textart?that.data.textart:'',
      numbness:JSON.stringify(that.data.listWulist1),
      abdominal_distention:that.data.textart1?that.data.textart1:'',
      pain:JSON.stringify(that.data.listWulist2),
      sweating:that.data.textart2?that.data.textart2:'',
      urination:JSON.stringify(that.data.listWulist3),
      impotentia:that.data.textart3?that.data.textart3:'',
      step:4,
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
    var that = this
    // if(that.data.listWulist_arr.length==0&&that.data.listWulist1_arr.length==0&&that.data.listWulist2_arr.length==0&&that.data.listWulist3_arr.length==0){
    //   if(!that.data.isshow4){
    //     wx.showToast({
    //       title: '请完善信息',
    //       icon:'none'
    //     })
    //     return
    //   }
    // }
    // that.data.dv
  
   if(that.data.isshowtxt&&!that.data.textart){
    wx.showToast({
      title: '请填写内容',
      icon:'none'
    })
    return
   }
   if(that.data.isshowtxt1&&!that.data.textart1){
    wx.showToast({
      title: '请填写内容',
      icon:'none'
    })
    return
   }
   if(that.data.isshowtxt2&&!that.data.textart2){
    wx.showToast({
      title: '请填写内容',
      icon:'none'
    })
    return
   }
   if(that.data.isshowtxt3&&!that.data.textart3){
    wx.showToast({
      title: '请填写内容',
      icon:'none'
    })
    return
   }
		var url = app.globalData.url + '/joinCamp/saveComplication';
    var data = {
      user_id:app.globalData.user_id,
      retinopathy:JSON.stringify(that.data.listWulist) ,
      peripheral_neuropathy:that.data.textart?that.data.textart:'',
      numbness:JSON.stringify(that.data.listWulist1),
      abdominal_distention:that.data.textart1?that.data.textart1:'',
      pain:JSON.stringify(that.data.listWulist2),
      sweating:that.data.textart2?that.data.textart2:'',
      urination:JSON.stringify(that.data.listWulist3),
      impotentia:that.data.textart3?that.data.textart3:'',
      step:4,
      piece:2,
      aim:7,
      id:that.data.jid?that.data.jid:''
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        wx.navigateTo({
          url: '/pages/page/jiwang/index',
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
   
		var url = app.globalData.url + '/camper/getComplicationByUser';
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
          listWulist:JSON.parse(res.data.retinopathy),
          isshowtxt:res.data.peripheral_neuropathy?true:false,
          textart:res.data.peripheral_neuropathy?res.data.peripheral_neuropathy:'',
          listWulist1:JSON.parse(res.data.numbness),
          isshowtxt1:res.data.abdominal_distention?true:false,
          textart1:res.data.abdominal_distention?res.data.abdominal_distention:'',
          listWulist2:JSON.parse(res.data.pain),
          isshowtxt2:res.data.sweating?true:false,
          textart2:res.data.sweating?res.data.sweating:'',
          listWulist3:JSON.parse(res.data.urination),
          isshowtxt3:res.data.impotentia?true:false,
          textart3 :res.data.impotentia?res.data.impotentia:'',
        })
        var dv1 =JSON.parse(res.data.retinopathy) 
        var dv2 =JSON.parse(res.data.numbness) 
        var dv3 =JSON.parse(res.data.pain) 
        var dv4 =JSON.parse(res.data.urination) 
        for(var index in dv1){
          if(dv1[index].isshow){
            that.setData({
              dv:false
            })
          }
        }
      
        for(var index in dv2){
          if(dv2[index].isshow){
            that.setData({
              dv:false
            })
          }
        }
        for(var index in dv3){
          if(dv3[index].isshow){
            that.setData({
              dv:false
            })
          }
        }
        for(var index in dv4){
          if(dv4[index].isshow){
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