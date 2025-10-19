<?php
if (!isset($_SESSION['user'])) {
    echo '<script>
            window.location="' . $path . 'acount&login";
    </script>';
    return;
}else{
    $time= time();
    if($_SESSION["user"]->token_exp_user < $time){
        echo '<script>
        switAlert("error", "Para proteger tus datos, si no hay actividad en tu cuenta, se cierra automaticamente. Vuelve a logearte!", "' . $path . 'acount&logout","");
            
    </script>';
    return;
    }else{
        // traer la lista de deseos
        $select="id_order,url_product,pago_prev_order,url_category,image_product,hour_order,name_product,name_buyer_order,phone_order,stacion_order,day_order,spesifications_order,status_order,price_order,follow_order,name_product,color_stock,size_stock,color_hexa_stock,id_stock_order,number_stock,image_stock,stock_out_order";
        $products= array();
        date_default_timezone_set('UTC');
        date_default_timezone_set("America/Mexico_City");
        $date = date("Y-m-d");
        $url = CurlController::api()."relations?rel=orders,products,categories,stocks&type=order,product,category,stock&linkTo=day_order,status_order&equalTo=".$date.",confirmado&orderBy=hour_order&orderMode=ASC&select=".$select."&token=".$_SESSION["user"]->token_user;
        $method= "GET";
        $header= array();
        $filds= array();
        $response= CurlController::request($url, $method, $header, $filds);
        if($response->status == 200){
            array_push($products, $response->result);
        }
    }
}
?>
<!--=====================================
My Account Content
======================================-->
<div class="ps-vendor-dashboard pro">
    <div class="container">
        <div class="ps-section__header mt-0">
            <!--=====================================
            Profile
            ======================================-->
            <?php include "views/pages/acount/profile/profile.php"; ?>
            <!--=====================================
            Nav Account
            ======================================-->
            <div class="ps-section__content">
                <ul class="ps-section__links">
                    <?php if($_SESSION["user"]->method_user == "globalAdminister"): ?>
                    <li class="active"><a href="<?php echo $path; ?>acount&orders">Ordenes</a></li>
                    <li><a href="<?php echo $path; ?>acount&registers">Registros</a></li>
                    <li><a href="<?php echo $path; ?>acount&inventario">Inventario</a></li>
                    <li><a href="<?php echo $path; ?>acount&ventas">Ventas</a></li>
                    <!-- <li><a href="<?php //echo $path; ?>acount&wishAcount">My Wishlist</a></li> -->
                    <!-- <li><a href="<?php //echo $path; ?>acount&my-shopping">My Shopping</a></li> -->
                    <?php endif; ?>
                    <?php //if($_SESSION["user"]->method_user == "administer"): ?>
                    <!-- <li ><a href="<?php echo $path; ?>acount&my-shopping">My Shopping</a></li> -->
                    <!-- <li><a href="<?php echo $path; ?>acount&list-vendor">Lista vendidos</a></li> -->
                    <?php //endif; ?>
                    <?php //if($_SESSION["user"]->method_user == "globalAdminister"): ?>
                    <!-- <li><a href="<?php echo $path; ?>acount&my-store">My Store</a></li> -->
                    <!-- <li><a href="<?php echo $path; ?>acount&my-sales">My Sales</a></li> -->
                    <?php //endif; ?>
                </ul>
                <!--=====================================
                Wishlist
                ======================================-->
                <div class="table-responsive ">
                    <table class="table ps-table--whishlist dt-responsive dt-client pr-5">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre producto</th>
                                <th>Nombre cliente</th>
                                <th>Whats</th>
                                <th>Estacion</th>
                                <th>Hora</th>
                                <th>Color</th>
                                <th>Talla</th>
                                <th>Peso</th>
                                <th>Altura</th>
                                <th>Status</th>
                                <th>Precio</th>
                                <th>Comentario</th>
                                <th>Gastos</th>
                                <th>Pago previo</th>
                                <th>Messenger</th>
                                <th>Telefono</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Product -->
                            <?php
                            if(count($products) >0):
                            foreach ($products[0] as $key => $value):?>
                                <tr >
                                    <td>
                                        <div class="ps-product--cart justify-content-center">
                                            <div class="ps-product__thumbnail">
                                                <a href="<?php echo $path . $value->url_product; ?>">
                                                    <img src="img/products/<?php echo $value->url_category; ?>/stock/<?php echo $value->image_stock; ?>" alt="<?php echo $value->name_product; ?>">
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td><div class="ps-product__content"><a href="<?php echo $path . $value->url_product; ?>"><?php echo $value->name_product; ?></a></div></td>
                                    <td><div class="ps-product__content"><?php echo $value->name_buyer_order; ?></div></td>
                                    <?php $hour_order= date("g:i a",strtotime($value->hour_order)); ?>
                                    <td><a href="https://wa.me/<?php echo $value->phone_order; ?>?text=Buen%20dia%20<?php echo strtr($value->name_buyer_order, " ", "_"); ?>%20mi%20nombre%20es%20Karmen%20de%20Altitex%20ya%20estoy%20cerca%20para%20entregar%20tu%20paquete%20en%20estacion%20<?php echo strtr($value->stacion_order, " ", "_"); ?>%20a%20las%20<?php echo strtr($hour_order, " ", "_"); ?>" target="_blank" class="btn btn-success rounded-circle mr-2"><i class='fa fa-eye'></i></a></td>
                                    <td><div class="ps-product__content"><?php echo $value->stacion_order; ?></div></td>
                                    <td><div class="ps-product__content"><?php echo $hour_order; ?></div></td>
                                    <?php $spesificationsProduct = json_decode($value->spesifications_order);
                                    if($value->color_hexa_stock == "000000"){
                                        $textColor= "#FFF";
                                    }else{
                                        $textColor= "#000";
                                    }?>
                                    <td style="background-color: #<?php echo $value->color_hexa_stock; ?>;color: <?php echo $textColor; ?>;"><div class="ps-product__content"><?php echo $value->color_stock; ?></div></td>
                                    <td><div class="ps-product__content"><?php echo $value->size_stock; ?></div></td>
                                    <td><div class="ps-product__content"><?php echo $spesificationsProduct[0]->peso[0];?></div></td>
                                    <td><div class="ps-product__content"><?php echo $spesificationsProduct[0]->altura[0];?></div></td>
                                    <td>
                                    <input type="hidden" id="url" value="<?php echo $path ?>" >
                                        <button type="button" onclick="statusConfirmRegister('',<?php echo $value->number_stock;?>,<?php echo $value->id_stock_order;?>,<?php echo $value->id_order;?>,'Finalizado', '<?php echo TemplateController::path(); ?>','orders')" class="btn btn-success">Finalizar</button>
                                        <button type="button" onclick="statusConfirmRegister(<?php echo $value->stock_out_order;?>,<?php echo $value->number_stock;?>,<?php echo $value->id_stock_order;?>,<?php echo $value->id_order;?>,'Cancelado', '<?php echo TemplateController::path(); ?>','orders')" class="btn btn-danger">Cancelar</button></td>
                                    <td><div class="ps-product__content"><?php echo '$'. $value->price_order; ?></div></td>
                                    <td>
                                        <div class="comentOrderVal"></div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Comentario"
                                        id="comentOrder"
                                        maxlength="200"
                                        required
                                        pattern = "[.\\,\\0-9]{1,}"
                                        onchange="validatejs(event, 'parrafo'), cambioOrder(event, 'comentOrder')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                        
                                        
                                    </td>
                                    <td>
                                        <div class="gastosOrderVal"></div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="$ Gastos"
                                        id="gastosOrder"
                                        maxlength="50"
                                        required
                                        pattern = "[.\\,\\0-9]{1,}"
                                        onchange="validatejs(event, 'numbers'), cambioOrder(event, 'gastosOrder')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </td>
                                    <?php //$priceOrder = json_decode($value->price_order);?>
                                    
                                    <td><div class="ps-product__content"><?php echo $value->pago_prev_order; ?></div></td>
                                    <td><a href="https://www.facebook.com/messages/t/<?php echo $value->follow_order; ?>" target='_blank' class='btn btn-info rounded-circle mr-2'><i class='fa fa-eye'></i></a></td>
                                    <td><div class="ps-product__content"><?php echo $value->phone_order; ?></div><a href="tel:<?php echo $value->phone_order; ?>" target="_blank" class="btn btn-success rounded-circle mr-2"><i class='fa fa-phone'></i></a></td>
                                    <td><div class="ps-product__content"><?php echo $value->day_order; ?></div></td>
                                </tr>
                            <?php endforeach; endif;  ?>  
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div