
$(document).on('click', '.thumb', function(event){
	var imageFile = $(this).attr("src").substring(thumbFolder.length);
	//alert(imageFile);
	createPSV(imageFolder + "" + imageFile);
});