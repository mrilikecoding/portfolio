
/*********************************************************************************/
/* Settings                                                                      */
/*********************************************************************************/

	var _settings = {

		// skelJS
			skelJS: {
				prefix: 'css/style',
				resetCSS: true,
				boxModel: 'border',
				containers: 1200,
				useOrientation: true,
				breakpoints: {
					'widest': { range: '*', containers: 1360, grid: { gutters: 50 }, hasStyleSheet: false },
					'wide': { range: '-1680', containers: 1200, grid: { gutters: 40 } },
					'normal': { range: '-1280', containers: 960, grid: { gutters: 30 }, lockViewport: true },
					'narrow': { range: '-1000', containers: '100%', grid: { gutters: 25, collapse: true }, lockViewport: true },
					'mobile': { range: '-640', containers: '100%', grid: { gutters: 10, collapse: true }, lockViewport: true }
				}
			}

	};


    window._skel_panels_config = {
        panels: {
            leftPanel: {
                breakpoints: 'narrower,mobile',
                position: 'left',
                size: 250,
                html: '<div data-action="moveCell" data-args="left-sidebar,content"></div>'
            },
            rightPanel: {
                breakpoints: 'narrower,mobile',
                position: 'right',
                size: 250,
                html: '<div data-action="moveCell" data-args="right-sidebar,content"></div>'
            },
            bottomPanel: {
                position: 'bottom',
                size: 420
                /*
                 Since this panel is a bit more complicated, we're omitting its 'html' option and
                 defining it inline (ie. in index.html).
                 */
            }
        },
        overlays: {
            titleBar: {
                breakpoints: 'mobile',
                position: 'top-center',
                width: '100%',
                height: 44,
                html: '<div data-action="copyHTML" data-args="title"></div>'
            },
            contactBar: {
                position: 'bottom-center',
                width: 250,
                height: 60,
                html:	'<a href="http://twitter.com/n33co" class="icon-twitter"></a>' +
                    '<a href="#" class="toggle icon-envelope" data-action="togglePanel" data-args="bottomPanel"></a>' +
                    '<a href="http://twitter.com/n33co" class="icon-facebook"></a>'
            },
            leftPanelButton: {
                breakpoints: 'narrower,mobile',
                position: 'top-left',
                width: 80,
                height: 60,
                html: '<div class="toggle icon-angle-right" data-action="togglePanel" data-args="leftPanel"></div>'
            },
            rightPanelButton: {
                breakpoints: 'narrower,mobile',
                position: 'top-right',
                width: 80,
                height: 60,
                html: '<div class="toggle icon-angle-left" data-action="togglePanel" data-args="rightPanel"></div>'
            }
        }
    };

/*********************************************************************************/
/* jQuery Plugins                                                                */
/*********************************************************************************/

	// lazyload images
        $(function() {
            $('img.lazy').lazyload({
                effect : 'fadeIn'
            });
        });

        $(window).on('slid.bs.carousel', function () {
            $.waypoints('refresh');
            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this).scrollspy('refresh')
            })
        })


        $(function() {
            $(document).on('click', '.dev .carousel-control', scrollToDevEl);
            $(document).on('click', '.exp .carousel-control', scrollToExpEl);
            $(document).on('click', '.music .carousel-control', scrollToMusicEl);

            function scrollToDevEl(){
                ga('send', 'event', 'v2', 'Used Carousel In Development Section');
                $('body,html').animate({
                   scrollTop: $('.dev').offset().top + Math.floor(Math.random()*5)+5
               }, 100);
            }

            function scrollToExpEl(){
                ga('send', 'event', 'v2', 'Used Carousel In Experience Design Section');

                $('body,html').animate({
                   scrollTop: $('.exp').offset().top + Math.floor(Math.random()*5)+5
               }, 100);
            }

            function scrollToMusicEl(){
                ga('send', 'event', 'v2', 'Used Carousel In Music Section');

                $('body,html').animate({
                   scrollTop: $('.music').offset().top + Math.floor(Math.random()*5)+5
               }, 100);
            }

            var $dev_arrows = $('span.fa.fa-angle-left', '.dev').add('span.fa.fa-angle-right', '.dev'),
                $exp_arrows = $('span.fa.fa-angle-left', '.exp').add('span.fa.fa-angle-right', '.exp'),
                $music_arrows = $('span.fa.fa-angle-left', '.music').add('span.fa.fa-angle-right', '.music');

            var $dev = $("#second"),
                $exp = $("#third"),
                $mus = $("#fourth");

            $dev.waypoint(function(direction){
                if(direction === "up"){
                    ga('send', 'event', 'v2', 'Scrolled up to About Section');
                    $dev_arrows.hide();
                    $music_arrows.hide();
                    $exp_arrows.hide();
                } else {
                   ga('send', 'event', 'v2', 'Scrolled down to Application Development');
                   $exp_arrows.hide();
                   $music_arrows.hide();
                   $dev_arrows.fadeIn();
                }
            });

            $exp.waypoint(function(direction){
                if(direction === "up"){
                    ga('send', 'event', 'v2', 'Scrolled up to Application Development');
                    $dev_arrows.fadeIn();
                    $music_arrows.hide();
                    $exp_arrows.hide();
                } else {
                    ga('send', 'event', 'v2', 'Scrolled down to Experience Design');
                    $dev_arrows.hide();
                    $music_arrows.hide();
                    $exp_arrows.fadeIn();
                }
            });

            $mus.waypoint(function(direction){
                if(direction === "up"){
                    ga('send', 'event', 'v2', 'Scrolled up to Experience Design');
                    $exp_arrows.fadeIn();
                    $dev_arrows.hide();
                    $music_arrows.hide();
                } else {
                   ga('send', 'event', 'v2', 'Scrolled down to Music');
                   $exp_arrows.hide();
                   $dev_arrows.hide();
                   $music_arrows.fadeIn();
                }
            });
        });




	// formerize
		jQuery.fn.n33_formerize=function(){var _fakes=new Array(),_form = jQuery(this);_form.find('input[type=text],textarea').each(function() { var e = jQuery(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = jQuery(this); var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = jQuery(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = jQuery(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); jQuery(this).find('select').val(jQuery('option:first').val()); jQuery(this).find('input,textarea').each(function() { var e = jQuery(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };

	// scrolly
		jQuery.fn.n33_scrolly = function(offset) {				
			
			jQuery(this).click(function(e) {
				var h = jQuery(this).attr('href'), target;

				if (h.charAt(0) == '#' && h.length > 1 && (target = jQuery(h)).length > 0)
				{
					var pos = Math.max(target.offset().top, 0);
					e.preventDefault();
					
					if (offset)
					{
						if (typeof(offset) == 'function')
							pos -= (offset)();
						else
							pos -= offset;
					}
					
					jQuery('body,html').animate({ scrollTop: pos }, 1000, 'swing');
				}
			});
		};

/*********************************************************************************/
/* Initialize                                                                    */
/*********************************************************************************/

	// skelJS
		skel.init(_settings.skelJS);

	// jQuery
		jQuery(function() {

			var $window = $(window);

			// Scrolly links
				$('.scrolly').n33_scrolly();

			// Forms
				if (skel.vars.IEVersion < 10)
					$('form').n33_formerize();

		});

