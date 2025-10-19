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
        if(!isset($_GET["create"]) && !isset($_GET["edit"]) && !isset($_GET["view"])){
            // traer la lista de deseos
            $products= array();
            $select="url_product,url_category,image_product,name_product,id_product";
            $method= "GET";
            $header= array();
            $filds= array();
            // if(isset($_GET["entregados"])){
            //     $url= CurlController::api()."relations?rel=orders,products,categories,stocks&type=order,product,category,stock&linkTo=status_order&equalTo=Finalizado&orderBy=day_order&orderMode=DESC&select=".$select."&token=".$_SESSION["user"]->token_user;
            //     $response= CurlController::request($url, $method, $header, $filds);
            //     if($response->status == 200){
            //         array_push($products, $response->result);
            //     }
            // }else if(isset($_GET["cancelados"])){
            //     $url= CurlController::api()."relations?rel=orders,products,categories,stocks&type=order,product,category,stock&linkTo=status_order&equalTo=cancelado&orderBy=day_order&orderMode=DESC&select=".$select."&token=".$_SESSION["user"]->token_user;
            //     $response= CurlController::request($url, $method, $header, $filds);
            //     if($response->status == 200){
            //         array_push($products, $response->result);
            //     }
            // }else{
                $url= CurlController::api()."relations?rel=products,categories&type=product,category&linkTo=status_product&equalTo=1&select=".$select;
                $response= CurlController::request($url, $method, $header, $filds);
                if(isset($response) && $response->status == 200){
                    array_push($products, $response->result);
                }

            // }
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
                    <li><a href="<?php echo $path; ?>acount&registers">Registros</a></li>
                    <li class="active"><a href="<?php echo $path; ?>acount&inventario">Inventario</a></li>
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
                <?php if(isset($_GET["edit"])): ?>
                    <?php include_once("modules/invEdit.php"); ?>
                <?php elseif(isset($_GET["view"])): ?>
                    <?php include_once("modules/invView.php"); ?>
                <?php else: ?>
                <!--=====================================
                Wishlist
                ======================================-->
                <button class="btn btn-dark btn-lg m-3" data-toggle="modal" data-target="#inventarioNew">Nuevo</button>
                <!-- <a href="http://bersani.com/acount&registers?entregados" type="button" class="btn btn-success btn-lg m-3">Entregados</a>
                <a href="http://bersani.com/acount&registers?cancelados" type="button" class="btn btn-danger btn-lg m-3">Cancelados</a> -->
                <div class="table-responsive ">
                    <table class="table ps-table--whishlist dt-responsive dt-client pr-5">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre producto</th>
                                <th>Colores</th>
                                <th>Tallas</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                                <th>Actualizacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Product -->
                            <?php
                            if(count($products) >0):
                            foreach ($products[0] as $key => $value):?>
                                <tr >
                                    <?php
                                        $stockProduct = [];
                                         $select="number_stock,id_stock";
                                         $url= CurlController::api()."stocks?linkTo=id_product_stock,status_stock&equalTo=".$value->id_product.",1&counTo=color_stock,size_stock&select=".$select."&token=".$_SESSION["user"]->token_user."&rol=admin";
                                         $response= CurlController::request($url, $method, $header, $filds);
                                         if(isset($response) && $response->status == 200){
                                             array_push($stockProduct, $response->result);
                                         }
                                    ?>
                                    <td>
                                        <div class="ps-product--cart justify-content-center">
                                            <div class="ps-product__thumbnail">
                                                <a>
                                                    <img src="img/products/<?php echo $value->url_category; ?>/<?php echo $value->image_product; ?>" alt="<?php echo $value->name_product; ?>">
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td><div class="ps-product__content"><a href="<?php echo $path . $value->url_product; ?>"><?php echo $value->name_product; ?></a></div></td>
                                    <td><div class="ps-product__content">
                                    <?php foreach($stockProduct[0] as $key2 => $value2){
                                        if(isset($value2->color_stock)){
                                            echo $value2->color_stock;
                                            echo "<br>";
                                        }
                                    } 
                                    ?>
                                    </div></td>
                                    <td><div class="ps-product__content">
                                    <?php foreach($stockProduct[0] as $key2 => $value2){
                                        if(isset($value2->size_stock)){
                                            echo $value2->size_stock;
                                            echo "<br>";
                                        }
                                    } 
                                    ?>
                                    </div></td>
                                    <td><div class="ps-product__content">
                                    <?php foreach($stockProduct[0] as $key2 => $value2){
                                        if(isset($value2->number_stock)){
                                            echo $value2->number_stock;
                                        }
                                    } 
                                    ?>
                                    </div></td>
                                    <td>
                                        <!-- <a target="_blank" class="btn btn-success rounded-circle mr-2"><i class='fa  fa-check-square'></i></a> -->
                                        <a href="<?php echo TemplateController::path();?>acount&inventario?view=<?php echo $value->id_product;?>" class="btn btn-dark text-white rounded-circle mr-2"><i class='fa fa-eye'></i></a>
                                        <a href="<?php echo TemplateController::path();?>acount&inventario?edit=<?php echo $value->id_product;?>" class="btn btn-info text-white rounded-circle mr-2"><i class='fa fa-pencil-alt'></i></a>
                                        <?php 
                                        ?>
                                        <button title="Eliminar" type="button" class="btn btn-danger rounded-circle mr-2" onclick="eliminarInventarioTotal(<?php echo $value->id_product ?>,'<?php echo CurlController::api(); ?>','<?php echo TemplateController::path(); ?>')"><i class='fa fa-trash'></i></button>

                                    </td>
                                    <td><div class="ps-product__content">
                                    <?php foreach($stockProduct[0] as $key2 => $value2){
                                        if(isset($value2->date_update_stock)){
                                            echo $value2->date_update_stock;
                                        }
                                    } 
                                    ?>
                                    </div></td>
                                </tr>
                            <?php endforeach;  endif;  ?>
                        </tbody>
                    </table>
                </div>

                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="inventarioNew">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Nuevo Registro</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <form class="ps-form--account ps-tab-root needs-validation" novalidate method="post" enctype="multipart/form-data">
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
                    <div class="form-group">
                        <label>Nombre Producto<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <input 
                            type="text"
                            class="form-control"
                            name="nameProduct"
                            placeholder="Nombre de tu producto..." 
                            required 
                            pattern="[0-9A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}" 
                            onchange="dataRepeat(event, 'product')">
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El nombre es requerido</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>URL Producto<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <input 
                            type="text"
                            class="form-control"
                            name="urlProduct"
                            placeholder="URL de tu Producto..."
                            readonly 
                            required >
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El nombre es requerido</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Imagen Principal<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <label class="pb-5" for="logoProduct">
                                <img src="img/products/default/default-image.jpg" class="img-fluid changeProduct" style="width:150px;">
                            </label>
                            <div class="custom-file">
                                <input 
                                type="file"
                                id="logoProduct"
                                class="custom-file-input"
                                name="logoProduct"
                                accept="image/*"
                                maxSize="2000000"
                                onchange="validateImageJs(event,'changeProduct')"
                                required>
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">El logo es requerida</div>
                                <label for="logoProduct" class="custom-file-label">Subir</label>
                            </div>
                        </div>
                    </div>
                    <!-- Categories -->
                    <div class="form-group">
                        <label>Product Category<sup class="text-danger">*</sup></label>
                        <?php
                            $url = CurlController::api()."categories?select=id_category,name_category,url_category";
                            $method= "GET";
                            $header= array();
                            $fields= array();
                            $Categories= CurlController::request($url, $method, $header, $fields)->result;
                        ?>
                        <div class="form-group__content">
                            <select 
                            class="form-control"
                            name="categoryProduct"
                            onchange="changecategory(event)"
                            required>
                                <option value="">Select Category</option>
                                <?php foreach($Categories as $key => $value):?>
                                    <option value="<?php echo $value->id_category."_".$value->url_category; ?>"><?php echo $value->name_category; ?></option>
                                <?php endforeach; ?>
                            </select>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El nombre es requerido</div>
                        </div>
                    </div>
                     <!-- Subcategories -->
                    <div class="form-group subcategoryProduct" style="display: none ;">
                        <label>Product Subcategory<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <select 
                                class="form-control"
                                name="subcategoryProduct"
                                required>
                                <option value="">Select Subcategory</option>
                            </select>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El nombre es requerido</div>
                        </div>
                    </div>
                    <!-- Especificaciones -->
                    <div class="form-group">
                        <label>Selecciona los colores<sup class="text-danger">*</sup></label>
                        <div class="row mb-3 inputEspesifications">
                            <div class="col-12 col-lg-6 form-group__content input-group">
                                <?php
                                    $dataColor = file_get_contents("views/json/colores.json");
                                    $SelectColor= json_decode($dataColor, true);
                                ?>
                                <select 
                                class="form-control"
                                name="SelectColor"
                                onchange="ChangeColorNew(event)"
                                required>
                                    <option value="">Color</option>
                                    <?php foreach($SelectColor as $key => $value):?>
                                        <?php //if(key($value)=="nombre"): ?>
                                        <option style="background-color: <?php echo $value['HexaColor']; ?>; color: <?php echo $value['hexaText']; ?>;" value="<?php echo $value['idColor']."_". $value['HexaColor']."_". $value['hexaText']."_".$value['nombreColor']; ?>"><?php echo TemplateController::capitalize($value["nombreColor"]); ?></option>
                                            <?php //endif ?>
                                    <?php endforeach; ?>
                                </select>
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">Acompleta el campo</div>
                            </div>
                            <div class="col-12 col-lg-6 form-group__content input-group colorSpesific">
                            <input type="hidden" name="valColor" class="valColor" value="" >
                            <input type="hidden" name="valCountColor" class="valCountColor" value=0>
                            </div>
                        </div>
                    </div>
                    <!-- Especificaciones -->
                    <div class="form-group">
                        <label class="categoryAccesorios">Selecciona los Tallas<sup class="text-danger">*</sup></label>
                        <div class="row mb-3 inputEspesifications categoryAccesorios">
                            <div class="col-12 col-lg-6 form-group__content input-group">
                                <?php
                                    $dataTalla = file_get_contents("views/json/tallas.json");
                                    $SelectTalla= json_decode($dataTalla, true);
                                ?>
                                <select 
                                class="form-control"
                                name="SelectLinea"
                                onchange="ChangeTallaNew(event)"
                                >
                                    <option value="">Tipo</option>
                                    <?php foreach($SelectTalla as $key => $value):?>
                                        <?php //if(key($value)=="nombre"): ?>
                                        <option value="<?php echo $value['id']."_". $value['nombreT']; ?>"><?php echo TemplateController::capitalize($value["nombreT"]); ?></option>
                                            <?php //endif ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 selectTalla" style="display: none ;">
                                <select 
                                    class="form-control"
                                    name="selectTalla"
                                    onchange="ChangeTallaNew2(event)"
                                    >
                                    <option value="">Tallas</option>
                                </select>
                               
                            </div>
                            <div class="col-12 col-lg-6 form-group__content input-group tallaSpesific">
                                <input type="hidden" name="valTalla" class="valTalla" value="" >
                                <input type="hidden" name="valCounTalla" class="valCounTalla" value=0>
                            </div>
                        </div>
                        <button type="button" disabled class="btn btn-success mb-2 btn-large buttonStock" onclick="addStock()">Crear Stock</button>
                    </div>
                    <div class="form-group selectStock" style="display: none ;">
                        <label>STOCK y PRECIOS<sup class="text-danger">*</sup></label>
                    </div>
                    <div class="form-group submtit">
                        <?php
                        $newInventario = new ControllerUser();
                        $newInventario->AgregarNewInventario();
                        ?>
                        <button type="submit" class="ps-btn ps-btn--fullwidth">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>