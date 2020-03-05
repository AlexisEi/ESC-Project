<?php
    $skilltags_required = $_POST['skilltags_required'];
    
    //DB Connection
    $conn = new mysqli('192.168.64.2:3307', 'root', 'root', 'BSOS_DB');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }else{
        $stmt = $conn->prepare("insert into customer_queries(skilltags_required)
            values(?)");
        $stmt->bind_param("s", $skilltags_required);
        $stmt->execute();
        echo "Query Sent";
        $stmt->close();
        $conn->close(); 
    }
?>