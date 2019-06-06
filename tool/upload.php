<?php
ini_set('memory_limit','1024M');
$subDomain = $_POST['subDomain'];
$target_dir = "img/classRooms/" . $subDomain . "/default/";
$thumb_dir = "img/classRooms/" . $subDomain . "/thumbs/";
$target_file = $target_dir . basename($_FILES["panoramaFile"]["name"]);
$thumb_file = $thumb_dir . basename($_FILES["panoramaFile"]["name"]);
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

if (!file_exists($target_file) ){ 

	// Check filetype, load image and get image size
	if($imageFileType == "jpg" || $imageFileType == "jpeg" || $imageFileType == "JPG" || $imageFileType == "JPEG") {
			$img = imagecreatefromjpeg($_FILES["panoramaFile"]["tmp_name"]);
			$imageType = 0;
		} else {
		if($imageFileType == "png" || $imageFileType == "PNG") { 
				$img = imagecreatefrompng($_FILES["panoramaFile"]["tmp_name"]); 
				$imageType = 1;
			} else {		
			if($imageFileType == "gif" || $imageFileType == "GIF"){ 
					$img = imagecreatefromgif($_FILES["panoramaFile"]["tmp_name"]);
					$imageType = 2;
				}
			}
		}

	//move_uploaded_file($_FILES["panoramaFile"]["tmp_name"], $target_file); 		
	
	$width = imagesx( $img );
	$height = imagesy( $img ); 

	if($height > $width){
		$img = imagerotate($img, 90.0, 255);
		$width = imagesx( $img );
		$height = imagesy( $img ); 
	}

	// calculate thumbnail size
	$thumb_width = 600;
	// the following preserves ratio
	//$thumb_height = floor( $height * ( $thumb_width / $width ) );
	// while the following makes the thumb in golden ratio
	$thumb_height = floor( $thumb_width / 1.619 );

	// create a new temporary image
	$tmp_img = imagecreatetruecolor( $thumb_width, $thumb_height );

	// copy and resize old image into new image 
	if($width/$height > 1.619){
		imagecopyresampled( $tmp_img, $img, 0, 0, ($width-floor($height*1.619))/2, 0, $thumb_width, $thumb_height, floor($height*1.619), $height );
	} else {
		imagecopyresampled( $tmp_img, $img, 0, 0, 0, ($height-floor($width/1.619))/2, $thumb_width, $thumb_height, $width, floor($width/1.619) );
	}
	
	// check if folder exists
	if(!is_dir($thumb_dir)){
		mkdir($thumb_dir);
	}
	if(!is_dir($target_dir)){
		mkdir($target_dir);
	}
	// save thumbnail and main image into separate files
	if($imageType == 0){
		imagejpeg( $tmp_img, $thumb_file );
		imagejpeg( $img, $target_file );
	} else {
		if($imageType == 1){
			imagepng( $tmp_img, $thumb_file );
			imagepng( $img, $target_file );
		} else {
			if($imageType == 2){
				imagegif( $tmp_img, $thumb_file );
				imagegif( $img, $target_file );
			}
		}
	}
	echo $target_file;
} else {
	echo "Sorry, a file with the same name as the one you're uploading already exists. Try renaming your file to the format 'Your Name_Project Title'";
}

?>