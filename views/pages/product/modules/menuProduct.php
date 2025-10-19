<?php if ($producter->reviews_product != null) {
    $allReview = json_decode($producter->reviews_product, true);
} else {
    $allReview = 0;
}
?>

<ul class="ps-tab-list">

    <li class="active"><a href="#tab-1">Descripcion</a></li>
    <li><a href="#tab-2">Detalles</a></li>
    <li><a href="#tab-3">Vendedor</a></li>
    <li><a href="#tab-4">Reseñas (<?php
    if ($producter->reviews_product != null) {
        echo count(json_decode($producter->reviews_product, true));
    } else {
        echo "0";
    }
    ?>)</a></li>
    <li><a href="#tab-5">Preguntas y respuestas</a></li>

</ul>

<div class="container-fluid preloadTrue">
    <div class="ph-item border-0 p-0 mt-0">
        <div class="ph-col-6">
            <div class="ph-picture" style="height:50px"></div>
        </div>
        <div class="ph-col-6">
            <div class="ph-row">
                <div class="ph-col-8"></div>
                <div class="ph-col-4 empty"></div>

                <div class="ph-col-12"></div>
                <div class="ph-col-12"></div>

                <div class="ph-col-6"></div>
                <div class="ph-col-6 empty"></div>

            </div>
        </div>
    </div>
</div>

<div class="ps-tabs preloadFalse">

    <div class="ps-tab active" id="tab-1">

        <div class="ps-document">
            <?php echo $producter->description_product; ?>
        </div>

    </div>

    <div class="ps-tab" id="tab-2">

        <div class="table-responsive">

            <table class="table table-bordered ps-table ps-table--specification">

                <tbody>
                    <?php $details = json_decode($producter->details_product, true); ?>
                    <?php foreach ($details as $key => $value) : ?>
                        <tr>
                            <td><?php echo $value["title"]; ?></td>
                            <td><?php echo $value["value"]; ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>

            </table>

        </div>

    </div>

    <div class="ps-tab" id="tab-3">

        <div class="media mb-5">
            <img class="mr-5 mt-1 rounded-circle" style="width: 120px;" src="img/stores/<?php echo $producter->url_store; ?>/<?php echo $producter->logo_store; ?>" alt="<?php echo $producter->name_store; ?>">
            <div class="media-body ml-3 ">
                <h5 class="mt-0"><?php echo $producter->name_store; ?></h5>
                <p> <?php echo $producter->about_store; ?></p>
            </div>
        </div>

        <!-- href="<?php //echo $path . $producter->url_store; ?>" -->
        <a class="mt-3" >Mas productos de la tienda</a>

    </div>

    <!-- RESEÑAS GLOBALES -->

    <div class="ps-tab" id="tab-4">

        <div class="row">

            <div class="col-lg-5 col-12 ">

                <div class="ps-block--average-rating">

                    <div class="ps-block__header">

                        <?php $promReview = TemplateController::calificationStars(json_decode($producter->reviews_product, true)); ?>

                        <h3><?php echo $promReview; ?>.00</h3>

                        <select class="ps-rating" data-read-only="true">

                            <!-- reseñas en estrellas -->
                            <?php
                            if ($reviews > 0) {
                                for ($i = 0; $i < 5; $i++) {
                                    if ($reviews < ($i + 1)) {
                                        echo '<option value="1">' . $i + 1 . '</option>';
                                    } else {
                                        echo '<option value="2">' . $i + 1 . '</option>';
                                    }
                                }
                            } else {
                                echo '<option value="0">0</option>';
                                for ($i = 0; $i < 5; $i++) {
                                    echo '<option value="1">' . $i + 1 . '</option>';
                                }
                            }
                            ?>

                        </select>

                        <!-- numero de reviciones -->
                        <span>(<?php
                                if ($producter->reviews_product != null) {
                                    echo count(json_decode($producter->reviews_product, true));
                                } else {
                                    echo "0";
                                }
                                ?> reseñas)
                        </span>

                    </div>

                    <?php if ($producter->reviews_product != null) : ?>
                        <!-- bloque de las estrellas -->
                        <?php if (count($allReview) > 0) {
                            /* bloque donde se almacenaran las estrellas */
                            $blockStart = array(
                                "1" => 0,
                                "2" => 0,
                                "3" => 0,
                                "4" => 0,
                                "5" => 0
                            );
                            $repReviews = array();
                            /* separamos las estrellas repetidas */
                            foreach ($allReview as $key => $value) {
                                array_push($repReviews, $value["review"]);
                            }

                            /* se unen las estrellas */
                            foreach ($blockStart as $key => $value) {
                                if (!empty(array_count_values($repReviews)[$key])) {
                                    $blockStart[$key] = array_count_values($repReviews)[$key];
                                }
                            }
                        } ?>

                        <?php for ($i = 5; $i > 0; $i--) : ?>
                            <div class="ps-block__star">

                                <span><?php echo $i; ?> Star</span>

                                <div class="ps-progress" data-value="<?php echo round($blockStart[$i] * 100 / count($allReview)); ?>">

                                    <span></span>

                                </div>

                                <span><?php echo round($blockStart[$i] * 100 / count($allReview)); ?>%</span>

                            </div>
                        <?php endfor; ?>
                    <?php endif; ?>
                </div>

                <hr class="mt-5">
            </div>

            <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
                <!-- tomar 5 reseñas aleatoriamente -->
                <?php if ($producter->reviews_product != null) : ?>
                    <?php
                   
                    if(count($allReview)>5){
                    $rand = array_rand($allReview, 5);
                    }else{
                        if(count($allReview)==1){
                            $rand = array(0);
                        }else if(count($allReview)==2){
                            $rand = array(0,1);
                        }else if(count($allReview)==3){
                            $rand = array(0,1,2);
                        }else if(count($allReview)==4){
                            $rand = array(0,1,2,3);
                        }else if(count($allReview)==5){
                            $rand = array(0,1,2,3,4);
                        }
                    }
                    foreach ($rand as $key => $value) : ?>
                        <div class="media border p-3 mb-3">
                            <?php if (empty($allReview[$value]["user"])) : ?>
                                <img class="mr-5 mt-1 rounded-circle" style="width: 80px;" src="img/users/default/default.png" alt="<?php echo $producter->name_user; ?>">
                            <?php else: ?>
                                <?php
                                    $select = "displayname_user,picture_user,method_user";
                                    $url = CurlController::api()."users?linkTo=id_user&equalTo=".$allReview[$value]["user"]."&select=".$select;
                                    $method = "GET";
                                    $fields = array();
                                    $headers = array();
                                    $infoUser = CurlController::request($url,$method,$fields,$headers)->result[0];
                                ?>
                                <?php if($infoUser->method_user == "direct"): ?>
                                    <?php if($infoUser->picture_user == ""): ?>
                                        <img class="mr-5 mt-1 rounded-circle" style="width: 80px;" src="img/users/default/default.png" alt="<?php echo $producter->name_user; ?>">
                                    <?php else: ?>
                                        <img class="mr-5 mt-1 rounded-circle" style="width: 80px;" src="img/users/<?php echo $allReview[$value]["user"] ?>/<?php echo $infoUser->picture_user ?>" alt="<?php echo $producter->name_user; ?>">
                                    <?php endif; ?>
                                <?php endif; ?>
                            <?php endif; ?>
                            <div class="media-body ml-3 ">

                                <?php if (empty($allReview[$value]["user"])) : ?>
                                    <h4 class="mt-0"><?php echo $producter->name_store; ?></h4>
                                <?php else: ?>
                                    <h4 class="mt-0"><?php echo $infoUser->displayname_user; ?></h4>
                                <?php endif; ?>
                                <select class="ps-rating" data-read-only="true">

                                    <!-- reseñas en estrellas -->
                                    <?php
                                    if ($allReview[$value]["review"] > 0) {
                                        for ($i = 0; $i < 5; $i++) {
                                            if ($allReview[$value]["review"] < ($i + 1)) {
                                                echo '<option value="1">' . $i + 1 . '</option>';
                                            } else {
                                                echo '<option value="2">' . $i + 1 . '</option>';
                                            }
                                        }
                                    } else {
                                        echo '<option value="0">0</option>';
                                        for ($i = 0; $i < 5; $i++) {
                                            echo '<option value="1">' . $i + 1 . '</option>';
                                        }
                                    }
                                    ?>

                                </select>

                                <p> <?php echo $allReview[$value]["comment"]; ?></p>
                            </div>
                        </div>

                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

        </div>

    </div>

    <div class="ps-tab" id="tab-5">

        <div class="ps-block--questions-answers">

            <h3>Questions and Answers</h3>

            <form method="POST" class="needs-validation" novalidate>

                <input type="hidden" name="idProduct" value="<?php echo $producter->id_product; ?>">

                <?php if(isset($_SESSION["user"])): ?>
                    <input type="hidden" name="idUser" value="<?php echo $_SESSION["user"]->id_user; ?>" >
                <?php else: ?>
                    <input type="hidden" name="idUser" value="">
                <?php endif; ?>

                <input type="hidden" name="idStore" value="<?php echo $producter->id_store; ?>">
                <input type="hidden" name="nameStore" value="<?php echo $producter->name_store; ?>">
                <input type="hidden" name="emailStore" value="<?php echo $producter->email_store; ?>">

                <div class="input-group">

                    <input 
                    class="form-control" 
                    type="text" 
                    name="Request" 
                    placeholder="Have a question? Search for answer?"
                    required
                    pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                    onchange="validatejs(event, 'parrafo')">
                    <div class="valid-feedback"></div>
                    <div class="invalid-feedback">Debes escribir tu pregunta</div>

                    <div class="input-group-append">
                        <button type="submit" class="btn btn-warning">Enviar</button>
                    </div>

                </div>

                <?php
                    $question = new ControllerUser();
                    $question -> newQuestion();
                ?>

            </form>

            <?php
                $select="id_product_message,content_message,answer_message,date_answer_message,date_created_message,method_user,id_user,picture_user,displayname_user";
                $url= CurlController::api()."relations?rel=messages,products,users&type=message,product,user&linkTo=id_product_message&equalTo=".$producter->id_product."&select=".$select."&orderBy=id_product&orderMode=DESC&token=tokenGlobal";
                $method= "GET";
                $header= array();
                $filds= array();
                $messages = CurlController::request($url, $method, $header, $filds)->result;

                if(!is_array($messages)){
                   $messages = array();
                }
            ?>

            <?php if(count($messages) > 0): ?>
                <?php foreach($messages as $index => $item): ?>
                    <?php if($producter->id_product == $item->id_product_message): ?>
                        <div class="my-3">
                            <div class="media border p-3">
                                <div class="media-body">
                                    <h4><small>Pregunto el dia <?php echo $item->date_created_message; ?> | Por: <?php echo $item->displayname_user ?></small></h4>
                                    <p><?php echo $item->content_message; ?></p>
                                </div>
                                <?php if($item->method_user == "direct"): ?>
                                    <?php if($item->picture_user == ""): ?>
                                        <img class="img-fluid rounded-circle ml-auto" src="img/users/default/default.png" style="width: 60px;">
                                    <?php else: ?>
                                        <img class="img-fluid rounded-circle ml-auto" src="img/users/<?php echo $item->id_user?>/<?php echo $item->picture_user?>" style="width: 60px;">
                                    <?php endif; ?>
                                <?php endif; ?>
                            </div>
                            <?php if( $item->date_answer_message != null && $item->answer_message != null ): ?>
                                <div class="media border p-3">
                                <img class="img-fluid rounded-circle ml-3 mt-3" src="img/stores/<?php echo $producter->url_store?>/<?php echo $producter->logo_store ?>" style="width: 60px;">
                                    <div class="media-body text-right">
                                        <h4><small>Respondio el dia <?php echo $item->date_answer_message; ?> | Por: <?php echo $producter->name_store ?></small></h4>
                                        <p><?php echo $item->answer_message; ?></p>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            <?php endif; ?>

        </div>

    </div>

    <div class="ps-tab active" id="tab-6">

        <p>Sorry no more offers available</p>

    </div>

</div>