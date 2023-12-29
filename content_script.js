function tester(){
    //feature-button
    //chip-tray: chips
    //chip chip_theme_default
    //table-cell--Wz6uJ  table-cell_side-red--ot8JV
    console.log("tester triggered");
    //document.elementFromPoint(461, 590).click();
}

function openChips(){
    var chipsTray = document.querySelectorAll(".chip-tray");
    window.setTimeout(function(){
        chipsTray[0].classList.add('chip-tray_opened');
        chipsTray[0].click();
    },250);
}
var _intreval1;

function insideStarter(className,indexV){
    clearInterval(_intreval1);
    //feature-button
    var buttonFeature = document.querySelectorAll("."+className);
    console.log("Size: "+buttonFeature.length);
    //var buttonFeature2 = document.querySelectorAll(".chip");
   
  
    buttonFeature[indexV].click();

   /* document.addEventListener('click', function(e){
        console.log(e.pageX + " " + e.pageY);
        console.log(e.target);

    });*/
    
    /*
     _bi=0;
    _intreval1 = window.setInterval(function(){
        if(_bi==buttonFeature.length){clearInterval(_intreval1);}
        console.log("cp interval : " + _bi);
        try{
            buttonFeature[_bi].click();
            //buttonFeature[_bi].classList.add('chip-tray__panel-chip_selected');
            //buttonFeature2[_bi].click();
        }catch(e){
            console.log(e);
        }
        //buttonFeature[_bi].remove();
        _bi++;
    },2000);
    */
   
    window.setTimeout(function(){
        console.log("insideStarter indexV: " + className+ ":" +indexV);
        /*try{
            console.log('data-automation-locator '+ buttonFeature[indexV].getAttribute('data-automation-locator'));
        }catch(e){
            console.log(e)
        }*/
        //
        //buttonFeature[indexV].click();

    },250);
    
    /*
    for (var i = 0; i < buttonFeature.length; i++) {
        console.log("cp2 : " + i);
    }    

    var _bi = 0;
    window.setInterval(function(){
        console.log("cp interval : " + _bi);
        buttonFeature[_bi].click();
        _bi++;
    },3000);
    */

    
    //Click home casino button (0)
    if(0){
        var buttonCasino1 = document.querySelectorAll(".wn-PreMatchFrequentItem");
        buttonCasino1[0].click();
    }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log('Message received:', message);
});

const triggerLogin = false;
if(triggerLogin){
    document.querySelector(".lms-StandardLogin_Username").value = "piscobet";
    document.querySelector(".lms-StandardLogin_Password ").value = "Pipo2023@";
    const buttonL = document.querySelectorAll(".lms-LoginButton");
    window.setTimeout(function(){
        console.log("cp5");
        for (var i = 0; i < buttonL.length; i++) {
            buttonL[i].click();
        }    
    },2000);
}

/*
window.setTimeout(function(){
    const buttonCasino1 = document.querySelectorAll(".wn-PreMatchFrequentItem");
    window.setTimeout(function(){
       
        for (var i = 0; i < buttonCasino1.length; i++) {
            console.log("cp2 : " + i);
            buttonCasino1[i].click();
        }    
    },2000);
},2000);
*/




