<?php
require_once "../controllers/curlController.php";
require_once "../controllers/templateController.php";
require_once "../extensions/vendor/autoload.php";
session_start();
class CustomPdfGenerator extends TCPDF 
{
    public function Header() 
    {
        $pageWidth = $this->getPageWidth();
        $textWidth = $this->GetStringWidth('Ticket de Compra');
        $posX = ($pageWidth - $textWidth) / 2; 
        $posY = 23;
        $image_file = '../views/img/template/bersani2.jpg';
        $this->Image($image_file, 63, 10, 80, '', 'JPG', '', 'T', false, 800, '', false, false, 0, false, false, false);
        $posX = 80; 
        $posY = 23;
        $this->SetFont('helvetica', 'B', 20);
        $this->SetXY($posX, $posY);
        $this->Cell(0, 15, '', 0, false, 'C', 0, '', 0, false, 'M', 'M');
        $this->Ln();
        $this->Cell(0, 15, 'Ticket de Compra', 0, false, 'C', 0, '', 0, false, 'M', 'M');
    }
    public function Footer() 
    {
        $this->SetY(-15);
        $this->SetFont('helvetica', 'I', 15);
        $this->Cell(0, 10, 'Gracias Por Tu Compra!', 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
    public function printTable($header, $data, $pagoprev, $envio)
    {
        $this->SetFillColor(255, 255, 255);
        $this->SetTextColor(192);
        $this->SetDrawColor(255, 255, 255);
        $this->SetLineWidth(1);
        $this->SetFont('Courier', 'B', 14);
        $w = array(110, 32, 40);
        $num_headers = count($header);
        for($i = 0; $i < $num_headers; ++$i) {
            $this->Cell($w[$i], 7, $header[$i], 1, 0, 'L', 1);
        }
        $this->Ln();
        $this->Ln();
        // Color and font restoration 
        $this->SetFillColor(224, 235, 255);
        $this->SetTextColor(0);
        $this->SetFont('');
        // table data 
        $fill = 0;
        $total = 0;
        $Cantidad = 0;
        $precioTotal = 0;
        foreach($data as $key => $row) {
            if (strlen($row["nombre"]) > 33) {
                $row["nombre"] = substr($row["nombre"], 0, 33) . '...';
            }
            $this->Cell($w[0], 6, $row["nombre"], 'LR', 0, 'L', $fill);
            $this->Cell($w[1], 6, $row["cantidad"], 'LR', 0, 'C', $fill);
            $this->Cell($w[2], 6, '$'.number_format($row["precio"]), 'LR', 0, 'C', $fill);
            $this->Ln();
            // $fill=!$fill;
            $Cantidad+=$row["cantidad"];
            $total+=$row["precio"];
            $precioTotal += $row["cantidad"] * $row["precio"];
        }
        $this->Cell($w[0], 6, '', 'LR', 0, 'L', $fill);
        $this->Cell($w[1], 6, '', 'LR', 0, 'R', $fill);
        $this->Cell($w[2], 6, '', 'LR', 0, 'L', $fill);
        
        $this->Ln();
        $this->Cell($w[0], 6, 'Envio', 'LR', 0, 'L', $fill);
        $this->Cell($w[1], 6, "", 'LR', 0, 'C', $fill);
        $this->Cell($w[2], 6, '$'.($envio), 'LR', 0, 'C', $fill);
        $this->Cell(array_sum($w), 0, '', 'T');
        $this->Ln();
        $this->Cell($w[0], 6, 'Pago Previo', 'LR', 0, 'L', $fill);
        $this->Cell($w[1], 6, "", 'LR', 0, 'C', $fill);
        $this->Cell($w[2], 6, '-$'.($pagoprev), 'LR', 0, 'C', $fill);
        $this->Cell(array_sum($w), 0, '', 'T');
        $this->Ln();
        $this->Cell($w[0], 6, 'TOTAL', 'LR', 0, 'L', $fill);
        $this->Cell($w[1], 6, $Cantidad, 'LR', 0, 'C', $fill);
        $this->Cell($w[2], 6, '$'.($precioTotal-$pagoprev+$envio), 'LR', 0, 'C', $fill);
        $this->Cell(array_sum($w), 0, '', 'T');
        $style = array(
            'border' => 2,
            'vpadding' => 'auto',
            'hpadding' => 'auto',
            'fgcolor' => array(0,0,0),
            'bgcolor' => false, //array(255,255,255)
            'module_width' => 1, // width of a single module in points
            'module_height' => 1 // height of a single module in points
        );
        $this->write2DBarcode('https://www.facebook.com/marketplace/profile/100002298148973/?ref=permalink&mibextid=dXMIcH', 'QRCODE,H', $this->getPageWidth()/3, $this->getY() + 10, 70, 70, $style, 'N');
    }
}
class ControllerPDFCreate{
    public $nombreCli;
    public $contactoCli;
    public $mesengerCLi;
    public $estacionCli;
    public $diaCli;
    public $horaCli;
    public $precioPrev;
    public $envio;
    public $arrayTotal;

    public function CrearTicketPDF(){
        $pdf = new CustomPdfGenerator(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
        $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        $pdf->setFontSubsetting(true);
        $pdf->SetFont('Times', '', 12, '', true);
        $pdf->AddPage();
        
        $pdf->Write(0, "\n", '', 0, 'C', true, 0, false, false, 0);
        $pdf->Write(0, "\n", '', 0, 'C', true, 0, false, false, 0);
        $pdf->Write(0, "\n", '', 0, 'C', true, 0, false, false, 0);
        $pdf->Write(0, "\n", '', 0, 'C', true, 0, false, false, 0);
        $pdf->writeHTML("<b>Nombre:</b> " . $this -> nombreCli, true, false, false, false, 'R');
        $pdf->writeHTML("<b>Contacto:</b> ". $this -> contactoCli, true, false, false, false, 'R');
        $pdf->writeHTML("<b>Estacion:</b> ". $this -> estacionCli, true, false, false, false, 'R');
        $pdf->writeHTML("<b>Fecha y Hora:</b> ". $this -> diaCli.", ". $this -> horaCli, true, false, false, false, 'R');
        $pdf->Write(0, "\n", '', 0, 'C', true, 0, false, false, 0);
        // invoice table starts here 
        $header = array('Producto', 'Cantidad', 'Sub-total');
        $data = $this -> arrayTotal;
        $pdf->printTable($header, $data, $this -> precioPrev, $this -> envio);

        $pdf->SetFont('', '', 12);
        $pdf->writeHTML("<b>Hecho en México por</b>", true, false, false, false, 'C');
        $pdf->writeHTML("<i>Altitex Services SA de CV</i>", true, false, false, false, 'C');
        $pdf->writeHTML("5564115039", true, false, false, false, 'C');
        $pdf->writeHTML("bersani.mx@gmail.com", true, false, false, false, 'C');
        $pdf->writeHTML("https://www.facebook.com/Bersani.shop", true, false, false, false, 'C');
        $pdf->writeHTML("https://instagram.com/bersani.shop", true, false, false, false, 'C');
        $pdf->Write(0, "\n", '', 0, 'C', true, 0, false, false, 0);
        $pdf->writeHTML("Si se requiere un cambio contactar con vendedor o repartidor", true, false, false, false, 'C');
        $pdf->writeHTML("Se requerira el ticket", true, false, false, false, 'C');
        // save pdf file 
        $nameFile = "";
        foreach($data as $key => $row) {
            $nameFile.=$key;
        }

        $nameFile .= $this -> contactoCli . $this -> mesengerCLi;
        $nombreArchivo= $nameFile . ".pdf";
        $pdf->Output(dirname(__DIR__) . '/views/tickets/'.$nombreArchivo, 'F');
        if (file_exists(dirname(__DIR__) . '/views/tickets/'.$nombreArchivo)) {
            
            echo json_encode([
                'status' => 200, 
                'file' => '/views/tickets/'.$nombreArchivo,
                'archivo' => $nombreArchivo,
                'telefono' => $this -> contactoCli,
                'nombre' => $this -> nombreCli
            ]);
        }else{
            echo json_encode(['status' => 400]);
        }
    }
}
if(isset($_COOKIE["productos"]) && isset($_COOKIE["contacto"])){
    $tiketContacto = json_decode($_COOKIE["contacto"], true);
    $pdfCreate = new ControllerPDFCreate();
    $pdfCreate ->  nombreCli = $tiketContacto["nombre"];
    $pdfCreate ->  contactoCli = $tiketContacto["telefono"];
    $pdfCreate ->  mesengerCLi = $tiketContacto["messer"];
    $pdfCreate ->  estacionCli = $tiketContacto["Estacion"];
    $pdfCreate ->  diaCli = $tiketContacto["dia"];
    $pdfCreate ->  horaCli = $tiketContacto["hora"];
    $pdfCreate ->  precioPrev = $tiketContacto["pagoprev"];
    $envioPre=0;
    if($tiketContacto["transporte"] == "Mexibus" || $tiketContacto["transporte"] == "Suburbano"){
        $envioPre = 100;
    }else if($tiketContacto["linea"] == "Línea B" || $tiketContacto["linea"] == "Línea 5" || $tiketContacto["linea"] == "Línea 2"){
        $envioPre = 0;
    }else{
        $envioPre = 50;
    }
    $pdfCreate ->  envio = $envioPre;
    $pdfCreate ->  arrayTotal = json_decode($_COOKIE["productos"], true);
    $pdfCreate -> CrearTicketPDF();

}else{
    echo json_encode(['status' => 400]);
}
?>