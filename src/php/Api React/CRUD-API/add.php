<?php
include "config.php";
$methode = $_SERVER["REQUEST_METHOD"];

if ($methode === 'POST') {
    $input = json_decode(file_get_contents("PHP://INPUT"),true);
    // when data is searching --------->>>
    if (isset($input["search"]) && !isset($input["fname"]) ) {
        $search = mysqli_real_escape_string($conn,$input["search"]);
        $query = mysqli_query($conn,"SELECT * FROM users where fname Like '%$search%' or lname Like '%$search%' or address Like '%$search%'");
        $all_rows = mysqli_fetch_all($query,MYSQLI_ASSOC);
        if ($query) {
        echo json_encode(["result"=>$all_rows]);
        }
        die();
    }

    // when data is deleting --------->>>
    if (isset($input["id"]) && !isset($input["fname"]) ) {
        $id = mysqli_real_escape_string($conn,$input["id"]);
        $query = mysqli_query($conn,"DELETE FROM `users` where id = $id");
        if ($query) {
            echo json_encode(["result"=>"seccess"]);
            }
            die();
    }
    $fname = mysqli_real_escape_string($conn,$input["fname"]);
    $lname = mysqli_real_escape_string($conn,$input["lname"]);
    $address = mysqli_real_escape_string($conn,$input["address"]);
    if (isset($input["id"])) {
        // when data is updating --------->>>
        $id =  mysqli_real_escape_string($conn,$input["id"]);
        // check that user exists in database or not
        $exists = mysqli_fetch_all(mysqli_query($conn,"SELECT * FROM users where id = $id"),MYSQLI_ASSOC);
        $query = mysqli_query($conn,"UPDATE users set `fname`='$fname',`lname`='$lname',`address`='$address' where id = $id");
        if ($query && count($exists) > 0) {
            echo json_encode(["result"=>"success"]);
            }else{
            echo json_encode(["result"=>"error"]);
            }
    }else{
        // when data is adding --------->>>
        $query = mysqli_query($conn,"INSERT INTO users(fname,lname,address) values('$fname','$lname','$address')");
        if ($query) {
            echo json_encode(["result"=>"success"]);
            }else{
            echo json_encode(["result"=>"error"]);
            }
    }
      
}else{
    // when data is getting --------->>>
    if (isset($_GET["id"])) {
        $id = $_GET["id"];
        $query = mysqli_query($conn,"SELECT * FROM users where id = $id");
        $all_rows = mysqli_fetch_all($query,MYSQLI_ASSOC);
        if (count($all_rows) > 0 ) {
        echo json_encode(["result"=>$all_rows]);
        }else{
        echo json_encode(["result"=>"error"]);
        }
    }else{
        $query = mysqli_query($conn,"SELECT * FROM users");
        $all_rows = mysqli_fetch_all($query,MYSQLI_ASSOC);
        if ($query) {
        echo json_encode(["result"=>$all_rows]);
        }else{
        echo json_encode(["result"=>"error"]);
        }
    }
}




?>
