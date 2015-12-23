document.title = '百度一下，你就知道';

var getRequest = function () {
    var url = location.search,
        theRequest = {},
        str, strs, i;
    
    if (url.indexOf("?") !== -1) {
        str = url.substr(1);
        strs = str.split("&");
        
        for (i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            
        }
    }
    return theRequest;
};

var requests = getRequest();
if (requests.hasOwnProperty('wd')) {
    document.forms[0].wd.value = requests.wd;
}

(function (tick, interval) {
    var cursor = document.getElementById('cursor'),
        target = document.getElementById('submitbutton');
    var move = function () {
        'use strict';
        var curX = cursor.offsetLeft,
            curY = cursor.offsetTop,
            tarX = target.offsetLeft + 50,
            tarY = target.offsetTop + 15;

        cursor.style.left = (curX + (tarX - curX) / tick) + 'px';
        cursor.style.top = (curY + (tarY - curY) / tick) + 'px';

        tick -= 1;

        if (tick > 0) {
            setTimeout(move, interval);
        } else {
            //window.baidu.submit();
            document.forms[0].submit();
        }
    };
        
    cursor.style.left = (Math.random()*0.5+0.2) * window.innerWidth + 'px';
    cursor.style.top = (Math.random()*0.3+0.6) * window.innerHeight + 'px';

    setTimeout(move, interval);
})(20, 40);