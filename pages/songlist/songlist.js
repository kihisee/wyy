// pages/songlist/songlist.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'http://p1.music.126.net/XDhXKZ_MXrtmpF0TirgS4w==/109951165603162901.jpg?imageView&quality=89',
      'http://p1.music.126.net/MgYPKk4icLAP093ynNRdWg==/109951165603250362.jpg?imageView&quality=89',
      'http://p1.music.126.net/ZtaPwpy3QykGl9Px-spGLQ==/109951165603281785.jpg?imageView&quality=89'
    ],
    songs:[],
    kw:'',
    albumPic:[],
    ids:[],
    mvs:[],
    limit:6,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var kw = this.data.kw
    var _this=this
    var searchId=[]
    var names=[]
    var artists=[]
    
    var limit = this.data.limit;
    limit=limit+5
    this.setData({
      limit:limit
    })
    console.log(limit)
    if(kw!=""){
      wx.showLoading({
        title:"来了，老弟"
      })
      wx.request({
        url: 'https://music.163.com/api/search/get?s='+kw+'&type=1&limit='+_this.data.limit,
        success:function(res){
          var songs = res.data.result.songs
          _this.setData({
            songs:songs
          })
          for(var val in songs){
            searchId.push(songs[val].id)
            names.push(songs[val].name)
            artists.push(songs[val].artists[0].id)
          }f
          _this.setData({
            albumPic:[],
            mvs:[],
          })
          _this.getMusicImg(searchId,0,searchId.length)
          _this.getMvBySongName(names,0,names.length,artists)
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  gotoPlay:function(event){
    var songid = event.currentTarget.dataset.songid;
    // wx.navigateTo({
    //   url: '../play/play?id='+songid,
    // })
  },
  getkeyword:function(e){
   
    var keyword = e.detail.value;
    this.setData({
      kw:keyword
    })
  },
  do_search:function(){
    var kw = this.data.kw
    var _this = this;
    var searchId=[]
    var names=[]
    var artists = []
    wx.request({
      url: 'https://music.163.com/api/search/get?s='+kw+'&type=1&limit='+_this.data.limit,
      success:function(res){

        var songs = res.data.result.songs
        for(var val in songs){
          searchId.push(songs[val].id)
          names.push(songs[val].name)
          artists.push(songs[val].artists[0].id)
        }f
        _this.setData({
          albumPic:[],
          mvs:[],
        })
        _this.getMusicImg(searchId,0,searchId.length)
        _this.getMvBySongName(names,0,names.length,artists)
        _this.setData({
          songs:songs,
          ids:searchId,
          
        })
      }
      
    })
  },
  getMvBySongName:function(name,i,length,artists){
    var mvs = this.data.mvs
    var _this=this
    wx.request({
      url: 'https://api.mlwei.com/music/api/mv/?key=523077333&mv=163&type=so&word='+name[i]+'&page=1',
      success:function(res){
        var result = res.data.result.mvs
        if(result !=undefined){
          var flag = false;
          for(var j=0;j<result.length;j++){
            if(artists[i]==result[j].artistId){
              mvs.push(result[j].id)
              flag=true
              break
            }
          }
        }
        if(!flag){
          mvs.push(-1)
        }
        _this.setData({
          mvs:mvs
        })
        
        if(++i<length){
          _this.getMvBySongName(name,i,length,artists)
        }
        
      }
    })
  },
  getMusicImg(searchId,i,length){
    var _this = this
    var albumPic=_this.data.albumPic
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id='+searchId[i]+'&ids=['+searchId[i]+']',
      success:function(res){
        console.log(res)
        var albumPici=res.data.songs[0].album.picUrl
        var name=res.data.songs[0].album.name
        albumPic.push(albumPici)
        _this.setData({
          albumPic:albumPic
        })
        
        if(++i<length){
          _this.getMusicImg(searchId,i,length)
        }
      }
    })
  },
  go_mv:function(e){
    var mvId=e.currentTarget.dataset.mvid
    console.log(mvId)
    wx.navigateTo({
      url: '../mv/mv?mvId='+mvId,
    })
  }
})