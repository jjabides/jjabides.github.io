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

    var fade = () => {
        setTimeout(() => {
            helloSplash.style.opacity = 1;
            setTimeout(() => {
                helloSplash.style.opacity = 0;
    
                setTimeout(() => {
                    helloSplash.style.display = 'none';
                    var headerDesc = document.getElementsByClassName('header-desc')[0].style.opacity = 1;
                }, 1000);
            }, 1500);
        }, 100);  
    }

    fade();
}