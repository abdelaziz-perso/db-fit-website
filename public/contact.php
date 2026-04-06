<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON"]);
    exit();
}

$name = isset($data["name"]) ? trim((string) $data["name"]) : "";
$name = strip_tags(str_replace(["\r", "\n", "\0"], "", $name));
$phone = isset($data["phone"]) ? trim((string) $data["phone"]) : "";
$phone = strip_tags(str_replace(["\r", "\n", "\0"], "", $phone));
$message = isset($data["message"]) ? trim((string) $data["message"]) : "";
$message = strip_tags(str_replace(["\0"], "", $message));

$msgLen = function_exists("mb_strlen") ? mb_strlen($message, "UTF-8") : strlen($message);
if ($msgLen > 2000) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Message trop long."]);
    exit();
}

if ($name === "" || $phone === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Nom et téléphone sont obligatoires."]);
    exit();
}

$to_email = "dbfit02@gmail.com";
$host = isset($_SERVER["HTTP_HOST"]) ? preg_replace("/^www\./", "", (string) $_SERVER["HTTP_HOST"]) : "localhost";
$from_email = "no-reply@" . $host;
$site_url = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] === "on" ? "https" : "http") . "://" . ($_SERVER["HTTP_HOST"] ?? $host);
$logo_url = $site_url . "/logo-db-fit.jpg";

$h = static function (string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
};

$subject_encoded = "=?UTF-8?B?" . base64_encode("Contact DB FIT — " . $name) . "?=";

$message_html = $message !== "" ? nl2br($h($message)) : "<em>—</em>";

$email_content = "
<html>
<head>
    <meta charset=\"UTF-8\">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; }
        .header { background: #18181b; padding: 20px; text-align: center; }
        .header img { max-width: 150px; height: auto; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #ffb224 !important; display: block; margin-bottom: 5px; text-transform: uppercase; font-size: 12px; }
        .value { font-size: 16px; background: #f9f9f9; padding: 10px; border-radius: 5px; }
        .footer { background: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='" . $h($logo_url) . "' alt='DB FIT'>
        </div>
        <div class='content'>
            <h2 style='text-align: center; color: #18181b;'>Nouveau message (formulaire site)</h2>
            <div class='field'>
                <span class='label'>Nom</span>
                <div class='value'>" . $h($name) . "</div>
            </div>
            <div class='field'>
                <span class='label'>Téléphone</span>
                <div class='value'>" . $h($phone) . "</div>
            </div>
            <div class='field'>
                <span class='label'>Message</span>
                <div class='value'>" . $message_html . "</div>
            </div>
        </div>
        <div class='footer'>
            Message envoyé depuis le formulaire de contact DB FIT (Dar Bouazza).
        </div>
    </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: DB FIT Site <" . $from_email . ">\r\n";
$headers .= "Return-Path: " . $from_email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$mail_success = @mail($to_email, $subject_encoded, $email_content, $headers, "-f " . $from_email);

if ($mail_success) {
    echo json_encode([
        "success" => true,
        "message" => "Votre message a été envoyé avec succès.",
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de l'envoi de l'email.",
    ]);
}
