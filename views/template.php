<?php
session_start();
/* Direction Route  */
$routesArray = explode("/", $_SERVER['REQUEST_URI']);

if (!empty(array_filter($routesArray)[1])) {
    if(strstr(array_filter($routesArray)[1], "&") != false){
        $urlParams = explode("&", array_filter($routesArray)[1]);
    }else{
        $urlParams = array($routesArray[1]);
    }   
}

if (!empty($urlParams[0])) {
    /* filter categorys whidt URL paremers */
    $url = CurlController::api() . "categories?linkTo=url_category&equalTo=" . $urlParams[0] . "&select=url_category";
    $method = "GET";
    $field = array();
    $header = array();

    $urlCategories = CurlController::request($url, $method, $field, $header);

    if ($urlCategories->status == 404) {
        /* filter subcategorys whidt URL paremers */
        $url = CurlController::api() . "subcategories?linkTo=url_subcategory&equalTo=" . $urlParams[0] . "&select=url_subcategory";
        $method = "GET";
        $field = array();
        $header = array();

        $urlSubcategories = CurlController::request($url, $method, $field, $header);

        if ($urlSubcategories->status == 404) {
            /* filter porducts whidt URL paremers */
            $url = CurlController::api() . "relations?rel=products,categories&type=product,category&linkTo=url_product&equalTo=" . $urlParams[0] . "&select=url_product,name_product,url_category,image_product,tags_product,summary_product";
            $method = "GET";
            $field = array();
            $header = array();

            $urlProduct = CurlController::request($url, $method, $field, $header);

            if ($urlProduct->status == 404) {
                
                 /* filter porducts whidt URL paremers */
                $url = CurlController::api() . "stores?linkTo=url_store&equalTo=" . $urlParams[0] . "&select=id_store";
                $method = "GET";
                $field = array();
                $header = array();

                $urlStores = CurlController::request($url, $method, $field, $header);

                if ($urlStores->status == 404) {                

                    /* valdate if there is pagination */
                    if (isset($urlParams[1])) {
                        if (is_numeric($urlParams[1])) {
                            /* aqui se cambia la paginacion */
                            $starAt = ($urlParams[1] * 24) - 24;
                        } else {
                            $starAt = null;
                        }
                    } else {
                        $starAt = 0;
                    }

                    /* validar que haya parametros de orden */
                    if (isset($urlParams[2])) {
                        if (is_string($urlParams[2])) {
                            if ($urlParams[2] == "new") {
                                $orderBy = "id_product";
                                $orderMode = "DESC";
                            } else if ($urlParams[2] == "latets") {
                                $orderBy = "id_product";
                                $orderMode = "ASC";
                            } else if ($urlParams[2] == "low") {
                                $orderBy = "price_product";
                                $orderMode = "ASC";
                            } else if ($urlParams[2] == "higt") {
                                $orderBy = "price_product";
                                $orderMode = "DESC";
                            } else {
                                $orderBy = "id_product";
                                $orderMode = "DESC";
                            }
                        } else {
                            $orderBy = "id_product";
                            $orderMode = "DESC";
                        }
                    } else {
                        $orderBy = "id_product";
                        $orderMode = "DESC";
                    }

                    $linkTo = ["name_product", "title_list_product", "tags_product", "summary_product", "name_store"];
                    $selecte = "url_product,url_category,image_product,name_product,stock_product,offer_product,price_product,url_store,name_store,reviews_product,views_category,name_category,id_category,views_subcategory,name_subcategory,id_subcategory,summary_product";

                    foreach ($linkTo as $key => $value) {

                        /* filtrar por busqueda con el parametro url de busqueda*/
                        $url = CurlController::api() . "relations?rel=products,categories,subcategories,stores&type=product,category,subcategory,store&linkTo=" . $value . ",approval_product,state_product&search=" . $urlParams[0] . ",approved,show&orderBy=" . $orderBy . "&orderMode=" . $orderMode . "&startAt=" . $starAt . "&endAt=24&select=" . $selecte;
                        $method = "GET";
                        $field = array();
                        $header = array();

                        $urlSearch = CurlController::request($url, $method, $field, $header);
                        if ($urlSearch->status == 200) {
                            $select = "id_product";
                            $url = CurlController::api() . "relations?rel=products,categories,subcategories,stores&type=product,category,subcategory,store&linkTo=" . $value . ",approval_product,state_product&search=" . $urlParams[0] . ",approved,show&&select=" . $select;
                            
                            $totalSearch =  CurlController::request($url, $method, $field, $header)->total;
                            break;
                        }
                    }
                }
            }
        }
    }
}

/* Bring principal route */
$path = TemplateController::path();

/* BRING THE TOTAL OF PRODUCT */
$url = CurlController::api() . "products?select=id_product";
$method = "GET";
$field = array();
$header = array();

$totalPro = CurlController::request($url, $method, $field, $header);
if($totalPro->status == 200){
    $totalProducts = $totalPro->total;
}else{
    $totalProducts = 0;
}
?>

<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="author" content="">
    <meta name="keywords" content="">
    <meta name="description" content="">

    <?php

        if(!empty($urlParams[0])){
            if(isset($urlProduct->status) && $urlProduct->status == 200){
                $name = $urlProduct->result[0]->name_product;
                $title = "Bersani | ". $urlProduct->result[0]->name_product;
                $description = "";
                foreach(json_decode($urlProduct->result[0]->summary_product, true) as $key => $value){
                    $description .= $value.", ";
                }
                $description = substr($description, 0, -2);
                $keywords = "";
                foreach(json_decode($urlProduct->result[0]->tags_product, true) as $key => $value){
                    $keywords .= $value.", ";
                }
                $keywords = substr($keywords, 0, -2);
                $imagen =  $path."/views/img/products/".$urlProduct->result[0]->url_category."/".$urlProduct->result[0]->image_product;
                $url = $path.$urlProduct->result[0]->url_product;
            }else{
                $title = "Bersani";
                $name = "Bersani | Home";
                $description = "Pagina de mercadeo de compra y venta de articulos y la creacion de tiendas";
                $keywords = "market, products, sales, store, shell";
                $imagen =  $path."/views/img/bg/about-us.jpg";
                $url = $path;
            }
        }else{
            $title = "Bersani";
            $name = "Bersani | Home";
            $description = "Pagina de mercadeo de compra y venta de articulos y la creacion de tiendas";
            $keywords = "market, products, sales, store, shell";
            $imagen =  $path."/views/img/bg/about-us.jpg";
            $url = $path;
        }
    ?>
    
    <title><?php echo $title; ?></title>
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="keywords" content="<?php echo $keywords; ?>">

    <!-- metadatos facebook -->
    <meta property="og:site_name" content="<?php echo $title; ?>">
    <meta property="og:title" content="<?php echo $name; ?>">
    <meta property="og:description" content="<?php echo $description; ?>">
    <meta property="og:type" content="Type">
    <meta property="og:image" content="<?php echo $imagen; ?>">
    <meta property="og:url" content="<?php echo $url; ?>">

    <!-- metadatod twiter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@Bersani">
    <meta name="twitter:creator" content="@Bersani">
    <meta name="twitter:title" content="<?php echo $name; ?>">
    <meta name="twitter:description" content="<?php echo $description; ?>">
    <meta name="twitter:image" content="<?php echo $imagen; ?>">
    <meta name="twitter:image:width" content="800">
    <meta name="twitter:image:height" content="418">
    <meta name="twitter:image:alt" content="<?php echo $description; ?>">

    <!-- metadatos google -->
    <meta itemprop="name" content="<?php echo $description; ?>">
    <meta itemprop="url" content="<?php echo $url; ?>">
    <meta itemprop="description" content="<?php echo $description; ?>">
    <meta itemprop="image" content="<?php echo $imagen; ?>">

    <base href="views/">

    <link rel="icon" href="img/template/icono.png">

    <!--=====================================
	CSS
	======================================-->

    <!-- google font -->
    <link href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&display=swap" rel="stylesheet">

    <!-- font awesome -->
    <link rel="stylesheet" href="css/plugins/fontawesome.min.css">

    <!-- linear icons -->
    <link rel="stylesheet" href="css/plugins/linearIcons.css">

    <!-- Bootstrap 4 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <!-- Slick -->
    <link rel="stylesheet" href="css/plugins/slick.css">

    <!-- Light Gallery -->
    <link rel="stylesheet" href="css/plugins/lightgallery.min.css">

    <!-- Font Awesome Start -->
    <link rel="stylesheet" href="css/plugins/fontawesome-stars.css">

    <!-- jquery Ui -->
    <link rel="stylesheet" href="css/plugins/jquery-ui.min.css">

    <!-- Select 2 -->
    <link rel="stylesheet" href="css/plugins/select2.min.css">

    <!-- Scroll Up -->
    <link rel="stylesheet" href="css/plugins/scrollUp.css">

    <!-- DataTable -->
    <link rel="stylesheet" href="css/plugins/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="css/plugins/responsive.bootstrap.datatable.min.css">

    <!-- include summernote css/js -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">

    <!-- estilo principal -->
    <link rel="stylesheet" href="css/style.css">

    <!-- Market Place 4 -->
    <link rel="stylesheet" href="css/market-place-4.css">

    <!-- Preloader placeholder loading  -->
    <link rel="stylesheet" href="https://unpkg.com/placeholder-loading/dist/css/placeholder-loading.min.css">

    <!-- notie Alert -->
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/notie/dist/notie.min.css">

    <!-- leaflet css  -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
    integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
    crossorigin=""/>

    <!-- tagsinput -->
    <link rel="stylesheet" type="text/css" href="css//plugins/tagsinput.css">

    <!-- drop zone -->
    <link href="https://unpkg.com/dropzone@6.0.0-beta.1/dist/dropzone.css" rel="stylesheet" type="text/css" />

    <!-- Owl Carousel -->
    <link rel="stylesheet" href="css/plugins/owl.carousel.css">

    <!-- iconos -->
    <title>Icono de WhatsApp</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <!--=====================================
	PLUGINS JS
	======================================-->

    <!-- jQuery library -->
    <script src="js/plugins/jquery-1.12.4.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

    <!-- Images Loaded -->
    <script src="js/plugins/imagesloaded.pkgd.min.js"></script>

    <!-- Masonry -->
    <script src="js/plugins/masonry.pkgd.min.js"></script>

    <!-- Isotope -->
    <script src="js/plugins/isotope.pkgd.min.js"></script>

    <!-- jQuery Match Height -->
    <script src="js/plugins/jquery.matchHeight-min.js"></script>

    <!-- Slick -->
    <script src="js/plugins/slick.min.js"></script>

    <!-- jQuery Barrating -->
    <script src="js/plugins/jquery.barrating.min.js"></script>

    <!-- Slick Animation -->
    <script src="js/plugins/slick-animation.min.js"></script>

    <!-- Light Gallery -->
    <script src="js/plugins/lightgallery-all.min.js"></script>
    <script src="js/plugins/lg-thumbnail.min.js"></script>
    <script src="js/plugins/lg-fullscreen.min.js"></script>
    <script src="js/plugins/lg-pager.min.js"></script>

    <!-- jQuery UI -->
    <script src="js/plugins/jquery-ui.min.js"></script>

    <!-- Sticky Sidebar -->
    <script src="js/plugins/sticky-sidebar.min.js"></script>

    <!-- Slim Scroll -->
    <script src="js/plugins/jquery.slimscroll.min.js"></script>

    <!-- Select 2 -->
    <script src="js/plugins/select2.full.min.js"></script>

    <!-- Scroll Up -->
    <script src="js/plugins/scrollUP.js"></script>

    <!-- DataTable -->
    <script src="js/plugins/jquery.dataTables.min.js"></script>
    <script src="js/plugins/dataTables.bootstrap4.min.js"></script>
    <script src="js/plugins/dataTables.responsive.min.js"></script>

    <!-- Chart -->
    <script src="js/plugins/Chart.min.js"></script>

    <!-- pagination -->
    <script src="js/plugins/twbs-pagination.min.js"></script>

    <!-- Preloader placeholder loader -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/placeholder-loading/dist/css/placeholder-loading.min.css"></script> -->

    <!-- notie alert -->
    <script src="https://unpkg.com/notie"></script>

    <!-- swit alert -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- paypal -->
    <script src="https://www.paypal.com/sdk/js?client-id=AYIGSP1y_NKdbIuVGCPHtlW-UBTTkKxWcQiHrauxCHt97CPZ2x7p_Fp_7e2QXuj5Bw-6-SiONTKeD1bo"></script>


    <!-- leaflet js -->
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
    integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
    crossorigin=""></script>

   <!-- md5 -->
   <script src="js/plugins/md5.min.js"></script>

   <!-- mercado pago -->
   <script src="https://sdk.mercadopago.com/js/v2"></script>

   <!-- include summernote js -->
   <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>

   <!-- tagsinput js -->
   <script src="js/plugins/tagsinput.js"></script>

   <!-- drop zone -->
   <script src="https://unpkg.com/dropzone@6.0.0-beta.1/dist/dropzone-min.js"></script>

    <!-- Owl Carousel -->
    <script src="js/plugins/owl.carousel.min.js"></script>

    <!-- shape Share -->
    <script src="js/plugins/shape.share.js"></script>

    <!-- Funciones2-->
    <script src="js/funciones2.js"></script>

</head>

<body>

    <!--=====================================
	Banner Promotion 
	======================================-->

    <?php //include "modules/banerModule.php"; ?>

    <!--=====================================
	Header
	======================================-->

    <?php include "modules/headerModule.php"; ?>

    <!--=====================================
	Header Mobile
	======================================-->

    <?php include "modules/headerMobileModule.php"; ?>

    <!--=====================================
    Home Content
    ======================================-->
    <?php
    /* choose which page to enter */
   
    if (!empty($urlParams[0])) {
        if ($urlParams[0] == "acount" || $urlParams[0] =="shopingBag" || $urlParams[0] == "checkout" || $urlParams[0] == "become-vendor" || $urlParams[0] == "store-list"){
            include "pages/" . $urlParams[0] . "/" . $urlParams[0] . ".php";
        } else if ($urlCategories->status == 200 || $urlSubcategories->status == 200) {
            include "pages/products/products.php";
        } else if ($urlProduct->status == 200) {
            include "pages/product/product.php";
        }else if($urlStores->status == 200){
            include "pages/store/store.php";
        } else if ($urlSearch->status == 200) {
            include "pages/search/search.php";
        } else {
            include "pages/404/404.php";
        }
    } else {
        include "pages/home/home.php";
    }
    ?>
    <!--=====================================
	Newletter
	======================================-->

    <div class="ps-newsletter">

        <div class="container">

        <form  method="POST" class="needs-validation" novalidate>   
            <div class="row">

                <div class="col-xl-5 col-12 ">
                    <div class="ps-form__left">
                        <h3>Newsletter</h3>
                        <p>Subscribete para recibir cupones y promociones!</p>
                    </div>
                </div>

                <div class="col-xl-7 col-12 ">

                    <div class="ps-form__right">

                        <div class="form-group--nest">
                            <input class="form-control" type="email" name="emailnewes" placeholder="Escribe tu Email" required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" onchange="validatejs(event, 'email')">
                            <button class="ps-btn" type="submit">Subscribir</button>
                            <?php
                                $newemail = new ControllerUser();
                                $newemail -> newsemail();
                            ?>
                        </div>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback">El nombre es requerido</div>
                    </div>
                </div>
            </div>
        </form>
            

        </div>

    </div>

    <!--=====================================
	Footer
	======================================-->

    <?php include "modules/footerModule.php"; ?>

    <!--=====================================
	JS PERSONALIZADO
	======================================-->

    <script src="js/funcionesjs.js"></script>
    <script src="js/main.js"></script>
    <script src="js/maps.js"></script>

</body>

</html>