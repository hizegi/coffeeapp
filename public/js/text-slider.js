$( document ).ready(function() {

	console.log("I work");

	//Index page slider config
	$('.slide').textSlider({

		timeout: 3000,
		slideTime: 1000,
		loop: 1

	});

}) //ends document.ready

(function ( $ ) {

	$.fn.textSlider = function ( options ) {

		/* Default settings */
		var settings = $.extend(
			{
				timeout: 2000,
				slideTime: 2000
			},
			options 
		);

		var nextItem;

		var currentItem = 0;
		var count = 0;

		this.children('.slider-item').each(
			function () 
			{

				$(this).addClass( 'slide-' + ( count ) )
					.css(
						{
							//opacity:	   0, 
							paddingTop:	'100px',
							paddingBottom: '0px'
						}
					);

				$(this).hide();

				count++;

			}
		);

		function firstSlide ()
		{

			$('.slide-' + currentItem ).show().animate({ paddingTop: '50px', paddingBottom: '50px', opacity: 1 }, settings.slideTime);

			setTimeout ( transition, settings.timeout );

		}

		function transition ()
		{

			nextItem = parseInt ( currentItem + 1 );

			if ( nextItem >= count )
				nextItem = 0;

			$('.slide-' + currentItem ).animate({ paddingTop: '100px', paddingBottom: '0px', opacity: 0 }, settings.slideTime, function () {
				$(this).hide();
				$('.slide-' + nextItem ).show().animate({ paddingTop: '50px', paddingBottom: '50px', opacity: 1 }, settings.slideTime);
			});

			currentItem = nextItem;

			setTimeout ( transition, settings.timeout );

		}

		return firstSlide ();

	};

}( jQuery ));