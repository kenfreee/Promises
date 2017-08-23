<?php 
	header('Content-type: application/json; charset=UTF-8;');
	$data_post = file_get_contents('php://input');
	$data = json_decode($data_post, true);

	if ($data !== NULL) {
		if (isset($data['default']) && $data['default'] === '1') {
			exit("OK!");
		}
	}