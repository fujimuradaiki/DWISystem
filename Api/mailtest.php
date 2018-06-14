<?php

$to = "takayosi0128@docomo.ne.jp";
$subject = "TEST MAIL";
$message = "Hello!\r\nThis is TEST MAIL.";
$headers = "From: from@gmil.com";

mail($to, $subject, $message, $headers);

?>