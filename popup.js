document.addEventListener("DOMContentLoaded", function(){
   
    var audio = new Audio('play_sound.mp3');
    var _intervalTimer = 1000;
    
    $('.startChecker').click(function(){

        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content_script.js']})
        });
        
        window.setInterval(function(){
            chrome.tabs.query({ active: true, currentWindow:true},function (tabs){
                chrome.scripting.executeScript({ 
                    target: { tabId: tabs[0].id },
                    function: function () {
                        return document.documentElement.outerHTML;
                    }
                },function(result){
                    trackNumbers(result);
                });
            });
        },_intervalTimer);
        
    });

    $('.tester').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.scripting.executeScript({target: {tabId: tabs[0].id },function: function(args) {
                tester();
            }
            },function(result){
            });
        });
    });

    $('.toggleChipTray').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.scripting.executeScript({target: {tabId: tabs[0].id },function: function(args) {
                openChips();
            }
            },function(result){
            });
        });
    });

    $('.stopAlert').click(function(){
        var indexV = $('.indexV').val();
        var className = $('.className').val();
        //alert("1: " + indexV);
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.scripting.executeScript({args:[{'className':className,'indexV':indexV}],target: {tabId: tabs[0].id },function: function (args) {
                //chrome.tabs.sendMessage(tabs[0].id, 'whatever value; String, object, whatever');
                insideStarter(args.className,args.indexV);
                //return document.documentElement.outerHTML;
            }
            },function(result){
            });
        });
    });


    function trackNumbers(resultCode){
     
        var num_map = new Array(
            [0,'w'],[1,'r'],[2,'b'],[3,'r'],[4,'b'],[5,'r'],[6,'b'],[7,'r'],[8,'b'],[9,'r'],[10,'b'],[11,'b'],[12,'r'],
            [13,'b'],[14,'r'],[15,'b'],[16,'r'],[17,'b'],[18,'r'],[19,'r'],[20,'b'],[21,'r'],[22,'b'],[23,'r'],[24,'b'],
            [25,'r'],[26,'b'],[27,'r'],[28,'b'],[29,'b'],[30,'r'],[31,'b'],[32,'r'],[33,'b'],[34,'r'],[35,'b'],[36,'r']
        );
        var _play_sound = true;
        var _last_throws_counter = 1;
        var _you_win = false;
        var _you_win_counter = 0;
        
        var _result = resultCode[0].result;
        var _check = _result.split('roulette-history-item__value-text--siwxW');
        var f12block,f24block,f36block,oddCounter,evenCounter = 0; 
        var _timer_container = _result.split('timer__container');
        if(!_you_win && _result.indexOf('You win')>-1){
            _you_win = true;
            _you_win_counter++;
            $('.CT-winners-counter').html(_you_win_counter);
            $('.CT-winners-congrats').show();
            window.setTimeout(function(){
                _you_win = false;
                $('.CT-winners-congrats').hide();
            },5000);
        }

        if(1 || _timer_container.length>2){
            var rNum = new Array();
            for(var i=20;i<49;i++){
                //console.log(_check[i]);
                rNum.push(parseInt(_check[i].replace(/<\/?[^>]+(>|$)/g, "").replace(/\D/g, "")));
            }
            var prev_color = '';
            for(var i2=10;i2>-1;i2--){
                var result_color = num_map.filter(function(v,index) {
                    return v[0] === rNum[i2];
                });
                if(result_color[0][1]==prev_color){
                    _last_throws_counter++;
                }else{
                    _last_throws_counter = 1;
                }
                prev_color = result_color[0][1];
                if(rNum[i2] < 13){
                    f12block++;
                }else {
                    f12block = 0;
                }
                //1st24 checker
                if(rNum[i2] > 12 && rNum[i2] < 25){
                    f24block++;
                }else{
                    f24block = 0;
                }
                //1st36 checker
                if(rNum[i2] > 24 && rNum[i2] <= 36) {
                    f36block++;
                }else{
                    f36block = 0;
                }
                //even checker
                if(rNum[i2] % 2 == 0) {
                    evenCounter++;
                }else{
                    evenCounter = 0;
                }
                //odd checker
                if(rNum[i2] % 2 == 1){
                    oddCounter++;
                }else{
                    oddCounter = 0;
                }
            }
            //console.log(_last_throws_counter);
            var min_black_red_plays = 8;
            var min_even_odd_plays = 8;
            var min_12_blocks_counter = 8;
                if(_play_sound && (_last_throws_counter>min_black_red_plays || (evenCounter>min_even_odd_plays || oddCounter>min_even_odd_plays) || (f12block>min_12_blocks_counter || f24block>min_12_blocks_counter || f36block>min_12_blocks_counter) )){
                    audio.play();
                    _play_sound = false
                    window.setTimeout(function(){
                    _play_sound = true;
                    audio.pause();
                },25000);
            }
            
            console.log(_last_throws_counter+" / "+f12block+"-"+f24block+"-"+f36block+" / e:"+evenCounter+" / o:"+oddCounter+ " :: " + rNum + " :: sound: " + _play_sound);
            
        }
    }
               

});