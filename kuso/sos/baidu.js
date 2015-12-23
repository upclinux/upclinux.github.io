var $ = function (id) {
    return document.getElementById(id);
};

var getRequests = function () {
    var url = location.search,
        result = {},
        str, strs, i, t;
    
    if (url.indexOf('?') !== -1) {
        str = url.substr(1);
        strs = str.split('&');
        
        for (i = 0; i < strs.length; i++) {
            t = strs[i].split('=');
            result[t[0]] = decodeURIComponent(t[1]);
            
        }
    }
    return result;
};

var animate = function (params, callback) {
    var tick = params.tick,
        interval = params.interval,
        cursor = params.cursor,
        tarX = params.targetX,
        tarY = params.targetY,
        curX = cursor.offsetLeft,
        curY = cursor.offsetTop;

    var move = function () {
        curX = curX + (tarX - curX) / tick;
        curY = curY + (tarY - curY) / tick;

        cursor.style.left = curX + 'px';
        cursor.style.top = curY + 'px';

        tick -= 1;

        if (tick > 0) {
            setTimeout(move, interval);
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };
        
    if (params.initX) {
        cursor.style.left = params.initX + 'px';
    }
    if (params.initY) {
        cursor.style.top = params.initY + 'px';
    }

    setTimeout(move, interval);
};

(function () {
    var requests = getRequests(),
        target1 = $('wd'),
        target2 = $('submitbutton'),
        cursor = $('cursor'),
        keyword,
        ani = [
            {
                tick: 20, 
                interval: 40,
                initX: 0,
                initY: 0,
                cursor: cursor,
                targetX: target1.offsetLeft + 20,
                targetY: target1.offsetTop + 20
            },
            {
                tick: 10,
                interval: 30,
                cursor: cursor,
                targetX: target1.offsetLeft + 30,
                targetY: target1.offsetTop + 50
            },
            {
                tick: 40,
                interval: 30,
                cursor: cursor,
                targetX: target2.offsetLeft + 50,
                targetY: target2.offsetTop + 20
            }
        ];

    if (requests.hasOwnProperty('wd')) {

        // 有关键词，执行搜索
        keyword = requests.wd;

        animate(ani[0], function () {
            document.forms[0].wd.value = keyword;

            setTimeout(function () {
                animate(ani[1], function () {

                    setTimeout(function () {
                        animate(ani[2], function () {
                            document.forms[0].submit();
                        });
                    }, 100);
                });
            }, 300);
        });

    } else {

        // 没有关键词，显示生成器
        $('cursor').style.display = 'none';
        $('genbox').style.display = 'block';
        $('gen').addEventListener('click', function () {
            var link = $('link');
                s = location.href + '?wd=' + encodeURIComponent(document.forms[0].wd.value);
            link.href = s;
            link.text = s;
        });
    }

})();
