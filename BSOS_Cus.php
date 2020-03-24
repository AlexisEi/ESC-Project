<?php
$cust_name = $_POST['cust_name'];
$support_type = $_POST['support_type'];
$add_info = $_POST['add_info'];

if (!empty($cust_name) || !empty($support_type) || !empty($add_info)) {
    $host= "localhost";
    $dbUsername= "root";
    $dbPassword= "";
    $dbName = "BSOS_DB";
    // Create connection
    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);
    if(mysqli_connect_error()){
        die('Connect Error('.mysqli_connect_error().')'. mysqli_connect_error());
    } 
    else {
        $SELECT = "SELECT cust_name From customers Where cust_name = ? Limit 1";
        $INSERT = "INSERT Into customers (cust_name, support_type, add_info) values (?, ?, ?)";
        
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $cust_name);
        $stmt->execute();
        $stmt->bind_result($cust_name);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if($rnum == 0){
            $stmt->close();

            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("sss", $cust_name, $support_type, $add_info);
            $stmt->execute();
            echo "Request sent. Please hold, an agent will be with you shortly...";
        } else {
            echo "Request previously sent. Please hold, an agent will be with you shortly...";
        }
        $stmt->close();
        $conn->close();
    }
}
else {
    echo "All fields are required";
    die();
}

?>