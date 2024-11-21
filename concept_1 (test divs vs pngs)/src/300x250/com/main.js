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
    tl = new TimelineLite()
    // tl = new TimelineLite({repeat: -1, repeatDelay: 1}); // Repeat infinitely with a 1-second delay between repetitions
    
    tl 
    .set(line3, {x:-1,scaleX: 0, transformOrigin: "right center"})
    .set(line4, {y:-1,scaleY: 0, transformOrigin: "bottom center"})
    // LINE ANIMATION
    .from(line1, .6, {width: 0, ease: Power1.easeInOut})
    .from(line2, .6, {height: 0, ease: Power1.easeInOut}, "-=.2")
    .to(line3, .6, {x:0, scaleX: 1, ease: Power1.easeInOut}, "-=.1")
    .to(line4, .6, {y:0, scaleY: 1, ease: Power1.easeInOut}, "-=.1")

    // LOGO ANIMATION
    .from(logoCopy_2x, .5, {y:10,opacity: 0, ease: Power1.easeInOut},"-=1.3")
    .from(logo_2x, 1, {opacity: 0, ease: Power1.easeInOut},0.7)

    .staggerFrom([c1_2x, c2_2x], .7, {opacity: 0, y:10, ease: Power1.easeInOut}, .1, "-=.2")
    .from(loc_2x, .7, {opacity: 0, ease: Power1.easeInOut})



    // .from(line4_2x, .8, {height: 0, ease: Power1.easeInOut}, "-=.2");


    .call(returnTimer)
    // Debugging: Log when the timeline completes
    tl.eventCallback("onComplete", function() {
            // Reset elements to their original state
    // TweenLite.set(line3_2x, {x: -1, scaleX: 0});
    // TweenLite.set(line4_2x, {y: -1, scaleY: 0});
    // TweenLite.set(line1_2x, {width: 0});
    // TweenLite.set(line2_2x, {height: 0});
    // TweenLite.set(logoCopy_2x, {y: 10, opacity: 0});
    // TweenLite.set(logo_2x, {opacity: 0});
    // TweenLite.set([c1_2x, c2_2x], {opacity: 0, y: 10});
    TweenLite.set(loc_2x, {opacity: 0});
        console.log("Animation complete, repeating...");
    });
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