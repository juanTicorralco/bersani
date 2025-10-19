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
        date_default_timezone_set('UTC');
        date_default_timezone_set("America/Mexico_City");
        $date = date("Y-m-d");
        $between1 =  date("Y-m-d",strtotime($date."- 10 days"));
        $between2 = date("Y-m-d",strtotime($date."+ 10 days"));
        $products= array();
        $select="id_order,pago_prev_order,hour_order,name_buyer,phone_buyer,id_buyer,stacion_order,day_order,status_order,price_order,follow_order,pdf_order,count_order,envio_order,comment_order";
        $method= "GET";
        $header= array();
        $filds= array();
        if(isset($_GET["entregados"])){
            $url= CurlController::api()."relations?rel=orders,products,categories,stocks&type=order,product,category,stock&linkTo=status_order&equalTo=Finalizado&orderBy=day_order&orderMode=DESC&select=".$select."&token=".$_SESSION["user"]->token_user;
            $response= CurlController::request($url, $method, $header, $filds);
            if($response->status == 200){
                array_push($products, $response->result);
            }
        }else if(isset($_GET["cancelados"])){
            // $url= CurlController::api()."relations?rel=orders,buyers&type=order,buyer&linkTo=status_order&equalTo=Cancelado&orderBy=day_order&orderMode=DESC&select=".$select."&token=".$_SESSION["user"]->token_user;
            $url= CurlController::api()."relations?rel=orders,buyers&type=order,buyer&linkTo=day_order&between1=".$between1."&between2=".$between2."&filterTo=status_order&inTo=Pendiente,Cambio,Finalizado,Confirmado&not=not&select=".$select."&token=".$_SESSION["user"]->token_user;

                                        // "relations?rel=orders,buyers&type=order,buyer&linkTo=day_order&between1=".$between1."&between2=".$between2."&filterTo=status_order&inTo=Cancelado,Finalizado&not=not&select=".$select."&token=".$_SESSION["user"]->token_user;
            $response= CurlController::request($url, $method, $header, $filds);
            if($response->status == 200){
                array_push($products, $response->result);
            }
        }else{
            // $url= CurlController::api()."relations?rel=orders,products,categories,stocks&type=order,product,category,stock&linkTo=day_order&between1=".$between1."&between2=".$between2."&filterTo=status_order&inTo=Cancelado,Finalizado&not=not&select=".$select."&token=".$_SESSION["user"]->token_user;
            $url= CurlController::api()."relations?rel=orders,buyers&type=order,buyer&linkTo=day_order&between1=".$between1."&between2=".$between2."&filterTo=status_order&inTo=Cancelado,Finalizado&not=not&select=".$select."&token=".$_SESSION["user"]->token_user;
            $response= CurlController::request($url, $method, $header, $filds);
            if($response->status == 200){
                array_push($products, $response->result);
            }
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
                    <li><a href="<?php echo $path; ?>acount&orders">Ordenes</a></li>
                    <li class="active"><a href="<?php echo $path; ?>acount&registers">Registros</a></li>
                    <li><a href="<?php echo $path; ?>acount&inventario">Inventario</a></li>
                    <li><a href="<?php echo $path; ?>acount&ventas">Ventas</a></li>

                    <!-- <li><a href="<?php //echo $path; ?>acount&wishAcount">My Wishlist</a></li>
                    <li><a href="<?php //echo $path; ?>acount&my-shopping">My Shopping</a></li> -->
                    <?php endif; ?>
                    <?php //if($_SESSION["user"]->method_user == "administer"): ?>
                    <!-- <li ><a href="<?php //echo $path; ?>acount&my-shopping">My Shopping</a></li> -->
                    <!-- <li><a href="<?php //echo $path; ?>acount&list-vendor">Lista vendidos</a></li> -->
                    <?php //endif; ?>
                    <?php //if($_SESSION["user"]->method_user == "globalAdminister"): ?>
                    <!-- <li><a href="<?php //echo $path; ?>acount&my-store">My Store</a></li> -->
                    <!-- <li><a href="<?php //echo $path; ?>acount&my-sales">My Sales</a></li> -->
                    <?php //endif; ?>
                </ul>
                <?php if(isset($_GET["Editar"]) && is_numeric($_GET["Editar"])):?>
                    <?php  include_once("modules/editRegister.php"); ?>
                <?php elseif(isset($_GET["Crear"]) && $_GET["Crear"] == "Crear"):?>
                    <?php  include_once("modules/newRegister.php"); ?>
                <?php else:?>
                    <!--=====================================
                    Wishlist
                    ======================================-->
                    <a title="Crear" href="http://bersani.com/acount&registers?Crear=Crear" type="button" class="btn btn-dark btn-lg m-3">Nuevo</a>
                    <a href="http://bersani.com/acount&registers?entregados" type="button" class="btn btn-success btn-lg m-3">Entregados</a>
                    <a href="http://bersani.com/acount&registers?cancelados" type="button" class="btn btn-danger btn-lg m-3">Cancelados</a>
                    <div class="table-responsive ">
                        <table class="table ps-table--whishlist dt-responsive dt-client pr-5">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ver</th>
                                    <th>Nombre cliente</th>
                                    <th>Estacion</th>
                                    <th>Hora&Fecha</th>
                                    <th>Status</th>
                                    <th>Acciones</th>
                                    <th>Articulos</th>
                                    <th>Pago previo</th>
                                    <th>Envio</th>
                                    <th>Total</th>
                                    <th>Comentarios</th>
                                    <th>Messenger</th>
                                    <th>Telefono</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Product -->
                                <?php
                                $count = 1;
                                if(count($products) >0):
                                foreach ($products[0] as $key => $value):?>
                                    <tr >
                                        <?php
                                            if($value->status_order == "Pendiente"){
                                                $colorStatus = "warning";
                                            }else if($value->status_order == "Confirmado"){
                                                $colorStatus = "success";
                                            }else if($value->status_order == "Cambio"){
                                                $colorStatus = "info";
                                            }else if($value->status_order == "Cancelado"){
                                                $colorStatus = "danger";
                                            }else if($value->status_order == "Finalizado"){
                                                $colorStatus = "success";
                                            }
                                        ?>
                                        <!-- <td class="bg-<?php //echo $colorStock; ?>">
                                            <div class="ps-product--cart justify-content-center">
                                                <div class="ps-product__thumbnail">
                                                    <a href="<?php //echo $path . $value->url_product; ?>">
                                                        <img src="img/products/<?php //echo $value->url_category; ?>/stock/<?php //echo $value->image_stock; ?>" alt="<?php //echo $value->name_product; ?>">
                                                    </a>
                                                </div>
                                            </div>
                                        </td> -->
                                        <!-- <td><div class="ps-product__content"><a href="<?php //echo $path . $value->url_product; ?>"><?php //echo $value->name_product; ?></a></div></td> -->
                                        <?php 
                                        $date = new DateTime($value->day_order);
                                        $meses = array(
                                            'January' => 'Ene', 'February' => 'Feb', 'March' => 'Mar',
                                            'April' => 'Abr', 'May' => 'May', 'June' => 'Jun',
                                            'July' => 'Jul', 'August' => 'Ago', 'September' => 'Sep',
                                            'October' => 'Oct', 'November' => 'Nov', 'December' => 'Dic'
                                        );
                                        $fecha = $date->format('d') . '/' . $meses[$date->format('F')];
                                        $hour_order= date("g:i a",strtotime($value->hour_order));
                                        ?>
                                        <td><div class="ps-product__content"><?php echo $count++; ?></div></td>
                                        <td><a data-toggle="modal" onclick="modalOrderOpen(<?php echo $value->id_order; ?>,'<?php echo $colorStatus; ?>','<?php echo $value->name_buyer; ?>','<?php echo $value->status_order; ?>','<?php echo CurlController::api()?>','<?php echo $value->phone_buyer; ?>','<?php echo $value->stacion_order; ?>','<?php echo $hour_order; ?>','<?php echo $value->follow_order; ?>','<?php echo $fecha; ?>','<?php echo $value->count_order; ?>', '<?php echo $value->pago_prev_order; ?>', '<?php echo $value->envio_order; ?>','<?php echo $value->price_order + $value->envio_order - $value->pago_prev_order; ?>', '<?php echo $value->comment_order; ?>')" class='btn btn-info rounded-circle mr-2'><i class='fa fa-eye text-white'></i></a></td>
                                        <td><div class="ps-product__content"><?php echo $value->name_buyer; ?></div></td>
                                        <td><div class="ps-product__content"><?php echo $value->stacion_order; ?></div></td>
                                        <td><div class="ps-product__content"><?php echo $hour_order . " " . $fecha; ?></div></td>
                                        <?php 
                                        // $spesificationsProduct = json_decode($value->spesifications_order);
                                        // if($value->color_hexa_stock == "000000"){
                                        //     $textColor= "#FFF";
                                        // }else{
                                        //     $textColor= "#000";
                                        // }
                                        ?>
                                        <!-- <td><div class="ps-product__content"><?php //echo $value->day_order; ?></div></td> -->
                                        <!-- <td style="background-color: #<?php //echo $value->color_hexa_stock; ?>;color: <?php //echo $textColor; ?>;"><div class="ps-product__content"><?php //echo $value->color_stock; ?></div></td> -->
                                        <!-- <td><div class="ps-product__content"><?php //echo $value->size_stock; ?></div></td> -->
                                        <!-- <td><div class="ps-product__content"><?php //echo $spesificationsProduct[0]->peso[0];?></div></td> -->
                                        <!-- <td><div class="ps-product__content"><?php //echo $spesificationsProduct[0]->altura[0];?></div></td> -->
                                        <td class="bg-<?php echo $colorStatus; ?>"><div class="ps-product__content"><?php echo $value->status_order; ?></div></td>
                                        <td>
                                        <input type="hidden" id="url" value="<?php echo $path ?>" >
                                            <?php //if($value->status_order == "Pendiente" && $value->stock_out_order ==1): 
                                               if($value->status_order == "Pendiente" || $value->status_order == "Cambio"):  ?>
                                            <button title="Confirmar" type="button" class="btn btn-success rounded-circle mr-2" onclick="statusConfirmRegister(<?php //echo $value->stock_out_order ?>,<?php //echo $value->number_stock;?>,<?php //echo $value->id_stock_order;?>,<?php //echo $value->id_order;?>,'Confirmado', '<?php echo TemplateController::path(); ?>','registers')"><i class='fa  fa-check-square'></i></button>
                                            <?php endif; ?>
                                            <?php //if($value->stock_out_order == 0): ?>
                                            <!-- <button title="En Stock" type="button" class="btn btn-success rounded-circle mr-2" onclick="statusConfirmRegister(<?php //echo $value->stock_out_order ?>,<?php //echo $value->number_stock;?>,<?php //echo $value->id_stock_order;?>,<?php //echo $value->id_order;?>,'inStock', '<?php //echo TemplateController::path(); ?>','registers')"><i class='fa  fa-plus'></i></button> -->
                                            <?php //endif; ?>
                                            <a title="Editar" href="http://bersani.com/acount&registers?Editar=<?php echo $value->id_order; ?>" class="btn btn-info rounded-circle mr-2"><i class='fa fa-pencil-alt'></i></a>
                                            <button title="Cancelar" type="button" class="btn btn-danger rounded-circle mr-2" onclick="statusConfirmRegister(<?php //echo $value->stock_out_order ?>,<?php //echo $value->number_stock;?>,<?php //echo $value->id_stock_order;?>,<?php //echo $value->id_order;?>,'Cancelado', '<?php echo TemplateController::path(); ?>','registers')"><i class='fa fa-trash'></i></button>
                                        </td>
                                        <td><div class="ps-product__content"><?php echo $value->count_order; ?></div></td>
                                        <td><div class="ps-product__content">$ <?php  $pagoPrevorder = ($value->status_order != "Cancelado")? $value->pago_prev_order : 0; echo $pagoPrevorder; ?></div></td>
                                        <td><div class="ps-product__content">$ <?php  $envioOrder = ($value->status_order != "Cancelado")? $value->envio_order : 0; echo $envioOrder; ?></div></td>
                                        <td><div class="ps-product__content">$ <?php echo $value->price_order-$pagoPrevorder+$envioOrder; ?></div></td>
                                        <td><div class="ps-product__content"><?php echo $value->comment_order; ?></div></td>
                                        <td><a href="https://www.facebook.com/messages/t/<?php echo $value->follow_order; ?>" target='_blank' class='btn btn-info rounded-circle mr-2'><i class='fa fa-eye'></i></a></td>
                                        <td><div class="ps-product__content"><?php echo $value->phone_buyer; ?></div></td>
                                    </tr>
                                <?php endforeach;  endif;  ?>
                            </tbody>
                        </table>
                    </div>
                <?php endif;?>
            </div>
        </div>
    </div>
</div>

<!--=====================================
Modal para ver cada orden
======================================-->
<div class="modal" id="viewRegister">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        </div>
    </div>
</div>

<div class="modal" id="editSale">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h3 class="modal-title">Editar Venta</h3>
                <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <form class="ps-form--account ps-tab-root needs-validation" novalidate method="post">
                </form>
            </div>
        </div>
    </div>
</div>