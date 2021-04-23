// pages/shopdelit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listarr:[
      {
        image:'http://47.94.16.158:8001/168.png'
      },
      {
        image:'http://47.94.16.158:8001/168.png'
      },
      {
        image:'http://47.94.16.158:8001/168.png'
      },
      {
        image:'http://47.94.16.158:8001/168.png'
      }
    ],
    nutid:4,
    valNum:1,
    skuVal:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.shopdelit()
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/shop/selectGoodsReplyByProductId';
    var data = {
      productId:this.data.id,
      pageNum:1,
      pageSize:1,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        for(var index in res.data.list){
          if( res.data.list[index].pics){
            res.data.list[index].pics= JSON.parse(res.data.list[index].pics)
          }
          
        }
        this.setData({
          listpl:res.data.list
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
  listhuoyioujk:function(e){
    this.setData({
      modelis:true
    })
  },
  queFn:function(e){
    this.setData({
      modelis:false
    })
  },
  deledishide:function(e){
    this.setData({
      modelis:false
    })
  },
  linqulisty:function(e){
    if(e.currentTarget.dataset.status==0){
      wx.showLoading({
        title: '加载中',
      })
      var that = this
      var url = app.globalData.url + '/api/saveCoupons';
      var data = {
        couId:e.currentTarget.dataset.id,
        userId:app.globalData.user_id,
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          wx.showToast({
            title: '领取成功',
          })
          
          that.shopdelit()
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
    }else{
      wx.showToast({
        title: '您已经领取过了',
      })
    }
  
  },
    topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    console.log(url)
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片
    var data = []
    for(var index in this.data.listpl){
      if(e.currentTarget.dataset.id==this.data.listpl[index].id){
          for(var inde in this.data.listpl[index].pics){
            data.push(this.data.listpl[index].pics[inde].url2)
          }
      }
    }
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
    })
  },
  shopdelit:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/shop/selectGoodsInfoById';
    var data = {
      userId:app.globalData.user_id,
      id:this.data.id
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
      var imgarr = res.data.goodsData.sliderImage 
      res.data.goodsData.sliderImage = imgarr.split(',')
      console.log(res.data.goodsData.sliderImage)
      if (res.data.goodsData.description!=null){
        res.data.goodsData.description = res.data.goodsData.description.replace(/<img[^>]*>/gi, function (match, capture){
        return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, '')
        });
        res.data.goodsData.description = res.data.goodsData.description.replace(/<img/gi, '< img class="richImg" style="max-width:100%;height:auto;display:block; width:100% !important" ');
      };
        that.setData({
          pageindex:res.data
        })
        var pagelist = this.data.pageindex.goodsData.productAttr
        var skuVal=[]
        for(var index in pagelist){
          skuVal.push('')
         }
         this.setData({
          skuVal:skuVal
         })
         console.log(skuVal)
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
  jieFn:function(e){
    if(this.data.valNum==1){
      this.setData({
        valNum:1
      })
      wx.showToast({
        title: '下单数量不能小于1',
        icon:'none'

      })
      return
    }
    var num = this.data.valNum
    num--
    this.setData({
      valNum:num
    })
  },
  jiaFn:function(e){
    if(this.data.valNum==999){
      this.setData({
        valNum:999
      })
      wx.showToast({
        title: '下单数量不能大于999',
        icon:'none'
      })
      return
    }
    var num = this.data.valNum
    num++
    this.setData({
      valNum:num
    })
  },
  submitFor:function(e){
   
  
    for(var index in this.data.skuVal){
      if(this.data.skuVal[index]==''){
        wx.showToast({
          title: '请完善规格',
          icon:'none'
        })
        return
      }
    }
    this.setData({
      isMolde:false
    })
    // this.data.modelpicke.unique
    if(this.data.isshoptype==1){
      wx.showToast({
        title: '加入成功',
      })
    }
    var unique;
    if(this.data.modelpicke){
      unique = this.data.modelpicke.unique
    }else{
      unique=''
    }
    console.log(this.data.modelpicke)
    if(this.data.isshoptype==2){
      wx.navigateTo({
        url: '/pages/pagetwo/zengdelit/index?specifications=' + '' + '&shopid=' + this.data.id +'&unique=' +  unique,
      })
    }
  },
  deldeFn:function(e){
    this.setData({
      isMolde:false
    })
  },
  shopGoucarFn:function(e){
    this.setData({
      isMolde:true,
      isshoptype:1,
    })
  },  
  shopGouFn:function(e){
    this.setData({
      isMolde:true,
      isshoptype:2,
    })
  },  
  clikFn:function(e){
    this.setData({
      tid:e.currentTarget.dataset.id
    })
  },
  swiperChange (e){
    this.setData({
      currentSwiper:Number(e.detail.current) +1 
    })
  },
  looklistuserFn:function(e){
    wx.navigateTo({
      url: '/pages/pack/alllistpin/index?id=' + this.data.id,
    })
  },
  clicksku:function(e){
    var pagelist = this.data.pageindex.goodsData.productAttr
    var pSku_dx = this.data.pageindex.goodsData.productValue
    var skuid = e.currentTarget.dataset.id
    var text = e.currentTarget.dataset.txt;
    var index_ = e.currentTarget.dataset.index;
    var skuVal = this.data.skuVal;
    for (var index in pagelist) {
      if (skuid == pagelist[index].id) {
        pagelist[index].attrValues = text
        skuVal[index_] = pagelist[index].attrValues
      }
    }
    this.setData({
      'pageindex.goodsData.productAttr': pagelist,
      skuVal: skuVal,
      modelpicke: pSku_dx[this.data.skuarr]
    })

    for (var index in this.data.skuVal) {
      if (this.data.skuVal[index] == '') {
        return
      }
    }
    var arr = skuVal.join(',')
    this.setData({
      skuarr: arr,
      modelpicke: pSku_dx[arr]
    })
    console.log(pSku_dx[this.data.skuarr])
    console.log(this.data.pageindex)
    console.log(skuVal)
  },
  shoucangshop:function(e){
    var status 
    if(e.currentTarget.dataset.iscollect==0){
      status= 1
    }
    if(e.currentTarget.dataset.iscollect>0){
      status= 2
    }
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/shop/collectGoods';
    var data = {
      userId:app.globalData.user_id,
      productId:this.data.id,
      status:status
    }
    app.wxRequest('post', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.shopdelit()
        
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
      title: '加载中',
    })
    var that = this
    var url = app.globalData.url + '/api/getUserInfo';
    var data = {
      userId:app.globalData.user_id,
    }
    app.wxRequest('get', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.success) {
        that.setData({
          userList:res.data.userData
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