function createPSV(image){
	loaded = true;
	$("#panoramaContainer").css("transform", "scale(1)");
	$('.hideThis').addClass("hidden");
	$.getScript("//povdocs.github.io/webvr-starter-kit/build/vr.js", function(){
		VR.panorama({
			src: image
		});
	});
};