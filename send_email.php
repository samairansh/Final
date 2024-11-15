<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $to = "samairansh@gmail.com";
    $subject = "New Subscription";
    $message = "New subscriber: " . $email;
    $headers = "From: no-reply@yourdomain.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Subscription successful.";
    } else {
        echo "Subscription failed.";
    }
}
?>
