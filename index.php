<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:5500')

$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['name']) ? strtolower(trim(quoted_printable_decode($_GET['name']))) : '';

if (empty($path)) {
    http_response_code(400);
    echo 'Forneça o nome do arquivo na query' . PHP_EOL . 'Ex: ?name=arquivo.txt';
    return;
}

$name = pathinfo($path, PATHINFO_FILENAME);
$extension = pathinfo($path, PATHINFO_EXTENSION);
if (!in_array($extension, ['txt', 'json', 'xml', 'csv'])) {
    $extension = 'txt';
}
$path = implode(DIRECTORY_SEPARATOR, [
    __DIR__,
    'files',
    "{$name}.{$extension}",
]);
$backup = implode(DIRECTORY_SEPARATOR, [
    __DIR__,
    'backups',
    $name . time() . '.' .$extension,
]);
foreach ([dirname($path), dirname($backup)] as $p) {
    if (!is_dir($p)) {
        mkdir($p, 0777, true);
    }
}

if ($method === 'GET') {
    if (!file_exists($path)) {
        http_response_code(404);
    } else {
        echo file_get_contents($path);
    }
} elseif ($method === 'POST') {
    $content = file_get_contents('php:://input');
    if (file_exists($path)) {
        if (file_put_contents($backup, file_get_contents($path)) === false) {
            http_response_code(500);
        } elseif (file_put_contents($path, $content) === false) {
            http_response_code(500);
        } else {
            http_response_code(202);
        }
    } elseif (file_put_contents($path, $content) === false) {
        http_response_code(500);
    } else {
        http_response_code(201);
    }
} else {
    http_response_code(405);
}
