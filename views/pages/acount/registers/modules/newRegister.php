<?php
    // if(isset($_GET["Editar"])){
    //     $select = "id_order,code_stock_order,envio_order,url_product,pago_prev_order,url_category,image_product,hour_order,name_product,id_category,id_product,image_stock,name_buyer_order,phone_order,stacion_order,day_order,spesifications_order,status_order,price_order,follow_order,name_product,color_stock,size_stock,color_hexa_stock,stock_out_order,number_stock,id_stock_order";
    //     $url = CurlController::api()."relations?rel=orders,products,categories,stocks&type=order,product,category,stock&linkTo=id_order&equalTo=".$_GET["Editar"]."&select=".$select."&token=".$_SESSION["user"]->token_user;
    //     $method = "GET";
    //     $fields = array();
    //     $headers = array();
    //     $editProduct = CurlController::request($url,$method,$fields,$headers)->result[0];
    // }
    $tiketInfo = 0;
    $tiketContacto = 0;
    if(isset($_COOKIE["productos"])){
        $tiketInfo = json_decode($_COOKIE["productos"], true);
    }
    if(isset($_COOKIE["contacto"])){
        $tiketContacto = json_decode($_COOKIE["contacto"], true);
    }
?>
<div class="ps-checkout ps-section--shopping">
    <div class="container">
        <div class="ps-section__header">
            <h1>Crear Orden</h1>
        </div>
        <div class="ps-section__content">            
            <form class="ps-form--checkout ps-tab-root needs-validation" novalidate method="post">
                <div class="row">
                    <div class="col-xl-5 col-lg-8 col-sm-12">
                        <div class="modal-header">
                            <h5 class="modal-title text-center">Crear ORDEN</h5>
                            <div>
                                <button type="button" class="btn btn-danger" onclick="borrarTiket('productos', 'contacto',null)">Borrar</button>
                                <button type="button" class="btn btn-danger" onclick="borrarTiket('productos', 'contacto', '<?php echo TemplateController::path() ?>acount&registers')">cancel</button>
                            </div>
                        </div>
                        <input type="hidden" value="<?php echo CurlController::api();?>" id="urlApi">
                        <input type="hidden" value="<?php 
                            if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
                                $url = "https://"; 
                            }else{
                                $url = "http://"; 
                            }
                            echo $url . $_SERVER['HTTP_HOST']."/";
                        ?>" id="urlLocal">
                        <!-- Product -->
                        <div class="modal-body text-left p-5">
                            <div class="form-group">
                                <div class="row mb-5">
                                    <!-- Categria -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Categoria:
                                            </span>
                                        </div>
                                        <?php
                                            $url = CurlController::api()."categories?type=category&select=id_category,name_category";
                                            $method= "GET";
                                            $header= array();
                                            $fields= array();
                                            $categories= CurlController::request($url, $method, $header, $fields)->result;
                                        ?>
                                        <select 
                                        class="form-control"
                                        name="categoryProduct"
                                        id="categoryProductAdd"
                                        onchange="changecategory(event)"
                                        required>
                                        <option value="">Categoria</option>
                                        <?php foreach($categories as $key => $value): ?>
                                        <option value="<?php echo $value->id_category."_".$value->name_category; ?>"><?php echo $value->name_category; ?></option>
                                            <?php endforeach; ?>
                                        </select>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El nombre es requerido</div>
                                    </div>
                                    <!-- SubCategoria -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 subcategoryProduct" style="display: none ;">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                SubCategoria:
                                            </span>
                                        </div>
                                        <select 
                                            class="form-control"
                                            name="subcategoryProduct"
                                            id="subCategoryProductAdd"
                                            onchange="changeToProduct(event)"
                                            required>
                                            <option value="">Subcategoria</option>
                                        </select>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El nombre es requerido</div>
                                    </div>
                                </div>
                                <label>Producto<sup class="text-danger productPrincipal">*</sup></label>
                                <div class="form-group__content productPrincipal">
                                    <select 
                                    class="form-control"
                                    name="SelectProduct"
                                    id="productAdd"
                                    onchange="changeProduct(event)"
                                    required>
                                        <option value="">Producto</option>
                                    </select>
                                    <div class="valid-feedback"></div>
                                    <div class="invalid-feedback">El nombre es requerido</div>
                                </div>
                                <figure id="imageProduct" class="imageProduct">
                                </figure>
                                <div id="stokeorderProduct" class="stokeorderProduct"></div>
                                <input type="hidden" name="stockApro" id="stockApro" class="stockApro">
                                <input type="hidden" name="stockCode" id="stockCode" class="stockCode">
                                <input type="hidden" class="idTalla" >
                                <input type="hidden" class="idColor" >
                            </div>
                            <div class="form-group">
                                <label>ESPESIFICACIONES ORDEN<sup class="text-danger">*</sup></label>
                                <div class="row mb-5">
                                    <!-- Color -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 ColorProduct" style="display: none ;">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Color:
                                            </span>
                                        </div>
                                        <select 
                                        class="form-control"
                                        name="ColorProduct"
                                        id="colorProductAdd"
                                        onchange="changeColor(event)"
                                        required>
                                        <option value="">Select Color</option>
                                        </select>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El nombre es requerido</div>
                                    </div>
                                    <!-- talla -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 TallaProduct" style="display: none ;">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Talla:
                                            </span>
                                        </div>
                                        <select 
                                        class="form-control"
                                        name="TallaProduct"
                                        id="tallaProductAdd"
                                        onclick="changeTalla(event)"
                                        required>
                                        <option value="">Select Talla</option>
                                        </select>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El nombre es requerido</div>
                                    </div>
                                    <!-- Precio -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Precio:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control precioProduct"
                                        placeholder="Precio"
                                        name="precioProduct"
                                        id="precioProductAdd"
                                        required
                                        pattern = '[.\\,\\0-9]{1,}'
                                        onchange="validatejs(event, 'numbers')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Catidad -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Cantidad:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Cantidad"
                                        name="CantiProduct"
                                        maxlength="50"
                                        id="cantidadProductAdd"
                                        value="1"
                                        required
                                        pattern = '[.\\,\\0-9]{1,}'
                                        onchange="validatejs(event, 'numbers')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Comentario -->
                                    <div class="col-12 col-lg-12 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Comentarios:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Comentarios"
                                        name="comentProduct"
                                        id="comentProductAdd"
                                        maxlength="50"
                                        required
                                        pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                                        onchange="validatejs(event, 'parrafo')"
                                        >
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Peso -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Peso:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Peso"
                                        name="PesoProduct"
                                        id="pesoProductAdd"
                                        maxlength="50"
                                        required
                                        pattern = "[.\\,\\0-9]{1,}"
                                        onchange="validatejs(event, 'numbers')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Altura -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Altura:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Altura"
                                        name="AlturaProduct"
                                        id="alturaProductAdd"
                                        maxlength="50"
                                        required
                                        pattern = "[.\\,\\0-9]{1,}"
                                        onchange="validatejs(event, 'numbers')"
                                        onblur="agregarProductTicket('pedido')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                   
                                </div>
                                <!-- <button type="button" class="ps-btn ps-btn--fullwidth" onclick="agregarProductTicket('pedido')">Agregar</button> -->
                            </div>
                            <div class="form-group">
                                <label>ESPESIFICACIONES ENTREGA<sup class="text-danger">*</sup></label>                
                                <div class="row mb-5">
                                     <!-- Pago Previo -->
                                     <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Pago Prev:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Pago previo"
                                        name="pagoPrevProduct"
                                        maxlength="50"
                                        id="pagoPrevProductAdd"
                                        value="0"
                                        required
                                        pattern = '[.\\,\\0-9]{1,}'
                                        onchange="validatejs(event, 'numbers')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Dia -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Dia:
                                            </span>
                                        </div>
                                        <input 
                                        type="date"
                                        class="form-control"
                                        placeholder="Dia"
                                        name="diaProduct"
                                        id="diaProductAdd"
                                        maxlength="50"
                                        required
                                        pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                                        onchange="validatejs(event, 'parrafo')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Hora -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Hora:
                                            </span>
                                        </div>
                                        <input 
                                        type="time"
                                        class="form-control"
                                        placeholder="Hora"
                                        name="horaProduct"
                                        id="horaProductAdd"
                                        maxlength="50"
                                        required
                                        pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                                        onchange="validatejs(event, 'parrafo')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Transporte -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Linea:
                                            </span>
                                        </div>
                                        <?php
                                            $data = file_get_contents("views/json/Transportes.json");
                                            $transportes= json_decode($data);
                                        ?>
                                        <select 
                                        class="form-control"
                                        name="TransporteProduct"
                                        id="transporteProductAdd"
                                        onchange="changeTransporte(event, 'Linea')"
                                        required>
                                            <option value="">Seleccionar Transporte</option>
                                            <?php foreach($transportes as $key2 => $value3):?>
                                                <?php foreach($value3->tipoTrasporte as $key3 => $value4):?>
                                                    <option value="<?php echo $value4; ?>"><?php echo $value4; ?></option>
                                                    <?php endforeach; ?>
                                            <?php endforeach; ?>
                                        </select>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El nombre es requerido</div>
                                    </div>
                                    <!-- Linea -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 LineaProduct" style="display: none ;">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Linea:
                                            </span>
                                        </div>
                                        <select 
                                            class="form-control"
                                            name="LineaProduct"
                                            id="lineaProductAdd"
                                            onchange="changeTransporte(event, 'Estacion')"
                                            required>
                                            <option value="">Select Linea</option>
                                        </select>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El nombre es requerido</div>
                                    </div>
                                    <!-- Estacion -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 EstacionProduct" style="display: none ;">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Estacion:
                                            </span>
                                        </div>
                                        <select 
                                            class="form-control"
                                            name="EstacionProduct"
                                            id="estacionProductAdd"
                                            required>
                                            <option value="">Select Color</option>
                                        </select>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El nombre es requerido</div>
                                    </div>
                                    <!-- Telefono -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Telefono:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Telefono cliente"
                                        name="telefonoProduct"
                                        maxlength="50"
                                        id="telefonoProductAdd"
                                        required
                                        pattern = '[-\\(\\)\\0-9 ]{1,}'
                                        onchange="validatejs(event, 'phone')"
                                        onblur="buscarTelefono('<?php echo CurlController::api(); ?>')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Nombre -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                nombre:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Nombre cliente"
                                        name="nombreProduct"
                                        id="nameProductAdd"
                                        maxlength="50"
                                        required
                                        pattern = '[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}'
                                        onchange="validatejs(event, 'text')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                    <!-- Messenguer -->
                                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                Messenger:
                                            </span>
                                        </div>
                                        <input 
                                        type="text"
                                        class="form-control"
                                        placeholder="Id messenger"
                                        id="messengerProductAdd"
                                        name="messengerProduct"
                                        maxlength="50"
                                        required
                                        pattern = '[.\\,\\0-9]{1,}'
                                        onchange="validatejs(event, 'numbers')">
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Acompleta el campo</div>
                                    </div>
                                </div>
                                <button type="button" class="ps-btn ps-btn--fullwidth" onclick="agregarProductTicket('contacto')">Agregar</button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group submit">
                                <?php
                                $newPass = new ControllerUser();
                                $newPass->AgregarNewRegister();
                                ?>
                                <button type="submit" class="ps-btn ps-btn--fullwidth">Registrar</button>
                            </div>
                        </div> 
                    </div>
                    <div class="col-xl-7 col-lg-4 col-sm-12 p-5">
                        <div class="ps-form__total">
                        <img src='img/users/default/fondo3.jpg' class="rounded mx-auto d-block" alt="fondo.png">
                            <h3 class="ps-form__heading">Ticket de Compra</h3>
                            <div class="content">
                                <div class="ps-block--checkout-total">
                                <div class="ps-block__header d-flex justify-content-between">
                                    <p>Product</p>
                                    <p>Total</p>
                                </div>
                                    <div class="ps-block__content">
                                        <table class="table ps-block__products">
                                            <tbody class="product_name_order">
                                                <input type="hidden" id="nombrePDF" value="">
                                                <?php if(is_array($tiketInfo)): ?>
                                                    <?php foreach($tiketInfo as $key => $producto):?>
                                                        <tr class="cla_<?php echo $key; ?>" >
                                                            <td>
                                                            <a href="<?php //echo $path.$pOrder->url_product ?>" class="name_producto"> <?php echo $producto["nombre"]; ?> (Talla: <span><?php echo $producto["talla"]; ?> </span>, Color:<span><?php echo $producto["color"]; ?> </span>)</a>  <button title="Eliminar" type="button" class="btn btn-danger rounded-circle mr-2" onclick="eliminarDeTicket('<?php echo $key; ?>')"><i class='fa fa-trash'></i></button>
                                                            <div class="small text_secondary">
                                                            <div>Cantidad:<strong><span class="quantityOrder"> <?php echo $producto["cantidad"]; ?>  </span></strong></div>
                                                            </td>
                                                            <td class="text-right"><div><span class="priceProd">$<?php echo $producto["precio"]; ?> </span></div></td> 
                                                        </tr> 
                                                    <?php endforeach;?>  
                                                <?php endif;?>  
                                                <tr>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <?php 
                                        $totalTicket = 0;
                                        $envio = 0;
                                        $total = 0;
                                        if(is_array($tiketInfo) && is_array($tiketContacto)){
                                            if($tiketContacto["transporte"] == "Mexibus" || $tiketContacto["transporte"] == "Suburbano"){
                                                $envio = 100;
                                            }else if($tiketContacto["linea"] == "Línea B" || $tiketContacto["linea"] == "Línea 5" || $tiketContacto["linea"] == "Línea 2"){
                                                $envio = 0;
                                            }else{
                                                $envio = 50;
                                            }
                                            foreach ($tiketInfo as $item) {
                                                $total += $item['precio'] * $item['cantidad'];
                                            }
                                            $totalTicket = -$tiketContacto["pagoprev"] + $envio + $total;
                                        } else if(is_array($tiketContacto)){
                                            if($tiketContacto["transporte"] == "Mexibus" || $tiketContacto["transporte"] == "Suburbano"){
                                                $envio = 100;
                                            }else if($tiketContacto["linea"] == "Línea B" || $tiketContacto["linea"] == "Línea 5" || $tiketContacto["linea"] == "Línea 2"){
                                                $envio = 0;
                                            }else{
                                                $envio = 50;
                                            }
                                            $totalTicket = -$tiketContacto["pagoprev"] + $envio;
                                        }else if(is_array($tiketInfo)){
                                            foreach ($tiketInfo as $item) {
                                                $total += $item['precio'] * $item['cantidad'];
                                            }
                                            $totalTicket = $total;
                                        }
                                        ?>
                                        <h5 class="text-right totalOrder" total="<?php //echo $totalPriceSC2; ?>">Envio $ <span class="envioSubmit"> <?php echo $envio; ?></span></h5>
                                        <h5 class="text-right totalOrder" total="<?php //echo $totalPriceSC2; ?>">Pago Previo $ -<span class="PagoPrev_ticket"><?php $PagoPrev_ticket = (is_array($tiketContacto)) ? $tiketContacto["pagoprev"] : 0; echo $PagoPrev_ticket; ?></span></h5>
                                        <h3 class="text-right totalOrder" total="<?php //echo $totalPriceSC2; ?>">Total $<span class="totalOrder_ticket"> <?php echo $totalTicket; ?></span></h3>
                                        <div>Contacto:<strong><span class="telefonoTicket"> <?php $contacto = (is_array($tiketContacto)) ? $tiketContacto["telefono"] : ""; echo $contacto; ?></span></strong></div>
                                        <div>Nombre:<strong><span class="nameTicket"> <?php $nameTicket = (is_array($tiketContacto)) ? $tiketContacto["nombre"] : ""; echo $nameTicket; ?></span></strong></div>
                                        <div>Estacion:<strong><span class="estacionTicket"> <?php $estacionTicket = (is_array($tiketContacto)) ? $tiketContacto["Estacion"] : ""; echo $estacionTicket; ?></span></strong></div>
                                        <div>Fecha:<strong><span class="fechaTicket"> <?php $fechaTicket = (is_array($tiketContacto)) ? $tiketContacto["dia"] : ""; echo $fechaTicket; ?></span></strong></div>
                                        <div>Hora:<strong><span class="horaTicket"> <?php $horaTicket = (is_array($tiketContacto)) ? $tiketContacto["hora"] : ""; echo $horaTicket; ?></span></strong></div>
                                        <div class="text-center"><strong>Hecho en México por</strong></div>
                                        <div class="text-center">Altitex Services SA de CV</div>
                                        <div class="text-center">5564115039</div>
                                        <div class="text-center">bersani.mx@gmail.com</div>
                                        <div class="text-center">https://www.facebook.com/Bersani.shop</div>
                                        <div class="text-center">https://instagram.com/bersani.shop</div>
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
                                <?php if($_SESSION["user"]->method_user == "globalAdminister"): ?>
                                    <!-- <div class="form-group">
                                        <div class="ps-radio">
                                            <input class="form-control" type="radio" id="pay-efectivo" name="payment-method" value="efectivo" checked onchange="changemetodpay(event)">
                                            <label for="pay-efectivo">Pay with efectivo? <span><img src="img/payment-method/mercado_pago.jpg" class="w-50"></span></label>
                                        </div>
                                    </div> -->
                                    <div class="d-flex flex-row-reverse">
                                        <button title="PDF" type="button" class="ps-btn mt-5" onclick="createOrder('<?php echo CurlController::api(); ?>')">Crear ORDEN</button>
                                        <button title="PDF" type="button" class="ps-btn mt-5 mr-5" onclick="pdfRegister('<?php echo TemplateController::path(); ?>')">Crear Ticket</button>
                                    </div>
                        
                                    <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>


            
        
