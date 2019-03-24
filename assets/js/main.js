(function($) {
	'use strict';
	
	/* ========================= */
	/* 		  MEDIA PLAYER	     */
	/* ========================= */
	
		$('video, audio').mediaelementplayer({
			audioWidth: '100%'
		});
	
	/* ============================================= */
	/* 		  HAMBURGUER MENU TO SHOW MAIN MENU	     */
	/* ============================================= */
	
		$('.btn-hamburguer-menu').on('click', function(){
			$(".navigation").find('.menu').slideToggle();
			$(this).toggleClass('active');

			/* ======= DROPDOWN MENU ON RESPONSIVE ======= */
			if( $(window).width() <= 991 ){
				$('.navigation').find('.dropdown').on('click', function(){
					$(this).find('.droplist').slideToggle();
				});
			}

			return false;
		});
	
	/* ========================= */
	/* 	   	 MAGNIFIC POPUP	     */
	/* ========================= */
	
		$('.gallery-zoom').magnificPopup({
			type: 'image', // Default type

			gallery: {
				enabled: true // Enable gallery
			},

			image: {
				titleSrc: 'title' // Show caption on zoom (by title in link <a>)
			},

			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:

				opener: function(openerElement) {
					// openerElement is the element on which popup was initialized, in this case its <a> tag
					// you don't need to add "opener" option if this code matches your needs, it's defailt one.
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	
	/* ========================= */
	/* 		  MEDIA PLAYER	     */
	/* ========================= */
	
		$('.form-validate').validate();
	
		// Removing the label text on newsletter form
		$('.form-newsletter').validate({
			errorPlacement: function(error, element) { }
		});
	
	/* ========================= */
	/* 	   PLACEHOLDER FOR IE	 */
	/* ========================= */
	
		$('input, textarea').placeholder();
	
	/* ========================= */
	/* 	     STICKY HEADER		 */
	/* ========================= */
	
		if( $('.header.sticky').length ){
			
			// Get the value from data-offset in sticky header
			var stickyOffset = $('.header.sticky').attr('data-offset');

			// For some browsers, `attr` is undefined; for others,
			// `attr` is false.  Check for both.
			if (typeof stickyOffset !== typeof undefined && stickyOffset !== false) {
				stickyOffset = parseInt(stickyOffset);
			} else {
				stickyOffset = 60;
			}

			$(window).on('scroll', function(){
				var top = $('.header.sticky').offset().top;
				if(top >= stickyOffset){
					$('.header.sticky').addClass('scrolling');
				} else {
					$('.header.sticky').removeClass('scrolling');
				}
			});

			// Trigger the scroll event when page loads
			$(window).trigger('scroll');
			
		}
	
	/* ========================= */
	/* 	MAP ENABLE TOUCH EVENTS	 */
	/* ========================= */
	
		$('#map').one('click', function(){
			$(this).addClass('touch');
		});
	
	/* ========================= */
	/* 	   		GOTO	         */
	/* ========================= */
	
		$('.goto').on('click', function(){
			var to = $(this).attr('href');
			$('html, body').animate({ scrollTop: ($(to).offset().top)}, 1000);
			return false;
		});
	
	/* ========================= */
	/* 		  CONTACT AJAX	     */
	/* ========================= */
	
		$('#form-contact').on('submit', function(event){
			
			// If to check input validation
			if( $('.form-control.error').length <= 0 ){
				
				// Get form action and data
				var action = $(this).attr('action'),
					formData = $(this).serialize(),
					$this = $(this);

				$.ajax({
					url: action,
					type: 'POST',
					dataType: 'json',
					data: formData,
					beforeSend: function(){
						$this.find('input[type="submit"]').val('Sending...').attr('disabled', 'disabled');
					},
					success: function(data){
						if( data == 'success' ){
							$('.form-callback.success').fadeIn();
							$this.find('input[type="submit"]').val('Email sent!');
						} else {
							$('.form-callback.error').fadeIn();
							$this.find('input[type="submit"]').val('Ooops...').removeClass('btn-success').addClass('btn-danger');
						}
					},
					complete: function(){
						$this.find('input, textarea, select').attr('disabled', 'disabled');
					}
				});

				// Prevent the form to send contact without ajax
				event.preventDefault();
				
			}
			
		});

})(jQuery);