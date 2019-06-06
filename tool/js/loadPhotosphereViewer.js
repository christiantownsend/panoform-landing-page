

function createPSV(image){
	PSV = new PhotoSphereViewer({
		// Panorama URL
		panorama: image,
/*
		// overlay NCSU CoD logo on top left
		overlay: {
			image:'img/logo.png',
			size: {
				width: '32 px',
				height: '32 px'
			},
			position: {
				x: 'left',
				y: 'top'
			}
		},
*/
		// Container
		container: 'panoramaContainer',

		// Deactivate the animation
		time_anim: false,

		// Display the navigation bar
		navbar: true,

		// Resize the panorama
		size: {
			width: '100%',
			height: windowHeight + 'px'
		},

		// No XMP data
		usexmpdata: true,

		eyes_offset: 3,
		loading_img: './img/loading.gif',
		min_fov: 30,
		max_fov: 90,
		navbar: true,
		default_position: {
			long: '270deg',
			lat: 0
		},
		loading_HTML: '<div style="position:absolute;top:0;left:0;background-image:url(\'.img/loading.gif\');background-size:100%;"></div>'
	});
	loaded = true;
	$("#panoramaContainer").css("transform", "scale(1)");
	$('.hideThis').addClass("hidden");
};