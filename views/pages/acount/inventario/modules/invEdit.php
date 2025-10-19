<?php
     if(isset($_GET["edit"])){
        $select = "url_product,url_category,image_product,name_product,id_category,id_product,name_product,name_category";
        $url = CurlController::api()."relations?rel=products,categories&type=product,category&linkTo=id_product&equalTo=".$_GET["edit"]."&select=".$select;
        $method = "GET";
        $fields = array();
        $headers = array();
        $editProduct = CurlController::request($url,$method,$fields,$headers)->result;
    }
?>
<?php if($editProduct == "n"): ?>
    <h4 class="text-center">No existe este producto en tu inventario</h4><br>
<?php else: ?>
    <form class="ps-form--account ps-tab-root needs-validation" novalidate method="post" enctype="multipart/form-data"> 
        <!-- Modal header -->
        <div class="modal-header">
            <h5 class="modal-title text-center">EDITAR INVENTARIO</h5>
            <a href="<?php echo TemplateController::path() ?>acount&inventario" class="btn btn-danger">Cancel</a>
        </div>
        <div class="modal-body text-left p-5">
                <!-- Product -->
                <div class="form-group">
                    <label>Nombre Producto<sup class="text-danger">*</sup></label>
                    <div class="form-group__content">
                        <input 
                        type="text"
                        class="form-control"
                        name="nameProductEdit"
                        value="<?php echo $editProduct[0]->name_product; ?>"
                        placeholder="Nombre de tu producto..." 
                        required 
                        readonly
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
                        name="urlProductEdit"
                        value="<?php echo $editProduct[0]->url_product; ?>"
                        placeholder="URL de tu Producto..."
                        readonly 
                        required >
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback">El nombre es requerido</div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Imagen Principal<sup class="text-danger">*</sup></label>
                    <input type="hidden" name="imageProductOld" value="<?php echo $editProduct[0]->image_product; ?>">
                    <div class="form-group__content">
                        <label class="pb-5" for="logoProduct">
                            <img src="img/products/<?php echo $editProduct[0]->url_category; ?>/<?php echo $editProduct[0]->image_product; ?>" class="img-fluid changeProduct" alt="<?php echo $editProduct[0]->name_product; ?>" style="width:150px;">
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
                            >
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El logo es requerida</div>
                            <label for="logoProduct" class="custom-file-label">Subir</label>
                        </div>
                    </div>
                </div>
                <!-- Categories -->
                <div class="form-group">
                    <label>Product Category<sup class="text-danger">*</sup></label>
                    <div class="form-group__content">
                        <select 
                        class="form-control"
                        name="categoryProduct"
                        readonly
                        required>
                            <option value="<?php echo $editProduct[0]->id_category."_".$editProduct[0]->url_category; ?>"><?php echo $editProduct[0]->name_category; ?></option>
                        </select>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback">El nombre es requerido</div>
                    </div>
                </div>
                 <!-- Especificaciones -->
                <div class="form-group selectStock">
                    <label>STOCK y PRECIOS<sup class="text-danger">*</sup></label>
                    <?php
                        $select = "id_stock,image_stock,number_stock,color_stock,color_hexa_stock,color_hexa_stock,price_product_stock,code_stock,size_stock";
                        $url = CurlController::api()."stocks?linkTo=id_product_stock&equalTo=".$_GET["edit"]."&oderBy=color_stock&orderMode=ASC&select=".$select."&token=".$_SESSION["user"]->token_user;
                        $method = "GET";
                        $fields = array();
                        $headers = array();
                        $editStock = CurlController::request($url,$method,$fields,$headers)->result;
                        $valcolor = "";
                        $valTalla="";
                    ?>
                    <?php foreach($editStock as $key => $value): ?>
                        <input type="hidden" name="c_<?php echo $value->color_hexa_stock ?>_<?php echo $value->color_stock ?>_<?php echo $value->size_stock ?>" value="<?php echo $value->code_stock; ?>">
                        <?php 
                        $valcolor .= $value->color_hexa_stock."_".$value->color_stock.",";
                        $valTalla .=  $value->size_stock.",";
                        ?>
                        <div></div>
                        <div class="d-flex justify-content-between mb-4">
                        <label><span class="rounded p-2 border border-dark" style="background-color: #<?php echo $value->color_hexa_stock ?> ;color: #FFFFFF;"><?php echo $value->color_stock ?></span><span class="rounded p-2 border border-dark text-dark"><?php echo $value->size_stock ?></span><span class="rounded p-2 border border-dark text-dark"><?php echo $value->code_stock ?></span><sup class="text-danger">*</sup></label>
                        <button title="Eliminar" type="button" class="btn btn-danger rounded-circle mr-2" onclick="eliminarInvet(<?php echo $value->id_stock ?>,'stock','<?php echo CurlController::api(); ?>')"><i class='fa fa-trash'></i></button>
                        </div>
                        <div class="row">
                            <!-- Telefono -->
                            <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        Stock:
                                    </span>
                                </div>
                                <input 
                                type="text"
                                class="form-control"
                                placeholder="N° Stock"
                                value="<?php echo $value->number_stock ?>"
                                name="s_<?php echo $value->color_hexa_stock ?>_<?php echo $value->color_stock ?>_<?php echo $value->size_stock ?>"
                                required
                                pattern = '[-\\(\\)\\0-9 ]{1,}'
                                onchange="validatejs(event, 'phone')">
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">Acompleta el campo</div>
                            </div>
                            <!-- Messenguer -->
                            <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        Precio:
                                    </span>
                                </div>
                                <input 
                                type="text"
                                class="form-control"
                                placeholder="$ Precio"
                                value="<?php echo $value->price_product_stock ?>"
                                name="p_<?php echo $value->color_hexa_stock ?>_<?php echo $value->color_stock ?>_<?php echo $value->size_stock ?>"
                                required
                                pattern = '[.\\,\\0-9]{1,}'
                                onchange="validatejs(event, 'numbers')">
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">Acompleta el campo</div>
                            </div>
                            <div class="form-group">
                                <label>Imagen Principal Product<sup class="text-danger">*</sup></label>
                                <input type="hidden" name="imageProductOld" value="<?php echo $value->image_stock; ?>">
                                <div class="form-group__content">
                                    <label class="pb-5" for="`+count+`logoProduct">
                                        <img src="img/products/<?php echo $editProduct[0]->url_category ?>/stock/<?php echo $value->image_stock ?>" class="img-fluid `+count+`changeProduct" style="width:150px;">
                                    </label>
                                    <div class="custom-file">
                                        <!-- <input 
                                        type="file"
                                        id="`+count+`logoProduct"
                                        class="custom-file-input"
                                        name="l_`+colorF[1]+`_`+colorF[2]+`_`+tallaF+`"
                                        accept="image/*"
                                        maxSize="2000000"
                                        onchange="validateImageJs(event,'`+count+`changeProduct')"
                                        required> -->
                                        <!-- <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">El logo es requerida</div>
                                        <label for="logoProduct" class="custom-file-label">Subir</label> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                    <input type="hidden" name="valColor" value="<?php echo substr($valcolor, 0, -1);?>">
                    <input type="hidden" name="valTalla" value="<?php echo substr($valTalla, 0, -1);?>">
                    <!-- <button class="btn btn-dark btn-lg m-3" data-toggle="modal" data-target="#invAddTC">Agregar T-C</button> -->
                    <a data-toggle="modal" data-target="#invAddTC" class="btn btn-dark text-white btn-lg m-3">Agregar T-C</a>
                </div>
        </div>
        <div class="modal-footer">
            <div class="form-group submit">
                <button class="ps-btn ps-btn-fullwidth" type="submit">Editar</button>
                <?php 
                    $editinvent =new ControllerUser();
                    $editinvent->editInventario($editProduct[0]->id_product);
                ?>
            </div>
        </div>   
    </form>
<div class="modal" id="invAddTC">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Agregar color y talla</h4>
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
                        <label>Selecciona los Tallas<sup class="text-danger">*</sup></label>
                        <div class="row mb-3 inputEspesifications">
                            <div class="col-12 col-lg-6 form-group__content input-group">
                                <?php
                                    $dataTalla = file_get_contents("views/json/tallas.json");
                                    $SelectTalla= json_decode($dataTalla, true);
                                ?>
                                <select 
                                class="form-control"
                                name="SelectLinea"
                                onchange="ChangeTallaNew(event)"
                                required>
                                    <option value="">Tipo</option>
                                    <?php foreach($SelectTalla as $key => $value):?>
                                        <?php //if(key($value)=="nombre"): ?>
                                        <option value="<?php echo $value['id']."_". $value['nombreT']; ?>"><?php echo TemplateController::capitalize($value["nombreT"]); ?></option>
                                            <?php //endif ?>
                                    <?php endforeach; ?>
                                </select>
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">Acompleta el campo</div>
                            </div>
                            <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 selectTalla" style="display: none ;">
                                <select 
                                    class="form-control"
                                    name="selectTalla"
                                    onchange="ChangeTallaNew2(event)"
                                    required>
                                    <option value="">Tallas</option>
                                </select>
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">El nombre es requerido</div>
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
                        $editInventario = new ControllerUser();
                        $editInventario->AgregarTCMod($editProduct[0]->id_product, $editProduct[0]->name_product, $editProduct[0]->url_category, $editProduct[0]->id_category);
                        ?>
                        <button type="submit" class="ps-btn ps-btn--fullwidth">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<?php endif; ?>