var autoPlayAudios = function(){
	var autoPlayAudios = this;
	autoPlayAudios.audioDOMS = document.querySelectorAll('audio');
	
	autoPlayAudios.isWeiXin = function(){ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
			return true; 
		}else{ 
			return false; 
		} 
	} 
	
	
	autoPlayAudios.autoPlayAudio = function() {
		wx.config({
            
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
			autoPlayAudios.autoPlay();
        });
	}
	

	autoPlayAudios.autoPlay  = function(){
		for(var i = 0 ; i < autoPlayAudios.audioDOMS.length ; i++){
			if(autoPlayAudios.audioDOMS[i].getAttribute('autoplay')!=null){
				autoPlayAudios.audioDOMS[i].play();
			}
		}
	}
	
	autoPlayAudios.play = function(){
		window.addEventListener('DOMContentLoaded',function(){
			
			if(autoPlayAudios.isWeiXin()){
				var script = document.createElement('script');
				script.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
				script.onload = function(){
					autoPlayAudios.autoPlayAudio();
				}
				document.body.appendChild(script);
			}else{
				
				var touchStartPlay = true;
				window.addEventListener('touchstart',function(){
					if(touchStartPlay){
						touchStartPlay = false;
						autoPlayAudios.autoPlay();
					}
				},false)
			}
		},false)
	}
}	