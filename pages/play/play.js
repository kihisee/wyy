// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:{
      method:'play'
    },
    id:'',
    state:"play",
    song:null,
    lyricArray:[],
    scrollTop:0,
    currentIndex:0,
    songIndex:0,
    ids:[],
    mode:'single',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    
    var mid = options.mid
    var index = options.index
    var ids = (options.ids).split(",")
    this.setData({
      id:mid,
      songIndex:index,
      ids:ids
    })
    this.getSongInfoById()
    this.getLyricById()
  },

  getSongInfoById:function(){
    var curId=this.data.id
    var _this = this
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id='+curId+'&ids=['+curId+']',
     
      success:function(res){
        var msong=res.data.songs[0];
        _this.setData({
          song:msong
        })
      },
      fail:function(){
        console.log(111)
      }

    })
  },

  getLyricById:function(){
    var curId=this.data.id
    var _this = this
    wx.request({
      url: 'https://music.163.com/api/song/lyric?os=pc&id='+curId+'&lv=-1&kv=-1&tv=-1',
      success:function(res){
        var lyric=res.data.lrc.lyric
        var result = _this.parseLyric(lyric)
        var fResult =  _this.sliceNull(result)
        _this.setData({
          lyricArray:fResult
        })
      }
    })
  },
  parseLyric:function(lyric){
    var lyricR = []; 
    var lyricArray = lyric.split("\n");
    
    if(lyricArray[lyricArray.length-1]==""){
      lyricArray.pop();
    }
    var pattern = /\[\d{2}:\d{2}\.\d{2,3}\]/;
    lyricArray.forEach(function(v,i,a){
      
     var r = v.replace(pattern,"");//每句歌词
     var t = v.match(pattern)//每句歌词对应时间
     if(t != null){
      var re = t[0].slice(1,-1)
      var tA=re.split(":")
      var fT=parseFloat(tA[0]*60+parseFloat(tA[1]));
      lyricR.push([fT,r])
     }
  
    })
    return lyricR
  },

  sliceNull:function(lyricA){//去掉空歌词 
    var result = []
    for(var i=0; i<lyricA.length;i++){
      if(lyricA[i][1] !=""){
        result.push(lyricA[i])
      }
    }
    return result;
  },

  playOrPause:function(){
    var musicState = this.data.state
    if(musicState=="play"){
      this.setData({
        action:{
          method:"pause"
        },
        state:"pause"
      })
    }else{
      this.setData({
        action:{
          method:"play"
        },
        state:"play"
      })
    }
  },
  changeTime:function(e){
    var currentTime = e.detail.currentTime
    var lyricArray = this.data.lyricArray;
    var _this = this
    //计算滚动条位置
    if(this.data.currentIndex >= 6){
      this.setData({
        scrollTop:(this.data.currentIndex-6)*30
      })
    }
    
    if(this.data.currentIndex == lyricArray.length - 2){
      
      if(currentTime>=lyricArray[lyricArray.length-1][0]){
        this.setData({
          currentIndex:lyricArray-1
        })
      }
    }else{
      for(var i=0;i<lyricArray.length-1;i++){
        if(currentTime>=lyricArray[i][0] && currentTime <lyricArray[i+1][0]){
          this.setData({
            currentIndex:i
          })
        }
      }
    }

    
  },
  goPrev(){
    var index = this.data.songIndex;
    console.log(index)
    var ids = this.data.ids;
    console.log(this.data.ids)
    var id = 0
    if(index==0){
      return;
      index=0;
    }else{
      id = ids[index-1]
    }
    this.setData({
      id:id,
      songIndex:index-1,
      scrollTop:0,
      currentIndex:0,
    })
    this.setData({
      action:{
        method:"play"
      }
    })
    this.getSongInfoById()
    this.getLyricById()
  },
  goNext(){
    var index =parseInt(this.data.songIndex);
    console.log(index+1)
    var ids = this.data.ids;
    console.log(ids[index])
    var id = 0;
    if(index==ids.length-1){
      return;
      index=ids.length-1;
    }else{
      
      id = ids[index+1]
      console.log(ids[index])
    }
    
    this.setData({
      id:id,
      songIndex:index+1,
      scrollTop:0,
      currentIndex:0,
    })
    this.setData({
      action:{
        method:"play"
      }
    })
    this.getSongInfoById()
    this.getLyricById()
  },

  changeMode:function(){
    var mode = this.data.mode;
    if(mode == 'single'){
      this.setData({
        mode:'loop'
      })
    }else{
      this.setData({
        mode:'single'
      })
    }
  },

  changeMusic:function(){
    var mode = this.data.mode;
    if(mode == 'single'){
      this.setData({
        id:this.data.id
      })
      this.setData({
        action:{
          method:"play"
        }
      })
    }else{
      this.goNext()
    }
    this.setData({
      scrollTop:0,
      currentIndex:0,
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