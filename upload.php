<?php
include __DIR__.'/ImageResize.php';
use \Eventviva\ImageResize;

if ( !empty( $_FILES ) ) {
   
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

//    move_uploaded_file( $tempPath, $uploadPath );

    $image = new ImageResize($tempPath);

    $image->resizeToWidth(300);
    $image->save($uploadPath);


    
    
    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

?>