<?php
class ControllerUser
{
    /* registro de usuarios */
    public function register()
    {
        if (isset($_POST["createEmail"])) {
            /* validar los campos */
            if (
               isset($_POST["createNombre"]) && preg_match('/^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/', $_POST["createNombre"]) &&
               isset($_POST["createEmail"]) && preg_match('/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/', $_POST["createEmail"]) &&
               isset($_POST["createApellido"]) && preg_match('/^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/', $_POST["createApellido"]) &&
               isset($_POST["createPassword"]) && preg_match('/^[#\\=\\$\\;\\*\\_\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-Z]{1,}$/', $_POST["createPassword"])
            ) {

                $displayName = TemplateController::capitalize(strtolower($_POST["createNombre"])) . " " . TemplateController::capitalize(strtolower($_POST["createApellido"]));
                $user = TemplateController::capitalize(strtolower(explode("@", $_POST["createEmail"])[0]));
                $email = strtolower($_POST["createEmail"]);
               
                if($_POST["createPassword"] == $_POST["repeatPassword"] && strlen($_POST["createPassword"]) >= 8){
                    $url = CurlController::api() . "users?register=true";
                    $method = "POST";
                    $fields = array(
                        // "rol_user" => "default",
                        "name_user" => TemplateController::capitalize(strtolower($_POST["createNombre"])),
                        "lastname_user" => TemplateController::capitalize(strtolower($_POST["createApellido"])),
                        "username_user" => $user,
                        "email_user" => $email,
                        "password_user" => $_POST["createPassword"],
                        "method_user" => "direct",
                        "date_create_user" => date("Y-m-d")
                    );
                    $header = array(
                        "Content-Type" => "application/x-www-form-urlencoded"
                    );


                    $response = CurlController::request($url, $method, $fields, $header);
                    if ($response->status == 200) {

                        // registrar email
                        $name = $displayName;
                        $subject = "Registro Seture";
                        $message = "Confirma tu email para crear una cuenta en Seture";
                        $url = TemplateController::path() . "acount&login&" . base64_encode($email);
                        $post = "Confirmar Email";
                        $sendEmail = TemplateController::sendEmail($name, $subject, $email, $message, $url, $post);

                        if ($sendEmail == "ok") {
                            echo '<div class="alert alert-success">Tu usuario se registro correctamente, confirma tu cuenta en tu email (aveces esta en spam)</div>
                            <script>
                                formatearAlertas()
                            </script>';
                        } else {
                            echo '<div class="alert alert-danger">Error al enviar a tu correo</div>
                            <script>
                            formatearAlertas()
                        </script>';
                        }
                    }else{
                        echo '<div class="alert alert-danger alert-dismissible">Error: al mandar los datos</div>
                                <script>
                                formatearAlertas()
                            </script>';
                    }
                }else{
                    echo '<div class="alert alert-danger alert-dismissible">Error: las contraseñas no coinciden</div>
                            <script>
                            formatearAlertas()
                        </script>';
                }
            } else {
                echo '<div class="alert alert-danger alert-dismissible">Error en la sintaxis de los campos</div>
                <script>
                formatearAlertas()
            </script>';
            }
        }
    }

    /* login de usuarios */
    public function login()
    {
        if (isset($_POST["logEmail"])) {
            /* validar los campos */
            if (
                preg_match('/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/', $_POST["logEmail"]) &&
                preg_match('/^[#\\=\\$\\;\\*\\_\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-Z]{1,}$/', $_POST["logPassword"])
            ) {
                echo '
                <script>
                switAlert("loading", "Accesando a Seture", "","");
                </script>
                ';
                $url = CurlController::api() . "users?login=true";
                $method = "POST";
                $fields = array(
                    "email_user" =>  $_POST["logEmail"],
                    "password_user" => $_POST["logPassword"]
                );
                $header = array(
                    "Content-Type" => "application/x-www-form-urlencoded"
                );

                $response = CurlController::request($url, $method, $fields, $header);
                if ($response->status == 200) {
                    if ($response->result[0]->verificated_user > 0) {
                        $_SESSION['user'] = $response->result[0];
                        $urlsVist = "";
                        if(isset($_COOKIE["UrlPage"])){
                            $urlsVist = $_COOKIE["UrlPage"];
                        }else{
                            if($_SESSION['user']->method_user == 'delivery'){
                                $urlsVist =  TemplateController::path() . 'acount&orders';
                            }else if ($_SESSION['user']->method_user == 'administer'){
                                $urlsVist =  TemplateController::path() . 'acount&list-vendor';
                            }else if ($_SESSION['user']->method_user == 'globalAdminister'){
                                $urlsVist =  TemplateController::path() . 'acount&registers';
                            }else{
                                $urlsVist =  TemplateController::path() . 'acount&wishAcount';
                            }
                        }
                        echo '
                        <script> 
                        formatearAlertas();
                        localStorage.setItem("token_user", "' . $_SESSION["user"]->token_user . '");
                        window.location="' . $urlsVist . '";
                        </script>
                        ';
                        
                    } else {
                        echo '<div class="alert alert-danger alert-dismissible">El email no esta confirmado, por favor confirmalo</div>
                        <script>
                        formatearAlertas()
                        switAlert("close", "", "","");
                        </script>
                        ';
                    }
                } else {
                    echo '<div class="alert alert-danger alert-dismissible">El email o la contraseña no son correctas</div>
                    <script>
                    formatearAlertas()
                    switAlert("close", "", "","");
                </script>';
                }
            } else {
                echo '<div class="alert alert-danger alert-dismissible">Error en la sintaxis de los campos</div>
                <script>
                formatearAlertas()
                switAlert("close", "", "","");
            </script>';
            }
        }
    }

    /* login con facebook */
    // static public function loginFacebook($url){
    //     $fb = new \Facebook\Facebook([
    //         'app_id' => '1279275769213584',
    //         'app_secret' => 'fdf5eb9f167c65de79c3b6293216e999',
    //         'default_graph_version' => 'v2.10',
    //         //'default_access_token' => '{access-token}', // optional
    //       ]);

    //       /* creamos la redireccion hacia la API de facebook */
    //       $handler=$fb->getRedirectLoginHelper();

    //       /* solcitar datos relacionados al email */
    //       $data=["email"];

    //       /* activamos la url de facebook con los parametro: url de regreso y parametros que pedimos */
    //       $fullUrl= $handler->getLoginUrl($url, $data);

    //       /* redireccionamos la pagina de facebook  */
    //       echo '<script>
    //             window.location="'.$fullUrl.'";
    //       </script>';
    //         
    // }

    public function resetPassword()
    {
        if (isset($_POST["resetPassword"])) {
            /* validar los campos */
            if (
                isset($_POST["resetPassword"]) && preg_match('/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/', $_POST["resetPassword"])
            ) {
                $url = CurlController::api() . "users?linkTo=email_user&equalTo=" . $_POST["resetPassword"] . "&select=email_user,id_user,displayname_user,method_user";
                $method = "GET";
                $fields = array();
                $header = array();

                $user = CurlController::request($url, $method, $fields, $header);
                if ($user->status == 200) {
                    if($_POST["newPassword"] == $_POST["repeatPassword"] && strlen($_POST["newPassword"]) >= 8){
                        if ($user->result[0]->method_user == "direct") {
                            function genPassword($Length)
                            {
                                $password = "";
                                $chain = "123456789abcdefghijklmnopqrstuvwxyz";
                                $max = strlen($chain) - 1;

                                for ($i = 0; $i < $Length; $i++) {
                                    $password .= substr($chain, mt_rand(0, $max), 1);
                                }
                                return $password;
                            }

                            $newPassword = genPassword(11);
                            $crypt = crypt($newPassword, '$2a$07$pdgtwzaldisoqrtrswqpxzasdte$');

                            $url = CurlController::api() . "users?id=" . $user->result[0]->id_user . "&nameId=id_user&token=no&except=password_user";
                            $method = "PUT";
                            $fields = "password_user=" . $crypt;
                            $header = array();

                            $respuesta = CurlController::request($url, $method, $fields, $header);
                            if ($respuesta->status == 200) {

                                // Email donde esta la nueva contraseña
                                $email = $_POST["resetPassword"];
                                $name = $user->result[0]->displayname_user;
                                $subject = "Nueva contraseña Seture";
                                $message = "Confirma tu nueva contraseña para ingresar a Seture... Tu nueva contraseña es: " . $newPassword;
                                $url = TemplateController::path() . "acount&login";
                                $post = "Confirmar Nueva Contraseña";
                                $sendEmail = TemplateController::sendEmail($name, $subject, $email, $message, $url, $post);

                                if ($sendEmail == "ok") {
                                    echo '
                                        <script>
                                        formatearAlertas();
                                        notiAlert(1, "Tu nueva contraseña se envio correctamente, confirma en tu cuenta email (aveces esta en spam)");
                                    </script>';
                                    
                                } else {
                                    echo '
                                        <script>
                                        formatearAlertas();
                                        notiAlert(3, "' . $sendEmail . '");
                                    </script>';
                                }
                            } else {
                                echo '
                                <script>
                                formatearAlertas();
                                notiAlert(3, "no se pudo resetear la contraseña");
                            </script>';
                            }
                        } else {
                            echo '
                                <script>
                                formatearAlertas();
                                notiAlert(3, "Te registraste por face o por gmail");
                            </script>';
                        }
                    }
                } else {
                    echo '
                        <script>
                        formatearAlertas();
                        notiAlert(3, "El email no esta registrado");
                    </script>';
                }
            } else {
                echo '
                        <script>
                        formatearAlertas();
                        notiAlert(3, "Error en la sintaxis de los campos");
                    </script>';
            }
        }
    }

    public function actualiarContraseña()
    {
        if (isset($_POST["newPassword"])) {
            /* validar los campos */
            if (
                preg_match('/^[#\\=\\$\\;\\*\\_\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-Z]{1,}$/', $_POST["newPassword"])
            ) {
                if ($_SESSION["user"]->method_user == "direct" || $_SESSION["user"]->method_user == "administer" || $_SESSION["user"]->method_user == "globalAdminister") {

                    $crypt = crypt($_POST["newPassword"], '$2a$07$pdgtwzaldisoqrtrswqpxzasdte$');

                    $url = CurlController::api() . "users?id=" . $_SESSION["user"]->id_user . "&nameId=id_user&token=" . $_SESSION["user"]->token_user;
                    $method = "PUT";
                    $fields = "password_user=" . $crypt;
                    $header = array();

                    $respuesta = CurlController::request($url, $method, $fields, $header);

                    if ($respuesta->status == 200) {
                        // Email donde esta la nueva contraseña
                        $email = $_SESSION["user"]->email_user;
                        $name = $_SESSION["user"]->displayname_user;
                        $subject = "Nueva contraseña Seture";
                        $message = "Acabas de cambiar tu contraseña... si es un error Por favor de notificar a Seture... ";
                        $url = TemplateController::path() . "acount&login";
                        $post = "Confirmar Nueva Contraseña";
                        $sendEmail = TemplateController::sendEmail($name, $subject, $email, $message, $url, $post);

                        if ($sendEmail == "ok") {
                            echo '
                                 <script>
                                 formatearAlertas();
                                 notiAlert(1, "Tu nueva contraseña se envio correctamente, confirma en tu cuenta email (aveces esta en spam)");
                             </script>';
                        } else {
                            echo '
                                 <script>
                                 formatearAlertas();
                                 notiAlert(3, "' . $sendEmail . '");
                             </script>';
                        }
                    } else {
                        if ($respuesta->status == 303) {
                            echo '<script>
                            formatearAlertas();
                            switAlert("error", "' . $respuesta->result . '", "' . TemplateController::path() . 'acount&logout","");
                            </script>';
                        } else {
                            echo '
                                 <script>
                                 formatearAlertas();
                                 notiAlert(3, "no se pudo cambiar tu contraseña");
                                </script>';
                        }
                    }
                } else {
                    echo '
                                 <script>
                                 formatearAlertas();
                                 notiAlert(3, "Te logeaste con metodo Facebook o google");
                             </script>';
                }
            } else {
                echo '
                <script>
                formatearAlertas();
                notiAlert(3, "El formato de la contraseña es incorrecto");
            </script>';
            }
        }
    }

    public function CambiarPhoto()
    {
        // validar la sintaxis de los campos 
        if (isset($_FILES['changePhoto']["tmp_name"]) && !empty($_FILES["changePhoto"]["tmp_name"])) {
            $image = $_FILES["changePhoto"];
            $folder = "img/users";
            $path = $_SESSION["user"]->id_user;
            $width = 200;
            $heigt = 200;
            $name = $_SESSION["user"]->username_user;

            $photo = TemplateController::AlmacenPhoto($image, $folder, $path, $width, $heigt, $name);

            if ($photo != "error") {
                // actualizar la foto
                $url = CurlController::api() . "users?id=" . $_SESSION["user"]->id_user . "&nameId=id_user&token=" . $_SESSION["user"]->token_user;
                $method = "PUT";
                $fields = "picture_user=" . $photo;
                $header = array();

                $respuesta = CurlController::request($url, $method, $fields, $header);
                if ($respuesta->status == 303) {
                    echo '<script>
                    formatearAlertas();
                    switAlert("error", "' . $respuesta->result . '", "' . TemplateController::path() . 'acount&logout","");
                    </script>';
                } else if ($respuesta->status == 200) {
                    $_SESSION["user"]->picture_user = $photo;
                    echo '<script>
                    formatearAlertas();
                    switAlert("success", "Tu foto a sido modificada correctamente", "' . $_SERVER["REQUEST_URI"] . '","");
                    </script>';
                } else {
                    echo '
                        <script>
                        formatearAlertas();
                        notiAlert(3, "Ocurrio un error al guardar la imagen");
                    </script>';
                }
            } else {
                echo '
                        <script>
                        formatearAlertas();
                        notiAlert(3, "Ocurrio un error al crear la imagen. Vuelve a intentarlo");
                    </script>';
            }
        }
    }

    public function disputeSubmit(){
        if(isset($_POST["idOrder"])){
            if(isset($_POST["contentDispute"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}$/', $_POST["contentDispute"])){
                date_default_timezone_set('UTC');
                date_default_timezone_set("America/Mexico_City");
                $url = CurlController::api()."disputes?token=".$_SESSION["user"]->token_user;
                $method = "POST";
                $fields = array(
                    "id_order_dispute" => $_POST["idOrder"],
                    "id_user_dispute" => $_POST["idUser"] ,
                    "id_store_dispute" => $_POST["idStore"],
                    "content_dispute" => $_POST["contentDispute"],
                    "date_created_dispute" => date("Y-m-d") 
                );
                $headers = array(
                    "Content-Type" => "application/x-www-form-urlencoded"
                );

                $dispute = CurlController::request($url,$method,$fields,$headers);

                if($dispute->status == 200){
                    $name = $_POST["nameStore"];
                    $subject = "Se creo una disputa";
                    $email = $_POST["emailStore"];
                    $message = "Un usuario creo una disputa. Atiendela lo antes posible para evitar que tu cuenta se cierre!";
                    $url = TemplateController::path()."acount&my-store&disputes";
                    $post = "Atender";
                    $sendEmail = TemplateController::sendEmail($name,$subject,$email,$message,$url,$post);
                    if($sendEmail == "ok"){
                        echo '
                        <script>
                            formatearAlertas();
                            switAlert("success", "Se envio tu disputa", null, null, 1500);
                            window.location="' . TemplateController::path() . 'acount&my-shopping";
                        </script>'; 
                    }
                }
            }
        }
    }

    public function newQuestion(){
        if(isset($_POST["idProduct"])){
            if(isset($_POST["idUser"]) && !empty($_POST["idUser"])){
                if(isset($_POST["Request"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}$/', $_POST["Request"])){
                    date_default_timezone_set('UTC');
                    date_default_timezone_set("America/Mexico_City");
                    $url = CurlController::api()."messages?token=".$_SESSION["user"]->token_user;
                    $method = "POST";
                    $fields = array(
                        "id_product_message" => $_POST["idProduct"],
                        "id_user_message" => $_POST["idUser"] ,
                        "id_store_message" => $_POST["idStore"],
                        "content_message" => $_POST["Request"],
                        "date_created_message" => date("Y-m-d") 
                    );
                    $headers = array(
                        "Content-Type" => "application/x-www-form-urlencoded"
                    );

                    $message = CurlController::request($url,$method,$fields,$headers);

                    if($message->status == 200){
                        $name = $_POST["nameStore"];
                        $subject = "Se creo una pregunta";
                        $email = $_POST["emailStore"];
                        $message = "Un usuario realizo una pregunta. Atiendela lo antes posible para no perder el interes de tu producto!";
                        $url = TemplateController::path()."acount&my-store&messages";
                        $post = "Responder";
                        $sendEmail = TemplateController::sendEmail($name,$subject,$email,$message,$url,$post);
                        if($sendEmail == "ok"){
                            echo '
                            <script>
                                formatearAlertas();
                                switAlert("success", "Se envio tu pregunta", null, null, 1500);
                            </script>'; 
                        }
                    }
                }else{
                    echo '
                <script>
                    formatearAlertas();
                    notiAlert(3, "Error en la sintaxis de los campos");
                </script>';
                return;
                }
            }else{
                echo '<script>
                formatearAlertas();
                switAlert("error", "Debes estar logeado para realizar preguntas!", "' . TemplateController::path() . 'acount&login","");
                </script>';
            }
        }
    }

    public function calificationSubmit(){
        if(isset($_POST["rating"])){
            $arrayReviews = array(
                "review" => $_POST["rating"],
                "comment" => $_POST["contentComment"],
                "user" => $_POST["idUser"]
            );

            $select = "reviews_product";
            $url = CurlController::api()."products?linkTo=id_product&equalTo=".$_POST["idProduct"]."&select=".$select;
            $method = "GET";
            $fields = array();
            $headers = array();

            $reviewsProduct = CurlController::request($url,$method,$fields,$headers)->result;

            $count = 0;
            if($reviewsProduct[0]->reviews_product !=null){
                $newReview = json_decode($reviewsProduct[0]->reviews_product, true);
                // editar
                foreach($newReview as $index => $item){
                    if(isset($item["user"])){
                        if($item["user"] == $_POST["idUser"]){
                            $item["review"] = $_POST["rating"];
                            $item["comment"] = $_POST["contentComment"];
                            $newReview[$index] = $item;
                        }else{
                            $count++;
                        }
                    }
                }
                // crear
                if($count == count($newReview)){
                    array_push($newReview, $arrayReviews);
                }
            }else{
                $newReview = array();
                array_push($newReview, $arrayReviews);
            }

            $url = CurlController::api()."products?id=".$_POST["idProduct"]."&nameId=id_product&token=".$_SESSION["user"]->token_user;
            $method = "PUT";
            $fields = "reviews_product=".json_encode($newReview) ;
            $headers = array();

            $upReviews = CurlController::request($url,$method,$fields,$headers);

            if($upReviews->status == 200){
                echo '
                    <script>
                        formatearAlertas();
                        switAlert("success", "Se envio tu reseña con exito", null, null, 1500);
                        window.location="' . TemplateController::path() . 'acount&my-shopping";
                    </script>'; 
            }else{
                echo '
                <script>
                    formatearAlertas();
                    switAlert("error", "Ocurrio un error, intentalo de nuevo!", null, null, 1500);
                </script>'; 
            }
        }
    }

    public function starcheck(){
        if(isset($_POST["idStar"]) && preg_match('/^[0-9]{1,}$/', $_POST["idStar"]) &&
        isset($_POST["idprod"]) && preg_match('/^[0-9]{1,}$/', $_POST["idprod"]) &&
        isset($_POST["idtipe"]) && preg_match('/^[a-zA-Z]{1,}$/', $_POST["idtipe"])){
            if (!isset($_SESSION['user'])) {
                echo '<script>
                formatearAlertas();
                switAlert("error", "Nesesitas estar logeado!", "","");
                </script>';
                return;
            }else{
                $time= time();
                if($_SESSION["user"]->token_exp_user < $time){
                    echo '<script>
                    switAlert("error", "Para proteger tus datos, si no hay actividad en tu cuenta, se cierra automaticamente. Vuelve a logearte!", "' . TemplateController::path() . 'acount&logout","");
                        
                    </script>';
                    return;
                }else{
                    if( isset($_POST["pagado"]) && $_POST["pagado"] != "pagado"){
                        if($_POST["idtipe"] == "checkin"){
                            date_default_timezone_set('UTC');
                            date_default_timezone_set("America/Mexico_City");
                            $idUser=$_SESSION['user']->id_user;
                            $idProduct = $_POST["idprod"];
                            $check=$_POST["idtipe"];
                            $numero=$_POST["idStar"];
                            $email="";
                            $time="";
                            $cont=0;

                            $url = CurlController::api() . "users?linkTo=id_user&equalTo=" . $idUser . "&select=email_user,id_user,displayname_user,method_user";
                            $method = "GET";
                            $fields = array();
                            $header = array();
                            $user = CurlController::request($url, $method, $fields, $header)->result[0];
                            $email = $user->email_user;

                            $url2 = CurlController::api() . "relations?rel=products,categories&type=product,category&linkTo=id_product&equalTo=" . $idProduct . "&select=stars_product,url_product,name_category,image_product,name_product,price_product";
                            $stars = CurlController::request($url2, $method, $fields, $header)->result[0];
                            $starster = json_decode($stars->stars_product);
                            foreach($starster as $key => $value){
                                if($numero == $value->numero){
                                    if(($value->check == "checkout" || $value->check == "" || $value->check == null) && ($value->idUser == null || $value->idUser == "") && ($value->emailUser == null || $value->emailUser == "") ){
                                        $mifecha = new DateTime(); 
                                        $mifecha->modify('+7 minute'); 
                                        $mifecha =  $mifecha->format('d-m-Y H:i:s');
                                        $value->idUser= $idUser;
                                        $value->check= $check;
                                        $value->emailUser= $email;
                                        $value->time= $mifecha;
                                        $cont++;
                                    }
                                }
                            }
                            if($cont > 0){
                                $url = CurlController::api()."products?id=".$idProduct."&nameId=id_product&token=".$_SESSION["user"]->token_user;
                                $method = "PUT";
                                $fields = "stars_product=".json_encode($starster);
                                $headers = array();
                    
                                $upStar = CurlController::request($url,$method,$fields,$headers);
                                if($upStar->status == 200){
                                
                                    $function = 'addBagCard("'.$stars->url_product.'", "'.$stars->name_category.'", "'.$stars->image_product.'", "'.$stars->name_product.'", '.json_encode($stars->price_product).', "'.TemplateController::path().'", "'.CurlController::api().'");';
                                    echo '
                                        <script>
                                            formatearAlertas();
                                            '.$function.'
                                            switAlert("success", "Rascadito apartado!!", null, null, 1500);
                                            window.location="' . TemplateController::path() . $stars->url_product .'";
                                        </script>'; 
                                        return;
                                }else{
                                    echo '<script>
                                    formatearAlertas();
                                    switAlert("error", "Ya se encuentra rascado!", "","");
                                    </script>';
                                    return;
                                }
                            }else{
                                echo '<script>
                                formatearAlertas();
                                switAlert("error", "Ya se encuentra rascado!", "","");
                                </script>';
                                return;
                            }
                        }
                        
                        if($_POST["idtipe"] == "checkout"){
                            $idUser=$_SESSION['user']->id_user;
                            $idProduct = $_POST["idprod"];
                            $check=$_POST["idtipe"];
                            $numero=$_POST["idStar"];
                            $cont=0;         
                            $method = "GET";
                            $fields = array();
                            $header = array();
                            $url2 = CurlController::api() . "products?linkTo=id_product&equalTo=" . $idProduct . "&select=stars_product";
                            $stars = CurlController::request($url2, $method, $fields, $header)->result[0];
                            $stars = json_decode($stars->stars_product);
                            
                            foreach($stars as $key => $value){
                                if($numero == $value->numero){
                                    if(($value->check == "checkin") && ($value->idUser == $idUser )){
                                        $value->idUser= "";
                                        $value->check= $check;
                                        $value->emailUser= "";
                                        $value->time= "";
                                        $cont++;
                                    }
                                }
                            }
                            if($cont > 0){
                                $url = CurlController::api()."products?id=".$idProduct."&nameId=id_product&token=".$_SESSION["user"]->token_user;
                                $method = "PUT";
                                $fields = "stars_product=".json_encode($stars) ;
                                $headers = array();
                    
                                $upStar = CurlController::request($url,$method,$fields,$headers);
                                if($upStar->status == 200){
                                    $routeurl = explode("/", $_SERVER['REQUEST_URI']);
                                    if (!empty(array_filter($routeurl)[1])) {
                                        $routeurl = array($routeurl[1]);
                                    }
                                    echo '
                                        <script>
                                            formatearAlertas();
                                            switAlert("success", "Rascadito Removido!!", null, null, 1500);
                                            window.location="' . TemplateController::path() . $routeurl[0] .'";
                                        </script>'; 
                                        return;
                                }else{
                                    echo '<script>
                                    formatearAlertas();
                                    switAlert("error", "Vulve a intentarlo!", "","");
                                    </script>';
                                    return;
                                }
                            }else{
                                echo '<script>
                                formatearAlertas();
                                switAlert("error", "Vulve a intentarlo!", "","");
                                </script>';
                                return;
                            }
                        }
                        if($_POST["idtipe"] != "checkin" && $_POST["idtipe"] != "checkout"){
                            echo '<script>
                            formatearAlertas();
                            switAlert("error", "Ocurrio un error!", "","");
                            </script>';
                            return;
                        }
                    }else{
                        echo '<script>
                            formatearAlertas();
                            switAlert("error", "Tu estrella ya esta pagada!", "","");
                            </script>';
                            return;
                    }
                }
            }
        }
    }

    public function endcheck($idUser, $idProduct, $numero){
        $cont=0; 
        $idUser = $idUser; 
        $idProduct=$idProduct; 
        $check='checkout'; 
        $numero=$numero;
        $method = "GET";
        $fields = array();
        $header = array();
        $url2 = CurlController::api() . "products?linkTo=id_product&equalTo=" . $idProduct . "&select=stars_product";
        $stars = CurlController::request($url2, $method, $fields, $header)->result[0];
        $stars = json_decode($stars->stars_product);
        $numero = json_decode( $numero);
        if ($stars != null && is_array($stars)) {
            foreach($stars as $key => $value){
                if($numero[$key] != '' || $numero[$key] != NULL){
                    if($numero[$key] == $value->numero){
                        if(($value->check == "checkin") && ($value->pagado != "pagado") && ($value->idUser == $idUser )){
                        
                            $value->idUser= "";
                            $value->check= $check;
                            $value->emailUser= "";
                            $value->time= "";
                            $cont++;
                        }
                    }
                }
            }   
        }   
        
        if($cont > 0){
            $url = CurlController::api()."products?id=".$idProduct."&nameId=id_product&token=no&except=stars_product";
            $method = "PUT";
            $fields = "stars_product=".json_encode($stars) ;
            $headers = array();

            $upStar = CurlController::request($url,$method,$fields,$headers);
            if($upStar->status == 200){
                $routeurl = explode("/", $_SERVER['REQUEST_URI']);
                if (!empty(array_filter($routeurl)[1])) {
                    $routeurl = array($routeurl[1]);
                }
                echo '
                    <script>
                        formatearAlertas();
                        switAlert("success", "Rascadito Removido!!", null, null, 1500);
                        window.location="' . TemplateController::path() . $routeurl[0] .'";
                    </script>'; 
                    return;
            }
        }    
    }

    public function verifistar(){
        if(isset($_POST["idStar"]) && preg_match('/^[0-9]{1,}$/', $_POST["idStar"]) &&
        isset($_POST["idprod"]) && preg_match('/^[0-9]{1,}$/', $_POST["idprod"]) &&
        isset($_POST["idtipe"]) && preg_match('/^[a-zA-Z]{1,}$/', $_POST["idtipe"])){
            return 1;
        }
    }

    public function newsemail(){
        if(isset($_POST["emailnewes"])){
            if( preg_match('/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/', $_POST["emailnewes"])){
                $api = CurlController::api();
                $url = $api . "newsletter?token=tokenGlobal&select=email_newsletter&linkTo=email_newsletter&equalTo=". $_POST["emailnewes"];
                $metod = "GET";
                $fields = array();
                $headers = array();
                $emailSearch = CurlController::request($url, $metod, $fields, $headers); 

                if($emailSearch->status == 404){
                    $url = $api . "newsletter?newslater=true";
                    $metod = "POST";
                    $fields = array(
                        "email_newsletter" =>  $_POST["emailnewes"],
                        "name_newsletter" => null
                    );
                    $header = array(
                        "Content-Type" => "application/x-www-form-urlencoded"
                    );
                    $newsemail = CurlController::request($url, $metod, $fields, $header); 
                    
                    if($newsemail->status == 200){
                        echo '
                            <script>
                                formatearAlertas();
                                switAlert("success", "Tu email se registro correctamente!!", null, null, 1500);
                            </script>';
                    }
                }else{
                    echo '
                    <script>
                        formatearAlertas();
                        switAlert("error", "Este email ya se registro!!", null, null, 1500);
                    </script>';
                }
            }else{
                echo '
                    <script>
                        formatearAlertas();
                        switAlert("success", "No se pudo registrar tu email!!", null, null, 1500);
                    </script>';
            }
        }
    }

    public function AgregarNewRegister(){
        if(isset($_POST["SelectProduct"])){
            if(
                preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["SelectProduct"]) &&
                isset($_POST["ColorProduct"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["ColorProduct"]) &&
                isset($_POST["TallaProduct"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["TallaProduct"]) &&
                isset($_POST["PesoProduct"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["PesoProduct"]) &&
                isset($_POST["AlturaProduct"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["AlturaProduct"]) &&
                isset($_POST["precioProduct"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["precioProduct"]) &&
                isset($_POST["pagoPrevProduct"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["pagoPrevProduct"]) &&
                isset($_POST["diaProduct"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["diaProduct"]) &&
                isset($_POST["horaProduct"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["horaProduct"]) &&
                isset($_POST["SelectLinea"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["SelectLinea"]) &&
                isset($_POST["ColorProduct"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["ColorProduct"]) &&
                isset($_POST["nombreProduct"]) && preg_match('/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]{1,}$/', $_POST["nombreProduct"]) &&
                isset($_POST["telefonoProduct"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["telefonoProduct"]) &&
                isset($_POST["messengerProduct"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["messengerProduct"]) &&
                isset($_POST["stockApro"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["stockApro"])
            ){
                $color =  explode("_", $_POST["ColorProduct"])[1];
                $talla =  explode("_", $_POST["TallaProduct"])[1];
                $idProduct =  explode("_", $_POST["SelectProduct"])[1];
                $url = CurlController::api()."stocks?linkTo=id_product_stock,color_stock,size_stock&equalTo=".$idProduct.",".$color.",".$talla."&select=code_stock,id_stock,number_stock&token=".$_SESSION["user"]->token_user;
                $method= "GET";
                $header= array();
                $fields= array();
                $codeStock= CurlController::request($url, $method, $header, $fields);
                if($codeStock->status == 200){
                    $codeStocker = $codeStock->result[0]->code_stock;
                    $id_stock = $codeStock->result[0]->id_stock;
                    $NumStock = $codeStock->result[0]->number_stock;
                }else{
                    echo '
                        <script>
                            formatearAlertas();
                            notiAlert(3, "Error: no hay Coincidencias de color y talla");
                        </script>'; 
                    return;
                }
                date_default_timezone_set('UTC');
                date_default_timezone_set("America/Mexico_City");
                $dateCreated = date("Y-m-d");
                $envioOrder = 0;
                if(isset($_POST["envioProduct"]) &&  $_POST["envioProduct"]== "on"){
                    $envioOrder = 1;
                }
                $spesificationOrder = array( (object)[ "peso" => array($_POST["PesoProduct"]), "altura" => array($_POST["AlturaProduct"])]);

                $dataStore = array(
                    "id_product_order" => explode("_", $_POST["SelectProduct"])[1],
                    "code_stock_order" => $codeStocker,
                    "id_category_order" => explode("_", $_POST["SelectProduct"])[0],
                    "id_stock_order" => $id_stock,
                    "name_buyer_order" => TemplateController::capitalize($_POST["nombreProduct"]),
                    "phone_order" => $_POST["telefonoProduct"],
                    "stacion_order" => explode("_", $_POST["EstacionProduct"])[1],
                    "day_order" => $_POST["diaProduct"],
                    "hour_order" => $_POST["horaProduct"].":00",
                    "stock_out_order" => $_POST["stockApro"],
                    "spesifications_order" => json_encode($spesificationOrder),
                    "status_order" => "Pendiente",
                    "price_order" => $_POST["precioProduct"],
                    "pago_prev_order" => $_POST["pagoPrevProduct"],
                    "follow_order" =>  $_POST["messengerProduct"],
                    "envio_order" => $envioOrder,
                    "date_create_order" => $dateCreated
                );

                $url = CurlController::api()."orders?token=".$_SESSION["user"]->token_user;
                $method = "POST";
                $fields = $dataStore;
                $header = array(
                "Content-Type" => "application/x-www-form-urlencoded"
                );
                $saveOrder = CurlController::request($url,$method,$fields,$header);
                if($saveOrder->status == "200"){
                    if($NumStock > 0){
                        $url = CurlController::api()."stocks?id=".$id_stock."&nameId=id_stock&token=".$_SESSION["user"]->token_user;
                        $method = "PUT";
                        $fields = "number_stock=".$NumStock-1;
                        $headers = array();
        
                        $upStock = CurlController::request($url,$method,$fields,$headers);
                        if($upStock->status == 200){
                            echo '
                                <script>
                                    formatearAlertas();
                                    switAlert("success", "El registro se realizo correctamente", "' . TemplateController::path().'acount&registers",1500);
                                </script>'; 
                            return;
                        }else{
                            echo '
                            <script>
                                formatearAlertas();
                                notiAlert(3, "Error: al guardar la orden");
                            </script>'; 
                            return;
                        }
                    }else{
                        echo '
                        <script>
                            formatearAlertas();
                            switAlert("success", "El registro se realizo correctamente pero hace falta stock", "' . TemplateController::path().'acount&registers",1500);
                        </script>'; 
                    return;
                    }   
                }else{
                    echo '
                        <script>
                            formatearAlertas();
                            notiAlert(3, "Error: al guardar la orden");
                        </script>'; 
                    return;
                }
            }else{
                echo '
                    <script>
                        formatearAlertas();
                        notiAlert(3, "Error: en la sintaxis de los campos");
                    </script>'; 
                return;
            }
        }
    }
    
    public function editRegister(){
        if(isset($_POST["Selectedit"])){
            if(
                preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["Selectedit"]) &&
                isset($_POST["Coloredit"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["Coloredit"]) &&
                isset($_POST["Tallaedit"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["Tallaedit"]) &&
                isset($_POST["Pesoedit"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["Pesoedit"]) &&
                isset($_POST["Alturaedit"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["Alturaedit"]) &&
                isset($_POST["precioedit"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["precioedit"]) &&
                isset($_POST["pagoPrevedit"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["pagoPrevedit"]) &&
                isset($_POST["diaedit"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["diaedit"]) &&
                isset($_POST["horaedit"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["horaedit"]) &&
                isset($_POST["SelectLinea"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["SelectLinea"]) &&
                isset($_POST["Estacionedit"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["Estacionedit"]) &&
                isset($_POST["nombreedit"]) && preg_match('/^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]{1,}$/', $_POST["nombreedit"]) &&
                isset($_POST["telefonoedit"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["telefonoedit"]) &&
                isset($_POST["messengeredit"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["messengeredit"]) &&
                isset($_POST["stockApro"]) && preg_match('/^[-\\(\\)\\0-9 ]{1,}$/', $_POST["stockApro"]) &&
                isset($_POST["idOrderUP"]) 
            ){
                $color =  explode("_", $_POST["Coloredit"])[1];
                $talla =  explode("_", $_POST["Tallaedit"])[1];
                $idProduct =  explode("_", $_POST["Selectedit"])[1];
                $url = CurlController::api()."stocks?linkTo=id_product_stock,color_stock,size_stock&equalTo=".$idProduct.",".$color.",".$talla."&select=code_stock,id_stock,number_stock&token=".$_SESSION["user"]->token_user;
                $method= "GET";
                $header= array();
                $fields= array();
                $codeStock= CurlController::request($url, $method, $header, $fields);
                if($codeStock->status == 200){
                    $codeStocker = $codeStock->result[0]->code_stock;
                    $id_stock = $codeStock->result[0]->id_stock;
                    $NumStock = $codeStock->result[0]->number_stock;
                }else{
                    echo '
                        <script>
                            formatearAlertas();
                            notiAlert(3, "Error: no hay Coincidencias de color y talla");
                        </script>'; 
                    return;
                }
                $envioOrder = 0;
                if(isset($_POST["envioedit"]) &&  $_POST["envioedit"]== "on"){
                    $envioOrder = 1;
                }
                $spesificationOrder = array( (object)[ "peso" => array($_POST["Pesoedit"]), "altura" => array($_POST["Alturaedit"])]);

                $dataStore ="id_product_order=".explode("_", $_POST["Selectedit"])[1]."&code_stock_order=".$codeStocker."&id_category_order=".explode("_", $_POST["Selectedit"])[0]."&id_stock_order=".$id_stock."&name_buyer_order=".TemplateController::capitalize($_POST["nombreedit"])."&phone_order=".$_POST["telefonoedit"]."&stacion_order=".explode("_", $_POST["Estacionedit"])[1]."&day_order=".$_POST["diaedit"]."&hour_order=".$_POST["horaedit"].":00"."&stock_out_order=".$_POST["stockApro"]."&spesifications_order=".json_encode($spesificationOrder)."&status_order="."Pendiente"."&price_order=".$_POST["precioedit"]."&pago_prev_order=".$_POST["pagoPrevedit"]."&follow_order=". $_POST["messengeredit"]."&envio_order=".$envioOrder;

                $url = CurlController::api()."orders?id=".$_POST["idOrderUP"]."&nameId=id_order&token=".$_SESSION["user"]->token_user;
                $method = "PUT";
                $fields = $dataStore;
                $header = array(
                "Content-Type" => "application/x-www-form-urlencoded"
                );
                $saveOrder = CurlController::request($url,$method,$fields,$header);

                if($saveOrder->status == "200"){
                    if($_POST["numOrderStock"] !== $codeStocker){
                        if($NumStock > 0){
                            $url = CurlController::api()."stocks?id=".$id_stock."&nameId=id_stock&token=".$_SESSION["user"]->token_user;
                            $method = "PUT";
                            $fields = "number_stock=".$NumStock-1;
                            $headers = array();       
                            $upStock = CurlController::request($url,$method,$fields,$headers);
                            if($upStock->status == 200){
                                if($_POST["stockAproOld"] == 1){
                                    $url = CurlController::api()."stocks?id=".$_POST["numOrderStock"]."&nameId=code_stock&token=".$_SESSION["user"]->token_user;
                                    $method = "PUT";
                                    $fields = "number_stock=".$_POST["numberStockols"]+1;
                                    $headers = array();
                    
                                    $upStock2 = CurlController::request($url,$method,$fields,$headers);
                                    if($upStock2->status == 200){
                                        echo '
                                            <script>
                                                formatearAlertas();
                                                switAlert("success", "El registro se realizo correctamente con cambio en stock", "' . TemplateController::path().'acount&registers",1500);
                                                window.location="' . TemplateController::path() . 'acount&registers";
                                            </script>'; 
                                        return;
                                    }else{
                                        echo '
                                        <script>
                                            formatearAlertas();
                                            notiAlert(3, "Error: al guardar la orden");
                                        </script>'; 
                                        return;
                                    }
                                }else{
                                    echo '
                                        <script>
                                            formatearAlertas();
                                            switAlert("success", "El registro se realizo correctamente sin afectar el segundo stock", "' . TemplateController::path().'acount&registers",1500);
                                            window.location="' . TemplateController::path() . 'acount&registers";
                                        </script>'; 
                                    return;
                                }
                            }else{
                                echo '
                                <script>
                                    formatearAlertas();
                                    notiAlert(3, "Error: al guardar la orden");
                                </script>'; 
                                return;
                            }
                        }else{
                            if($_POST["stockAproOld"] == 1){
                                $url = CurlController::api()."stocks?id=".$_POST["numOrderStock"]."&nameId=code_stock&token=".$_SESSION["user"]->token_user;
                                $method = "PUT";
                                $fields = "number_stock=".$_POST["numberStockols"]+1;
                                $headers = array();
                
                                $upStock = CurlController::request($url,$method,$fields,$headers);
                                if($upStock->status == 200){
                                    echo '
                                        <script>
                                            formatearAlertas();
                                            switAlert("success", "El registro se realizo correctamente con cambio en stock", "' . TemplateController::path().'acount&registers",1500);
                                            window.location="' . TemplateController::path() . 'acount&registers";
                                        </script>'; 
                                    return;
                                }else{
                                    echo '
                                    <script>
                                        formatearAlertas();
                                        notiAlert(3, "Error: al guardar la orden");
                                    </script>'; 
                                    return;
                                }
                            }else{
                                echo '
                                    <script>
                                        formatearAlertas();
                                        switAlert("success", "El registro se realizo correctamente sin afectar el segundo stock", "' . TemplateController::path().'acount&registers",1500);
                                        window.location="' . TemplateController::path() . 'acount&registers";
                                    </script>'; 
                                return;
                            }
                        }   
                    }else{
                        echo '
                        <script>
                            formatearAlertas();
                            switAlert("success", "Se edito correctamente sin cambio a stock", "' . TemplateController::path().'acount&registers",1500);
                            window.location="' . TemplateController::path() . 'acount&registers";
                        </script>'; 
                        return;
                    }   
                }else{
                    echo '
                        <script>
                            formatearAlertas();
                            notiAlert(3, "Error: al guardar la orden");
                        </script>'; 
                    return;
                }
            }else{
                echo '
                    <script>
                        formatearAlertas();
                        notiAlert(3, "Error: en la sintaxis de los campos");
                    </script>'; 
                return;
            }
        }
    }

    public function AgregarNewInventario(){
        if(isset($_POST["nameProduct"])){
            if(
                preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["nameProduct"]) &&
                isset($_POST["urlProduct"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["urlProduct"]) &&
                isset($_FILES["logoProduct"]["tmp_name"])&& !empty($_FILES["logoProduct"]["tmp_name"]) &&
                isset($_POST["categoryProduct"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["categoryProduct"]) &&
                isset($_POST["subcategoryProduct"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["subcategoryProduct"])
            ){
                $image = $_FILES['logoProduct'];
                $folder = "img/products";
                $path = explode("_", $_POST['categoryProduct'])[1];
                $width = 300;
                $heigth = 300;
                $name = $_POST["urlProduct"];

                $saveImagePortProduct = TemplateController::AlmacenPhoto($image, $folder, $path, $width, $heigth, $name);
                if($saveImagePortProduct == 'error'){
                    echo '
                        <script>
                            formatearAlertas();
                            notiAlert(3, "Error: al salvar la portada del producto");
                        </script>'; 
                    return;
                }
                date_default_timezone_set('UTC');
                date_default_timezone_set("America/Mexico_City");
                $dateCreated = date("Y-m-d");
                
                $dataProduct = array(
                    "id_category_product" =>explode("_", $_POST["categoryProduct"])[0],
                    "id_subcategory_product"=> explode("_", $_POST["subcategoryProduct"])[0],
                    "name_product" => TemplateController::capitalize( $_POST["nameProduct"]),
                    "url_product" => $_POST["urlProduct"],
                    "image_product" => $saveImagePortProduct,
                    "date_create_product" => $dateCreated
                );

               $url = CurlController::api()."products?token=".$_SESSION["user"]->token_user;
               $method = "POST";
               $fields = $dataProduct;
               $header = array(
                "Content-Type" => "application/x-www-form-urlencoded"
                );
                $saveProd = CurlController::request($url,$method,$fields,$header);
                if($saveProd->status == "200"){
                    $colores = explode(",", $_POST["valColor"]);
                    $tallas = explode(",", $_POST["valTalla"]);
                    $count = 1;
                    foreach($colores as $key => $color){
                        $colorF = explode("_", $color);

                        $image = $_FILES["l_".$colorF[1]."_".$colorF[2]];
                        $folder = "img/products";
                        $path = explode("_", $_POST['categoryProduct'])[1]."/stock";
                        $width = 300;
                        $heigth = 300;
                        print_r($_POST["urlProduct"]); 

                        $name = $_POST["urlProduct"].$count;
                        $count++;

                        $saveImageProduct = TemplateController::AlmacenPhoto($image, $folder, $path, $width, $heigth, $name);
                        
                        if($saveImageProduct == 'error'){
                            echo '
                                <script>
                                    formatearAlertas();
                                    notiAlert(3, "Error: al salvar la portada del producto");
                                </script>'; 
                            return;
                        }
                        foreach($tallas as $key2 => $talla){
                            $name = '';
                            $explode = explode(' ',TemplateController::capitalize( $_POST["nameProduct"]));
                            foreach($explode as $x){
                                $name .=  $x[0];
                            }
                            $codeStock = $saveProd->result->idlast . strtoupper($name) . $talla . strtoupper(substr($colorF[2], 0, ((strlen($colorF[2])* (-1))+3)));
            
                            $dataProduct = array(
                                "id_product_stock" =>$saveProd->result->idlast,
                                "id_category_stock"=> explode("_", $_POST["categoryProduct"])[0],
                                "code_stock" => $codeStock,
                                "image_stock" => $saveImageProduct,
                                "size_stock" => $talla,
                                "color_stock" => strtoupper($colorF[2]),
                                "color_hexa_stock" => substr($colorF[1], -6),
                                "number_stock" => $_POST["s_".$colorF[1]."_".$colorF[2]."_".$talla],
                                "price_product_stock" => $_POST["p_".$colorF[1]."_".$colorF[2]."_".$talla],
                                "date_create_stock" => $dateCreated
                            );
                            $url = CurlController::api()."stocks?token=".$_SESSION["user"]->token_user;
                            $method = "POST";
                            $fields = $dataProduct;
                            $header = array(
                            "Content-Type" => "application/x-www-form-urlencoded"
                            );
                            $saveStore = CurlController::request($url,$method,$fields,$header);
                            if($saveStore->status == "200"){
                                echo '
                                <script>
                                    formatearAlertas();
                                    switAlert("success", "El registro se realizo correctamente", "' . TemplateController::path().'acount&inventario",1500);
                                </script>'; 
                            }
                        }
                    }
                }else{
                    echo '
                        <script>
                            formatearAlertas();
                            notiAlert(3, "Error: al guardar tienda");
                        </script>'; 
                    return;
                }
            }else{
                echo '
                    <script>
                        formatearAlertas();
                        notiAlert(3, "Error: al guardar tienda");
                    </script>'; 
                return;
            }
        }
    }

    public function AgregarTCMod($idProduct, $nameProd, $urlCat, $idCat){
        if(isset($_POST["valCountColor"])){
            $colores = explode(",", $_POST["valColor"]);
            $tallas = explode(",", $_POST["valTalla"]);
            foreach($colores as $key => $color){
                $colorF = explode("_", $color);
                foreach($tallas as $key2 => $talla){
                    $name = '';
                    $explode = explode(' ',TemplateController::capitalize( $nameProd));
                    foreach($explode as $x){
                        $name .=  $x[0];
                    }
                    date_default_timezone_set('UTC');
                    date_default_timezone_set("America/Mexico_City");
                    $dateCreated = date("Y-m-d");

                    $codeStock = $idProduct . strtoupper($name) . $talla . strtoupper(substr($colorF[2], 0, ((strlen($colorF[2])* (-1))+3)));
                    $image = $_FILES["l_".$colorF[1]."_".$colorF[2]."_".$talla];
                    $folder = "img/products";
                    $path = $urlCat."/stock";
                    $width = 300;
                    $heigth = 300;
                    $name = $codeStock;

                    $saveImageProduct = TemplateController::AlmacenPhoto($image, $folder, $path, $width, $heigth, $name);
                    if($saveImageProduct == 'error'){
                        echo '
                            <script>
                                formatearAlertas();
                                notiAlert(3, "Error: al salvar la portada del producto");
                            </script>'; 
                        return;
                    }
                    $dataProduct = array(
                        "id_product_stock" =>$idProduct,
                        "id_category_stock"=> $idCat,
                        "code_stock" => $codeStock,
                        "image_stock" => $saveImageProduct,
                        "size_stock" => $talla,
                        "color_stock" => strtoupper($colorF[2]),
                        "color_hexa_stock" => substr($colorF[1], -6),
                        "number_stock" => $_POST["s_".$colorF[1]."_".$colorF[2]."_".$talla],
                        "price_product_stock" => $_POST["p_".$colorF[1]."_".$colorF[2]."_".$talla],
                        "date_create_stock" => $dateCreated
                    );
                    $url = CurlController::api()."stocks?token=".$_SESSION["user"]->token_user;
                    $method = "POST";
                    $fields = $dataProduct;
                    $header = array(
                    "Content-Type" => "application/x-www-form-urlencoded"
                    );
                    $saveStore = CurlController::request($url,$method,$fields,$header);
                    if($saveStore->status == "200"){
                        echo '
                        <script>
                            formatearAlertas();
                            switAlert("success", "El registro se realizo correctamente", "' . TemplateController::path().'acount&inventario?edit='.$idProduct.'",1500);
                        </script>'; 
                    }
                }
            }
        }
    }

    public function editInventario($idProduct){
        if(isset($_POST["nameProductEdit"])){
            if(
                preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["nameProductEdit"]) &&
                isset($_POST["urlProductEdit"]) && preg_match('/^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}$/', $_POST["urlProductEdit"])
            ){
                // if(isset($_FILES["logoProduct"]["tmp_name"])&& !empty($_FILES["logoProduct"]["tmp_name"])){
                //     $image = $_FILES['logoProduct'];
                //     $folder = "img/products";
                //     $path = explode("_", $_POST['categoryProduct'])[1];
                //     $width = 300;
                //     $heigth = 300;
                //     $name = $_POST["urlProduct"];

                //     $saveImagePortProduct = TemplateController::AlmacenPhoto($image, $folder, $path, $width, $heigth, $name);
                //     if($saveImagePortProduct == 'error'){
                //         echo '
                //             <script>
                //                 formatearAlertas();
                //                 notiAlert(3, "Error: al salvar la portada del producto");
                //             </script>'; 
                //         return;
                //     }
                // }else{
                //     $saveImagePortProduct = $_POST["imageProductOld"];
                // }
                $colores = explode(",", $_POST["valColor"]);
                $colores = array_unique($colores);
                $tallas = explode(",", $_POST["valTalla"]);
                $tallas = array_unique($tallas);
                foreach($colores as $key => $color){
                    $colorF = explode("_", $color); 
                    foreach($tallas as $key2 => $talla){
                        $name = '';
                        $explode = explode(' ',TemplateController::capitalize( $_POST["nameProductEdit"]));
                        foreach($explode as $x){
                            if($x ==! "" ){
                                $name .=  $x[0];
                            }
                        }                     
                        $codeStock = $idProduct . strtoupper($name) . $talla . strtoupper(substr($colorF[1], 0, ((strlen($colorF[1])* (-1))+3)));
                        $dataINV = "number_stock=".$_POST["s_".$colorF[0]."_".$colorF[1]."_".$talla]."&price_product_stock=".$_POST["p_".$colorF[0]."_".$colorF[1]."_".$talla];
                        $url = CurlController::api()."stocks?id=".$codeStock."&nameId=code_stock&token=".$_SESSION["user"]->token_user;
                        $method = "PUT";
                        $fields = $dataINV;
                        $header = array(
                        "Content-Type" => "application/x-www-form-urlencoded"
                        );
                        $updateINV = CurlController::request($url,$method,$fields,$header);
                        if($updateINV->status == "200"){
                            echo '
                            <script>
                                formatearAlertas();
                                switAlert("success", "El registro se realizo correctamente", "' . TemplateController::path().'acount&inventario",1500);
                            </script>'; 
                        }else{
                            echo '
                            <script>
                                formatearAlertas();
                                notiAlert(3, "Error: al hacer la modificacion");
                            </script>'; 
                            return;
                        }
                    }
                }
            }{
                echo '
                <script>
                    formatearAlertas();
                    notiAlert(3, "Error: al hacer la modificacion");
                </script>'; 
                return;
            }
        }
    }
}
