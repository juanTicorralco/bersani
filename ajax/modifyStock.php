<?php
require_once "../controllers/curlController.php";
require_once "../controllers/templateController.php";
session_start();
class ControllerModifyStock{
    public $id;
    public $idStock;
    public $statusOrder;
    public $comment;
    public $gastos;
    public $priceSale;
    public $countSale;

    public function AgregarAlStock(){        
        if (!isset($_SESSION['user'])) {
            echo '500';
            return;
        }else{
            $time= time();
            if($_SESSION["user"]->token_exp_user < $time){
                echo '500';
                return;
            }else{
                if($_SESSION["user"]->token_user !== "NULL" && $_SESSION["user"]->token_user !== ""){
                    $dataStore = "stock_out_sale=1";
                    $url = CurlController::api()."sales?id=". $this->id."&nameId=id_sale&token=".$_SESSION["user"]->token_user;
                    $method = "PUT";
                    $fields = $dataStore;
                    $header = array(
                    "Content-Type" => "application/x-www-form-urlencoded"
                    );
                    $updateOrder = CurlController::request($url,$method,$fields,$header);
                    if($updateOrder->status == "200"){
                        echo '200';
                    }else{
                        echo '400'; 
                    }
                }else{
                    echo '500';
                }
            }
        }
    }
    public function CancelarOrderDentroDeRegisters(){        
        if (!isset($_SESSION['user'])) {
            echo '500';
            return;
        }else{
            $time= time();
            if($_SESSION["user"]->token_exp_user < $time){
                echo '500';
                return;
            }else{
                if($_SESSION["user"]->token_user !== "NULL" && $_SESSION["user"]->token_user !== ""){
                    $dataStore = "status_sale=Cancelado";
                    $url = CurlController::api()."sales?id=". $this->id."&nameId=id_sale&token=".$_SESSION["user"]->token_user;
                    $method = "PUT";
                    $fields = $dataStore;
                    $header = array(
                    "Content-Type" => "application/x-www-form-urlencoded"
                    );
                    $updateOrder = CurlController::request($url,$method,$fields,$header);
                    if($updateOrder->status == "200"){
                        $select = "price_order,count_order,id_order";
                        $url = CurlController::api()."relations?rel=sales,orders&type=sale,order&linkTo=id_sale&equalTo=".$this->id."&select=".$select."&token=".$_SESSION["user"]->token_user;
                        $method ="GET";
                        $fields = array();
                        $headers = array();                 
                        $totalData = CurlController::request($url, $method, $fields, $headers);

                        // print_r($totalData->result[0]);
                    
                        if($totalData->status == 200){
                            $piezasCount = $totalData->result[0]->count_order - $this->countSale;
                            $envioPagoPrev ="";
                            if($piezasCount == 0 ){
                                $envioPagoPrev = "&status_order=Cancelado";
                            }
                            $dataStore = "price_order=".$totalData->result[0]->price_order - ($this->priceSale*$this->countSale)."&count_order=". $piezasCount.$envioPagoPrev;
                            $url = CurlController::api()."orders?id=". $totalData->result[0]->id_order."&nameId=id_order&token=".$_SESSION["user"]->token_user;
                            $method = "PUT";
                            $fields = $dataStore;
                            $header = array(
                            "Content-Type" => "application/x-www-form-urlencoded"
                            );
                            $updateOrder = CurlController::request($url,$method,$fields,$header);
                            if($updateOrder->status == "200"){
                                if($_POST["outStockOrder"] == 1){
                                    $dataStore = "number_stock=". $_POST["numStock"]+ $this->countSale;
                                    $url = CurlController::api()."stocks?id=". $this->idStock."&nameId=id_stock&token=".$_SESSION["user"]->token_user;
                                    $method = "PUT";
                                    $fields = $dataStore;
                                    $header = array(
                                    "Content-Type" => "application/x-www-form-urlencoded"
                                    );
                                    $updateStock = CurlController::request($url,$method,$fields,$header);
                                    if($updateStock->status == "200"){
                                        echo '200';    
                                    }else{
                                        $dataStore = "status_order=Pendiente";
                                        $url = CurlController::api()."orders?id=". $this->id."&nameId=id_order&token=".$_SESSION["user"]->token_user;
                                        $method = "PUT";
                                        $fields = $dataStore;
                                        $header = array(
                                        "Content-Type" => "application/x-www-form-urlencoded"
                                        );
                                        $updateOrder = CurlController::request($url,$method,$fields,$header);
                                        if($updateOrder->status == "200"){
                                            echo '400';
                                        }
                                    }
                                }else if($_POST["outStockOrder"] == 0){
                                    echo '200';
                                }    
                            }else{
                                echo '400'; 
                            }
                        }
                    }else{
                        echo '400'; 
                    }
                }else{
                    echo '500';
                }
            }
        }
    }
    public function confirmarFinalizarOrder(){        
        if (!isset($_SESSION['user'])) {
            echo '500';
            return;
        }else{
            $time= time();
            if($_SESSION["user"]->token_exp_user < $time){
                echo '500';
                return;
            }else{
                if($_SESSION["user"]->token_user !== "NULL" && $_SESSION["user"]->token_user !== ""){
                    if( $this-> comment == "" ){
                        $this-> comment = NULL;
                    }
                    if( $this-> gastos == "" ){
                        $this-> gastos = NULL;
                    }
                    $dataStore = "status_order=". $this->statusOrder . "&comment_order=" . $this-> comment . "&bills_order=" . $this-> gastos;
                    $url = CurlController::api()."orders?id=". $this->id."&nameId=id_order&token=".$_SESSION["user"]->token_user;
                    $method = "PUT";
                    $fields = $dataStore;
                    $header = array(
                    "Content-Type" => "application/x-www-form-urlencoded"
                    );
                    $updateOrder = CurlController::request($url,$method,$fields,$header);
                    if($updateOrder->status == "200"){
                        echo '200';
                    }else{
                        echo '400'; 
                    }
                }else{
                    echo '500';
                }
            }
        }
    }
}
if(isset($_POST["idSale"]) && isset($_POST["idStock"]) && isset($_POST["outStockOrder"]) && isset($_POST["numStock"]) && isset($_POST["statusorder"]) && $_POST["statusorder"] == "Cancelado"){
    $idSale = new ControllerModifyStock();
    $idSale ->  id = $_POST["idSale"];
    $idSale ->  idStock = $_POST["idStock"];
    $idSale ->  priceSale = $_POST["priceSale"];
    $idSale ->  countSale = $_POST["countSale"];
    $idSale -> CancelarOrderDentroDeRegisters();
}else if(isset($_POST["statusorder"]) && isset($_POST["idSale"])){
    $idSale = new ControllerModifyStock();
    if(isset($_POST["comment"]) && $_POST["comment"] !== NULL){
        $idSale ->  comment = $_POST["comment"];
        $idSale ->  gastos = $_POST["gastos"];         
    }
    if(isset($_POST["gastos"]) && $_POST["gastos"] !== NULL){
        $idSale ->  comment = $_POST["comment"];
        $idSale ->  gastos = $_POST["gastos"];        
    }
    $idSale ->  id = $_POST["idSale"];
    $idSale ->  statusOrder = $_POST["statusorder"];
    $idSale -> confirmarFinalizarOrder();
} else if(isset($_POST["idSale"])){
    $idSale = new ControllerModifyStock();
    $idSale ->  id = $_POST["idSale"];
    $idSale -> AgregarAlStock();
}
?>