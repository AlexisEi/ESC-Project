<?php
    $skilltags_required = $_POST['skilltags_required'];
    
    //DB Connection
    $conn = mysqli_connect('localhost', 'chang', 'helloworld1!', 'BSOS_DB');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }else{
        $stmt = $conn->prepare("INSERT into customer_queries(skilltags_required)
            values(?)");
        $stmt->bind_param("s", $skilltags_required);
        $stmt->execute();
        echo "Query Sent";
        $stmt->close();
        $conn->close(); 
    }
?>