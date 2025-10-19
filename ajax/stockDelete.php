<?php
require_once "../controllers/curlController.php";
class ControllerStockDelete{
    public $id;
    public function eliminarAjaxStock(){       
        $select = "id_product,image_product,url_category";
        $url = CurlController::api()."relations?rel=products,categories&type=product,category&linkTo=id_product&equalTo=".$this->id."&select=".$select; 
        $method ="GET";
        $fields = array();
        $headers = array();
        $deleteProduct = CurlController::request($url,$method,$fields,$headers)->result[0];

        

        if(file_exists("../views/img/products/".$deleteProduct->url_category."/".$deleteProduct->image_product)){
            unlink("../views/img/products/".$deleteProduct->url_category."/".$deleteProduct->image_product);
            if(!file_exists("../views/img/products/".$deleteProduct->url_category."/".$deleteProduct->image_product)){
                $select = "id_stock,image_stock,url_category";
                $url = CurlController::api()."relations?rel=stocks,categories&type=stock,category&linkTo=id_product_stock&equalTo=".$this->id."&select=".$select."&token=".$_SESSION["user"]->token_user; 
                $method ="GET";
                $fields = array();
                $headers = array();
                $deleteStock = CurlController::request($url,$method,$fields,$headers)->result;
                $listImagen = array();
                foreach($deleteStock as $key => $value){
                    array_push($listImagen, $value->image_stock);
                }

                $arraySinDuplicados = [];
                $cont = 0;
                foreach($listImagen as $indice => $elemento) {
                    if (!in_array($elemento, $arraySinDuplicados)) {
                        $arraySinDuplicados[$cont] = $elemento;
                        $cont++;
                    }
                }
                foreach($arraySinDuplicados as $key => $value){
                    if(file_exists("../views/img/products/".$deleteProduct->url_category."/stock/".$value)){
                        unlink("../views/img/products/".$deleteProduct->url_category."/stock/".$value);
                    }
                }
            }
        }
    }
}
if(isset($_POST["idProduct"])){
    $idProduct = new ControllerStockDelete();
    $idProduct ->  id = $_POST["idProduct"];
    $idProduct -> eliminarAjaxStock();
}
?>