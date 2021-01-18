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
    ids:[]
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
    wx.request({
      url: 'https://music.163.com/api/search/get?s='+kw+'&type=1&limit=6',
      success:function(res){

        var songs = res.data.result.songs
        for(var val in songs){
          searchId.push(songs[val].id)
        }
        
        _this.setData({
          songs:songs,
          ids:searchId
        })
        _this.getMusicImg(searchId,0,searchId.length)
      }
    })
  },
  getMusicImg(searchId,i,length){
    var _this = this
    var albumPic=_this.data.albumPic
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id='+searchId[i]+'&ids=['+searchId[i]+']',
      success:function(res){
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
  }
    
})