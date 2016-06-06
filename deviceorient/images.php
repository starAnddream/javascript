<?php
$images=array('./images/one.jpg','./images/two.jpg','./images/three.jpg');
foreach($images as $image){
   $image_fh=fopen($image,'r');
   $image_data=fread($image_fh,filesize($image));
   fclose($image_fh);
   //转换成64编码的字符串
   $payloads[]=base64_encode($image_data);
}
//把字符合并成一个长字符，然后输出

echo implode(" + ",$payloads)
?>