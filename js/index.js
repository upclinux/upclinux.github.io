/*
 Thanks for http://www.cnblogs.com/xufeiyang/articles/3247623.html for request
 Thanks for Gaohaoyang, at https://github.com/Gaohaoyang/gaohaoyang.github.io
 */
if (!$.request) {
    $.request = (function() {
        var apiMap = {};

        function request(queryStr) {
            var api = {};
            if (apiMap[queryStr]) {
                return apiMap[queryStr];
            }
            api.queryString = (function() {
                var urlParams = {};
                var e,
                    d = function(s) {
                        return decodeURIComponent(s.replace(/\+/g, " "));
                    },
                    q = queryStr.substring(queryStr.indexOf('?') + 1),
                    r = /([^&=]+)=?([^&]*)/g;
                while ((e = r.exec(q))) {
                    urlParams[d(e[1])] = d(e[2]);
                }
                return urlParams;
            })();
            api.getUrl = function() {
                var url = queryStr.substring(0, queryStr.indexOf('?') + 1);
                for (var p in api.queryString) {
                    url += p + '=' + api.queryString[p] + "&";
                }
                if (url.lastIndexOf('&') == url.length - 1) {
                    return url.substring(0, url.lastIndexOf('&'));
                }
                return url;
            };
            apiMap[queryStr] = api;
            return api;
        }
        $.extend(request, request(window.location.href));
        return request;
    })();
}
$(document).ready(function() {
    generateContent();
    backToTop();
    fixTables();
    fixLinks();
    if (document.getElementById('sidebar')) {
        $('#nav-sidebar-content').html($('#sidebar').html());
    }
    categoryDisplay();
});
/**
 * 分类展示
 * 点击右侧的分类展示时
 * 左侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function categoryDisplay() {
    /*show category when click categories list*/
    $('.item').click(function() {
        var cate = $(this).data('cate'); //get category's name
        $('.post-list[data-list-cate!=' + cate + ']').hide(250);
        $('.post-list[data-list-cate=' + cate + ']').show(400);
        $('#categorization').text(cate);
    });
    var s = $.request.queryString.c;
    if (s) {
        $('.item[data-cate=' + s + ']').click();
    }
}
/**
 * 回到顶部
 */
function backToTop() {
    // 滚页面才显示返回顶部
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $("#top").fadeIn(500);
        } else {
            $("#top").fadeOut(500);
        }
    });
    // 点击回到顶部
    $("#top").click(function() {
        $("html,body").animate({
            scrollTop: "0"
        }, 500);
    });
    // 初始化 tip
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
}
/**
 * 侧边目录
 */
function generateContent() {
    //$('#markdown-toc').addClass('hidden-md').addClass('hidden-lg');
    var $toc = $('#markdown-toc');
    if (typeof $toc.html() === 'undefined') {
        $('#content').hide();
    } else {
        var html = $toc.html();
        $('#content-ul').html(html);
        $('body').scrollspy({
            target: '#content'
        });
        $('#content-ul').affix({
            offset: {
                top: 250,
                bottom: function() {
                    return (this.bottom = $('footer').outerHeight(true) + $('#disqus_thread').outerHeight(true) + 150);
                }
            }
        });
        $('#contents-sidebar').show();
        $('#contents-sidebar-ul').html(html);
    }
    $('a', '#sb-content').each(function() {
        var $element = $(this);
        var href = $element.attr('href');
        $element.attr('data-target', href).attr('href', 'javascript:;').click(function() {
            $('#sidebar-mobile').sidebar('hide').one('hidden.sb.sidebar', function() {
                location.href = href;
            });
        });
    });
}
/**
 * 处理文章内表格
 */
function fixTables() {
    $('.article table').each(function() {
        if (!$(this).hasClass('table')) $(this).addClass('table table-striped table-bordered');
    });
}
/**
 * 处理页面链接
 */
function fixLinks() {
    $('a[href^="http"]').each(function() {
        $(this).attr('target', '_blank');
    });
    $('article a[href^="http"]').each(function() {
        var h = $(this).html();
        $(this).html(h + '<i class="fa fa-external-link external-link"></i>');
    });
}
