window.onload = function() {
	document.getElementById('pano').addEventListener('change', upload, false);
};

var reader = new FileReader();
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var subDomain = window.location.host.split('.')[0];
var imageFolder = "./img/default/" + subDomain + "/";
var thumbFolder = "./img/thumbs/" + subDomain + "/";

// Load panorama from local file
function upload() {
	// Retrieve the chosen file and create the FileReader object
	var file = document.getElementById('pano').files[0];
	// create FormData to send to the upload PHP script
    var form_data = new FormData();                  
    form_data.append("panoramaFile", file);
	form_data.append("subDomain", subDomain);

	// this will store the final version of the file that's uploaded to the server. This is so that in case a portrait orientation image is uploaded, it is rotate first to landscape and then shown in the viewer.
	var fileName;

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
				//alert(php_script_response); // display response from the PHP script, if any
				fileName = php_script_response;
				console.log(fileName);
			}
		}
     });

	reader.onload = function() {	
		createPSV(reader.result);
	};
	reader.readAsDataURL(file);	

  
}

// The following is to fetch images automatically from a specified folder, to enable displaying all photos uploaded to the server. This is so that users can upload photos to the gallery.

generateGrid();
function generateGrid(){
	$.ajax({
		url : thumbFolder,
		cache: false,
		success: function (data) {
			$(data).find("a").attr("href", function (i, val) {
				if( val.match(/\.(jpe?g|JPE?G|png|PNG|GIF|gif)$/) ) { 
					var filename = val.substring(0, val.lastIndexOf('.'));
					filename = filename.replace(/%20/g, ' ');
					var author = filename.substring(0, filename.indexOf('_'));
					var title = filename.substring(filename.indexOf('_')+1, filename.length);
					var imageFile = thumbFolder + val;

					var imageWidth = windowWidth/6;
					imageWidth = 350;
					var imageHeight = imageWidth/2;

					// This is backup:
					// $("#gallery").append( '<div class="thumb col-md-4" src="'+ imageFile /*+'" auth="' + author */+'" style="background-image: url(\' '+ imageFile +' \')\;background-size:cover;display:inline-block; width:'+ imageWidth +'px; height:'+ imageHeight +'px;"><div class = "attrib"><span id="title">' + title + ' </span><br>by <span id="author">' + author + '</span></div></div>' );

					if((i+1)%3 === 0) $("#gallery").append('<div class="row">');
					
					$("#gallery").append( '<img class="col-sm-4 col-xs-12 thumb"src="'+ thumbFolder + val +'"></img>' );

					if((i+1)%3 === 0) $("#gallery").append('</div>');
					
				}
			});
			
			/*
			$(data).find("a").attr("href", function (i, val) {
				if( val.match(/\.(jpe?g|png|gif)$/) ) { 
					$("#gallery").append( '<img class="thumb" src="'+ thumbFolder + val +'">' );
				} 
			
        	});
		*/
		}
	});
}

/*
// The following doesn't work for dynamically generated divs, for some reason, so had to add an onclick event to injected HTML (see above) (removed now, see fix below)

$('.thumb').click(function(event){
	var imageFile = $(this).attr("src");
	createPSV(imageFile);
});
*/

// Workaround for above. The function needs to be bound to something that stays constant, since the generated imgs aren't present on load it can't bind to anything

$(document).on('click', '.thumb', function(event){
	var imageFile = $(this).attr("src").substring(thumbFolder.length);
	createPSV(imageFolder + "" + imageFile);
});

// Global variable to be accessible by other scripts
var PSV, PSTemp;
var loaded = false;

window.onresize = function(event){
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	/*
	$('#gallery').empty();
	generateGrid();
	*/
	document.getElementById('panoramaContainer').style.height = windowHeight + "px";
	//PSV.forceStereo();
}
