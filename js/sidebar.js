+ function($) {
    'use strict';

    // Sidebar CLASS DEFINITION
    // ======================

    var Sidebar = function(element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$backdrop = null;
        this.isShown = null;
    };

    Sidebar.VERSION  = '0.0.0';

    Sidebar.DEFAULTS = {};

    Sidebar.TRANSITION_DURATION = 300;
    Sidebar.MASKWIDTH = 70;

    Sidebar.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide(_relatedTarget) : this.show(_relatedTarget);
    };

    Sidebar.prototype.show = function (_relatedTarget) {
        var that = this;
        var e    = $.Event('show.sb.sidebar', { relatedTarget: _relatedTarget });

        this.$element.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) { return; }

        this.isShown = true;

        var $body    = this.$body;
        var $element = this.$element;
        var $mask    = $('.sb-mask', this.$element);
        var $sidebar = $('.sb-body', this.$element);

        $body.css('left', '0');
        $body.addClass('sb-offset');

        var width         = $body.width();
        var sidebar_width = width - Sidebar.MASKWIDTH;
        var mask_width    = Sidebar.MASKWIDTH;

        if (sidebar_width <= 0) {
            sidebar_width = width;
            mask_width    = 0;
        }

        var duration = Sidebar.TRANSITION_DURATION;
        if (this.options.duration) {
            duration = this.options.duration;
        }

        $body.width(width);

        $mask.css('opacity', '0');
        $mask.css('left', '0');
        $mask.width(width);

        $sidebar.css('left', width.toString() + 'px');
        $sidebar.width(sidebar_width);

        $element.show();

        $body.animate({
            left:  (-sidebar_width).toString() + 'px'
        }, duration);

        $mask.animate({
            left:    sidebar_width.toString() + 'px',
            width:   mask_width.toString() + 'px',
            opacity: '1'
        }, duration, function () {
            $mask.one('click', function () {
                that.hide();
            });

            var e = $.Event('shown.sb.sidebar', { relatedTarget: _relatedTarget });

            $element.trigger(e);
        });
    };

    Sidebar.prototype.hide = function (_relatedTarget) {
        var that = this;

        if (!this.isShown) { return; }

        this.isShown = false;

        var $body    = this.$body;
        var $element = this.$element;
        var $mask    = $('.sb-mask', this.$element);
        var $sidebar = $('.sb-body', this.$element);

        var width    = this.$body.width();

        var duration = Sidebar.TRANSITION_DURATION;
        if (this.options.duration) {
            duration = this.options.duration;
        }

        $body.animate({
            left:  '0',
        }, duration, function () {
            $body.removeClass('sb-offset');
            $body.css('width', '');
            $body.css('left', '');
            $element.hide();

            var e = $.Event('hidden.sb.sidebar', { relatedTarget: _relatedTarget });

            $element.trigger(e);
        });

        $mask.animate({
            left:    '0',
            width:   width.toString() + 'px',
            opacity: '0'
        }, duration);
    };


    // Sidebar PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('sb.sidebar');
            var options = $.extend({}, Sidebar.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) {
                $this.data('sb.sidebar', (data = new Sidebar(this, options)));
            }
            if (typeof option == 'string') {
                data[option](_relatedTarget);
            }
        });
    }

    var old = $.fn.sidebar;

    $.fn.sidebar = Plugin;
    $.fn.sidebar.Constructor = Sidebar;


    // Sidebar NO CONFLICT
    // =================

    $.fn.sidebar.noConflict = function() {
        $.fn.sidebar = old;
        return this;
    };


    // Sidebar DATA-API
    // ==============

    $(document).on('click.sb.sidebar.data-api', '[data-toggle="sidebar"]', function(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
        var option = $target.data('sb.sidebar') ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());

        if ($this.is('a')) e.preventDefault();

        Plugin.call($target, option, this);
    });

}(jQuery);
