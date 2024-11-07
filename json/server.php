<?php

// Ruta a los archivos JSON
define('BRANDS_FILE', '/brands.json');
define('SERVICES_FILE', '/services.json');

// Función para cargar datos desde un archivo JSON
function load_json($file) {
    if (file_exists($file)) {
        return json_decode(file_get_contents($file), true);
    }
    return [];
}

// Función para guardar datos en un archivo JSON
function save_json($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

// Manejar las solicitudes GET y POST

// Obtener las marcas
if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['type'] == 'brands') {
    echo json_encode(load_json(BRANDS_FILE));
}

// Obtener los servicios
if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['type'] == 'services') {
    echo json_encode(load_json(SERVICES_FILE));
}

// Actualizar las marcas
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_GET['type'] == 'brands') {
    $data = json_decode(file_get_contents('php://input'), true);
    save_json(BRANDS_FILE, $data);
    echo json_encode(["message" => "Marcas actualizadas correctamente"]);
}

// Actualizar los servicios
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_GET['type'] == 'services') {
    $data = json_decode(file_get_contents('php://input'), true);
    save_json(SERVICES_FILE, $data);
    echo json_encode(["message" => "Servicios actualizados correctamente"]);
}
?>
