<?php
/**
 * DB FIT — envoi e-mail (contact ou réservation coaching) puis le front ouvre WhatsApp.
 * Déployer à la racine du site avec le build statique (fichier copié depuis public/).
 *
 * Hostinger : vérifier que l’expéditeur "From" correspond à un domaine/mail valide chez l’hébergeur,
 * sinon remplacer DB_FIT_MAIL_FROM par une adresse @votredomaine.ma créée dans le panneau.
 */
declare(strict_types=1);

const DB_FIT_MAIL_TO = 'dbfit02@gmail.com';
/** Doit être une adresse du domaine du site si l’hôte l’exige (ex. noreply@fitnessdarbouazza.ma). */
const DB_FIT_MAIL_FROM = 'DB FIT <noreply@fitnessdarbouazza.ma>';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin !== '') {
    $allowed = preg_match('#^https?://' . preg_quote($host, '#') . '$#i', $origin);
    if ($allowed) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON'], JSON_UNESCAPED_UNICODE);
    exit;
}

$form = isset($data['form']) ? (string) $data['form'] : 'contact';
if ($form !== 'contact' && $form !== 'reservation') {
    $form = 'contact';
}

function str_field(array $d, string $key, int $max = 2000): string
{
    if (!isset($d[$key]) || !is_string($d[$key])) {
        return '';
    }
    $s = trim($d[$key]);
    if (strlen($s) > $max) {
        $s = substr($s, 0, $max);
    }
    return $s;
}

$name = str_field($data, 'name', 200);
$phone = str_field($data, 'phone', 80);
$message = str_field($data, 'message', 2000);

if ($name === '' || $phone === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Missing name or phone'], JSON_UNESCAPED_UNICODE);
    exit;
}

$lines = [
    'Formulaire : ' . ($form === 'reservation' ? 'Réservation / coaching' : 'Contact'),
    'Nom : ' . $name,
    'Téléphone : ' . $phone,
];

if ($form === 'reservation') {
    $lines[] = 'Mode : ' . str_field($data, 'mode', 120);
    $lines[] = 'Durée : ' . str_field($data, 'duration', 120);
    $lines[] = 'Coach : ' . str_field($data, 'coach', 200);
    $opt = str_field($data, 'detailsOptional', 2000);
    $other = str_field($data, 'otherDetails', 2000);
    if ($opt !== '') {
        $lines[] = 'Détails : ' . $opt;
    }
    if ($other !== '') {
        $lines[] = 'Autre : ' . $other;
    }
} else {
    if ($message !== '') {
        $lines[] = 'Message : ' . $message;
    }
}

$lines[] = '---';
$lines[] = 'IP : ' . ($_SERVER['REMOTE_ADDR'] ?? '');
$lines[] = 'Date (serveur) : ' . date('c');

$body = implode("\n", $lines);
$subject = $form === 'reservation'
    ? '[DB FIT] Réservation coaching — ' . $name
    : '[DB FIT] Contact — ' . $name;

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . DB_FIT_MAIL_FROM,
    'Reply-To: ' . DB_FIT_MAIL_TO,
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = @mail(DB_FIT_MAIL_TO, $encodedSubject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail send failed'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
