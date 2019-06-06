<?php
ini_set('memory_limit','1024M');
$target_dir = "img/default/";
$thumb_dir = "img/thumbs/";
$target_file = $target_dir . basename($_FILES["panoramaFile"]["name"]);
$thumb_file = $thumb_dir . basename($_FILES["panoramaFile"]["name"]);
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);


if (file_exists($target_file)) {
	// load image and get image size
	
	$img = imagecreatefromjpeg($target_file);
	$width = imagesx( $img );
	$height = imagesy( $img ); 

	// calculate thumbnail size
	$new_width = 600;
	$new_height = floor( $height * ( $new_width / $width ) );

	// create a new temporary image
	$tmp_img = imagecreatetruecolor( $new_width, $new_height );

	// copy and resize old image into new image 
	imagecopyresized( $tmp_img, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height );

	// save thumbnail into a file
	imagejpeg( $tmp_img, $thumb_file );
	
	
} else {
	echo "Sorry, the resize couldn't happen because the original file isn't uploaded.";
}

?>