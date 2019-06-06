window.onload = function() {
	document.getElementById('pano').addEventListener('change', upload, false);
};

var reader = new FileReader();
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

// Load panorama from local file
function upload() {
	// Retrieve the chosen file and create the FileReader object
	var file = document.getElementById('pano').files[0];

	reader.onload = function() {
		createPSV(reader.result);
	};

	reader.readAsDataURL(file);
  
    var form_data = new FormData();                  
    form_data.append("panoramaFile", file);
    $.ajax({
                url: 'upload.php', // point to server-side PHP script 
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(php_script_response){
					if(php_script_response){
                    	alert(php_script_response); // display response from the PHP script, if any
					}
                }
     });
	 alert();
}

// The following is to fetch images automatically from a specified folder, to enable displaying all photos uploaded to the server. This is so that users can upload photos to the gallery.

var imageFolder = "./img/default/";

$.ajax({
    url : imageFolder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $("#gallery").append( '<img class="hideThis thumb" src="'+ imageFolder + val +'" onClick="createPSV($(this).attr(\'src\'))">' );
            } 
        });
    }
});

// The following doesn't work for dynamically generated divs, for some reason, so had to add an onclick event to HTML (see above)

$('.thumb').click(function(event){
	var imageFile = $(this).attr("src");
	createPSV(imageFile);
});

// Global variable to be accessible by other scripts
var PSV, PSTemp;
var loaded = false;

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
		container: 'your-pano',

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
		loading_img: './img/Loading.png',
		min_fov: 30,
		max_fov: 90,
		navbar: true
	});
	loaded = true;
	$('.hideThis').addClass("hidden");
};

window.onresize = function(event){
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	
	document.getElementById('your-pano').style.height = windowHeight + "px";	
	PSV.fitToContainer();

	//PSV.forceStereo();
}