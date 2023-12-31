<?php
if (!isset($_SESSION['user'])) {
    echo '<script>
    switAlert("error", "Debes logearte!", "' . $path . 'acount&logout","");
    </script>';
    return;
}else{
    $time= time();
    if($_SESSION["user"]->token_exp_user < $time){
        echo '<script>
        switAlert("error", "El token expiro vuelve a logearte", "' . $path . 'acount&logout","");
        </script>';
    return;
    }
}

$totalPriceSC2= 0;
?>

<!--=====================================
Breadcrumb
======================================-->  
	
    <div class="ps-breadcrumb">

        <div class="container">

            <ul class="breadcrumb">

                <li><a href="/">Home</a></li>

                <!-- <li><a href="<?php //echo $path?>shopingBag">Carrito de compras</a></li> -->

                <li>Pagar</li>

            </ul>

        </div>

    </div>
<!--=====================================
Checkout
======================================--> 
    <div class="ps-checkout ps-section--shopping">

        <div class="container">

            <div class="ps-section__header">

                <h1>Checkout</h1>

            </div>

            <div class="ps-section__content">

                <form class="ps-form--checkout needs-validation" novalidate method="post" onsubmit="return checkout()">

                <input type="hidden" id="idUser" value="<?php echo $_SESSION["user"]->id_user; ?>" >
                <input type="hidden" id="urlApi" value="<?php echo CurlController::api() ?>" >
                <input type="hidden" id="url" value="<?php echo $path ?>" >

                    <div class="row">

                        <div class="col-xl-7 col-lg-8 col-sm-12">

                            <div class="ps-form__billing-info">

                                <h3 class="ps-form__heading">Billing Details</h3>

                                <?php if($_SESSION["user"]->method_user == "direct"): ?>
                                <div class="form-group">

                                    <label>Nombre completo<sup>*</sup></label>

                                    <div class="form-group__content">

                                        <input class="form-control" type="text" value="<?php echo $_SESSION["user"]->displayname_user; ?>" readonly required>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El nombre es requerido</div>

                                    </div>

                                </div>

                                <div class="form-group">

                                    <label>Email Address<sup>*</sup></label>

                                    <div class="form-group__content">

                                        <input class="form-control" id="emailOrder" type="email" value="<?php echo $_SESSION["user"]->email_user; ?>" readonly required>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El email es requerido</div>

                                    </div>

                                </div>

                                <div class="form-group">

                                    <label>Country<sup>*</sup></label>

                                    <?php
                                        $data = file_get_contents("views/json/ciudades.json");
                                        $ciudades= json_decode($data, true);
                                    ?>

                                    <div class="form-group__content">

                                        <select 
                                            class="form-control select2" 
                                            style="width: 100%;"
                                            id="countryOrder"
                                            onchange="changeContry(event)"
                                            required>
                                            <?php if($_SESSION["user"]->country_user != null): ?>
                                                <option value="<?php echo $_SESSION["user"]->country_user ?>_<?php echo explode("_",$_SESSION["user"]->phone_user)[0]?>"><?php echo $_SESSION["user"]->country_user ?></option>
                                            <?php else: ?>
                                                <option value>Select country</option>
                                            <?php endif; ?>
                                            <?php foreach($ciudades as $key => $value):?>
                                                <option value="<?php echo $value["name"] ?>_<?php echo $value["dial_code"] ?>"><?php echo $value["name"] ?></option>
                                            <?php endforeach; ?>
                                        </select>
                                        <div class="valid-feedback"></div>
                                         <div class="invalid-feedback">El pais es requerido</div>

                                    </div>

                                </div>
                                
                                <div class="form-group">

                                    <label>City<sup>*</sup></label>

                                    <div class="form-group__content">

                                        <input 
                                        class="form-control" 
                                        id="cityOrder"
                                        type="text"
                                        pattern = "[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}"
                                        onchange="validatejs(event, 'text')" 
                                        value="<?php echo $_SESSION["user"]->city_user; ?>" 
                                        required>
                                        <div class="valid-feedback"></div>
                                         <div class="invalid-feedback">La ciudad es requerida</div>

                                    </div>

                                </div>

                                <div class="form-group">

                                    <label>Phone<sup>*</sup></label>

                                    <div class="form-group__content input-group">
                                        <?php if($_SESSION["user"]->phone_user != null): ?>

                                        <div class="input-group-append">
                                            <span class="input-group-text dialCode"><?php echo explode("_",$_SESSION["user"]->phone_user)[0]?></span>
                                        </div>

                                        <?php 
                                            $phone= explode("_", $_SESSION["user"]->phone_user)[1]; 
                                        ?>
                                        <?php else: ?>
                                            <div class="input-group-append">
                                            <span class="input-group-text dialCode">+--</span>
                                        </div>

                                        <?php $phone="" ?>
                                        <?php endif; ?>

                                        <input 
                                        class="form-control" 
                                        type="text" 
                                        id="phoneOrder"
                                        pattern = "[-\\(\\)\\0-9 ]{1,}"
                                        onchange="validatejs(event, 'phone')"
                                        value="<?php echo $phone; ?>" 
                                        required>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El telefono es requerido</div>

                                    </div>

                                </div>

                                <div class="form-group">

                                    <label>Address<sup>*</sup></label>

                                    <div class="form-group__content">

                                        <input 
                                        class="form-control" 
                                        type="text" 
                                        id="addresOrder"
                                        pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                                        onchange="validatejs(event, 'parrafo')"
                                        value="<?php echo $_SESSION["user"]->address_user; ?>" 
                                        required>
                                        <div class="valid-feedback"></div>
                                         <div class="invalid-feedback">La direccion es requerida</div>

                                    </div>

                                </div>

                                <!-- mandar el map -->
                                <div class="form-group">
                                    <label>Map<sup>*</sup><small> (Puedes mover el marcador para una mejor localizacion)</small></label>

                                    <div id="myMap" style="height: 400px"></div>
                                        <div id="mappp" class="mappp" style="display: none" <?php 
                                            if(isset( $_SESSION["user"]->map_user)){
                                                echo  'data-value =' . $_SESSION["user"]->map_user;
                                            }
                                            ?>>
                                        </div>
                                </div>

                                <?php endif; ?>
                                <?php if($_SESSION["user"]->method_user == "administer"): ?>
                                    <input type="hidden" id="methodUser" value="<?php echo $_SESSION["user"]->method_user; ?>" >
                                    <input type="hidden" id="countryOrder" value="<?php echo NULL; ?>" >
                                    <input type="hidden" id="cityOrder" value="<?php echo NULL; ?>" >
                                    <input type="hidden" id="mappp" value="<?php echo NULL; ?>" >
                                   
                                    <div class="form-group">

                                        <label>Nombre completo<sup>*</sup></label>

                                        <div class="form-group__content">

                                            <input class="form-control" id="nameUserSale" type="text" placeholder="Nombre..." required pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}" onchange="validatejs(event, 'text')">
                                            <div class="valid-feedback"></div>
                                            <div class="invalid-feedback">El nombre es requerido</div>

                                        </div>

                                    </div>

                                    <div class="form-group">

                                        <label>Email Address<sup>*</sup></label>

                                        <div class="form-group__content">

                                            <input class="form-control" id="emailOrder" type="email" placeholder="Email..." required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" onchange="validatejs(event,'email')">
                                            <div class="valid-feedback"></div>
                                            <div class="invalid-feedback">El email es requerido</div>

                                        </div>

                                    </div>

                                    <div class="form-group">

                                    <label>Phone<sup>*</sup></label>

                                    <div class="form-group__content input-group">
                                        <?php if($_SESSION["user"]->phone_user != null): ?>

                                        <div class="input-group-append">
                                            <span class="input-group-text dialCode"><?php echo explode("_",$_SESSION["user"]->phone_user)[0]?></span>
                                        </div>

                                        <?php 
                                            $phone= explode("_", $_SESSION["user"]->phone_user)[1]; 
                                        ?>
                                        <?php else: ?>
                                            <div class="input-group-append">
                                            <span class="input-group-text dialCode">+--</span>
                                        </div>

                                        <?php $phone="" ?>
                                        <?php endif; ?>

                                        <input 
                                        class="form-control" 
                                        type="text" 
                                        id="phoneOrder"
                                        pattern = "[-\\(\\)\\0-9 ]{1,}"
                                        onchange="validatejs(event, 'phone')" 
                                        required>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El telefono es requerido</div>

                                    </div>

                                </div>

                                <?php endif; ?>

                                <div class="form-group">

                                    <div class="ps-checkbox">

                                        <input class="form-control" type="checkbox" id="create-account">

                                        <label for="create-account">Save address?</label>

                                    </div>

                                </div>

                                <h3 class="mt-40"> Addition information</h3>

                                <div class="form-group">

                                    <label>Order Notes</label>

                                    <div class="form-group__content">

                                        <textarea 
                                         class="form-control" 
                                         id="infoOrder"
                                         required
                                         pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                                         onchange="validatejs(event, 'parrafo')"
                                         rows="7" 
                                         placeholder="Notes about your order, e.g. special notes for delivery.">
                                        </textarea>

                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Algunos caracteres no son validos</div>

                                    </div>

                                </div>


                            </div>

                        </div>

                        <!-- Notes order -->

                        <div class="col-xl-5 col-lg-4 col-sm-12">

                            <div class="ps-form__total">

                                <h3 class="ps-form__heading">Your Order</h3>

                                <div class="content">

                                    <div class="ps-block--checkout-total">
                                    <div class="ps-block__header d-flex justify-content-between">

                                        <p>Product</p>

                                        <p>Total</p>

                                    </div>

                                        <?php 
                                            if(isset($_COOKIE["listSC"]) && json_decode($_COOKIE["listSC"]) != []){
                                                $order=json_decode($_COOKIE["listSC"], true);
                                            }else{
                                                echo '<script>
                                                        window.location="' . $path .'";
                                                </script>';
                                                return;
                                            }
                                        ?>

                                        <div class="ps-block__content">

                                            <table class="table ps-block__products">

                                                <tbody>
                                                    <?php 
                                                    $repitClock = 0;
                                                    $idProdStar = array(); 
                                                    $idProdStarter = "";
                                                    ?>
                                                <?php foreach($order as $key => $value):?>
                                                    <?php
                                                        $select="id_product,name_product,url_product,name_store,id_store,url_store,price_product,offer_product,delivery_time_product,sales_product,stock_product,stars_product";
                                                        $url=CurlController::api()."relations?rel=products,categories,stores&type=product,category,store&linkTo=url_product&equalTo=".$value["product"]."&select=".$select;
                                                        $method="GET";
                                                        $field=array();
                                                        $header=array();
                                                        $pOrder= CurlController::request($url,$method,$field,$header)->result[0];
                                                        $estrella="";
                                                        $precioProdStar=0;
                                                        $count=0;
                                                        $repitClock = $repitClock + 1;
                                                        $timestart = array();
                                                        $numero = array();
                                                        $EsOrder = json_decode($pOrder->stars_product);
                                                        array_push($idProdStar, $pOrder->id_product);
                                                        $idProdStarter = json_encode($idProdStar);
                                                        foreach($EsOrder as $key2 => $value2){
                                                            if($value2->idUser == $_SESSION["user"]->id_user && $value2->pagado != "pagado"){
                                                                $precioProdStar = $precioProdStar + $value2->precio;
                                                                $estrella .=  $value2->numero . ", ";
                                                                array_push($timestart,$value2->time);
                                                                $count++;
                                                            }else{
                                                                array_push($numero, 0);
                                                            }
                                                        }
                                                    ?>
                                                    <?php
                                                        date_default_timezone_set('UTC');
                                                        date_default_timezone_set("America/Mexico_City");
                                                        $fechacount =0;
                                                        $fechadeHoy = date("d-m-Y H:i:s");
                                                        $fechHoy= strtotime($fechadeHoy);
                                                        if($timestart != null || $timestart != ""){
                                                            foreach($timestart as $key => $value){
                                                                $tstart = strtotime($value);
                                                                if($tstart > $fechHoy){
                                                                    // $timestart = $value;
                                                                    $hol = $value;
                                                                    $fechacount++;
                                                                }else{
                                                                    $timestart = $value;
                                                                }
                                                            }
                                                            $timestart = $hol;
                                                            
                                                            $conterfech = 1;
                                                            if($timestart != 0){
                                                                $timestart = explode(" ", $timestart);
                                                                if (!empty(array_filter($timestart)[1])) {
                                                                    $timestart = array($timestart[1]);
                                                                }
                                                                $timestarter = explode(":", $timestart[0]);            
                                                                if($timestarter[0] != null){
                                                                    if ($timestarter[1]<10) {
                                                                        $sumtime=60;
                                                                    }else{
                                                                        $sumtime=0;
                                                                    }
                                                                }else{
                                                                    $sumtime=0;
                                                                }
                                                            }
                                                        }
                                                    
                                                        $url=CurlController::api();
                                                        $idUser=$_SESSION['user']->id_user;
                                                        $idProduct = $pOrder->id_product;
                                                        $check="checkout";
                                                        $tokenput = $_SESSION["user"]->token_user;
                                                        $numero = array();
                                                        foreach(json_decode($pOrder->stars_product) as $key2 => $value2){   
                                                            array_push($numero, $value2->numero);
                                                        }
                                                        $numero = json_encode($numero);
                                                        $routeurls = TemplateController::path();
                                                        ?>   
                                                    <tr>

                                                        <td>
                                                            <input type="hidden" class="idStore" value="<?php echo $pOrder->id_store ?>">
                                                            <input type="hidden" class="urlStore" value="<?php echo $pOrder->url_store ?>">
                                                            <input type="hidden" class="idProduct" value="<?php echo $pOrder->id_product ?>">
                                                            <input type="hidden" class="salesProduct" value="<?php echo $pOrder->sales_product ?>">
                                                            <input type="hidden" class="stockProduct" value="<?php echo $pOrder->stock_product ?>">
                                                            <input type="hidden" class="deliverytime" value="<?php echo $pOrder->delivery_time_product ?>">
                                                            <input type="hidden" class="numerostar" value="<?php echo $numero ?>">
                                                            <input type="hidden" class="estrellaStar" value="<?php echo $estrella ?>">
                                                            

                                                            <a href="<?php echo $path.$pOrder->url_product ?>" class="name_producto"> <?php echo $pOrder->name_product; ?></a>
                                                            <div class="small text_secondary">
                                                                <div><a href="<?php echo $path.$pOrder->url_store ?>">Sold By:<strong> <?php echo "Seture"; ?></strong></a></div>
                                                                <div>Cantidad:<strong><span class="quantityOrder"> <?php echo $count; ?></span></strong></div>
                                                                <p class="m-0"><strong>Estrellas: </strong><span class="envibagcl"><?php echo $estrella; ?></span></p>
                                                                <!-- <p class="m-0"><strong>Envio:</strong> $ <span class="envioOrder"> -->
                                                                    <?php 
                                                                        // if($value["quantity"] >= 3 || $totalSC >= 3 || ($value["quantity"] >= 3 && $totalSC >= 3)){
                                                                        //     $ValorPrecioEnvio=0;
                                                                        //     echo $ValorPrecioEnvio;
                                                                        // }else{
                                                                        //     $ValorPrecioEnvio= ($result->shipping_product * 1.5 )/ $value["quantity"];
                                                                        //     echo $ValorPrecioEnvio;
                                                                        // }
                                                                    ?>
                                                                <!-- </span></p> -->
                                                               
                                                            </div>
                                                        </td>

                                                        <td class="text-right">$ <div><span class="priceProd">
                                                        <?php
                                                        echo $precioProdStar;
                                                        $totalPriceSC2 += $precioProdStar;
                                                    ?>
                                                            
                                                        <?php //if ($pOrder->offer_product != null) : ?>
                                                        <?php
                                                            // $preceProduct= TemplateController::offerPrice($pOrder->price_product, json_decode($pOrder->offer_product, true)[1], json_decode($pOrder->offer_product, true)[0]); 
                                                                    // echo $preceProduct; ?>
                                                            <?php // else : ?>
                                                                <?php 
                                                                    // $preceProduct= $pOrder->price_product;
                                                                    // echo $preceProduct; ?>
                                                            <?php //endif; ?>

                                                            <?php 
                                                                // if(strpos($preceProduct, ",") != false){
                                                                //     $preceProduct = explode(",", $preceProduct);

                                                                //     if (!empty(array_filter($preceProduct)[1])) {
                                                                //         $priceuno = ($preceProduct[0]*1000) + $preceProduct[1] ;
                                                                //     }else{
                                                                //         $priceuno =$preceProduct;
                                                                //     }
                                                                // }else{
                                                                //     $priceuno =$preceProduct;
                                                                // }
                                                            ?>
                                                            
                                                            <?php //$totalPriceSC2 += $ValorPrecioEnvio + ($priceuno * $value["quantity"]); ?>
                                                           </span></div>
                                                        </td>
                                                       

                                                    </tr>
                                                <?php endforeach; ?>

                                                </tbody>

                                            </table>

                                            <?php if($fechacount >0): ?>
                                                            <div class="d-flex justify-content-center">
                                                                <a class="ps-btn mb-5" title="Solo podemos apartar tu estrella 5 minutos, despues de eso tu estrella volvera a estar libre.">
                                                                    Tiempo: 
                                                                    <span>0</span><span id="minutes"></span> : <span id="seconds"></span>
                                                                </a>
                                                            </div>
                                                        
                                                            <?php
                                                                echo "
                                                                <script>
                                                                    const SPAN_MINUTES = document.querySelector('span#minutes');
                                                                    const SPAN_SECONDS = document.querySelector('span#seconds');
                                                                    const MILLISECONDS_OF_A_SECOND = 1000;
                                                                
                                                                    function updateCountdown() {
                                                                        var hora1 = ('$timestart[0]').split(':'),
                                                                        t1 = new Date(),
                                                                        t2 = new Date(),
                                                                        hor=0, min=0;
                                                                    
                                                                        t1.setHours(hora1[0], hora1[1], hora1[2]);
                                                                        hor = (t1.getMinutes() + $sumtime) - t2.getMinutes()-1;
                                                                        if(hor >= 60 && t2.getMinutes()<10 ){
                                                                            hor = hor-60;
                                                                        }

                                                                        min= 59-t2.getSeconds();
                                                                        
                                                                        if(hor <= 0 && min <= 5){
                                                                            SPAN_MINUTES.textContent = 0;
                                                                            SPAN_SECONDS.textContent = '00';
                                                                            let cont=0, countfinal = [], idUser = $idUser, idProduct=$idProdStarter, check='checkout', numero=$numero;
                                                                            idProduct.forEach((idprod, i) => {
                                                                                let url = '$url'+'products?linkTo=id_product&equalTo='+idprod+'&select=stars_product';
                                                                                
                                                                                let settings = {
                                                                                    url: url,
                                                                                    metod: 'GET',
                                                                                    timeaot: 0,
                                                                                };
                                                                            
                                                                                $.ajax(settings).done(function (response) {
                                                                                    if (response.status == 200) {
                                                                                        let stars = JSON.parse(response.result[0].stars_product);
                                                                                    
                                                                                        if (stars != null && stars.length > 0) {
                                                                                            stars.forEach((list,i) => {
                                                                                                if(numero[i] != '' || numero[i] != NULL){
                                                                                                    if(numero[i] == list.numero){
                                                                                                        if((list.check == 'checkin') && (list.pagado != 'pagado') && (list.idUser == idUser )){
                                                                                                            list.idUser= '';
                                                                                                            list.check= check;
                                                                                                            list.emailUser= '';
                                                                                                            list.time= '';
                                                                                                            cont++;
                                                                                                        }   
                                                                                                    }
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        
                                                                                        let settings = {
                                                                                            'url': '$url' + 'products?id='+idprod+'&nameId=id_product&token=$tokenput',
                                                                                            'method': 'PUT',
                                                                                            'timeaot': 0,
                                                                                            'headers': {
                                                                                            'Content-Type': 'application/x-www-form-urlencoded',
                                                                                            },
                                                                                            'data': {
                                                                                            'stars_product': JSON.stringify(stars),
                                                                                            },
                                                                                        };
                                                                            
                                                                                        $.ajax(settings).done(function (response) {
                                                                                            if (response.status == 200) {
                                                                                                countfinal.push(i);
                                                                                                if(countfinal.length == idProduct.length){
                                                                                                    switAlert('error', 'Se eliminaron tus estrellas!', null, null, 1500);
                                                                                                    window.location='$routeurls' ;
                                                                                                    return;
                                                                                                }
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }); 
                                                                            });
                                                                        }else{
                                                                            SPAN_MINUTES.textContent = hor;
                                                                            SPAN_SECONDS.textContent = min;
                                                                        }
                                                                    }

                                                                    updateCountdown();
                                                                    setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);
                                                                </script>
                                                                ";    
                                                            ?>
                                                        <?php endif ?>
                                                        <?php 
                                                        if($timestart != null || $timestart == ""){
                                                            if($fechacount <= 0){
                                                                $question = new ControllerUser();
                                                                $question -> endcheck($idUser, $idProduct, $numero); 
                                                            }
                                                        }
                                                        ?> 
                                            
                                            <h3 class="text-right totalOrder" total="<?php echo $totalPriceSC2; ?>">Total <span>$<?php echo $totalPriceSC2; ?></span></h3>

                                        </div>

                                    </div>

                                    <?php if($_SESSION["user"]->method_user == "direct"): ?>
                                    <hr class="py-3">

                                    <div class="form-group">

                                        <div class="ps-radio">

                                            <input class="form-control" type="radio" id="pay-paypal" name="payment-method" value="paypal" checked onchange="changemetodpay(event)">

                                            <label for="pay-paypal">Pay with paypal?  <span><img src="img/payment-method/paypal.jpg" class="w-50"></span></label>

                                        </div>

                                    </div>

                                    <div class="form-group">

                                        <div class="ps-radio">

                                            <input class="form-control" type="radio" id="pay-payu" name="payment-method" value="payu" onchange="changemetodpay(event)">

                                            <label for="pay-payu">Pay with payu? <span><img src="img/payment-method/payu.jpg" class="w-50"></span></label>

                                        </div>

                                    </div>

                                    <div class="form-group">

                                        <div class="ps-radio">

                                            <input class="form-control" type="radio" id="pay-mercadopago" name="payment-method" value="mercado-pago" onchange="changemetodpay(event)">

                                            <label for="pay-mercadopago">Pay with Mercado Pago? <span><img src="img/payment-method/mercado_pago.jpg" class="w-50"></span></label>

                                        </div>

                                    </div>

                                    <button type="submit" class="ps-btn ps-btn--fullwidth">Proceed to checkout</button>
                                    <?php endif; ?>
                                    <?php if($_SESSION["user"]->method_user == "administer"): ?>
                                        <div class="form-group">

                                            <div class="ps-radio">

                                                <input class="form-control" type="radio" id="pay-efectivo" name="payment-method" value="efectivo" checked onchange="changemetodpay(event)">

                                                <label for="pay-efectivo">Pay with efectivo? <span><img src="img/payment-method/mercado_pago.jpg" class="w-50"></span></label>

                                            </div>

                                        </div>
                                        <button type="submit" class="ps-btn ps-btn--fullwidth">Proceed to checkout</button>
                                    <?php endif; ?>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    </div>

<?php
    //si se manda por get de payu
    if(isset($_REQUEST['transactionState']) && $_REQUEST['transactionState']==4  && isset($_REQUEST['reference_pol'])){
        $idPaiment= $_REQUEST['reference_pol'];
        endCheckout( $_REQUEST['reference_pol']);
    }

     //si se manda por POST de payu
     if(isset($_REQUEST['state_pol']) && $_REQUEST['state_pol']==4  && isset($_REQUEST['reference_pol'])){
        $idPaiment= $_REQUEST['reference_pol'];
        endCheckout( $_REQUEST['reference_pol']);
    }

    // variables de mercado pago
    if(isset($_COOKIE["mp"])){
        $mp = json_decode($_COOKIE["mp"], true);

        //codigo de mp 
        MercadoPago\SDK::setAccessToken("TEST-7365761042195176-101000-170c40e462ef1afe80cb4cd3dd60a420-1207414157");
 
        $payment = new MercadoPago\Payment();
        $payment->transaction_amount = $mp['total'];
        $payment->token = $mp['token'];
        $payment->description = $mp['description'];
        $payment->installments = $mp['installments'];
        $payment->payment_method_id = $mp['payment_method_id'];
        $payment->issuer_id = $mp['issuer_id'];
        
        $payer = new MercadoPago\Payer();
        $payer->email = $mp['email'];
        $payer->identification = array(
            "number" => $mp['number']
        );
        $payment->payer = $payer;
        
        $payment->save();

        if($payment->status == "approved" && isset($payment->id) && $payment->id != ""){
            endCheckout($payment->id);
            echo '
            <script>
                document.cookie = "mp=; max-age=0";
                window.location="' . TemplateController::path() . 'acount&my-shopping";
            </script> 
            ';
        }
    }

    function endCheckout($idPaiment){
        $path = TemplateController::path();
        $totalProceso=0;
        if(isset($_COOKIE['idProduct']) && isset($_COOKIE['quantityOrder'])){
           $idProduct= json_decode($_COOKIE['idProduct'], true);
           $quantutyOrder= json_decode($_COOKIE['quantityOrder'], true);
           foreach($idProduct as $key => $value){
            $url = CurlController::api()."products?linkTo=id_product&equalTo=". $value."&select=stock_product,sales_product";
            $method = "GET";
            $field = array();
            $header = array();
            
            $products = CurlController::request($url, $method, $field, $header)->result[0];
            $stock= $products->stock_product - $quantutyOrder[$key];
            $sales= $products->sales_product + $quantutyOrder[$key];

            $url = CurlController::api()."products?id=".$value."&nameId=id_product&token=".$_SESSION['user']->token_user;
            $method = "PUT";
            $field = "sales_product=".$sales."&stock_product=".$stock;
            $header = array();
            $updateProduct= CurlController::request($url, $method, $field, $header);

            if($updateProduct->status == 200){
                $totalProceso++;
            }
           }
        }
        if(isset($_COOKIE['idOrder'])){
             $idOrder= json_decode($_COOKIE['idOrder'], true);
             foreach($idOrder as $key => $value){
                $url = CurlController::api()."orders?id=".$value."&nameId=id_order&token=".$_SESSION['user']->token_user;
                $method = "PUT";
                $field = "status_order=pending";
                $header = array();
                $updateOrders= CurlController::request($url, $method, $field, $header);
                if($updateOrders->status == 200){
                    $totalProceso++;
                }
             }
        }
        if(isset($_COOKIE['idSale'])){
            $idSale= json_decode($_COOKIE['idSale'], true);
            foreach($idSale as $key => $value){
               $url = CurlController::api()."sales?id=".$value."&nameId=id_sale&token=".$_SESSION['user']->token_user;
               $method = "PUT";
               $field = "status_sale=pending&id_payment_sale=".$idPaiment;
               $header = array();
               $updateSale= CurlController::request($url, $method, $field, $header);
               
               if($updateSale->status == 200){
                   $totalProceso++;
               }
            }
        }

        if($totalProceso == (count($idProduct)+ count($idOrder)+ count($idSale))){
            echo '
            <script>
                document.cookie = "listSC=; max-age=0";
                document.cookie = "quantityOrder=; max-age=0";
                document.cookie = "idProduct=; max-age=0";
                document.cookie = "idOrder=; max-age=0";
                document.cookie = "idSale=; max-age=0";
                switAlert("success", "El pago se realizo correctamente...", "'. $path .'acount&my-shopping", null, 1500); 
            </script> 
            ';
           
        }
    }
?>