window.addEventListener("DOMContentLoaded", (event) => {
    pageStartupAnimation();

    window.onscroll = () => {

        var panels = document.getElementsByClassName('panel');

        for (var i = 0; i < panels.length; i++) {
            var inView = isElementInView(panels[i]);

            if (inView) {
                panels[i].classList.add('transition');
            } else {
                panels[i].classList.remove('transition');
            }
        }
    }
});

function isElementInView(element) {
    var pageTop = window.scrollY;
        var pageBottom = pageTop + window.innerHeight;
        var elementTop = getOffsetTop(element);
        var elementBottom = elementTop + element.offsetHeight;

        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
}

function getOffsetTop(element) {
    var offsetTop = 0;
    do {
      if ( !isNaN( element.offsetTop ) )
      {
          offsetTop += element.offsetTop;
      }
    } while( element = element.offsetParent );
    return offsetTop;
}

function pageStartupAnimation() {
    var helloSplash = document.getElementById('hello-splash');

    var display = () => {
        helloSplash.style.opacity = 1;
    }

    var fadeOut = () => {
        helloSplash.style.opacity = 0;
    }

    var remove = () => {
        helloSplash.style.display = 'none';
       document.getElementsByClassName('header-desc')[0].style.opacity = 1;
    }

    var displayArrow = () => {
        document.getElementById("down-arrow").style.opacity = 1;
    }

    var actionDelayPair = new Array();

    actionDelayPair.push(
        { action: display, delay: 300 }, 
        { action: fadeOut, delay: 1200 }, 
        { action: remove, delay: 1000 },
        { action: displayArrow, delay: 1000 }
    );

    sequence(actionDelayPair);
}

function sequence(actions) {
    if (actions.length === 0) return;

    var actionDelayPair = actions.shift();

    setTimeout(() => 
    { 
        actionDelayPair.action(); 
        sequence(actions);
    }, actionDelayPair.delay);
}
