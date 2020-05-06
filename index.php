<?php
/**
 * Files will be stored at e.g. https://storage.googleapis.com/<appspot site url>/testthis.txt
 */

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/env.php';

use Google\Cloud\Storage\StorageClient;

$app = array();
$app['bucket_name'] = "black-outlet-275318.appspot.com";
$app['mysql_user'] = $mysql_user;
$app['mysql_password'] = $mysql_password;
$app['mysql_dbname'] = "mesas_interactivas";
$app['project_id'] = getenv('GCLOUD_PROJECT');



/**
 * Upload a file.
 *
 * @param string $bucketName the name of your Google Cloud bucket.
 * @param string $objectName the name of the object.
 * @param string $source the path to the file to upload.
 *
 * @return Psr\Http\Message\StreamInterface
 */



$servername = null;
$username = $app['mysql_user'];
$password = $app['mysql_password'];
$dbname = $app['mysql_dbname'];
$dbport = null;


// prueba de mensaje en el http
echo "\n prueba de mensaje en el http\n"
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, 
	$dbport, "/cloudsql/black-outlet-275318:southamerica-east1:bd-mesa-interactiva");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "\nConnected successfully\n";


echo "\ntesting gcloud php\n";

?>



















