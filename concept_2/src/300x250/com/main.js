//IIFE TO EXTRACT DIMENSION DATA
var dimensions = (function(){
        var str = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
        var widthMatch = /width\=(\d+)/.exec(str);
        var heightMatch = /height\=(\d+)/.exec(str);
        return {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
        }
})();

var tl;
var stopWatch;

//INITIALIZE
function init(){

    // Helper function for FOUC
    let domReady = (cb) => {
        document.readyState === 'interactive' || document.readyState === 'complete'
        ? cb()
        : document.addEventListener('DOMContentLoaded', cb);
    };
    
    domReady(() => {
        // Display body when DOM is loaded
        document.body.style.visibility = 'visible';
    });

    IDsToVars();

    container.style.width = dimensions.width + 'px';
    container.style.height = dimensions.height + 'px';
    
    //set timeline
    tl = new TimelineLite();

    addListeners();


    // while (true) {
        animate();
        
    // }
    
}

function addListeners(){
    //replay functionality
    /*
    replay_button.addEventListener('mouseover',function(){
        TweenLite.fromTo(replay_button, .5, {rotation:'-360'}, {overwrite:false, rotation:'0'});
    })
    replay_button.addEventListener('click',function(){
            tl.restart();
    })
    */
}

//ANIMATE
function animate(){
    stopWatch=new Date().getTime(); 

    //timeline animation here
    // tl = new TimelineLite()
    tl = new TimelineLite({repeat: 3, repeatDelay: 2}); // Repeat 3xs with a 2-second delay between repetitions
    
    tl 
    .set(line3_2x, {x:-1,scaleX: 0, transformOrigin: "right center"})
    .set(line4_2x, {y:-1,scaleY: 0, transformOrigin: "bottom center"})
    
    // LINE ANIMATION
    .to(line4_2x, .6, {y:0, scaleY: 1, ease: Power1.easeInOut})
    .from(line1_2x, .6, {width: 0, ease: Power1.easeInOut},"-=.2")
    .from(line2_2x, .6, {height: 0, ease: Power1.easeInOut}, "-=.1")
    .to(line3_2x, .6, {x:0, scaleX: 1, ease: Power1.easeInOut}, "-=.1")

    // LOGO ANIMATION
    .from(logo_2x, 1.6, {opacity: 0, ease: Power1.easeInOut},0)
    .from(logoCopy_2x, .4, {y:10,opacity: 0, ease: Power1.easeInOut},"-=.2")
    
    // COPY ANIMATION
    .staggerFrom([c1_2x, c2_2x, c3_2x], .7, {opacity: 0, y:10, ease: Power1.easeInOut}, .1, "-=.2")
    .from(loc_2x, .7, {opacity: 0, ease: Power1.easeInOut})

    .call(returnTimer)
}

function returnTimer(){
    stopWatch=((new Date().getTime())-stopWatch)*.001;
    console.log(stopWatch+" seconds");
}

function clickThrough(){
    window.open(clicktag);
}

//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
};