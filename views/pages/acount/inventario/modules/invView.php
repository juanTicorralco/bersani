<?php 
  $viewProd= array();
  $select="url_product,image_stock,url_category,name_product,number_stock,date_update_stock,price_product_stock,id_product,code_stock,color_stock,color_hexa_stock,size_stock";
  $method= "GET";
  $header= array();
  $filds= array();
  $url= CurlController::api()."relations?rel=stocks,products,categories&type=stock,product,category&linkTo=id_product&equalTo=".$_GET["view"]."&orderBy=color_stock&orderMode=DESC&select=".$select."&token=".$_SESSION["user"]->token_user;
  $response= CurlController::request($url, $method, $header, $filds);
  if($response->status == 200){
      array_push($viewProd, $response->result);
  }
?>

<div class="modal-header">
    <h5 class="modal-title text-center">Ver STOCK Producto</h5>
    <a href="<?php echo TemplateController::path() ?>acount&inventario" class="btn btn-danger">Cancel</a>
</div>
<div class="card-columns">
  <?php foreach($viewProd[0] as $key => $value): ?>
    <div class="card">
    <div class="text-center  text-white bg-dark">
        <img class="card-img-top rounded-circle" style="max-width: 50%;" src="img/products/<?php echo $value->url_category; ?>/stock/<?php echo $value->image_stock; ?>" alt="<?php echo $value->name_product; ?>">
    </div>
        <div class="card-body text-white bg-dark">
        <h5 class="card-title text-white"><p style="background: #<?php echo $value->color_hexa_stock; ?>;border-radius: 50%;width: 20px;height: 20px;"></p><small>Color:</small> <?php echo $value->color_stock; ?> <small>-</small> <small>Talla:</small> <?php echo $value->size_stock; ?></h5>
        <p class="card-text m-0 p-0">Stock: <?php echo $value->number_stock; ?></p>
        <?php if($value->number_stock <=0): ?>
        <p class="card-text badge bg-danger text-wrap text-white">No Hay Stock</p>
        <?php elseif($value->number_stock>0 && $value->number_stock<10): ?>
        <p class="card-text badge bg-warning text-wrap text-white">Poco Stock</p>
        <?php else: ?>
        <p class="card-text badge bg-success text-wrap text-white">Si Hay Stock</p>
        <?php endif;?>
        <p class="card-text m-0 p-0">Precio: <?php echo $value->price_product_stock; ?></p>
        <?php
            $arrayFecha = explode(" ",$value->date_update_stock);
            $fecha =  date_create($arrayFecha[0])->format('d/m/Y'); 
            $hour= date("g:i a",strtotime($arrayFecha[1]));
        ?>
        <p class="card-text m-0 p-0">Actualizacion: <?php echo $fecha; ?> - <?php echo $hour; ?></p>
        </div>
        <div class="card-footer text-white bg-secondary">
        <small class="text-white">Codigo: <?php echo $value->code_stock ?></small>
        </div>
    </div>
  <?php endforeach; ?>
</div>
