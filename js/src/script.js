(function(){

	var digital = {
		
		init: function() {
			this.CacheDom();
			this.stickyHeader();
			this.BindEvents();
			this.navOverlay();
			this.enableMailchimpForm();
			//SmoothScroll(1000);
		},
		CacheDom: function() {
			
			this.pageSlider = $('.dm__slider');
			this.blogSlider = $('.dm__slider-blog');
			this.scene = $('#scene');
			this.parallaxScenes = $('.dm-prallaxScene');
			this._navOverlay__isActive = false;
			this.menuLinks = $('.dm__navOverlay--mainNav li a');
			this._overlayMenuHolder = $('.dm__navOverlay'),
			this._mainMenu = $('.dm__navOverlay--mainNav');
			this._body = $('body'),
			this._pageWrapper = $('#page_wrapper'),
			this._menuTrigger = $('.dm-burger');
			this._overlayMenuClose = $('.dm__navOverlay-close');
			this.toTop = $('.totop');
			this.mailchimpForm = $('.dm__newsletter-form')
		},
		BindEvents: function() {

			var self = this;

			/* page slider */
			self.pageSlider.slick({ 
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				speed: 500,
				fade: true,
				autoplay: true,	
				cssEase: 'linear'
			});	

			self.blogSlider.slick({				
				centerMode: true,
				arrows: true,
				infinite: true,
				speed: 300,
				speed: 500,
				slidesToShow: 1,
				adaptiveHeight: false,
				centerPadding: '25%',
				responsive: [{
				breakpoint: 992,
				settings: {
					centerMode: false
				}
				}]
			});		
		},
		stickyHeader: function() {

			var $el = $(".dm__stickyHeader"),
				headerHeight = $el.find('.dm__headerContainer').outerHeight();

			$(window).on('scroll', function(event){
				if( $(window).scrollTop() > headerHeight ){
					$el.removeClass('header--not-sticked');
					$el.addClass('header--is-sticked');
				}
				else{
					$el.removeClass('header--is-sticked');
					$el.addClass('header--not-sticked');
				}
			});
		},
		navOverlay: function() {

			var self = this;

			if(self._mainMenu.length > 0) {

				var closeMenu = function() {
					self._overlayMenuHolder.removeClass('is-active');
					self._overlayMenuHolder.addClass('dm__navOverlay--closed');
					self._menuTrigger.removeClass('is-active');
					setTimeout(function(){self._body.css('overflow','');}, 700);
				}

				var openMenu = function() {
					self._overlayMenuHolder.addClass('is-active');
					self._overlayMenuHolder.removeClass('dm__navOverlay--closed');
					self._menuTrigger.addClass('is-active');
					self._body.css('overflow','hidden');
				}
				var toggleOpen = function(){
					if( self._overlayMenuHolder.hasClass('is-active') ){
						closeMenu();
					}
					else {
						openMenu();
					}
				};

				/* open menu trigger */
				self._menuTrigger.on('click', function(e){
					e.preventDefault();
					toggleOpen();
				});

				/* Close Button */
				self._overlayMenuClose.on('click', function(e){
					e.preventDefault();
					toggleOpen();
				});

				/* Close menu if the menu links are clicked */
				self.menuLinks.on('click', function(e) {
					self._mainMenu.find('li .active').removeClass('active');
					$(this).addClass('active');
					toggleOpen();

					// Get the link id
					var $link = $(this), 
						linkAttribute = $link.attr('href'),
						sectionId = linkAttribute.substring( linkAttribute.indexOf('#') ),
						$section = $( sectionId );

					if( $section.length != 0 ){
						e.preventDefault();
					}

					var positionToTop = $section.offset().top,
						topOffset = $link.data('offset');

					// Check if link has offset
					if( topOffset ){
						positionToTop = positionToTop + topOffset;
					}
						
					// Scroll to element
					$( 'body' ).animate( {scrollTop: positionToTop }, 'slow' );
					
				});
			}
		},
		enableMailchimpForm: function(){
			this.mailchimpForm.on('submit', function(event){

				// Prevent the default 
				event.preventDefault();

				var responseContainer = $(this).find('.dm__newsletter-message');

				// Clear the message container
				responseContainer.html('').removeClass('has-error is-valid');

				var data = {};
				var dataArray = $(this).serializeArray();
				$.each(dataArray, function (index, item) {
					data[item.name] = item.value;
				});

				var url = $(this).attr('action').replace('/post?', '/post-json?').concat('&c=?');

				$.ajax({
					url: url,
					data: data,
					cache       : false,
					dataType: 'jsonp',
					error: function(data){
						alert('There was an error submitting your request. Please try again in a few minutes.');
					},
					success: function(data){
						if( data.result.length ){
							if( data.result == 'error' ){
								responseContainer.html( data.msg ).addClass('has-error');
							}
							else if( data.result == 'success' ){
								responseContainer.html( data.msg ).addClass('is-valid');
							}
						}
						else{
							alert('There was an error submitting your request. Please try again in a few minutes.');
						}
					}
				});
			});
		}	
	};

	digital.init();

})( jQuery );