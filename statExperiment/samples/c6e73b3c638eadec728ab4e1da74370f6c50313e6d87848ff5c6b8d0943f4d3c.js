let Magazines = {

	init() {
		this.listeners();
	},

	listeners() {
		$( "#close-magazine" ).click( function() {
			$( ".magazine-contact" ).removeClass( "open" );
		} );

		$( ".magazine-mobile-toggle" ).click( function() {
			$( ".magazine-contact" ).toggleClass( "open" );
		} );

		$( "#mag_form" ).submit( function( e ) {
			e.preventDefault();

			let formData = new FormData( this );

			fetch( `${ _ajax_link }?action=magazine_contact`, { method : "POST", body : formData } )
				.then( res => {
					res.text()
						.then( response => {
							if (response === "success") {
								location.replace(_thanksPage);
							} else {
								alert(_tpl_.contact_error);
							}
						} )
				} )
				.finally( () => {

				} );
		} );
	}
};

Magazines.init();