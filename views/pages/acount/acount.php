<!--=====================================
Breadcrumb
======================================-->

<div class="ps-breadcrumb">

    <div class="container">

        <ul class="breadcrumb">

            <li><a href="/">Home</a></li>

            <li>Mi Cuenta</li>

        </ul>

    </div>

</div>

<?php
if (isset($urlParams[1])) {
    if (!empty($urlParams[1])) {
        if(strstr($urlParams[1], "?") != false){
            $urlParams[1] = explode("?", $urlParams[1])[0];
        }
    }
    //Colocar el enrollment para el registro
    //enrollment
    if ($urlParams[1] == "enrollment" || $urlParams[1] == "login" || $urlParams[1]=="wishAcount" || $urlParams[1]=="logout" || $urlParams[1]=="my-shopping" || $urlParams[1]=="my-store" || $urlParams[1]=="new-store" || $urlParams[1]=="my-sales" || $urlParams[1]=="list-vendor" || $urlParams[1]=="orders" || $urlParams[1]=="registers" || $urlParams[1]=="inventario" || $urlParams[1]=="ventas") {
        // if (isset($urlParams[2])) {
            //     if ($urlParams[2] == "facebook") {
                //         $url = $path . "acount&enrollment&facebook";
                //         $responseLoGFace = ControllerUser::loginFacebook($url);
                //     }
                // }
        
        if($urlParams[1]== "my-store"){
            if(isset($_SESSION["user"])){
                $select = "id_store";
                $url=CurlController::api()."stores?linkTo=id_user_store&equalTo=".$_SESSION["user"]->id_user."&select=".$select;
                $method="GET";
                $fields= array();
                $headers=array();
                $idStore=CurlController::request($url, $method, $fields, $headers);

                if($idStore->status == "404"){
                    $urlParams[1]="new-store";
                }
            }
        }

        include $urlParams[1] . "/" . $urlParams[1] . ".php";
    } else {
        echo '<script> 
                window.location= "' . $path . '";
              </script>';
    }
} else {
    echo '<script> 
    window.location= "' . $path . '";
</script>';
}
?>