<?php
    $select = "id_store,name_store,url_store,logo_store,cover_store,about_store,abstract_store,email_store,country_store,city_store,address_store,phone_store,socialnetwork_store,map_store,reviews_product,approval_product";
    $url = CurlController::api()."relations?rel=products,stores&type=product,store&linkTo=id_user_store&equalTo=".$_SESSION["user"]->id_user."&select=".$select;
    $method = "GET";
    $fields = array();
    $headers = array();
    $storeResult = CurlController::request($url,$method,$fields,$headers)->result;
    $reviews = 0;
    $totalreviews = 0;

    if(!is_array($storeResult)){
        $select = "id_store,name_store,url_store,logo_store,cover_store,about_store,abstract_store,email_store,country_store,city_store,address_store,phone_store,socialnetwork_store,map_store";
        $url = CurlController::api()."stores?linkTo=id_user_store&equalTo=".$_SESSION["user"]->id_user."&select=".$select;
        $method = "GET";
        $fields = array();
        $headers = array();
        $storeResult = CurlController::request($url,$method,$fields,$headers)->result;
        $reviews = 1;
    }
?>
<div class="ps-section__left">

    <div class="ps-block--vendor">

        <div class="ps-block__thumbnail">

            <img src="img/stores/<?php echo $storeResult[0]->url_store; ?>/<?php echo $storeResult[0]->logo_store; ?>" alt="<?php echo $storeResult[0]->name_store; ?>">

        </div>

        <div class="ps-block__container">

            <div class="ps-block__header">

                <h4><?php echo $storeResult[0]->name_store; ?></h4>

                <?php if($reviews != 1): ?>

                <div class="br-wrapper br-theme-fontawesome-stars">
                    
                    <?php
                        foreach($storeResult as $item){
                            if($item->reviews_product != null){
                                foreach(json_decode($item->reviews_product, true) as $key => $value){
                                    $reviews += $value["review"];
                                    $totalreviews++;
                                }
                            }
                        }
                        if($reviews>0 && $totalreviews>0){
                            $reviews = round($reviews/$totalreviews);
                        }
                    ?>


                    <select class="ps-rating" data-read-only="true" style="display: none;">

                       <?php
                        if($reviews > 0){
                            for($i = 0; $i < 5; $i++){
                                if($reviews < ($i + 1)){
                                    echo '<option value="1">'.($i+1).'</option>';
                                }else{
                                    echo '<option value="2">'.($i+1).'</option>';
                                }
                            }
                        }else{
                            echo '<option value="0">0</option>';
                            for($i = 0; $i < 5; $i++){
                                echo '<option value="1">'.($i+1).'</option>';
                            }
                        }
                       ?>

                    </select>

                </div>

                <p><strong><?php echo ($reviews*100)/5; ?>% Positive</strong> (<?php echo $totalreviews; ?> rating)</p>
                <?php endif; ?>

            </div><span class="ps-block__divider"></span>

            <div class="ps-block__content">

                <p><strong><?php echo $storeResult[0]->name_store; ?></strong> <?php echo $storeResult[0]->abstract_store; ?></p>

                <span class="ps-block__divider"></span>

                <p><strong>Address</strong> <?php echo $storeResult[0]->country_store . ", " . $storeResult[0]->city_store . ", " . $storeResult[0]->address_store; ?></p>

                <!-- mandar el map -->
                <?php if(isset( $storeResult[0]->map_store) && $storeResult[0]->map_store != null):?>
                    <p><strong>Mapa</strong></p>

                    <div id="myMap" class="mb-5" style="height: 400px"></div>
                    <div id="mappp" class="mappp mb-5"  style="display: none" <?php 
                        if(isset( $storeResult[0]->map_store) && $storeResult[0]->map_store != null){
                            echo  'data-value =' . $storeResult[0]->map_store;
                        }
                        ?>>
                    </div>
                <?php endif;?>
                   
                <?php if($storeResult[0]->socialnetwork_store != null): ?>
                <figure>

                    <figcaption>Follow us on social</figcaption>

                    <ul class="ps-list--social-color">

                        <?php foreach(json_decode( $storeResult[0]->socialnetwork_store, true) as $key => $value): ?>
                            <li>
                                <a target="_blank" class="<?php  echo array_keys($value)[0]; ?>" href="<?php  echo $value[array_keys($value)[0]]; ?>">
                                    <i class="fab fa-<?php  echo array_keys($value)[0]; ?>"></i></a>
                            </li>
                        <?php endforeach;?>

                    </ul>

                </figure>
                <?php endif; ?>

            </div>

            <div class="ps-block__footer">

                <p>Call us directly<strong><small><?php echo "(".explode("_", $storeResult[0]->phone_store)[0].")"." ".explode("_", $storeResult[0]->phone_store)[1]; ?></small></strong></p>

                <p>or Or if you have any question <strong><small><?php echo $storeResult[0]->email_store; ?></small></strong></p>

                <a class="ps-btn ps-btn--fullwidth" data-toggle="modal" href="#editStore" onclick="dispararmapa()">Edit</a>

            </div>

        </div>

    </div>

</div><!-- End Vendor Profile -->

<!-- modal de editar -->
<div class="modal" id="editStore">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form class="needs-validation" novalidate method="POST" enctype="multipart/form-data">
                <input type="hidden" value="<?php echo $storeResult[0]->id_store; ?>" name="idStore">
                <!-- header -->
                <div class="modal-header">
                    <h5 class="modal-title text-center">Edit Store</h5>
                    <button class="close btn btn-danger text-black" type="button" data-dismiss="modal">&times;</button>
                </div>
                <!-- body -->
                <div class="modal-body text-left p-5">
                    <!-- name store -->
                    <div class="form-group">
                        <label>Store name<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <input 
                            type="text"
                            class="form-control"
                            name="nameStore"
                            value="<?php echo $storeResult[0]->name_store; ?>"
                            placeholder="Nombre de tu tienda..." 
                            required 
                            readonly>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El nombre es requerido</div>
                        </div>
                    </div>
                    <!-- url store -->
                    <div class="form-group">
                        <label>URL store<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <input 
                            type="text"
                            class="form-control"
                            name="urlStore"
                            value="<?php echo $storeResult[0]->url_store; ?>"
                            placeholder="URL de tu tienda..."
                            readonly 
                            required >
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El nombre es requerido</div>
                        </div>
                    </div>
                    <!-- information -->
                    <div class="form-group">
                        <label>Information Store<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <textarea  
                            class="form-control"  
                            id="infoStore"
                            name="infoStore"
                            required
                            pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}'
                            onchange="validatejs(event, 'parrafo')"
                            rows="7" 
                            placeholder="Notes about your store, e.g. special notes for delivery."><?php echo $storeResult[0]->about_store; ?></textarea>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">La informacion es requerida</div>
                        </div>
                    </div>
                    <!-- email -->
                    <div class="form-group">
                        <label>Email Address<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <input 
                            class="form-control" 
                            id="emailStore" 
                            name="emailStore"
                            type="email" 
                            value="<?php echo $storeResult[0]->email_store; ?>"  
                            required>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El email es requerido</div>
                        </div>

                    </div>
                    <!-- country -->
                    <div class="form-group">

                        <label>Store Country<sup class="text-danger">*</sup></label>

                        <?php
                            $data = file_get_contents("views/json/ciudades.json");
                            $ciudades= json_decode($data, true);
                        ?>

                        <div class="form-group__content">

                            <select 
                                class="form-control select2" 
                                style="width: 100%;"
                                id="countryStore"
                                onchange="changeContry(event)"
                                required
                                name="countryStore">
                                <?php if($storeResult[0]->country_store != null): ?>
                                    <option value="<?php echo $storeResult[0]->country_store; ?>_<?php echo explode("_",$storeResult[0]->phone_store)[0]?>"><?php echo $storeResult[0]->country_store ?></option>
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
                    <!-- city -->
                    <div class="form-group">
                        <label>City Store<sup>*</sup></label>
                        <div class="form-group__content">
                            <input 
                            class="form-control" 
                            id="cityStore"
                            type="text"
                            name="cityStore"
                            pattern = "[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}"
                            onchange="validatejs(event, 'text')" 
                            value="<?php echo $storeResult[0]->city_store; ?>" 
                            required>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">La ciudad es requerida</div>
                        </div>
                    </div>
                    <!-- phone -->
                    <div class="form-group">
                        <label>Phone Store<sup>*</sup></label>
                        <div class="form-group__content input-group">
                            <?php if($storeResult[0]->phone_store != null): ?>
                            <div class="input-group-append">
                                <span class="input-group-text dialCode"><?php echo explode("_",$storeResult[0]->phone_store)[0]?></span>
                            </div>
                            <?php 
                                $phone= explode("_", $storeResult[0]->phone_store)[1]; 
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
                            name="phoneOrder"
                            pattern = "[-\\(\\)\\0-9 ]{1,}"
                            onchange="validatejs(event, 'phone')"
                            value="<?php echo $phone; ?>" 
                            required>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">El telefono es requerido</div>
                        </div>
                    </div>
                    <!-- addres -->
                    <div class="form-group">
                        <label>Address Store<sup>*</sup></label>
                        <div class="form-group__content">
                            <input 
                            class="form-control" 
                            type="text" 
                            id="addresStore"
                            name="addresStore"
                            pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                            onchange="validatejs(event, 'parrafo')"
                            value="<?php echo $storeResult[0]->address_store; ?>" 
                            required>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">La direccion es requerida</div>
                        </div>
                    </div>
                    <!-- mapa -->
                    <?php if(isset( $storeResult[0]->map_store) && $storeResult[0]->map_store != null):?>
                    <div class="form-group">
                        <label>Map Store<sup>*</sup><small> (Puedes mover el marcador para una mejor localizacion)</small></label>
                        <div id="myMapp" style="height: 400px"></div>
                        <input type="hidden" name="mapStore" id="mapppp" <?php 
                            if(isset( $storeResult[0]->map_store)){
                                echo  'value =' . $storeResult[0]->map_store;
                            }
                            ?> >
                    </div>
                    <?php endif;?>
                    <!-- Logo -->
                    <div class="form-group">
                        <input type="hidden" value="<?php echo $storeResult[0]->logo_store; ?>" name="logoStoreOld">
                        <label>Logo Store<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <label class="pb-5" for="logoStore">
                                <?php if($storeResult[0]->logo_store != null): ?>
                                    <img src="img/stores/<?php echo $storeResult[0]->url_store ?>/<?php echo $storeResult[0]->logo_store ?>" class="img-fluid changeLogo" style="width:150px;">
                                <?php else: ?> 
                                    <img src="img/stores/default/default-logo.jpg" class="img-fluid changeLogo" style="width:150px;">   
                                <?php endif; ?>
                            </label>
                            <div class="custom-file">
                                <input 
                                type="file"
                                id="logoStore"
                                class="custom-file-input"
                                name="logoStore"
                                accept="image/*"
                                maxSize="2000000"
                                onchange="validateImageJs(event,'changeLogo')"
                                >
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">El logo es requerida</div>
                                <label for="logoStore" class="custom-file-label">Subir</label>
                            </div>
                        </div>
                    </div>
                    <!-- portada -->
                    <div class="form-group">
                        <input type="hidden" value="<?php echo $storeResult[0]->cover_store; ?>" name="portStoreOld">
                        <label>Portada Store<sup class="text-danger">*</sup></label>
                        <div class="form-group__content">
                            <label class="pb-5" for="portStore">
                                <?php if($storeResult[0]->cover_store != null): ?>
                                    <img src="img/stores/<?php echo $storeResult[0]->url_store ?>/<?php echo $storeResult[0]->cover_store ?>" class="img-fluid changePort" style="width:100%;">
                                <?php else: ?> 
                                    <img src="img/stores/default/default-cover.jpg" class="img-fluid changePort" style="width:100px;">
                                <?php endif; ?>
                            </label>
                            <div class="custom-file">
                                <input 
                                type="file"
                                id="portStore"
                                class="custom-file-input"
                                name="portStore"
                                accept="image/*"
                                maxSize="2000000"
                                onchange="validateImageJs(event,'changePort')"
                                >
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">La Portada es requerida</div>
                                <label for="portStore" class="custom-file-label">Subir</label>
                            </div>
                        </div>
                    </div>
                    <!-- redes -->
                    <div class="form-group">
                        <label>Social Network<sup class="text-danger">*</sup></label>
                        <?php 
                            $facebook = '';
                            $youtube = '';
                            $instagram = '';
                            $twiter = '';
                            if($storeResult[0]->socialnetwork_store != null){
                                foreach(json_decode($storeResult[0]->socialnetwork_store, true) as $key => $value){
                                    if(array_keys($value)[0] == "facebook"){
                                        $facebook = explode("/", $value[array_keys($value)[0]])[3];
                                    }
                                    if(array_keys($value)[0] == "youtube"){
                                        $youtube = explode("/", $value[array_keys($value)[0]])[3];
                                    }
                                    if(array_keys($value)[0] == "instagram"){
                                        $instagram = explode("/", $value[array_keys($value)[0]])[3];
                                    }
                                    if(array_keys($value)[0] == "twitter"){
                                        $twiter = explode("/", $value[array_keys($value)[0]])[3];
                                    }
                                }

                            }
                        ?>
                        <!-- facebook -->
                        <div class="form-group__content input-group mb-5">
                            <div class="input-group-append">
                                <span class="input-group-text">https://www.facebook.com/</span>
                            </div>
                            <input type="text"
                            class="form-control"
                            name="facebookStore"
                            value="<?php echo $facebook ?>"
                            pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}'
                            onchange="validatejs(event, 'parrafo')"
                            placeholder="Tu usuario">
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">Este campo es requerido</div>
                        </div>
                        <!-- youtube -->
                        <div class="form-group__content input-group mb-5">
                            <div class="input-group-append">
                                <span class="input-group-text">https://www.youtube.com/</span>
                            </div>
                            <input type="text"
                            class="form-control"
                            name="youtubeStore"
                            value="<?php echo $youtube ?>"
                            pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}'
                            onchange="validatejs(event, 'parrafo')"
                            placeholder="Tu usuario">
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">Este campo es requerido</div>
                        </div>
                        <!-- instagram -->
                        <div class="form-group__content input-group mb-5">
                            <div class="input-group-append">
                                <span class="input-group-text">https://www.instagram.com/</span>
                            </div>
                            <input type="text"
                            class="form-control"
                            name="instagramStore"
                            value="<?php echo $instagram ?>"
                            pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}'
                            onchange="validatejs(event, 'parrafo')"
                            placeholder="Tu usuario">
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">Este campo es requerido</div>
                        </div>
                        <!-- twitter -->
                        <div class="form-group__content input-group mb-5">
                            <div class="input-group-append">
                                <span class="input-group-text">https://twitter.com/</span>
                            </div>
                            <input type="text"
                            class="form-control"
                            name="twitterStore"
                            value="<?php echo $twiter ?>"
                            pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,10000}'
                            onchange="validatejs(event, 'parrafo')"
                            placeholder="Tu usuario">
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">Este campo es requerido</div>
                        </div>
                    </div>
                </div>
                <!-- footer -->
                <div class="modal-footer">
                    <div class="form-group submit">
                        <?php 
                            $updateStore = new ControllerVendor();
                            $updateStore->UpdateStore();
                        ?>
                        <button type="submit" class="ps-btn ps-btn--fullwidth">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>