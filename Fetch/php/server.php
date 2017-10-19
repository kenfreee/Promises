<?php
	if ($_SERVER['REQUEST_METHOD'] === "GET") {
		$data_get = $_GET;
		
		if (isset($data_get['testGET']) && $data_get['testGET'] === '1') {
			exit("OK!");
		}
	}elseif ($_SERVER['REQUEST_METHOD'] === "POST") {
		header('Content-type: application/json; charset=UTF-8;');
		$data_post = file_get_contents('php://input');
		$data = json_decode($data_post, true);

		if ($data !== NULL) {
			if (isset($data['testPOST']) && $data['testPOST'] === '1') {
				exit("OK!");
			} else if (isset($data['testPOST']) && $data['testPOST'] === '2') {
			    exit(json_encode(['status' => 'OK!']));
            }
		}
	}