let urlMaster = window.location.href;
if(localStorage.getItem("token_user")){
  let myCookie = document.cookie;
     let listCookie = myCookie.split(";");
     let count = 0;

     for (let i in listCookie) {
       var list = listCookie[i].search("UrlPage");
       // si list es mayor a -1 es por qu se ncontro la cooki
       if (list > -1) {
        document.cookie = "UrlPage" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
       } 
     }
}
window.onload = function() {
  if (localStorage.getItem('modalOpen') === 'true') {
    $('#viewRegister').modal('show');
    localStorage.removeItem('modalOpen');
    let storedData = localStorage.getItem('modalOrderOpen');
    let modalOrderData = JSON.parse(storedData);
    modalOrderOpen(modalOrderData.id, modalOrderData.colorStatus, modalOrderData.nameBuyer, modalOrderData.nameStatus, modalOrderData.url, modalOrderData.phone,modalOrderData.stacion,modalOrderData.hora,modalOrderData.follow,modalOrderData.fecha,modalOrderData.count,modalOrderData.pagoPrev,modalOrderData.envio,modalOrderData.price,modalOrderData.comment);

  }
}
if(urlMaster != "http://bersani.com/acount&login" && urlMaster != "http://bersani.com/acount&enrollment" && !localStorage.getItem("token_user")){
  setCookie("UrlPage", urlMaster, 1);
}
/* funcion para resetear url de los filtros */
function tokenValid(){
  if(localStorage.getItem("token_user") != null){
    switAlert("error", "Ocurrio un error... por favor vuelve a logearte", null, null, 3000); 
    return;
  }
}

function sortProduct(event) {
  let url = event.target.value.split("+")[0];
  let sort = event.target.value.split("+")[1];
  let endUrl = url.split("&")[0];
  window.location = endUrl + "&1&" + sort + "#showCase";
}
/* funcion para cear una cooky para la vitrina */
function setCookie(name, value, exp) {
  let now = new Date();
  now.setTime(now.getTime() + exp * 24 * 60 * 60 * 1000);

  let expDate = "expires=" + now.toUTCString();
  document.cookie = name + "=" + value + "; " + expDate;
}

/* fucion para almacenar en cookies la vitrina */
$(document).on("click", ".ps-tab-list li", function () {
  setCookie("tab", $(this).attr("type"), 1);
});

/* funcion para el buscador */
$(document).on("click", ".btnSearch", function (e) {
  e.preventDefault();
  let path = $(this).attr("path");
  let search = $(this).parent().children(".inputSearch").val().toLowerCase();
  let match = /^[a-z0-9ñÑáéíóú ]*$/;

  if (match.test(search)) {
    let searchTest = search.replace(/[ ]/g, "_");
    searchTest = searchTest.replace(/[ñ]/g, "n");
    searchTest = searchTest.replace(/[á]/g, "a");
    searchTest = searchTest.replace(/[é]/g, "e");
    searchTest = searchTest.replace(/[í]/g, "i");
    searchTest = searchTest.replace(/[ó]/g, "o");
    searchTest = searchTest.replace(/[ú]/g, "u");

    window.location = path + searchTest;
  } else {
    $(this).parent().children(".inputSearch").val("");
  }
});

/* funcion para buscador con enter */
let inputSearch = $(".inputSearch");
let btnSearch = $(".btnSearch");

for (let i = 0; i < inputSearch.length; i++) {
  $(inputSearch[i]).keyup(function (e) {
    e.preventDefault();
    if (e.keyCode == 13 && $(inputSearch[i]).val() != "") {
      let path = $(btnSearch[i]).attr("path");
      let search = $(this).val().toLowerCase();
      let match = /^[a-z0-9ñÑáéíóú ]*$/;

      if (match.test(search)) {
        let searchTest = search.replace(/[ ]/g, "_");
        searchTest = searchTest.replace(/[ñ]/g, "n");
        searchTest = searchTest.replace(/[á]/g, "a");
        searchTest = searchTest.replace(/[é]/g, "e");
        searchTest = searchTest.replace(/[í]/g, "i");
        searchTest = searchTest.replace(/[ó]/g, "o");
        searchTest = searchTest.replace(/[ú]/g, "u");

        window.location = path + searchTest;
      } else {
        $(this).val("");
      }
    }
  });
}

/* funcion para cambiar la cantidad del carrito */
function changeQualyty(quantity, move, stock, index) {
  let number = 1;
  if (Number(quantity) > stock - 1) {
    quantity = stock - 1;
  }
  if (move == "up") {
    number = Number(quantity) + 1;
  }
  if (move == "down" && Number(quantity) > 1) {
    number = Number(quantity) - 1;
  }

  $("#quant"+index).val(number);
  $("[quantitySC]").attr("quantitySC", number);
  totalp(index);
}

if(window.location == "http://seture.com/acount&enrollment"){
  window.onload = function() {
    var myInput = document.getElementById('passRep');
    myInput.onpaste = function(e) {
      e.preventDefault();
    }
    myInput.oncopy = function(e) {
      e.preventDefault();
    }
  }
}
/* funcion para validar un formiulario */
function validatejs(e, tipo) {
  if (tipo == "text") {
    let pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;
    if (!pattern.test(e.target.value)) {
      $(e.target).parent().addClass("was-validated");
      $(e.target)
        .parent()
        .children(".invalid-feedback")
        .html("No uses numeros ni caracteres especiales");
      return;
    }
  } 
  if (tipo == "text&number") {
    let pattern = /^[0-9A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;
    if (!pattern.test(e.target.value)) {
      $(e.target).parent().addClass("was-validated");
      $(e.target).parent().children(".invalid-feedback").html("No uses caracteres especiales");
      return;
    }
  } 
  if (tipo == "email") {
    let pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(e.target.value)) {
      $(e.target).parent().addClass("was-validated");
      $(e.target)
        .parent()
        .children(".invalid-feedback")
        .html("Solo se acepta un formato email");
      return;
    }
  } 
  if (tipo == "pass") {
    let pattern = /^[#\\=\\$\\;\\*\\_\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-Z]{1,}$/;
    if (!pattern.test(e.target.value)) {
      $(e.target).parent().addClass("was-validated");
      $(e.target)
        .parent()
        .children(".invalid-feedback")
        .html(
          "No se admiten espacios ni tampoco algunos caracteres especiales"
        );
      e.target.value = "";
      return;
    }
    if(e.target.value.length < 9){
      $(e.target).parent().addClass("was-validated");
      $(e.target)
        .parent()
        .children(".invalid-feedback")
        .html(
          "La contraseña debe tener almenos 8 caracteres"
        );
        e.target.value = "";
      return;
    }
  } 
  if (tipo == "passEnt") {
    let pattern = /^[#\\=\\$\\;\\*\\_\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-Z]{1,}$/;
    if (!pattern.test(e.target.value)) {
      $(e.target).parent().addClass("was-validated");
      $(e.target)
        .parent()
        .children(".invalid-feedback")
        .html(
          "No se admiten espacios ni tampoco algunos caracteres especiales"
        );
      e.target.value = "";
      return;
    }
  }
  if(tipo=="phone"){
    let  pattern = /^[-\\(\\)\\0-9 ]{1,}$/; 
    if (!pattern.test(e.target.value)) {
      $(e.target).parent().addClass("was-validated");
        $(e.target)
          .parent()
          .children(".invalid-feedback")
          .html("Solo se aceptan numeros");
      return;
    }
  }
  if(tipo=="parrafo"){
    let  pattern = /^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}$/; 
    if (!pattern.test(e.target.value)) {
      $(e.target).parent().addClass("was-validated");
        $(e.target)
          .parent()
          .children(".invalid-feedback")
          .html("Algun caracter que estas usando no es valido");
      return;
    }
  }
  if(tipo=="numbers"){
    let  pattern = /^[.\\,\\0-9]{1,}$/; 
    if (!pattern.test(e.target.value)) {
      $(e.target).parent().addClass("was-validated");
        $(e.target)
          .parent()
          .children(".invalid-feedback")
          .html("Solo se aceptan numeros");
      return;
    }
  }
  if(tipo == "repeatPass"){

    let validar = e.target;
    let valor = $("#createPassword").val();
    if(validar.value !== valor){
      $(validar).parent().addClass("was-validated");
      $(validar).parent().children(".invalid-feedback").html("Las contraseñas no coinciden");
      validar.value = "";
      return;
    }
  }
}

function validateImageJs(e, input){
    let image = e.target.files[0];
    if (image["type"] !== "image/jpeg" && image["type"] !== "image/png") {
      switAlert("error", "La imagen tiene que ser PNG  JPEG", null, null);
      return;
    } else if (image["size"] > 2000000) {
      switAlert("error", "La imagen tiene que ser menor a 2MB", null, null);
      return;
    } else {
      var data = new FileReader();
      data.readAsDataURL(image);

      $(data).on("load", function (event) {
        let path = event.target.result;
        $("."+input).attr("src", path);
      });
    }
}

/* funcion para validar un formiulario */
function dataRepeat(e, type){
  let table = "";
  let linkTo = "";
  let select = ""

  if(type == "email"){
     table = "users";
     linkTo = "email_user";
     select = "email_user"
  }

  if(type == "store"){
     table = "stores";
     linkTo = "name_store";
     select = "name_store"
  }

  if(type == "product"){
    table = "products";
    linkTo = "name_product";
    select = "name_product"
 }

  let settings = {
    url:$("#urlApi").val() + table+"?equalTo=" + e.target.value +"&linkTo="+linkTo+"&select="+select,
    metod: "GET",
    timeaot: 0,
  };

  $.ajax(settings).error(function (response) {
    if (response.responseJSON.status == 404) {
      if(type == "email"){
        validatejs(e, "email");
      }

      if(type == "store"){
        validatejs(e, "text&number");
        urlCreate(e,"urlStore");
      }

      if(type == "product"){
        validatejs(e, "text&number");
        urlCreate(e,"urlProduct");
      }
    }
  });

  $.ajax(settings).done(function (response) {
    if (response.status == 200) {
      
      $(e.target).parent().addClass("was-validated");

      if(type == "email"){
        $(e.target).parent().children(".invalid-feedback").html("Este email ya esta registrado");
      }

      if(type == "store" || type == "product"){
        $(e.target).parent().children(".invalid-feedback").html("El nombre "+  e.target.value +" ya esta ocupado");
      }
      
      e.target.value = "";
      return;
    }
  }); 
}

// funcion para agregar producto a la list de deseos
function addWishList(urlProducto, urlApi) {
  // valdar que es token exista

  if (localStorage.getItem("token_user") != null) {
    // validar que el token sea el mismo que en la bd
    let token = localStorage.getItem("token_user");
    let settings = {
      url:
        urlApi + "users?equalTo=" + token + "&linkTo=token_user&select=id_user,wishlist_user",
      method: "GET",
      timeaot: 0,
    };

    //   respuesta incorrecta
    $.ajax(settings).error(function (response) {
      if (response.responseJSON.status == 404) {
        switAlert("error", "Ocurrio un error... por favor vuelve a logearte", null, null, 3000);
        return;
      }
    });

    // respuesta correcta
    $.ajax(settings).done(function (response) {
      if (response.status == 200) {
        let id = response.result[0].id_user;
        let wishlist = JSON.parse(response.result[0].wishlist_user);
        let noRepeat = 0;
        // preguntar si hay articulos en la lista de deseos 
        if (wishlist != null && wishlist.length > 0) {
          wishlist.forEach(list => {
            if (list == urlProducto) {
              noRepeat--;
            } else {
              noRepeat++;
            }
          });


          // preguntamos si ya esta en la lista de deseos
          if (wishlist.length != noRepeat) {
            switAlert("error", "El producto ya se agrego a tu lista de deseos", null, null, 2000);
          } else {

            wishlist.push(urlProducto);
            // Cuando no exista la lista de deseos inicialmente
            let settings = {
              "url": urlApi + "users?id=" + id + "&nameId=id_user&token=" + token + "&select=id_user",
              "method": "PUT",
              "timeaot": 0,
              "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              "data": {
                "wishlist_user": JSON.stringify(wishlist),
              },
            };

            $.ajax(settings).done(function (response) {
              if (response.status == 200) {

                let totalWishlist = Number($(".totalWishList").html());
                $(".totalWishList").html(totalWishlist + 1);
                $(`.${urlProducto}`).removeClass("invisibleCorazon");
                $(`#visibl-cor`).remove();
                switAlert("success", "El producto se añadio a la lista de deseos", null, null, 1500);
              }
            });
          }
        } else {

          // Cuando no exista la lista de deseos inicialmente
          let settings = {
            "url": urlApi + "users?id=" + id + "&nameId=id_user&token=" + token + "&select=id_user",
            "method": "PUT",
            "timeaot": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
              "wishlist_user": '["' + urlProducto + '"]',
            },
          };

          $.ajax(settings).done(function (response) {
            if (response.status == 200) {

              let totalWishlist = Number($(".totalWishList").html());
              $(".totalWishList").html(totalWishlist + 1);
              $(`.${urlProducto}`).removeClass("invisibleCorazon");
              switAlert("success", "El producto se añadio a la lista de deseos", null, null, 1500);
            }
          });
        }
      }
    });
  } else {
    switAlert("error", "Para agregar a la lista de deseos debes estar logeado", null, null, 3000);
  }
}

// AGREGAR DOS PROductos a la lista de deseos 

function addWishListDos(urlProducto, urlApi, urlProductoDos) {
  addWishList(urlProducto, urlApi);
  setTimeout(() => {
    addWishList(urlProductoDos, urlApi);
  }, 1000);
}

// funcion para eliminar elementos a la lista de deseos
function removeWishlist(urlProduct, urlApi) {
  switAlert("confirm", "Esta seguro de eliminar de la lista de deseos?", null, null, null).then(resp => {

    if (resp == true) {
      // revisar que el token coincida con la bd
      let token = localStorage.getItem("token_user");
      let settings = {
        url:
          urlApi + "users?equalTo=" + token + "&linkTo=token_user&select=id_user,wishlist_user",
        method: "GET",
        timeaot: 0,
      };
      $.ajax(settings).done(function (response) {
        if (response.status == 200) {
          let id = response.result[0].id_user;
          let wishlist = JSON.parse(response.result[0].wishlist_user);
          wishlist.forEach((list, index) => {
            if (list == urlProduct) {
              wishlist.splice(index, 1);
              $(`.${urlProduct}`).remove();
            }
          });

          // Cuando no se quite de la lista 
          let settings = {
            "url": urlApi + "users?id=" + id + "&nameId=id_user&token=" + token,
            "method": "PUT",
            "timeaot": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            "data": {
              "wishlist_user": JSON.stringify(wishlist),
            },
          };

          $.ajax(settings).done(function (response) {
            if (response.status == 200) {

              let totalWishlist = Number($(".totalWishList").html());
              $(".totalWishList").html(totalWishlist - 1);

              switAlert("success", "El producto se elimino de la lista de deseos", null, null, 1500);

            }
          });

        }
      })
    }
  });
}

function cambioOrder(e, nombre){
  $("."+nombre+"Vale").remove();
  let valor = e.target.value
  $("."+nombre+"Val").append(`<input type="hidden" class="`+ nombre +`Vale" value="`+valor+`" >`);
}

function statusConfirmRegister(outStockOrder,numStock,idStock,idsale, statusorder,url, pagina, category, imgProduct) {
  switAlert("confirm", "Seguro que quieres marcar la orden como "+statusorder+"?", null, null, null).then(resp => {
    localStorage.setItem('modalOpen', 'true');
    if (resp == true) {
     
      let data = new FormData();
      let idOrder = 0;
    if(statusorder == "Cancelado"){
      data.append("idSale", idsale);
      data.append("idStock", idStock);
      data.append("outStockOrder", outStockOrder);
      data.append("numStock", numStock);
      data.append("statusorder", statusorder);
      data.append("priceSale", category);
      data.append("countSale", imgProduct);   
    }else if(statusorder == "Confirmado" && outStockOrder==1){
      data.append("idOrder", idOrder);
      data.append("statusorder", statusorder);
    }else if(statusorder == "Finalizado"){
      let comment = $(".comentOrderVale").val();
      let gastos = $(".gastosOrderVale").val();
      if( comment == undefined ||  comment == ""){
        comment = null;
      }
      if(gastos == undefined || gastos == ""){
        gastos=null;
      }
      data.append("idOrder", idOrder);
      data.append("statusorder", statusorder);
      data.append("comment", comment);
      data.append("gastos", gastos); 
    }else if(statusorder == "inStock"){
      data.append("idSale", idsale);
    }else{
      switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
      return;
    }
      $.ajax({
        url : url + "ajax/modifyStock.php",
        method : "POST",
        data : data,
        contentType : false,
        cache : false,
        processData : false,
        success : function(response){
          if(response == "200"){
            switAlert("success", "La orden se ah " + statusorder, null, null, 1500);
            if(statusorder == "inStock"){
              let element = document.getElementById("btnImg-"+idsale);
              if (element) {
                // Eliminar todos los elementos hijos
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                let newContent = `
                <div class="ps-product--cart justify-content-center">
                    <div class="ps-product__thumbnail"> 
                        <a><img title="inStock" src="img/products/${category}/stock/${imgProduct}" alt="${imgProduct}" class="btn btn-danger btn-circle btn-acciones3"></a>
                    </div>
                </div>
                `;
                element.innerHTML = newContent;
                element.className = 'bg-success';
              }
            }else if(statusorder == "Cancelado"){
              location.reload();
            }
          }else if(response == "400"){
            switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
          }else{
            switAlert("error", "Para proteger tus datos, si no hay actividad en tu cuenta, se cierra automaticamente. Vuelve a logearte!", url + "acount&logout","");
          }
          console.log(response);
        },
        error : function(jqXHR, textStatus, errorThrown){
          console.log(textStatus + " " + errorThrown);
        }
      });
    }
  });
}

function BuscarCoki(name){
  let cookies = document.cookie.split(';');
  let encontrado = 0;
  let data;
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      encontrado = 1;
      data = cookie.substring(name.length + 1);
    }
  }
  if (encontrado == 1) {
    return { 
      data: data, 
      status: 200,
    }
  } else {
    return { 
      data: "", 
      status: 400,
    }
  }
}

function getGreeting() {
  let now = new Date();
  let hour = now.getHours();
  let greeting;
  if (hour >= 6 && hour < 12) {
      greeting = "un%20excelente%20dia";
  } else if (hour >= 12 && hour < 18) {
      greeting = "una%20excelente%20tarde";
  } else {
      greeting = "una%20excelente%20noche";
  }
  return greeting;
}

function pdfRegister(url) {
  switAlert("confirm", "Seguro que quieres crear el ticket?", null, null, null).then(resp => {
    if (resp == true) {
      let productos = BuscarCoki("productos");
      if(productos.status == 200){
        let contacto = BuscarCoki("contacto");
        if(contacto.status == 200){ 
          $.ajax({
            url : url + "ajax/PDFCreate.php",
            method : "POST",
            data : 0,
            contentType : false,
            cache : false,
            processData : false,
            success : function(response){
              let data = JSON.parse(response);
              if(data.status == "200"){
                $("#nombrePDF").val(data.archivo);
                let link = document.createElement('a');
                link.href = data.file;
                link.download = data.archivo;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                let greeting = getGreeting();
                window.open("https://wa.me/"+data.telefono+"?text=Hola,%20Gracias%20Por%20Tu%20Compra%20sr%20"+data.nombre+"!%20Aqui%20esta%20tu%20ticket,%20un%20dia%20antes%20de%20la%20entrega%20mi%20repartidor%20te%20mandara%20un%20mensaje%20de%20confirmacion%20de%20tu%20pedido,%20cualquier%20cosa%20quedo%20atento,%20que%20tengas%20"+greeting+"!%20:)", '_blank');
                switAlert("success", "Se creo el ticket correctamente", null, null, 1500);
              }else if(response.status == "400"){
                switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
              }
            },
            error : function(jqXHR, textStatus, errorThrown){
              console.log(textStatus + " " + errorThrown);
            }
          });
        }else{
          switAlert("error", "Faltan datos", null, null);
        }
      }else{
        switAlert("error", "Faltan datos", null, null);
      }
    }
  });
}

// crear orden
function createOrder(url){
  switAlert("confirm", "Seguro que quieres crear el ticket?", null, null, null).then(resp => {
    if (resp == true) {
      let productos = BuscarCoki("productos");
      if(productos.status == 200){
        let contacto = BuscarCoki("contacto");
        if(contacto.status == 200){
          let listadoProductos = JSON.parse(productos.data);
          let listadoContacto = JSON.parse(contacto.data);
          const meses = {
            "Enero": "01",
            "Febrero": "02",
            "Marzo": "03",
            "Abril": "04",
            "Mayo": "05",
            "Junio": "06",
            "Julio": "07",
            "Agosto": "08",
            "Septiembre": "09",
            "Octubre": "10",
            "Noviembre": "11",
            "Diciembre": "12"
          };
          // Obtener el año actual
          let añoActual = new Date().getFullYear();
          // Separar día y mes
          let [dia, mes] = listadoContacto.dia.split('-');
          mes = mes.trim();
          // Obtener el número del mes
          let mesNumero = meses[mes];
          // Formatear la fecha en el formato deseado
          let fechaFormateada = `${añoActual}-${mesNumero}-${dia.padStart(2, '0')}`;
          // Separar la hora y el periodo (AM/PM)
          let [hora, periodo] = listadoContacto.hora.split(' ');
          let [horas, minutos] = hora.split(':');
          // Convertir a formato de 24 horas
          horas = parseInt(horas, 10);
          if (periodo === 'PM' && horas !== 12) {
            horas += 12;
          } else if (periodo === 'AM' && horas === 12) {
            horas = 0;
          }
          // Formatear la hora en formato HH:MM:SS
          let horas24 = horas.toString().padStart(2, '0');
          let minutos24 = minutos.padStart(2, '0');
          let segundos24 = '00'; // Puedes ajustar esto si necesitas segundos específicos
          let horaFormateada = `${horas24}:${minutos24}:${segundos24}`;
          let envioOrder = 0;
          let pdfOrder =  $("#nombrePDF").val();;
          if (listadoContacto.transporte == "Mexibus" || listadoContacto.transporte == "Suburbano"){
            envioOrder = 100;
          }else if(listadoContacto.linea == "Línea B" || listadoContacto.linea == "Línea 5" || listadoContacto.linea == "Línea 2"){
            envioOrder = 0;
          }else{
            envioOrder = 50;
          }
          
          let urlbuyer = url+'buyers?linkTo=phone_buyer&equalTo='+listadoContacto.telefono+'&select=id_buyer&token='+ localStorage.getItem("token_user");            
          let settings = {
              url: urlbuyer,
              metod: 'GET',
              timeaot: 0,
          };
          $.ajax(settings).done(function (response) {
            if (response.status == 200) {
              let idBuyer = response.result[0].id_buyer;
              let cantidadSale = 0;
              let totalSale = 0;
              for (let key in listadoProductos) {
                if (listadoProductos.hasOwnProperty(key)) {
                  let producto = listadoProductos[key];
                  cantidadSale += parseInt(producto.cantidad);
                  totalSale += parseFloat(producto.precio) * parseInt(producto.cantidad);
                }
              }

              let settings = {
                "url": url+ "orders?token=" + localStorage.getItem("token_user"),
                "method": "POST",
                "timeaot": 0,
                "headers": {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                "data": {
                  "id_buyer_order": idBuyer, 
                  "stacion_order": listadoContacto.Estacion, 
                  "day_order": fechaFormateada, 
                  "hour_order": horaFormateada, 
                  "status_order": "Pendiente", 
                  "count_order": cantidadSale, 
                  "price_order": totalSale, 
                  "pago_prev_order": listadoContacto.pagoprev, 
                  "envio_order": envioOrder, 
                  "bills_order": 0, 
                  "follow_order": listadoContacto.messer, 
                  "pdf_order": pdfOrder,
                  "date_create_order": formatFecha(new Date()) 
                },
              };
              $.ajax(settings).done(function (response) {
                if (response.status == 200) {
                  let idOrdes = response.result.idlast;

                  for (let key in listadoProductos) {
                    if (listadoProductos.hasOwnProperty(key)) {
                      let producto = listadoProductos[key];
                      let espesificationsProduct = [{"peso":[producto.peso],"altura":[producto.altura]}]
                      
                      let urlbuyer = url+'relations?rel=stocks,categories,products&type=stock,category,product&linkTo=code_stock&equalTo='+key+'&select=id_stock,cost_product_stock,id_product,id_category,number_stock&token='+ localStorage.getItem("token_user");            
                      let settings = {
                          url: urlbuyer,
                          metod: 'GET',
                          timeaot: 0,
                      };
                      $.ajax(settings).done(function (response) {
                        if (response.status == 200) {
                          let stockResponce = response.result[0];
                          let numberStock = (stockResponce.number_stock > 0) ? 1 : 0;
                          if(envioOrder > 100){
                            envioOrder = 0;
                          }
                          let comments = null;
                          if(typeof producto.comets !== 'undefined'){
                            if(producto.comets != null ){
                              if( producto.comets != undefined){
                                if( producto.comets != ""){
                                  comments = producto.comets;
                                }
                              }
                            }
                          }
                          let settings = {
                            "url": url+ "sales?token=" + localStorage.getItem("token_user"),
                            "method": "POST",
                            "timeaot": 0,
                            "headers": {
                              "Content-Type": "application/x-www-form-urlencoded",
                            },
                            "data": {
                              "id_order_sale": idOrdes,
                              "id_product_sale": stockResponce.id_product,
                              "id_stock_sale": stockResponce.id_stock,
                              "id_category_sale": stockResponce.id_category, 
                              "code_stock_sale": key, 
                              "stock_out_sale": numberStock, 
                              "spesifications_sale": JSON.stringify(espesificationsProduct), 
                              "status_sale": "Pendiente", 
                              "cost_sale": stockResponce.cost_product_stock, 
                              "count_sale": producto.cantidad, 
                              "price_sale": producto.precio, 
                              "comment_sale" : comments,
                              "date_create_sale": formatFecha(new Date()) 
                            },
                          };
                          $.ajax(settings).done(function (response) {
                            if (response.status == 200) {
                              envioOrder += 500;
                              borrarTiket('productos', 'contacto',null);
                              switAlert("success", "El pedido se creo correctamente", null, null);
                            }
                          }).fail(function (jqXHR, textStatus, errorThrown) {
                            switAlert("error", "Error al guardar la venta", null,null,null );
                            return;
                          });
                        }
                      }).fail(function (jqXHR, textStatus, errorThrown) {
                        switAlert("error", "Error al guardar la venta", null,null,null );
                        return;
                      });
                    }
                  }
                }
              }).fail(function (jqXHR, textStatus, errorThrown) {
                switAlert("error", "Error al guardar la orden", null,null,null );
                return;
              });
            }
          }).fail(function (jqXHR, textStatus, errorThrown) {
            let settings = {
              "url": url+ "buyers?token=" + localStorage.getItem("token_user"),
              "method": "POST",
              "timeaot": 0,
              "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              "data": {
                "name_buyer": listadoContacto.nombre,
                "phone_buyer": listadoContacto.telefono,
                "status_buyer": 1, 
              },
            };
            $.ajax(settings).done(function (response) {
              if (response.status == 200) {
                let idBuyer = response.result.idlast;;
                let cantidadSale = 0;
                let totalSale = 0;
                for (let key in listadoProductos) {
                  if (listadoProductos.hasOwnProperty(key)) {
                    let producto = listadoProductos[key];
                    cantidadSale += parseInt(producto.cantidad);
                    totalSale += parseFloat(producto.precio) * parseInt(producto.cantidad);
                  }
                }

                let settings = {
                  "url": url+ "orders?token=" + localStorage.getItem("token_user"),
                  "method": "POST",
                  "timeaot": 0,
                  "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  "data": {
                    "id_buyer_order": idBuyer, 
                    "stacion_order": listadoContacto.Estacion, 
                    "day_order": fechaFormateada, 
                    "hour_order": horaFormateada, 
                    "status_order": "Pendiente", 
                    "count_order": cantidadSale, 
                    "price_order": totalSale, 
                    "pago_prev_order": listadoContacto.pagoprev, 
                    "envio_order": envioOrder, 
                    "bills_order": 0, 
                    "follow_order": listadoContacto.messer, 
                    "pdf_order": pdfOrder,
                    "date_create_order": formatFecha(new Date()) 
                  },
                };
                $.ajax(settings).done(function (response) {
                  if (response.status == 200) {
                    let idOrdes = response.result.idlast;

                    for (let key in listadoProductos) {
                      if (listadoProductos.hasOwnProperty(key)) {
                        let producto = listadoProductos[key];
                        let espesificationsProduct = [{"peso":[producto.peso],"altura":[producto.altura]}]
                        
                        let urlbuyer = url+'relations?rel=stocks,categories,products&type=stock,category,product&linkTo=code_stock&equalTo='+key+'&select=id_stock,cost_product_stock,id_product,id_category,number_stock&token='+ localStorage.getItem("token_user");            
                        let settings = {
                            url: urlbuyer,
                            metod: 'GET',
                            timeaot: 0,
                        };
                        $.ajax(settings).done(function (response) {
                          if (response.status == 200) {
                            let stockResponce = response.result[0];
                            let numberStock = (stockResponce.number_stock > 0) ? 1 : 0;
                            if(envioOrder > 100){
                              envioOrder = 0;
                            }
                            let comments = null;
                            if(typeof producto.comets !== 'undefined'){
                              if(producto.comets != null ){
                                if( producto.comets != undefined){
                                  if( producto.comets != ""){
                                    comments = producto.comets;
                                  }
                                }
                              }
                            }
                            let settings = {
                              "url": url+ "sales?token=" + localStorage.getItem("token_user"),
                              "method": "POST",
                              "timeaot": 0,
                              "headers": {
                                "Content-Type": "application/x-www-form-urlencoded",
                              },
                              "data": {
                                "id_order_sale": idOrdes,
                                "id_product_sale": stockResponce.id_product,
                                "id_stock_sale": stockResponce.id_stock,
                                "id_category_sale": stockResponce.id_category, 
                                "code_stock_sale": key, 
                                "stock_out_sale": numberStock, 
                                "spesifications_sale": JSON.stringify(espesificationsProduct), 
                                "status_sale": "Pendiente", 
                                "cost_sale": stockResponce.cost_product_stock, 
                                "count_sale": producto.cantidad, 
                                "price_sale": producto.precio, 
                                "comment_sale" : comments,
                                "date_create_sale": formatFecha(new Date()) 
                              },
                            };
                            $.ajax(settings).done(function (response) {
                              if (response.status == 200) {
                                envioOrder += 500;
                                borrarTiket('productos', 'contacto',null);
                                switAlert("success", "El pedido se creo correctamente", null, null);
                              }
                            }).fail(function (jqXHR, textStatus, errorThrown) {
                              switAlert("error", "Error al guardar el pedido", null,null,null );
                              return;
                            });
                          }
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                          switAlert("error", "Error al guardar el pedido", null,null,null );
                          return;
                        });
                      }
                    }
                  }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                  switAlert("error", "Error al guardar la orden", null,null,null );
                  return;
                });
              }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              switAlert("error", "Error al registrar al comprador", null,null,null );
              return;
            });
          })
        }else{
          switAlert("error", "Faltan datos", null, null);
        }
      }else{
        switAlert("error", "Faltan datos", null, null);
      }
    }
  });
}
// funcion que remueve de bag
function removeBagSC(urlProduct, urlPagina, idUser, numero,urlapi){
  switAlert("confirm", "Esta seguro de eliminar del carrito de compras?", urlPagina, null, null).then(resp => {
    if(resp == true){
      let cont=0, check='checkout';
      let url = urlapi+'products?linkTo=url_product&equalTo='+urlProduct+'&select=stars_product,id_product';
      
      let settings = {
          url: url,
          metod: 'GET',
          timeaot: 0,
      };
   
      $.ajax(settings).done(function (response) {
          if (response.status == 200) {
            let starResponse = response.result[0];
            let stars = JSON.parse(starResponse.stars_product);
            numero = JSON.parse(numero);
              if (stars != null && stars.length > 0) {
                  stars.forEach((list,i) => {
                      if(numero[i] != ''){
                          if(numero[i] == list.numero){
                              if((list.check == 'checkin') && (list.pagado != 'pagado') && (list.idUser == idUser )){
                                  list.idUser= '';
                                  list.check= check;
                                  list.emailUser= '';
                                  list.time= '';
                                  cont++;
                              }   
                          }
                      }
                  });
              }
              
              let settings = {
                  'url': urlapi + 'products?id='+starResponse.id_product+'&nameId=id_product&token=' + localStorage.getItem("token_user"),
                  'method': 'PUT',
                  'timeaot': 0,
                  'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  'data': {
                    'stars_product': JSON.stringify(stars),
                  },
              };
    
              $.ajax(settings).done(function (response) {
              if (response.status == 200) {
              // preguntamos is la cookie ya existe
              let myCookie = document.cookie;
              let listCookie = myCookie.split(";");
              let count = 0;

              for (let i in listCookie) {
                var list = listCookie[i].search("listSC");
                // si list es mayor a -1 es por qu se ncontro la cooki
                if (list > -1) {
                  count--;
                  var arrayList = JSON.parse(listCookie[i].split("=")[1]);
                } else {
                  count++;
                }
              }

              // trabajamos sobre la cookie que ya existe
              if (count != listCookie.length) {
                if (arrayList != undefined) {
                    arrayList.forEach((list, index)=>{
                      if(list.product == urlProduct){
                        arrayList.splice(index,1);
                      }
                    });

                    setCookie("listSC", JSON.stringify(arrayList), 1);
                    urlPagina = window.location.href;
                    switAlert("success", "El producto se elimino de el carrito", urlPagina, null, 1500);
                  }
                }
              }
            });
          }
      });   
    }
  });
}

function bagCkeck(){
  window.location = "http://seture.com/checkout";
}

// seleccionar detalles al producto
$(document).on("click", ".details", function(){
  let details = $(this).attr("datailType");
  let value = $(this).attr("detailValue");
  let detailsLenth= $(".details."+ details);

  for(let i=0; i<detailsLenth.length; i++){
    $(detailsLenth[i]).css({"border":"1px solid #bbb"});
  }
  $(this).css({"border":"5px solid #80F"});

  // preguntar si se agregaron detalles
  if($("[detailSC]").attr("detailSC") != ""){
    
    let detailsSC = JSON.parse($("[detailSC]").attr("detailSC"));
    for(const i in detailsSC){
      detailsSC[i][details]= value;
      $("[detailSC]").attr("detailSC", JSON.stringify(detailsSC));
    }

  }else{
    $("[detailSC]").attr("detailSC", '[{\"'+details+'\":\"'+value+'\"}]')
  }
})

// AGREGAR DOS PROductos al carrito
function addBagCardDos(urlProduct, category, image, name, price, path, urlApi, tag, urlProductoDos) {
  addBagCard(urlProduct, category, image, name, price, path, urlApi, tag);
  setTimeout(() => {
    addBagCard(urlProductoDos, category, image, name, price, path, urlApi, tag);
  }, 1000);
}

// definir el subtotal y total del carrito de compras
let price = $(".price span");
let quantity= $(".quantity input");
let envio= $(".shopingcantidad span");
let subtotal= $(".subtotal");
let totalPrice= $(".totalPrice span");
let listtSC= $(".listtSC");

function totalp(index){
  let totalPri= 0;
  let arrayListSC= [];

  if(price.length>0){
    price.each(function(i){
    
      if(index != null){

        if($(quantity[index]).val() >= 3 || i >= 3 || index >= 3 || ($(quantity[index]).val() >= 3 && index >3) ){
        $(envio[index]).html(0);
        }else{
          $(envio[index]).html((5 * 1.5 )/ $(quantity[index]).val());
        }
          
      }

      let priceSub = $(price[i]).html().trim();

      if(priceSub.lastIndexOf(",", 1) >= 0){
        let re = new RegExp ("(^.*?),(.*)$");
         priceSub = re.exec(priceSub);
          if (priceSub.length > 0) {
            priceSub = ( parseFloat( priceSub[1]*1000)) + parseFloat(priceSub[2]) ;
          }else{
            priceSub =priceSub;
          }
      }else{
        priceSub = priceSub;
       
      }
   
      let subt= parseFloat((priceSub*$(quantity[i]).val()) + parseFloat( $(envio[i]).html()));
      totalPri += subt;
      $(subtotal[i]).html(`$${subt.toFixed(2)}`);

      // coocar la cookie 
      arrayListSC.push({
        "product": $(listtSC[i]).attr("url"),
        "details": $(listtSC[i]).attr("details"),
        "quantity": parseInt($(quantity[i]).val()) 
      });
    });
    $(totalPrice).html(totalPri.toFixed(2));

    // actualizar cookie
    setCookie("listSC", JSON.stringify(arrayListSC), 1);
  }
}

totalp(null);

function changeContry(event){
  $(".dialCode").html(event.target.value.split("_")[1]);
}

function changeTalla(event,idtallas){
  $(".imgfunStock").remove();
  $(".stfunStock").remove();
  let idTalla = "";
  if(event!==0){
    idTalla = event.target.value.split("_")[1];
  }else if(idtallas == undefined){
    idTalla = $(".idTalla").val();
  }else{
    idTalla = idtallas;
  }
  $(".idTalla").val(idTalla);
  let idproduct =   $(".idColor").val().split("_")[0];
  let color =  $(".idColor").val().split("_")[1];
  
  let settings = {
    "url": $("#urlApi").val()+"relations?rel=stocks,categories,products&type=stock,category,product&equalTo="+idproduct+","+color+","+idTalla+"&linkTo=id_product_stock,color_stock,size_stock&select=price_product_stock,number_stock,id_category_stock,url_category,image_stock,code_stock&token="+localStorage.getItem("token_user"),
    "method":"GET",
    "timeout":0,
  };
  $.ajax(settings).done(function(response){
    console.log(response);
    $(".precioProduct").val(response.result[0].price_product_stock);
    $(".imageProduct").append(`<img src="img/products/`+response.result[0].url_category+`/stock/`+response.result[0].image_stock+`" alt="img" class="p-0 m-0 img-circle mw-50 mx-auto d-block imgfunStock">`);
    if(response.result[0].number_stock > 0){
      $(".stokeorderProduct").append(`<p class="bg-success text-white text-center stfunStock">Si hay en Stock</p>`);
      $(".stockApro").val(1);
      $(".stockCode").val(`"`+ response.result[0].code_stock +`"`);
    }else{
      $(".stokeorderProduct").append(`<p class="bg-danger text-white text-center stfunStock">No hay en Stock. Se debe comprar</p>`);
      $(".stockApro").val(0);
      $(".stockCode").val(`"`+ response.result[0].code_stock +`"`);
    }
  });
}

function changeColor(event){
  let color = event.target.value.split("_")[1];
  let idColor = event.target.value.split("_")[0];
  $(".idColor").val(idColor+'_'+color);
  let idTalla = $(".idTalla").val().split("_")[1];
  changeTalla(0,idTalla);
}

function ChangeColorNew(event){
  let idColor = event.target.value.split("_")[0];
  let hexaColor = event.target.value.split("_")[1];
  let hexaText = event.target.value.split("_")[2];
  let color = event.target.value.split("_")[3];
  let valcolor = $(".valColor").val();
  let countColor = parseInt($(".valCountColor").val());
  if(color !== undefined){
    $(".colorSpesific").append(`<div class="colorSection_`+idColor+`"><p> <span class="rounded p-2 border border-dark" style="background-color: `+hexaColor+`; color: `+hexaText+`;">`+color+`</span>   <button title="Cancelar" type="button" class="btn btn-danger rounded-circle mr-2" onclick="eliminarTC('colorSection_',`+idColor+`,'`+hexaText+`_`+hexaColor+`_`+color+`')"><i class='fa fa-trash'></i></button></p></div>`);
    $(".valCountColor").val(countColor+1);
    if(valcolor==""){
      $(".valColor").val(hexaText+"_"+hexaColor+"_"+color);
    }else{
      $(".valColor").val(hexaText+"_"+hexaColor+"_"+color+","+valcolor);
    }
  }
}

function ChangeTallaNew2(event){
  let idTalla = event.target.value.split("_")[0];
  let talla = event.target.value.split("_")[1];
  let valTalla = $(".valTalla").val();
  let countTalla = parseInt($(".valCounTalla").val());
  if(talla !== undefined){
    $(".tallaSpesific").append(`<div class="tallaSection_`+idTalla+`"><p> <span class="rounded p-2 border border-dark text-dark">`+talla+`</span>   <button title="Cancelar" type="button" class="btn btn-danger rounded-circle mr-2" onclick="eliminarTC('tallaSection_',`+idTalla+`,'`+talla+`')"><i class='fa fa-trash'></i></button></p></div>`);
    $(".valCounTalla").val(countTalla+1);
    if(countTalla >= 0 ){
      $(".buttonStock").removeAttr("disabled");
    }
    if(valTalla==""){
      $(".valTalla").val(talla);
    }else{
      $(".valTalla").val(talla+","+valTalla);
    }
  }
}

function ChangeTallaNew(event){
  $(".selectTalla").show();
  let nomTipo = event.target.value.split("_")[1];
  let settings = {
    "url": $("#urlLocal").val()+"views/json/tallas.json",
    "method":"GET",
    "timeout":0,
  };
  $.ajax(settings).done(function(response){
    response.forEach((item,index) =>{
      if(item.nombreT){
        if(nomTipo == item.nombreT){
          let limpiar= $(".optTalla");
            limpiar.each(i=>{
              $(limpiar[i]).remove();
          });
          item.valores.forEach(item2 =>{
            $('[name="selectTalla"]').append(`<option class="optTalla" value="`+item2.idTalla+`_`+item2.nomTalla+`">`+item2.nomTalla+`</option>`);
            $('[name="EstacionProduct"]').append(`<option class="optTalla" value="`+item2.idTalla+`_`+item2.nomTalla+`">`+item2.nomTalla+`</option>`);
          });
        }
      }
    })
  });
}

function eliminarInvet(id, tabla, url){
  let URLactual = window.location;
  switAlert("confirm", "Esta seguro de eliminar del carrito de compras?", URLactual, null, null).then(resp => {
    if(resp == true){
      let settings = {
        "url" : url+tabla+"s?id="+id+"&nameId=id_"+tabla+"&token="+localStorage.getItem("token_user"),
        "method" : "DELETE",
        "timeout" : 0,
        "headers" : {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
   
      $.ajax(settings).done(function (response) {
          if (response.status == 200) {
            switAlert("success", "La talla y color se elimino correctamente!", URLactual, null, 1500);
          }else{
            switAlert("error", "Surgio un error al eliminar", URLactual, null, 1500);
          }
      });   
    }
  });
}

function eliminarInventarioTotal(id, api, url){
  let URLactual = window.location;
  switAlert("confirm", "Esta seguro de eliminar del carrito de compras?", URLactual, null, null).then(resp => {
    tokenValid();
    if(resp == true){
      let data = new FormData();
      data.append("idProduct", id);
      $.ajax({
        url : url + "ajax/stockDelete.php",
        method : "POST",
        data : data,
        contentType : false,
        cache : false,
        processData : false,
        success : function(response){
            let settings1 = {
              "url" : api+"products?id="+id+"&nameId=id_product&token="+localStorage.getItem("token_user"),
              "method" : "PUT",
              "timeout" : 0,
              "headers" : {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              "data": {
                      "status_product": 0,
              },
            };
            $.ajax(settings1).done(function(response1){
              if(response1.status == 200){
                  let settings2 = {
                    "url" : api+"stocks?id="+id+"&nameId=id_product_stock&token="+localStorage.getItem("token_user"),
                    "method" : "PUT",
                    "timeout" : 0,
                    "headers" : {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    "data": {
                      "status_stock": 0,
                    },
                  };
                  $.ajax(settings2).done(function(response2){
                    if(response2.status == 200){
                      switAlert("success", "Se elimino correctamente", null, null, 1500);
                      setTimeout(() => {
                        window.location = url+"acount&inventario";
                      }, 1500);
                    }
                  });
              }
            });
        },
        error : function(jqXHR, textStatus, errorThrown){
          console.log(textStatus + " " + errorThrown);
        }
      });
    }else{
      switAlert("error", "Inicia sesion nuevamente", URLactual, null, 1500);
    }
  });
}

function eliminarTC(nombre, id, tipo){
  let nuevoValor="";
  if(nombre == "colorSection_"){
    let valcolor = $(".valColor").val().split(",");
    let mayorQueDiez = valcolor.filter(element => element != tipo);
    let countColor = mayorQueDiez.length+1;

    mayorQueDiez.forEach(i => {
      nuevoValor +=i+",";
    });
    nuevoValor=nuevoValor.substring(0, nuevoValor.length - 1);
    $("."+nombre+id).remove();
    if(countColor <= 1 ){
      $(".buttonStock").attr('disabled', 'disabled');
    }
    if(countColor > 0){
      $(".valCountColor").val(countColor-1);
      $(".valColor").val(nuevoValor);

    }else{
      switAlert("error", "Ya no se puede eliminar por que ya no hay nada", null,null,null );
    }
  }else if(nombre == "tallaSection_"){
    let valTalla = $(".valTalla").val().split(",");
    let mayorQueDiez = valTalla.filter(element => element != tipo);
    let valCounTalla = mayorQueDiez.length+1;

    mayorQueDiez.forEach(i => {
      nuevoValor +=i+",";
    });
    nuevoValor=nuevoValor.substring(0, nuevoValor.length - 1);
    $("."+nombre+id).remove();

    if(valCounTalla <= 1 ){
      $(".buttonStock").attr('disabled', 'disabled');
    }
    if(valCounTalla > 0){
      $(".valCounTalla").val(valCounTalla-1);
      $(".valTalla").val(nuevoValor);

    }else{
      switAlert("error", "Ya no se puede eliminar por que ya no hay nada", null,null,null );
    }
  }
}

function addStock(){
  $(".selectStock").show();
  let color = $(".valColor").val().split(",");
  let talla = $(".valTalla").val().split(",");
  let colorF, count=1, count2=1;
 
  color.forEach(item =>{
    colorF = item.split("_");
    $('.selectStock').append(`
    <!-- IMAGEN-->
    <div class="row">
      <div class="form-group">
          <label>Imagen Principal Product<sup class="text-danger">*</sup></label>
          <div class="form-group__content">
              <label class="pb-5" for="`+count2+`logoProduct">
                  <img src="img/products/default/default-image.jpg" class="img-fluid `+count2+`changeProduct" style="width:150px;">
              </label>
              <div class="custom-file">
                  <input 
                  type="file"
                  id="`+count2+`logoProduct"
                  class="custom-file-input"
                  name="l_`+colorF[1]+`_`+colorF[2]+`"
                  accept="image/*"
                  maxSize="2000000"
                  onchange="validateImageJs(event,'`+count2+`changeProduct')"
                  required>
                  <div class="valid-feedback"></div>
                  <div class="invalid-feedback">El logo es requerida</div>
                  <label for="logoProduct" class="custom-file-label">Subir</label>
              </div>
          </div>
      </div>
    </div>
    `);
    count2++;
    talla.forEach(tallaF=>{
      $('.selectStock').append(`
      <div></div>
        <label>Color: <span class="rounded p-2 border border-dark" style="background-color: `+colorF[1]+`; color: `+colorF[0]+`;">`+colorF[2]+`</span> Talla: <span class="rounded p-2 border border-dark text-dark">`+tallaF+`</span><sup class="text-danger">*</sup></label>
        <div class="row">
          <!-- STOCK -->
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
            name="s_`+colorF[1]+`_`+colorF[2]+`_`+tallaF+`"
            required
            pattern = '[-\\(\\)\\0-9 ]{1,}'
            onchange="validatejs(event, 'phone')">
            <div class="valid-feedback"></div>
            <div class="invalid-feedback">Acompleta el campo</div>
          </div>
          <!-- PRECIO -->
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
              name="p_`+colorF[1]+`_`+colorF[2]+`_`+tallaF+`"
              required
              pattern = '[.\\,\\0-9]{1,}'
              onchange="validatejs(event, 'numbers')">
              <div class="valid-feedback"></div>
              <div class="invalid-feedback">Acompleta el campo</div>
            </div>
        </div>
      `);
      count++;
    });
  });
}

var metodpay= $('[name="payment-method"]').val()
function changemetodpay(event){
  metodpay = event.target.value;
}
// variable del total 
let total = $(".totalOrder").attr("total");

function checkout(){
  let forms = document.getElementsByClassName('needs-validation');
  var validation = Array.prototype.filter.call(forms, function(form) {
    if(form.checkValidity()){
      return [""];
    }
  })
  if(validation.length > 0){
    // pagar con paypal
    if(metodpay == "paypal"){
      switAlert("html", '<div id="paypal-button-container"></div>', null, null,null);
      paypal.Buttons({
         createOrder: function(data, actions){
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total
              }
            }]
          });
        },

        onApprove: function(data, actions){
          return actions.order.capture().then(function(details){
            if(details.status == 'COMPLETED'){
               newOrden("paypal","pending", details.id,total);
            }
            return false;
          })
        },

        onCancel: function(data){
          switAlert("error", "La transaccion a sido cancelada", null,null,null );
          return false;
        },

        onError: function(err){
          switAlert("error", "Ocurrio un error al hacer la transaccion", null,null,null );
          return false;
        }
    }).render('#paypal-button-container');

    }
    // pagar con payu
    if(metodpay== "payu"){
      newOrden("payu","test", null,total);
    }
    // pagar con mercado pago
    if(metodpay=="mercado-pago"){

      let settings = {
        "url":"https://free.currconv.com/api/v7/convert?q=USD_MXN&compact=ultra&apiKey=d30bf7aea983c90e05fe",
        "method":"GET",
        "timeout": 0
      };

      $.ajax(settings).error(function(response){
        if(response.status == 400){
          switAlert("error", "Ocurrio un error al hacer la cnversion", null,null,null );
          return;
        }
      })


      $.ajax(settings).done(function(response){
        let newTotal = Math.round( Number(response["USD_MXN"])*Number(total));
        
        const mp = new MercadoPago("TEST-bc5703df-47d0-418c-ad63-3ac657df2e02");
        let formMP = `
                    <style>
                      #form-checkout {
                        display: flex;
                        flex-direction: column;
                        max-width: 600px;
                      }
                  
                      .container {
                        display: inline-block;
                        border: 1px solid rgb(118, 118, 118);
                        border-radius: 2px;
                        padding: 1px 2px;
                      }
                    </style>
                    <img src="img/payment-method/mercadopagoLogo.png" class="m-3" style="width:100px"/>
                    <form id="form-checkout">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">  
                          <span class="input-group-text"><i class="far fa-credit-card"></i></span>
                        </div>
                        <div id="form-checkout__cardNumber" class="container form-control input-group-text"></div>
                      </div>
                      <div class="form-row">
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">  
                              <span class="input-group-text">FECHA</span>
                            </div>
                            <div id="form-checkout__expirationDate" class="container form-control"></div>
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">  
                              <span class="input-group-text">CVV/CVC</span>
                              </div>
                              <div id="form-checkout__securityCode" class="container form-control"></div>
                            </div>
                        </div>
                      </div>
  
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">  
                          <span class="input-group-text"><i class="far fa-credit-card"></i></span>
                        </div>
                      <input class="form-control" type="text" id="form-checkout__cardholderName" />
                      </div>
  
                      <select class="form-control mb-3" id="form-checkout__issuer"></select>
                      <select class="form-control mb-3" id="form-checkout__installments"></select>
                      <select class="form-control mb-3" id="form-checkout__identificationType"></select>
  
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">  
                          <span class="input-group-text"><i class="far fa-credit-card"></i></span>
                        </div>
                        <input class="form-control" type="text" id="form-checkout__identificationNumber" />
                      </div>
  
                      <div class="input-group mb-3">
                      <div class="input-group-prepend">  
                        <span class="input-group-text"><i class="far fa-credit-card"></i></span>
                      </div>
                       <input class="form-control" type="email" id="form-checkout__cardholderEmail" />
                      </div>
                  
                      <button type="submit" class="btn btn-primary btn-lg btn-block" id="form-checkout__submit">Pagar</button>
                      <progress value="0" class="mt-3 w-100 progress-bar">Carregando...</progress>
                    </form>
        `;
  
        switAlert("html", formMP, null, null,null);
        const cardForm = mp.cardForm({
          amount: newTotal.toString(),
          iframe: true,
          form: {
            id: "form-checkout",
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Numero de tarjeta",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "Código de seguridad",
            },
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Titular de la tarjeta",
            },
            issuer: {
              id: "form-checkout__issuer",
              placeholder: "Banco emisor",
            },
            installments: {
              id: "form-checkout__installments",
              placeholder: "Cuotas",
            },        
            identificationType: {
              id: "form-checkout__identificationType",
              placeholder: "Tipo de documento",
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: "Número del documento",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: "E-mail",
            },
          },
          callbacks: {
            onFormMounted: error => {
              if (error) return console.warn("Form Mounted handling error: ", error);
              console.log("Form mounted");
            },
            onSubmit: event => {
              event.preventDefault();
    
              const {
                paymentMethodId: payment_method_id,
                issuerId: issuer_id,
                cardholderEmail: email,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
              } = cardForm.getCardFormData();
  
              let response = {
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: Number(amount),
                installments: Number(installments),
                type: identificationType,
                number: identificationNumber,
              }
              response["total"]= newTotal;  
              newOrden("mercado-pago","test", null, response);
            },
            onFetching: (resource) => {
              console.log("Fetching resource: ", resource);
    
              // Animate progress bar
              const progressBar = document.querySelector(".progress-bar");
              progressBar.removeAttribute("value");
    
              return () => {
                progressBar.setAttribute("value", "0");
              };
            }
          },
        });  
      })
    }
    //pago en efectivo
    if(metodpay== "efectivo"){
      newOrden("efectivo","pagado", null,total);
    }
    return false;
  }else{
    return false;
  }
}

function formatFecha(fecha){
  let day = fecha.getDate();
  let Mes=fecha.getMonth()+1;
  let año=fecha.getFullYear();

  return año + '-' + Mes + '-' + day;
}


// TODO ESTO ES PARTE DEL CHECKOUT AL CREAR A ORDEN
  // // cantidad de productos
  // let envioOrderClass= $(".envioOrder");
  // let envioOrder =[];

  // envioOrderClass.each(i=>{
  // envioOrder.push( parseFloat( $(envioOrderClass[i]).html()));
  // });

  // let quantityOrderClass= $(".quantityOrder");
  // let quantityOrder =[];

  // quantityOrderClass.each(i=>{
  //   quantityOrder.push($(quantityOrderClass[i]).html());
  // });

  // // precio de cada producto 
  // let priceProductClass= $(".priceProd");
  // let priceProduct =[];

  // priceProductClass.each(i=>{
  //   priceProduct.push(( Number($(priceProductClass[i]).html().replace(/\s+/gi,''))));
  // });

  // let starProductClass= $(".estrellaStar");
  // let starProduct =[];
  // let ret = "";

  // starProductClass.each(i=>{
  //   ret = $(starProductClass[i]).val().split(",");
  //   ret.pop();
  //   ret = JSON.stringify(ret);
  //   starProduct.push(ret);  
  // });

// crear orden
// function newOrden(metodo,status,id,totals){
//   // id tienda
//   let idStoreClass= $(".idStore");
//   let idStore =[];

//   idStoreClass.each(i=>{
//     idStore.push($(idStoreClass[i]).val());
//   });

//   // url store
//   let urlStoreClass= $(".urlStore");
//   let urlStore =[];

//   urlStoreClass.each(i=>{
//     urlStore.push($(urlStoreClass[i]).val());
//   });

//   // id usuario
//   let idUser = $("#idUser").val();

//   // id producto
//   let idProductClass= $(".idProduct");
//   let idProduct =[];

//   idProductClass.each(i=>{
//     idProduct.push($(idProductClass[i]).val());
//   });

//   let stockProductClass= $(".stockProduct");
//   let stockProduct =[];

//   stockProductClass.each(i=>{
//     stockProduct.push($(stockProductClass[i]).val());
//   });

//   let salesProductClass= $(".salesProduct");
//   let salesProduct =[];

//   salesProductClass.each(i=>{
//     salesProduct.push($(salesProductClass[i]).val());
//   });

//   // detalles
//   let detailOrderClass= $(".detailsOrder");
//   let detailsOrder =[];

//   detailOrderClass.each(i=>{
//     detailsOrder.push($(detailOrderClass[i]).html().replace(/\s+/gi,''));
//   });


//   // Inforacion del usuario
//   let emailOrder = $("#emailOrder").val();
//   if(emailOrder == null || emailOrder == undefined || emailOrder == ""){
//     return;
//   }
//   let countryOrder = $("#countryOrder").val().split("_")[0];
//   let cityOrder = $("#cityOrder").val();
//   let phoneOrder = '';
//   let nameUserOrder = $("#nameUserSale").val();
//   if(nameUserOrder == null || nameUserOrder == undefined || nameUserOrder == ""){
//     return;
//   }
//   let methodUser = $("#methodUser").val();
//   if(methodUser != "administer"){
//     phoneOrder = $("#countryOrder").val().split("_")[1]+"_"+ $("#phoneOrder").val();
//   }else{
//     phoneOrder = $("#phoneOrder").val();
//   }
//   if(phoneOrder == null || phoneOrder == undefined || phoneOrder == ""){
//     return;
//   }
//   let addresOrder = $("#addresOrder").val();
//   let infoOrder = $("#infoOrder").val();
//   let mapOrder = null;
//   if(document.getElementById('mappp').dataset.value != null){
//     mapOrder = [document.getElementById('mappp').dataset.value.split(",")[0], document.getElementById('mappp').dataset.value.split(",")[1]];
//   }
//   // tiempo de entrega
//   let delytimeClass= $(".deliverytime");
//   let deliveryTime =[];

//   delytimeClass.each(i=>{
//     deliveryTime.push($(delytimeClass[i]).val());
//   });

//   // preguntamos is la cookie ya existe
//   let myCookie = document.cookie;
//   let listCookie = myCookie.split(";");
//   var arrayCoupon = "";

//   for (const i in listCookie) {
//     let list = listCookie[i].search("cuponMP");
//     // si list es mayor a -1 es por qu se ncontro la cooki
//     if (list > -1) {
//       arrayCoupon = listCookie[i].split("=")[1]
//       arrayCoupon = JSON.parse(decodeURIComponent(arrayCoupon));
//     } 
//   }

//   // preguntar si el usuario quiere guardar su direccion
//   let saveAdres= $("#create-account")[0].checked;
//   if(saveAdres && methodUser != "administer"){
//     let settings = {
//       "url": $("#urlApi").val()+"users?id="+idUser+"&nameId=id_user&token=" + localStorage.getItem("token_user"),
//       "method": "PUT",
//       "timeaot": 0,
//       "headers": {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       "data": {
//         "country_user": countryOrder,
//         "city_user": cityOrder,
//         "phone_user": phoneOrder,
//         "address_user": addresOrder,
//         "map_user": JSON.stringify(mapOrder)
//       },
//     };

//     $.ajax(settings).done(function (response) {});
//   }

//   let nameProduct= $(".name_producto");
//   let descriptions="";
//   let nameProducter =[];

//   nameProduct.each(i=>{
//     nameProducter.push($(nameProduct[i]).html());
//   });

//   nameProduct.each(i => {
//     descriptions += $(nameProduct[i]).html() + " x " +quantityOrder[i] + ", ";
//   });

//   descriptions=descriptions.slice(0,-2);

//   let foreachend = 0;
//   let idOrder=[];
//   let idSale=[];

//   idProduct.forEach((value,i) => {

//     let moment= Math.ceil(Number(deliveryTime[i]/2));
//     let sendDate = new Date();
//     sendDate.setDate(sendDate.getDate()+moment);

//     let delyvereDate= new Date();
//     delyvereDate.setDate(delyvereDate.getDate()+Number(deliveryTime[i]));

//     let procesOrder=[
//       {"stage":"reviewed",
//       "status":"ok",
//       "comment":"We have received your order, we start delivery process",
//       "date":formatFecha(new Date())},

//       {"stage":"sent",
//       "status":"pending",
//       "comment":"",
//       "date":formatFecha(sendDate)},
      
//       {"stage":"delivered",
//       "status":"pending",
//       "comment":"",
//       "date":formatFecha(delyvereDate)}
//     ];

   
//     // guardar orden
//     let settings = {
//       "url": $("#urlApi").val() + "orders?token=" + localStorage.getItem("token_user"),
//       "method": "POST",
//       "timeaot": 0,
//       "headers": {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       "data": {
//         "id_store_order": idStore[i],
//         "id_user_order": idUser,
//         "id_product_order": value,
//         "details_order": JSON.stringify(detailsOrder[i]),
//         "name_vendor_order": nameUserOrder,
//         "quantity_order": quantityOrder[i],
//         "price_order": priceProduct[i],
//         "stars_order": starProduct[i],
//         "email_order": emailOrder,
//         "country_order": countryOrder,
//         "city_order": cityOrder,
//         "phone_order": phoneOrder,
//         "address_order": addresOrder,
//         "notes_order": infoOrder,
//         "process_order": JSON.stringify(procesOrder),
//         "status_order": status,
//         "date_created_order": formatFecha(new Date())  
//       },
//     };

//     $.ajax(settings).done(function (response) {
//       idOrder.push(response.result.idlast);
//       if (response.status == 200) {
//         // Crear comision
//         let unitPrice = 0;
//         let commissionPrice = 0;
//         let count = 0;
//         idOrder.push(response.result.idlast);

//         if(arrayCoupon.length > 0){
//           arrayCoupon.forEach(value2=> {
//             if(value2 == urlStore[i]){
//               count--;
//             }else{
//               count++;
//             }
//           });
//         }
//         if(arrayCoupon.length == count){
//           // comision organica
//           unitPrice= (Number(priceProduct[i])*0.75).toFixed(2);
//           commissionPrice=(Number(priceProduct[i])*0.25).toFixed(2);
//         }else{
//           // comision por cupon
//           unitPrice= (Number(priceProduct[i])*0.95).toFixed(2);
//           commissionPrice=(Number(priceProduct[i])*0.05).toFixed(2);
//         }
        
//         // crear venta
//         let settings = {
//           "url": $("#urlApi").val() + "sales?token=" + localStorage.getItem("token_user"),
//           "method": "POST",
//           "timeaot": 0,
//           "headers": {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           "data": {
//             "id_order_sale": response.result.idlast,
//             "id_store_sale": idStore[i],
//             "name_product_sale": nameProducter[i],
//             "unit_price_sale": priceProduct[i],
//             "commision_sale": 0,
//             "payment_method_sale": metodo,
//             "id_payment_sale": id,
//             "status_sale": status,
//             "date_created_sale": formatFecha(new Date())  
//           },
//         };
        
//         $.ajax(settings).done(function (response) {
//           idSale.push(response.result.idlast);
//           if(response.status==200){
//             if(metodo == "paypal"){
//                // contruir venta y stock
//                let settings2 = {
//                 "url": $("#urlApi").val()+"products?id="+value+"&nameId=id_product&token=" + localStorage.getItem("token_user"),
//                 "method": "PUT",
//                 "timeaot": 0,
//                 "headers": {
//                   "Content-Type": "application/x-www-form-urlencoded",
//                 },
//                 "data": {
//                   "stock_product": Number(stockProduct[i])-Number(quantityOrder[i]),
//                   "sales_product": Number(salesProduct[i])+Number(quantityOrder[i])
//                 },
//               };
//               $.ajax(settings2).done(function (response) {});
//             }
//             foreachend++;
//             if(foreachend == idProduct.length){
//               if(metodo == "efectivo"){
//                 //Se modifica los valores para que el pago quede estable
//                 let numero= $(".numerostar").val(), cont=0;
//                 numero = JSON.parse(numero); 
//                 idProduct.forEach((idprod, i) => {
//                   let url = $("#urlApi").val()+'products?linkTo=id_product&equalTo='+idprod+'&select=stars_product';
                  
//                   let settings = {
//                       url: url,
//                       metod: 'GET',
//                       timeaot: 0,
//                   };
              
//                   $.ajax(settings).done(function (response) {
//                       if (response.status == 200) {
//                           let stars = JSON.parse(response.result[0].stars_product);  
                          
//                           if (stars != null && stars.length > 0) {
//                             stars.forEach((list,i) => {
//                             if(numero[i] != '' || numero[i] != NULL){
//                                   if(numero[i] == list.numero){
//                                       if((list.check == 'checkin') && (list.idUser == idUser )){
//                                           list.pagado= 'pagado';
//                                           list.time= '';
//                                           cont++;
//                                       }   
//                                   }
//                               }
//                             });
//                           }
//                           let settings = {
//                               'url': $("#urlApi").val() + 'products?id='+idprod+'&nameId=id_product&token=' + localStorage.getItem("token_user"),
//                               'method': 'PUT',
//                               'timeaot': 0,
//                               'headers': {
//                               'Content-Type': 'application/x-www-form-urlencoded',
//                               },
//                               'data': {
//                               'stars_product': JSON.stringify(stars),
//                               },
//                           };
              
//                           $.ajax(settings).done(function (response) {
//                               if (response.status == 200) {
//                                 document.cookie = "listSC=; max-age=0";
//                                 switAlert("success", "El pago se realizo correctamente...", $('#url').val() + "acount&my-shopping", null, 1500);
//                               }
//                           });
//                       }
//                    }); 
//               });     
//               }
//               if(metodo == "paypal"){
//                 document.cookie = "listSC=; max-age=0";
//                 switAlert("success", "El pago se realizo correctamente...", $('#url').val() + "acount&my-shopping", null, 1500); 
//                 window.location = $("#url").val()+"acount&my-shopping";    
//                 return;
//               }
//               if(metodo == "payu"){

//                 let action= "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/";
//                 let merchantId= 508029;
//                 let accountId=512324;
//                 let referenceCode= Math.ceil(Math.random()*1000000);
//                 let apiKey= "4Vj8eK4rloUd272L48hsrarnUA";
//                 let signature = hex_md5(apiKey+"~"+merchantId+"~"+referenceCode+"~"+totals+"~MXN");
//                 let test=1;
//                 let url =$("#url").val()+"checkout";
//                 let formPayu = ` 
//                                   <img src="img/payment-method/PAYULogo.png" style="width:100px"/>
//                                   <form method="post" action="`+action+`">
//                                     <input name="merchantId"      type="hidden"  value="`+merchantId+`"   >
//                                     <input name="accountId"       type="hidden"  value="`+accountId+`" >
//                                     <input name="description"     type="hidden"  value="`+descriptions+`"  >
//                                     <input name="referenceCode"   type="hidden"  value="`+referenceCode+`" >
//                                     <input name="amount"          type="hidden"  value="`+totals+`"   >
//                                     <input name="tax"             type="hidden"  value="0"  >
//                                     <input name="taxReturnBase"   type="hidden"  value="0" >
//                                     <input name="currency"        type="hidden"  value="MXN" >
//                                     <input name="signature"       type="hidden"  value="`+signature+`"  >
//                                     <input name="test"            type="hidden"  value="`+test+`" >
//                                     <input name="buyerEmail"      type="hidden"  value="`+emailOrder+`" >
//                                     <input name="responseUrl"     type="hidden"  value="`+url+`" >
//                                     <input name="confirmationUrl" type="hidden"  value="`+url+`" >
//                                     <input name="Submit" class="ps-btn p-0 px-5" type="submit"  value="Pagar" >
//                                   </form>`;
//                 switAlert("html", formPayu, null, null,null);
//                 setCookie("idProduct", JSON.stringify(idProduct),1);
//                 setCookie("quantityOrder", JSON.stringify(quantityOrder),1);
//                 setCookie("idOrder", JSON.stringify(idOrder),1);
//                 setCookie("idSale", JSON.stringify(idSale),1);
//               }
//               if(metodo == "mercado-pago"){

//                 totals["description"]=descriptions;
//                 totals["email"]=emailOrder;
//                 setCookie("idProduct", JSON.stringify(idProduct),1);
//                 setCookie("quantityOrder", JSON.stringify(quantityOrder),1);
//                 setCookie("idOrder", JSON.stringify(idOrder),1);
//                 setCookie("idSale", JSON.stringify(idSale),1);
//                 setCookie("mp", JSON.stringify(totals),1);

//                 window.location = $("#url").val()+"checkout";
//               }
//             }
//           }
//         });
//       }
//     });
//   });
// }


function goTermins(){
  $("html, body").animate({
    scrollTop: $("#tabContent").offset().top-50 
  });
}

function aceptTermins(event){
  if(event.target.checked){
    $("#crearStore").tab("show");
    $(".btnCreateStore").removeClass("disabled");
    $("html, body").animate({
      scrollTop: $("#crearStore").offset().top-100 
    });
  }else{
    $("#crearStore").removeClass("active");
    $(".btnCreateStore").addClass("disabled");
  }
}

function urlCreate(e,urlStore){
  var value = e.target.value;

  value = value.toLowerCase();
  value = value.replace(/[ ]/g, "-");
  value = value.replace(/[á]/g, "a");
  value = value.replace(/[é]/g, "e");
  value = value.replace(/[í]/g, "i");
  value = value.replace(/[ó]/g, "o");
  value = value.replace(/[ú]/g, "u");

  if(urlStore == "urlStore"){

    $('[name="'+urlStore+'"]').val(value);
    
    //mapa
    let resultList =  document.getElementById('mappp').value;

    if(resultList == undefined || resultList == null || resultList == "" ){
        resultList = [19.42847,-99.12766];
    }else{
      resultList = JSON.parse( resultList);
    }

    const title = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    let myMap=0;

    function mapa(resultList){

      if(myMap!=0){
        myMap.remove();
      }

    let finalMap= document.getElementById("mappp");
    finalMap.setAttribute("value", resultList);

    myMap= L.map('myMap').setView(resultList, 25);

    L.tileLayer(title,{
        maxZoom: 18,
    }).addTo(myMap);

    let iconMarker = L.icon({
        iconUrl:'img/mark.png',
        iconSize:[40,40],
        iconAnchor: [20,20]
    });

    let marker=  L.marker(resultList, {
      icon: iconMarker,
      draggable: true
    }).addTo(myMap);
    marker.on("moveend", (e)=> { 
      document.getElementById("mappp").setAttribute("value", [e.target._latlng.lat, e.target._latlng.lng ]);  
    });
    myMap.doubleClickZoom.disable();
    }

    mapa(resultList);

    document.getElementById('addresStore').addEventListener('change', () => {
        const pais= document.getElementById('countryStore').value.split("_")[0];
        const city= document.getElementById('cityStore').value;
        const adres= document.getElementById('addresStore').value;
        const query = pais + ", " + city + ", " + adres;

        fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
            .then(result => result.json())
            .then(parsedResult => {
                resultList=[ parseFloat(parsedResult[0].lat) , parseFloat( parsedResult[0].lon)];
                mapa(resultList);
                switAlert("success", "Puedes mover el marcador para una mejor localizacion", null, null, 1500);
            }).catch(error => switAlert("error", "Algun campo esta mal, intenta corregirlo para colocar tu direccion en el mapa...", null,null,null )
            );
    });
  }

  if(urlStore == "urlProduct"){
    $('[name="'+urlStore+'"]').val(value);
  }

}

function validarStore(){
  let formStore = $(".formStore");
  let error=0;
  formStore.each(i=>{
    if($(formStore[i]).val() == "" || $(formStore[i]).val() == undefined){
      error++;
      $(formStore[i]).parent().addClass("was-validated");
    }
  });
  if(error > 0){
    switAlert("error", "Algunos campos faltan o estan mal", null, null);
    return;
  }

  $("#crearProduct").tab("show");
  $(".btnCreateProduct").removeClass("disabled");

  $("html, body").animate({
    scrollTop: $("#crearProduct").offset().top-100 
  });
}
function changeToProduct(event){
  $(".productPrincipal").show();
  let idSubcategory = event.target.value.split("_")[0];
  let subcategoryName = event.target.value.split("_")[1];
  if(subcategoryName === "accesorios"){
    $('.categoryAccesorios').addClass('d-none');
    $(".buttonStock").removeAttr("disabled");
  }else{
    $('.categoryAccesorios').removeClass('d-none');
    $(".buttonStock").attr('disabled', 'disabled');
  }

  let settings = {
    "url": $("#urlApi").val()+"relations?rel=products,categories&type=product,category&equalTo="+idSubcategory+"&linkTo=id_subcategory_product&select=id_category,id_product,name_product",
    "method":"GET",
    "timeout":0,
  };

  $.ajax(settings).done(function(response){
    let limpiar= $(".optProduct");
    limpiar.each(i=>{
      $(limpiar[i]).remove();
    });
    response.result.forEach(item =>{
      $('[name="SelectProduct"]').append(`<option class="optProduct" value="`+item.id_category+`_`+item.id_product+`_`+item.name_product+`">`+item.name_product+`</option>`);
    });
  });
}
function changecategory(event){
  $(".subcategoryProduct").show();
  let idCategory = event.target.value.split("_")[0];
  let categoryName = event.target.value.split("_")[1];
  if(categoryName === "accesorios"){
    $('.categoryAccesorios').addClass('d-none');
    $(".buttonStock").removeAttr("disabled");
  }else{
    $('.categoryAccesorios').removeClass('d-none');
    $(".buttonStock").attr('disabled', 'disabled');
  }

  let settings = {
    "url": $("#urlApi").val()+"subcategories?equalTo="+idCategory+"&linkTo=id_category_subcategory&select=id_subcategory,name_subcategory,title_list_subcategory",
    "method":"GET",
    "timeout":0,
  };

  $.ajax(settings).done(function(response){
    let limpiar= $(".optSubCategory");
    limpiar.each(i=>{
      $(limpiar[i]).remove();
    });
    response.result.forEach(item =>{
      $('[name="subcategoryProduct"]').append(`<option class="optSubCategory" value="`+item.id_subcategory+`_`+item.name_subcategory+`">`+item.name_subcategory+`</option>`);
    });
  });
}

function changeLinea(event){
  $(".EstacionProduct").show();
  let idEstacion = event.target.value.split("_")[1];
  let settings = {
    "url": $("#urlLocal").val()+"views/json/metro.json",
    "method":"GET",
    "timeout":0,
  };
  $.ajax(settings).done(function(response){
    response.forEach((item,index) =>{
      if(item.nombre){
        if(idEstacion == item.nombre){
          let limpiar= $(".optEstation");
            limpiar.each(i=>{
              $(limpiar[i]).remove();
            });
            item.estaciones.forEach(item2 =>{
                $('[name="Estacionedit"]').append(`<option class="optEstation" value="`+item2._id.v+`_`+item2.nombre+`">`+item2.nombre+`</option>`);
                $('[name="EstacionProduct"]').append(`<option class="optEstation" value="`+item2._id.v+`_`+item2.nombre+`">`+item2.nombre+`</option>`);
              });
        }
      }
    })
  });
}

function changeTransporte(event, tipo){
  if(tipo == "Linea"){
    $(".LineaProduct").show();
    let trasporte = event.target.value;
    let settings = {
      "url": $("#urlLocal").val()+"views/json/"+ trasporte +".json",
      "method":"GET",
      "timeout":0,
    };
    $.ajax(settings).done(function(response){
      let limpiar= $(".optLinea");
      limpiar.each(i=>{
        $(limpiar[i]).remove();
      });
      response.forEach((item,index) =>{
        if(item.nombre){
          $('[name="LineaEdit"]').append(`<option class="optLinea" value="`+item._id.v+`_`+item.nombre+`_`+trasporte+`">`+item.nombre+`</option>`);
          $('[name="LineaProduct"]').append(`<option class="optLinea" value="`+item._id.v+`_`+item.nombre+`_`+trasporte+`">`+item.nombre+`</option>`);
        }
      })
    });
  }else if(tipo == "Estacion"){
    $(".EstacionProduct").show();
    let idEstacion = event.target.value.split("_")[1];
    let trasporte = event.target.value.split("_")[2];
    let settings = {
      "url": $("#urlLocal").val()+"views/json/"+trasporte+".json",
      "method":"GET",
      "timeout":0,
    };
    $.ajax(settings).done(function(response){
      response.forEach((item,index) =>{
        if(item.nombre){
          if(idEstacion == item.nombre){
            let limpiar= $(".optEstation");
              limpiar.each(i=>{
                $(limpiar[i]).remove();
              });
              item.estaciones.forEach(item2 =>{
                  $('[name="Estacionedit"]').append(`<option class="optEstation" value="`+item2._id.v+`_`+item2.nombre+`">`+item2.nombre+`</option>`);
                  $('[name="EstacionProduct"]').append(`<option class="optEstation" value="`+item2._id.v+`_`+item2.nombre+`">`+item2.nombre+`</option>`);
                });
          }
        }
      })
    });
  }
}

function changeProduct(event){
  $(".ColorProduct").show();
  $(".TallaProduct").show();
  let idproduct = event.target.value.split("_")[1];
  let settings = {
    "url": $("#urlApi").val()+"stocks?equalTo="+idproduct+"&linkTo=id_product_stock&select=id_stock,color_stock,size_stock,color_hexa_stock&token="+localStorage.getItem("token_user"),
    "method":"GET",
    "timeout":0,
  };
  $.ajax(settings).done(function(response){
      let limpiarColor= $(".optproductColor");
      let limpiarTalla= $(".optproductTalla");
      limpiarColor.each(i=>{
        $(limpiarColor[i]).remove();
    });
    limpiarTalla.each(i=>{
      $(limpiarTalla[i]).remove();
    });
    let hash = {};
    let response1 = response.result.filter(function(current) {
      var exists = !hash[current.color_stock];
      hash[current.color_stock] = true;
      return exists;
    });
    let response2 = response.result.filter(function(current) {
      var exists = !hash[current.size_stock];
      hash[current.size_stock] = true;
      return exists;
    });
    response1.forEach(item =>{
      $('[name="Coloredit"]').append(`<option class="optproductColor" value="`+idproduct+`_`+item.color_stock+`">`+item.color_stock+`</option>`);
      $('[name="ColorProduct"]').append(`<option class="optproductColor" value="`+idproduct+`_`+item.color_stock+`">`+item.color_stock+`</option>`);
    });
    response2.forEach(item =>{
      $('[name="Tallaedit"]').append(`<option class="optproductTalla" value="`+idproduct+`_`+item.size_stock+`">`+item.size_stock+`</option>`);
      $('[name="TallaProduct"]').append(`<option class="optproductTalla" value="`+idproduct+`_`+item.size_stock+`">`+item.size_stock+`</option>`);
    });
  });
}

function addInput(elem,type){
  let inputs = $("."+type);
  
  if(inputs.length < 5){
    if(type == "inputSummary"){
      $(elem).before(`
      <div class="form-group__content input-group mb-3 inputSummary">
                <div class="input-group-append">
                    <span class="input-group-text">
                        <button type="button" class="btn btn-danger" onclick="removedInput(`+inputs.length+`,'inputSummary')">&times;</button>
                    </span>
                </div>
                <input 
                class="form-control"
                type="text"
                name="summaryProduct_`+inputs.length+`"
                required
                pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                onchange="validatejs(event, 'parrafo')">
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">Acompleta el campo</div>
            </div>
      `);
    }

    if(type == "inputDetails"){
      $(elem).before(`
          <div class="row mb-3 inputDetails">
          <div class="col-12 col-lg-6 form-group__content input-group">
              <div class="input-group-append">
                  <span class="input-group-text">
                      <button type="button" class="btn btn-danger" onclick="removedInput(`+inputs.length+`,'inputDetails')">&times;</button>
                  </span>
              </div>
              <div class="input-group-append">
                  <span class="input-group-text">
                      Title:
                  </span>
              </div>
              <input 
              class="form-control"
              type="text"
              name="detailsTitleProduct_`+inputs.length+`"
              required
              pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
              onchange="validatejs(event, 'parrafo')">
              <div class="valid-feedback"></div>
              <div class="invalid-feedback">Acompleta el campo</div>
          </div>
          <div class="col-12 col-lg-6 form-group__content input-group">
              <div class="input-group-append">
                  <span class="input-group-text">
                      Value:
                  </span>
              </div>
              <input 
              class="form-control"
              type="text"
              name="detailsValueProduct_`+inputs.length+`"
              required
              pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
              onchange="validatejs(event, 'parrafo')">
              <div class="valid-feedback"></div>
              <div class="invalid-feedback">Acompleta el campo</div>
          </div>
      </div>
      `);
  }

  if(type == "inputEspesifications"){
    $(elem).before(`
    <div class="row mb-3 inputEspesifications">
        <div class="col-12 col-lg-6 form-group__content input-group">
            <div class="input-group-append">
                <span class="input-group-text">
                    <button type="button" class="btn btn-danger" onclick="removedInput(`+inputs.length+`,'inputEspesifications')">&times;</button>
                </span>
            </div>
            <div class="input-group-append">
                <span class="input-group-text">
                    Type:
                </span>
            </div>
            <input 
            class="form-control"
            type="text"
            name="EspesificTypeProduct_`+inputs.length+`"
            required
            pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
            onchange="validatejs(event, 'parrafo')">
            <div class="valid-feedback"></div>
            <div class="invalid-feedback">Acompleta el campo</div>
        </div>
        <div class="col-12 col-lg-6 form-group__content input-group">
            <input 
            class="form-control tags-input"
            data-role="tagsinput"
            type="text"
            placeholder="Escribe y preciona enter" 
            name="EspesificValuesProduct_`+inputs.length+`"
            required
            pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
            onchange="validatejs(event, 'parrafo')">
            <div class="valid-feedback"></div>
            <div class="invalid-feedback">Acompleta el campo</div>
        </div>
    </div>
    `);
    fcnTagInput();
}
  $('[name="'+type+'"]').val(inputs.length+1);  
  }else{
    switAlert("error", "Solo puedes colocar 5 summarys", null, null);
    return;
  }
}

function removedInput(indice,type){
  let inputs = $("."+type);
  
  if(inputs.length > 1){
    inputs.each(i=>{
      if(i==indice){
        $(inputs[i]).remove();
      }
    });
    $('[name="'+type+'"]').val(inputs.length-1); 
  }else{
    switAlert("error", "Ya no puedes eliminar ninguno", null, null);
    return;
  }
}

function fcnTagInput(){
  let target = $('.tags-input');
  if(target.length > 0){
    $(target).tagsinput();
  }
}

fcnTagInput();

Dropzone.autoDiscover = false;
let arrayFiles=[];
let countrrayfiles= 0;

$(".dropzone").dropzone({
  url: "/",
  addRemoveLinks: true,
  acceptedFiles: "image/jpeg, image/png",
  maxFilesSize: 2,
  maxFiles:10,
  init: function(){
    this.on("addedfile", function(file){
      countrrayfiles++;
      setTimeout( function(){
        arrayFiles.push({
          "file":file.dataURL,
          "type":file.type,
          "width":file.width,
          "height":file.height
        });
        $("[name='galeryProduct']").val(JSON.stringify(arrayFiles));
      },1000*countrrayfiles);
    });
    this.on("removedfile", function(file){
      countrrayfiles++;
      setTimeout( function(){
        let index = arrayFiles.indexOf({
          "file":file.dataURL,
          "type":file.type,
          "width":file.width,
          "height":file.height
        });
        arrayFiles.splice(index,1);
        $("[name='galeryProduct']").val(JSON.stringify(arrayFiles));
      },1000*countrrayfiles);
    });
    myDropzone = this;
    $(".saveBtn").click(function(){
      if(arrayFiles.length >= 1 ){
        myDropzone.processQueue();
      }else{
        switAlert("error", "La galeria esta vacia", null, null);
      }
    });
  }
});


function changeOfer(type){
  if(type.target.value == "Discount"){
    $(".typeOffer").html("Percent %:");
  }
  if(type.target.value == "Fixed"){
    $(".typeOffer").html("Price $:");
  }
}

function dispararmapa(){

  setTimeout(() => {
    
  
  //mapa
  if(document.getElementById('mapppp')){
    let resultList =  document.getElementById('mapppp').value;
    
    if(resultList != ""){
      if(resultList == undefined){
          resultList = [19.42847,-99.12766];
      }else{
        resultList = JSON.parse( resultList);
      }

      const title = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
      let myMap=0;

      function mapa(resultList){

        if(myMap!=0){
          myMap.remove();
        }

      let finalMap= document.getElementById("mapppp");
      finalMap.setAttribute("value", resultList);

      myMap= L.map('myMapp').setView(resultList, 25);

      L.tileLayer(title,{
          maxZoom: 18,
      }).addTo(myMap);

      let iconMarker = L.icon({
          iconUrl:'img/mark.png',
          iconSize:[40,40],
          iconAnchor: [20,20]
      });

      let marker=  L.marker(resultList, {
        icon: iconMarker,
        draggable: true
      }).addTo(myMap);
      marker.on("moveend", (e)=> { 
        document.getElementById("mapppp").setAttribute("value", [e.target._latlng.lat, e.target._latlng.lng ]);  
      });
      myMap.doubleClickZoom.disable();
      }

      mapa(resultList);

      document.getElementById('addresStore').addEventListener('change', () => {
          const pais= document.getElementById('countryStore').value.split("_")[0];
          const city= document.getElementById('cityStore').value;
          const adres= document.getElementById('addresStore').value;
          const query = pais + ", " + city + ", " + adres;

          fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
              .then(result => result.json())
              .then(parsedResult => {
                  resultList=[ parseFloat(parsedResult[0].lat) , parseFloat( parsedResult[0].lon)];
                  mapa(resultList);
                  switAlert("success", "Puedes mover el marcador para una mejor localizacion", null, null, 1500);
              }).catch(error => switAlert("error", "Algun campo esta mal, intenta corregirlo para colocar tu direccion en el mapa...", null,null,null )
              );
      });
    }
  }
}, 1000);
}

function stateCheck(event,idProduct,idview){
  let state = "";
  
  if(event.target.checked){
    state = "show"; 
  }else{
    state = "hidden";
  }
  
  let token = localStorage.getItem("token_user");
  let settings = {
    "url" : $("#urlApi").val()+"products?id="+idProduct+"&nameId=id_product&token="+token,
    "method": "PUT",
    "timeaot": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    "data": {
      "state_product": state,
    },
  };
  $.ajax(settings).done(function(response){
    if(response.status==200){}
  })
}

if($("[name='galeryProductOld']").length > 0 && $("[name='galeryProductOld']").val() != ''){
  var arrayFilesOld = JSON.parse($("[name='galeryProductOld']").val());
}
var arrayFilesDelete = Array();
function removeGallery(elem){
  $(elem).parent().remove();
  let index = arrayFilesOld.indexOf($(elem).attr("remove"));
  arrayFilesOld.splice(index, 1);
  $("[name='galeryProductOld']").val(JSON.stringify(arrayFilesOld));
  arrayFilesDelete.push($(elem).attr("remove"));
  $("[name='deleteGaleryProduct']").val(JSON.stringify(arrayFilesDelete));
}

function removesProducts(idProduct){
  switAlert("confirm", "Esta seguro de eliminar este producto?", null, null, null).then(resp => {
    if(resp){
      let data = new FormData();
      data.append("idProduct", idProduct);
      $.ajax({
        url : $("#path").val() + "ajax/productsDelete.php",
        method : "POST",
        data : data,
        contentType : false,
        cache : false,
        processData : false,
        success : function(response){
          let settings = {
            "url" : $("#urlApi").val()+"products?id="+idProduct+"&nameId=id_product&token="+localStorage.getItem("token_user"),
            "method" : "DELETE",
            "timeout" : 0,
            "headers" : {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          };

          $.ajax(settings).done(function(response){
            if(response.status == 200){
              switAlert("success", "El producto se añadio a la lista de deseos", null, null, 1500);
              setTimeout(() => {
                window.location = $("#path").val()+"acount&my-store";
              }, 1500);
            }
          });
        },
        error : function(jqXHR, textStatus, errorThrown){
          console.log(textStatus + " " + errorThrown);
        }
      });
    }

  })
}

$(document).on("click", ".nextProcess", function(){
  $(".orderBody").html("");
  let idStores = $(this).attr("idStores");
  let namessProduct = $(this).attr("namessProduct");
  let idOrder = $(this).attr("idOrder");
  let clientOrder = $(this).attr("clientOrder");
  let emailOrder = $(this).attr("emailOrder");
  let productOrder = $(this).attr("productOrder");
  let processOrder = JSON.parse(atob($(this).attr("processOrder")));

  $(".modal-title span").html("Order N. " + idOrder);

  if(processOrder[1].status == "pending"){
    processOrder.splice(2,1);
  }

  processOrder.forEach((value, index) => {
    let date = "";
    let status = "";
    let comment = "";

    if(value.status == "ok"){
      date = `
        <div class="col-10">
          <input 
          type="date" 
          class="form-control" 
          value="`+value.date+`" 
          readonly
          pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
          onchange="validatejs(event, 'parrafo')">
          <div class="valid-feedback"></div>
          <div class="invalid-feedback">El nombre es requerido</div>
        </div>
      `;
      status = `
        <div class="col-10 mt-3">
          <div class="text-uppercase">`+value.status+`</div>
        </div>
      `;
      comment = `
        <div class="col-10 mt-3">
          <textarea 
          class="form-control" 
          placeholder="Escribe un comentario" 
          readonly
          pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
          onchange="validatejs(event, 'parrafo')"
          >`+value.comment+`</textarea>
          <div class="valid-feedback"></div>
          <div class="invalid-feedback">El nombre es requerido</div>
        </div>
      `;
    }else{
      date = `
      <div class="col-10">
        <input 
        type="date" 
        class="form-control" 
        name="date" 
        value="`+value.date+`" 
        required
        pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
        onchange="validatejs(event, 'parrafo')">
        <div class="valid-feedback"></div>
        <div class="invalid-feedback">El nombre es requerido</div>
      </div>
    `;
    status = `
        <div class="col-10 mt-3">
          <input type="hidden" name="stage" value="`+value.stage+`">
          <input type="hidden" name="processOrder" value="`+$(this).attr("processOrder")+`">
          <input type="hidden" name="idOrder" value="`+idOrder+`">
          <input type="hidden" name="namessProduct" value="`+namessProduct+`">
          <input type="hidden" name="idStores" value="`+idStores+`">
          <input type="hidden" name="clientOrder" value="`+clientOrder+`">
          <input type="hidden" name="emailOrder" value="`+emailOrder +`">
          <input type="hidden" name="productOrder" value="`+productOrder+`">
          
          <div class="custom-control custom-radio custom-control-inline">
            <input
              id="status-pending"
              type="radio"
              class="custom-control-input"
              value="pending"
              name="status"
              checked>
              <label class="custom-control-label" for="status-pending">Pending</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              id="status-ok"
              type="radio"
              class="custom-control-input"
              value="ok"
              name="status">
              <label class="custom-control-label" for="status-ok">OK</label>
          </div>
        </div>
      `;
      comment = `
      <div class="col-10 mt-3">
        <textarea 
        class="form-control" 
        placeholder="Escribe un comentario" 
        name="comment" 
        required
        value="`+value.date+`" required
        pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
        onchange="validatejs(event, 'parrafo')">
        </textarea>
        <div class="valid-feedback"></div>
        <div class="invalid-feedback">El nombre es requerido</div>
      </div>
    `;
    }

    $(".orderBody").append(`
      <div class="card-header text-uppercase">`+value.stage+`</div>
      <div class="card-body">
        <div class="form-row">
          <div class="col-2 text-right">
            <label class="p-3 lead text-right">Date: </label>
          </div>
          `+date+`
        </div>
        <div class="form-row">
          <div class="col-2 text-right">
            <label class="p-3 lead">Status: </label>
          </div>
          `+status+`
        </div>
        <div class="form-row">
          <div class="col-2 text-right">
            <label class="p-3 lead">Comment: </label>
          </div>
          `+comment+`
        </div>
      </div>
    `);
  });
  $("#nextProcess").modal();
});

$(document).on("click", ".openDisputes", function(){
  $("[name='idOrder']").val($(this).attr("idOrder"));
  $("[name='idUser']").val($(this).attr("idUser"));
  $("[name='idStore']").val($(this).attr("idStore"));
  $("[name='emailStore']").val($(this).attr("emailStore"));
  $("[name='nameStore']").val($(this).attr("nameStore"));
  $("#newDispute").modal();
});

$(document).on("click", ".answerDiput", function(){
  $("[name='idDispute']").val($(this).attr("idDispute"));
  $("[name='clientDispute']").val($(this).attr("clientDispute"));
  $("[name='emailDispute']").val($(this).attr("emailDispute"));
  $("#answerDisput").modal();
});

$(document).on("click", ".answerMessage", function(){
  $("[name='idMessage']").val($(this).attr("idMessage"));
  $("[name='clientMessage']").val($(this).attr("clientMessage"));
  $("[name='emailMessage']").val($(this).attr("emailMessage"));
  $("[name='urlProduct']").val($(this).attr("urlProduct"));
  $("#answerMessage").modal();
});

$(document).on("click", ".CommentStars", function(){
  $("[name='starsProduct']").val($(this).attr("starsProduct"));
  $("[name='idUser']").val($(this).attr("idUser"));
  $("#newComment").modal();
});

$(document).on("click", ".starsList", function(){
  $(".starStart_product").html("");
  $(".btnStar").html("");
  $("#starListProduct").modal();
  let processOrder = $(this).attr("starsProduct");
  let urlapi = $(this).attr("urlApi");
  let starsProduct = "";
  let numero =  "";
  let precio = "";
  let check = "";
  let pagado = "";
  let time = "";
  let contstar = 0;
  let btnStar = "";
  let winStar = null;

  let url = urlapi+'products?linkTo=id_product&equalTo='+processOrder+'&select=stars_product,win_product';
      
  let settings = {
      url: url,
      metod: 'GET',
      timeaot: 0,
  };

  $.ajax(settings).done(function (response) {

    starsProduct = JSON.parse(response.result[0].stars_product);
    winStar = response.result[0].win_product;

    starsProduct.forEach((value, index) => {
      numero += "<pre>"+value.numero+"</pre>";
      precio += "<pre>"+value.precio+"</pre>";
      check += "<pre>"+value.check+"</pre>";
      pagado += "<pre>"+value.pagado+"</pre>";
      time += "<pre>"+value.time+"</pre>";
      if(value.pagado == "pagado" && value.check == "checkin"){
        contstar++;
      }
    });

    if(starsProduct.length == contstar && (winStar == null || winStar <= 0)){
      $("[name='StarWin']").val(processOrder);
      btnStar = `<button class='btn btn-warning ps-btn ps-btn--fullwidth'>Ganador</button>`;
    }
    if(starsProduct.length != contstar && (winStar == null || winStar <= 0)){
      $("[name='idProduct']").val(processOrder);
      btnStar = `<button class='btn btn-warning ps-btn ps-btn--fullwidth'>Resetear</button>`;
    }

    if(starsProduct.length == contstar && winStar > 0 ){
      btnStar = `<p class='btn btn-warning ps-btn ps-btn--fullwidth text-dark'> WINER : `+ winStar +`</p>`;
    }

    $(".starStart_product").append(`
    <table class="table dt-responsive dt-server" width="100%">
        
        <thead>

            <tr>   
                
                <th>#</th>   

                <th>Precio</th>

                <th>Check</th>   

                <th>Pagado</th>

                <th>Time</th>   

            </tr>

        </thead>
        <tbody>
          <td>`+numero+`</td>
          <td>`+precio+`</td>
          <td>`+check+`</td>
          <td>`+pagado+`</td>
          <td>`+time+`</td>
        </tbody>

    </table>
    `);
    $(".btnStar").append(` 
      `+ btnStar +`
    `);

  });
});

$(document).on("click", ".starsList", function(){
  $(".starStart_product").html("");
  $(".starwin_product").html("");
  $(".btnStar").html("");
  $("#starListProduct").modal();
  let processOrder = $(this).attr("starsProduct");
  let urlapi = $(this).attr("urlApi");
  let starsProduct = "";
  let numero =  "";
  let precio = "";
  let check = "";
  let pagado = "";
  let time = "";
  let contstar = 0;
  let btnStar = "";
  let Starwiner = "";
  let winStar = null;

  let url = urlapi+'products?linkTo=id_product&equalTo='+processOrder+'&select=stars_product,win_product';
      
  let settings = {
      url: url,
      metod: 'GET',
      timeaot: 0,
  };

  $.ajax(settings).done(function (response) {

    starsProduct = JSON.parse(response.result[0].stars_product);
    winStar = response.result[0].win_product;

    starsProduct.forEach((value, index) => {
      numero += "<pre>"+value.numero+"</pre>";
      precio += "<pre>"+value.precio+"</pre>";
      check += "<pre>"+value.check+"</pre>";
      pagado += "<pre>"+value.pagado+"</pre>";
      time += "<pre>"+value.time+"</pre>";
      if(value.pagado == "pagado" && value.check == "checkin"){
        contstar++;
      }
    });

    if(starsProduct.length == contstar && (winStar == null || winStar <= 0)){
      $("[name='StarWin']").val(processOrder);
      Starwiner=`
      <div class="modal-body text-left p-5">        
            <!-- video -->
            <div class="form-group">
                <label>Video Product Ex: <strong>Type: </strong>Youtube, <strong>Id:</strong> 2h3h2h2b3</label>
                <div class="row mb-3">
                    <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0">
                        <div class="input-group-append">
                            <span class="input-group-text">
                                Type:
                            </span>
                        </div>
                        <select name="type_video" class="form-control">
                            <option value="">Select Platform</option>
                            <option value="youtube">YouTube</option>
                            <option value="vimeo">Vimeo</option>
                        </select>
                    </div>
                    <div class="col-12 col-lg-6 form-group__content input-group mx-0">
                        <div class="input-group-append">
                            <span class="input-group-text">
                                Id:
                            </span>
                        </div>
                        <input 
                        type="text"
                        class="form-control"
                        name="id_video"
                        maxlength="100"
                        pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                        onchange="validatejs(event, 'parrafo')">
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback">Acompleta el campo</div>
                    </div>
                </div>
            </div>
            <!-- Adquisicion -->
            <div class="form-group">
                    <div class="row mb-3">
                        <!-- precio venta -->
                        <div class="col-12 col-lg-3">
                            <label>Numero winer<sup class="text-danger">*</sup></label>
                            <div class="form-group__content input-group mx-0 pr-0">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        Numero:
                                    </span>
                                </div>
                                <input 
                                type="number"
                                class="form-control"
                                name="num_win"
                                min="0"
                                step="any"
                                pattern = "[.\\,\\0-9]{1,}"
                                onchange="validatejs(event, 'numbers')"
                                required>
                                <div class="valid-feedback"></div>
                                <div class="invalid-feedback">Acompleta el campo</div>
                            </div>          
                        </div>
                    </div>
                </div>
        </div>
      `;
      $(".starwin_product").append(` 
      `+ Starwiner +`
    `);
      btnStar = `<button class='btn btn-warning ps-btn ps-btn--fullwidth'>Ganador</button>`;
    }
    if(starsProduct.length != contstar && (winStar == null || winStar <= 0)){
      $("[name='idProduct']").val(processOrder);
      btnStar = `<button class='btn btn-warning ps-btn ps-btn--fullwidth'>Resetear</button>`;
    }

    if(starsProduct.length == contstar && winStar > 0 ){
      btnStar = `<p class='btn btn-warning ps-btn ps-btn--fullwidth text-dark'> WINER : `+ winStar +`</p>`;
    }

    $(".starStart_product").append(`
    <table class="table dt-responsive dt-server" width="100%">
        
        <thead>

            <tr>   
                
                <th>#</th>   

                <th>Precio</th>

                <th>Check</th>   

                <th>Pagado</th>

                <th>Time</th>   

            </tr>

        </thead>
        <tbody>
          <td>`+numero+`</td>
          <td>`+precio+`</td>
          <td>`+check+`</td>
          <td>`+pagado+`</td>
          <td>`+time+`</td>
        </tbody>

    </table>
    `);
    
    $(".btnStar").append(` 
      `+ btnStar +`
    `);

  });
});

function eliminarDeTicket(modulo){
  let trElement = document.querySelector('.cla_' + modulo);
  let nombreCookie = "productos";
  if (trElement) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nombreCookie + "=") === 0) {
        encontrado = 1;
        modificarCookie = JSON.parse(cookie.substring(nombreCookie.length + 1));
      }
    }
    if(encontrado == 1){
      delete(modificarCookie[modulo]);
      setCookie(nombreCookie, JSON.stringify(modificarCookie), 1);
    }  
    trElement.remove();
  } else {
    switAlert("error", "No se elimino", null, null);
    return
  }
  agregarProductTicketTotal();
}

function agregarProductTicket(accion){
  if(accion == "pedido"){
    let codeStock = $("#stockCode").val().replace(/['"]/g, '');;
    if(codeStock){
      let category = $("#categoryProductAdd").val().split("_")[1];
      let subCategory = $("#subCategoryProductAdd").val().split("_")[1];
      let product = $("#productAdd").val().split("_")[2];
      let peso = $("#pesoProductAdd").val();
      let altura = $("#alturaProductAdd").val();
      let color = $("#colorProductAdd").val().split("_")[1];
      let talla = $("#tallaProductAdd").val().split("_")[1];
      let precio = $("#precioProductAdd").val();
      let cantidad = $("#cantidadProductAdd").val();
      let totalSalida = parseInt(precio*cantidad);
      let coments = $("#comentProductAdd").val();
      let nombreCookie = "productos"
      let  modificarCookie = "";
      const productos = {
        [codeStock] : { nombre: product, cantidad: cantidad, color: color, talla: talla, precio: precio,peso:peso,altura:altura, comets: coments },
      };
      let productoss = BuscarCoki("productos");
      if(productoss.status == 200){
        modificarCookie = JSON.parse(productoss.data);
        modificarCookie[codeStock] = { nombre: product, cantidad: cantidad, color: color, talla: talla, precio: precio,peso:peso,altura:altura, comets: coments };
        setCookie(nombreCookie, JSON.stringify(modificarCookie), 1);
      }else{
        setCookie(nombreCookie, JSON.stringify(productos), 1);
      }
      if(category === "Accesorios"){
        talla = "Sin Talla";
      }
      if(category && subCategory && product && peso && altura && color && talla && precio && cantidad){
        let nombreClas = 'cla_'+codeStock;
        if (document.querySelector("."+nombreClas)){ 
            $(`.${'cla_'+codeStock}`).remove();
            $(".product_name_order").append(`
              <tr class="`+nombreClas+`">
                <td>
                  <a href="<?php //echo $path.$pOrder->url_product ?>" class="name_producto">`+product+` (Talla: <span>`+talla+`</span>, Color:<span>`+color+`</span>)</a>  <button title="Eliminar" type="button" class="btn btn-danger rounded-circle mr-2" onclick="eliminarDeTicket('`+codeStock+`')"><i class='fa fa-trash'></i></button>
                  <div class="small text_secondary">
                  <div>Cantidad:<strong><span class="quantityOrder"><?php //echo $count; ?> `+cantidad+` </span></strong></div>
                </td>
                <td class="text-right"><div><span class="priceProd">$`+totalSalida+`</span></div></td> 
              </tr>   
            `);
        }else{
          $(".product_name_order").append(`
          <tr class="`+nombreClas+`">
            <td>
              <a href="<?php //echo $path.$pOrder->url_product ?>" class="name_producto">`+product+` (Talla: <span>`+talla+`</span>, Color:<span>`+color+`</span>)</a>  <button title="Eliminar" type="button" class="btn btn-danger rounded-circle mr-2" onclick="eliminarDeTicket('`+codeStock+`')"><i class='fa fa-trash'></i></button>
              <div class="small text_secondary">
              <div>Cantidad:<strong><span class="quantityOrder"><?php //echo $count; ?> `+cantidad+` </span></strong></div>
            </td>
            <td class="text-right"><div><span class="priceProd">$`+totalSalida+`</span></div></td> 
          </tr>   
          `);
        }
      }else{
        switAlert("error", "Acompleta los datos", null, null);
      }
    }else{
      switAlert("error", "Faltan datos", null, null);
      return;
    }
  } if(accion == "contacto"){
    document.getElementsByClassName("telefonoTicket")[0].textContent = "";
    document.getElementsByClassName("nameTicket")[0].textContent = "";
    document.getElementsByClassName("estacionTicket")[0].textContent = "";
    document.getElementsByClassName("fechaTicket")[0].textContent = "";
    document.getElementsByClassName("horaTicket")[0].textContent = "";
    document.getElementsByClassName("envioSubmit")[0].textContent = "";
    document.getElementsByClassName("PagoPrev_ticket")[0].textContent = "";
    let nombreCookie = "contacto";
    let pagoPrev = parseInt($("#pagoPrevProductAdd").val());
    let diaEntrega = $("#diaProductAdd").val();
    let hora = $("#horaProductAdd").val();
    let trasporte = $("#transporteProductAdd").val();
    let linea = $("#lineaProductAdd").val().split("_")[1];
    let estacion = $("#estacionProductAdd").val().split("_")[1];
    let name = $("#nameProductAdd").val();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let telefono = $("#telefonoProductAdd").val();
    let messenger = $("#messengerProductAdd").val();
    let fecha = new Date(diaEntrega);
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let mesNumero = fecha.getMonth();
    let mesNombre = meses[mesNumero];
    let dia = fecha.getDate();
    let partesHora = hora.split(":");
    let horaNumerica = parseInt(partesHora[0]);
    let minutos = partesHora[1];
    let ampm = horaNumerica >= 12 ? 'PM' : 'AM';
    let hora12h = horaNumerica % 12 || 12;
    $(".telefonoTicket").append(" " +telefono);
    $(".nameTicket").append(" " +name);
    $(".estacionTicket").append(" " +linea + " - " + estacion);
    $(".fechaTicket").append(" " +dia+'-'+mesNombre);
    $(".horaTicket").append(" " +hora12h + ":" + minutos + " " + ampm);
    let encontrado = 0;
    const contacto = { pagoprev: pagoPrev, dia: dia+'-'+mesNombre, hora: hora12h + ":" + minutos + " " + ampm, transporte:trasporte, linea: linea, Estacion: estacion,nombre:name,telefono:telefono, messer:messenger};
    let modificarCookie = "";
    let contactos = BuscarCoki("contacto");
    if(contactos.status == 200){
      modificarCookie =  { pagoprev: pagoPrev, dia: dia+'-'+mesNombre, hora: hora12h + ":" + minutos + " " + ampm, transporte:trasporte, linea: linea, Estacion: estacion,nombre:name,telefono:telefono, messer:messenger};
      setCookie(nombreCookie, JSON.stringify(modificarCookie), 1);
    }else{
      setCookie(nombreCookie, JSON.stringify(contacto), 1);
    }   
  }
  agregarProductTicketTotal();
}
function agregarProductTicketTotal(){
  let totalPrecio =0;
  let productos = BuscarCoki("productos");
  if(productos.status == 200){
    let contacto = BuscarCoki("contacto");
    if(contacto.status == 200){
      let modificarCookie1 = JSON.parse(productos.data);
      let modificarCookie2 = JSON.parse(contacto.data);
      for (let key in modificarCookie1) {
        if (modificarCookie1.hasOwnProperty(key)) {
            let producto = modificarCookie1[key];
            totalPrecio += parseFloat(producto.precio) * parseInt(producto.cantidad);
        }
      }
      document.getElementsByClassName("PagoPrev_ticket")[0].textContent = "";
      document.getElementsByClassName("totalOrder_ticket")[0].textContent = "";
      document.getElementsByClassName("envioSubmit")[0].textContent = "";
      let envioOrder = 0;
      if (modificarCookie2.transporte == "Mexibus" || modificarCookie2.transporte == "Suburbano"){
        envioOrder = 100;
      }else if(modificarCookie2.linea == "Línea B" || modificarCookie2.linea == "Línea 5" || modificarCookie2.linea == "Línea 2"){
        envioOrder = 0;
      }else{
        envioOrder = 50;
      }
      totalPrecio = totalPrecio - modificarCookie2.pagoprev + envioOrder;
      $(".envioSubmit").append(envioOrder);
      $(".PagoPrev_ticket").append(modificarCookie2.pagoprev);
      $(".totalOrder_ticket").append(totalPrecio);
    }
  }else{
    let contacto = BuscarCoki("contacto");
    if(contacto.status == 200){
      let modificarCookie2 = JSON.parse(contacto.data);
      document.getElementsByClassName("PagoPrev_ticket")[0].textContent = "";
      document.getElementsByClassName("totalOrder_ticket")[0].textContent = "";
      document.getElementsByClassName("envioSubmit")[0].textContent = "";
      let envioOrder = 0;
      if (modificarCookie2.transporte == "Mexibus" || modificarCookie2.transporte == "Suburbano"){
        envioOrder = 100;
      }else if(modificarCookie2.linea == "Línea B" || modificarCookie2.linea == "Línea 5" || modificarCookie2.linea == "Línea 2"){
        envioOrder = 0;
      }else{
        envioOrder = 50;
      }
      totalPrecio = totalPrecio - modificarCookie2.pagoprev + envioOrder;
      $(".envioSubmit").append(envioOrder);
      $(".PagoPrev_ticket").append(modificarCookie2.pagoprev);
      $(".totalOrder_ticket").append(totalPrecio);
      }
  }
}
function borrarTiket(cookie1, cookie2, phat){
  let cookies = document.cookie.split(';');
  let encontrado = 0;
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookie1 + "=") === 0) {
      document.cookie = cookie1 + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      encontrado =1;
    }
    if (cookie.indexOf(cookie2 + "=") === 0) {
      document.cookie = cookie2 + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      encontrado = 2;
    }
  }
  if(encontrado != 0){
    switAlert("success", "Se borro el el ticket", null, null, 1500);
    setTimeout(function() {
      if(phat != null){
        window.location.replace(phat); 
      }else{
        location.reload();
      }
    }, 500);
  }else{
    switAlert("error", "No existe ningun ticket", null, null);
  }
}

function buscarTelefono (url){
  let telefono = $("#telefonoProductAdd").val();
  let urlbuyer = url+'buyers?linkTo=phone_buyer&equalTo='+telefono+'&select=id_buyer,status_buyer,name_buyer&token='+ localStorage.getItem("token_user");            
  let settings = {
      url: urlbuyer,
      metod: 'GET',
      timeaot: 0,
  };
  $.ajax(settings).done(function (response) {
    if (response.status == 200) {
      let status = response.result[0].status_buyer;
      let name = response.result[0].name_buyer;
      if(name != null || name != ""){
        $("#nameProductAdd").val(name);
      }
      if(status == 2){
        switAlert("error", "El comprador No es apto para venta, pero si puedes agendarlo", null, null);
      }else if(status == 3){
        switAlert("error", "El comprador  esta Bloqueado, No Generar mas ventas", null, null);
      }
    }
  })
}
function modalOrderOpen(id, colorStatus, nameBuyer, nameStatus, url, phone,stacion,hora,follow,fecha,count,pagoPrev,envio,price,comment){
  localStorage.removeItem('modalOrderOpen');
  let modalOrderData = {
    id: id,
    colorStatus: colorStatus,
    nameBuyer: nameBuyer,
    nameStatus: nameStatus,
    url: url,
    phone: phone,
    stacion: stacion,
    hora: hora,
    follow: follow,
    fecha: fecha,
    count: count,
    pagoPrev: pagoPrev,
    envio: envio,
    price: price,
    comment: comment
  };
localStorage.setItem('modalOrderOpen', JSON.stringify(modalOrderData));

  let modalHeader = ` 
    <div class="modal-header bg-${colorStatus}">
      <div class="w-100 text-center">
        <h3 class="modal-title">Orden N° ${id} - ${nameBuyer} - ${nameStatus} </h3>
      </div>
      <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">&times;</button>
    </div>
  `;
  let listSale ="";
  let selectSale = "id_product,name_product,url_product,id_sale,id_stock,code_stock_sale,stock_out_sale,spesifications_sale,status_sale,count_sale,price_sale,comment_sale,color_stock,size_stock,color_hexa_stock,name_category,image_stock,stock_out_sale,number_stock,url_category,date_update_stock";
  let urlbuyer = url+'relations?rel=sales,products,stocks,categories&type=sale,product,stock,category&linkTo=id_order_sale&equalTo='+id+'&select='+selectSale+'&token='+ localStorage.getItem("token_user");            
  let settings = {
      url: urlbuyer,
      metod: 'GET',
      timeaot: 0,
  };
  $.ajax(settings).done(function (response) {
    let botonConfirmacion = ''
    if(nameStatus == "Pendiente" || nameStatus == "Cambio"){
      botonConfirmacion = '<a title="Confirmar" href="https://wa.me/'+phone+'?text=Buenas%20tardes%20sr%20'+ nameBuyer.replace(/ /g, "%20")+',%20espero%20que%20se%20encuentre%20muy%20bien!.%20Mi%20nombre%20es%20Karmen%20repartidora%20de%20la%20tienda%20BERSANI,%20le%20mando%20este%20mensaje%20para%20confirmar%20su%20pedido%20...%20para%20el%20dia%20de%20mañana%20en%20estacion%20'+ stacion.replace(/ /g, "%20")+'%20a%20las%20'+ hora.replace(/ /g, "%20")+'%20¿Me%20podria%20confirmar%20la%20cita%20por%20favor?" target="_blank" class="btn btn-success btn-circle btn-acciones1"><i class="fab fa-whatsapp"></i></a>';
    }else if(nameStatusr == "Confirmado"){
      botonConfirmacion = '<a title="Entregar" href="https://wa.me/'+phone+'?text=Buen%20dia%20sr%20'+ nameBuyer.replace(/ /g, "%20")+'.%20Ya%20me%20encuentro%20en%20camino%20para%20entregar%20su%20paquete%20en%20estacion%20'+ stacion.replace(/ /g, "%20")+'%20a%20las%20'+ hora.replace(/ /g, "%20")+'.%20Quedo%20atenta%20a%20su%20respuesta!" target="_blank" class="btn btn-success btn-circle btn-acciones1"><i class="fas fa-running"></i></a>';
    }
    let coment = (comment != null && comment != "")? comment : "";
    let count_sale = 0;
    let totalPrice = 0;
    let textColor = "";
    let colorStock = "";
    let countSale = 0;
    let peso = "";
    let altura = "";
    let comentario= "";
    let colorStatusSale = "";
    let priceSale = 0;
    let botonSale = "";
    response.result.forEach((sale,key)=>{
      
      if(sale.color_hexa_stock == "000000"){
        textColor= "#FFF";
      }else{
        textColor= "#000";
      } 
      const specifications = JSON.parse(sale.spesifications_sale);
      specifications.forEach((espesificacion, key2) => {
          peso = espesificacion.peso[0];
          altura = espesificacion.altura[0];
      });
      let nombreProducto = sale.name_product;
      if (nombreProducto.length > 15) {
        nombreProducto = nombreProducto.substring(0, 12) + '...';
      }
      if(sale.status_sale  != "Cancelado"){
        comentario = sale.comment_sale;
        if (sale.comment_sale.length > 20) {
          comentario = sale.comment_sale.substring(0, 17) + '...';
        }
      }else{
          sale.comment_sale = "";
          comentario = "";
      }
      if(sale.stock_out_sale == 0){
          colorStock = "danger";
      }else if(sale.stock_out_sale == 1){
          colorStock = "success";
      }
      if(sale.status_sale === "Cancelado"){
          colorStatusSale = "danger";
      }else{
          colorStatusSale = "";
      }
      let botonStock="";
      if(sale.stock_out_sale==1){
        botonStock = `<a><img title="inStock" src="img/products/${sale.name_category}/stock/${sale.image_stock}" alt="${sale.name_category}" class="btn btn-danger btn-circle btn-acciones3"></a>`;
      }else if(sale.stock_out_sale==0){
        botonStock = `<button title="Limbo" type="button" class="btn btn-danger btn-circle btn-acciones3" onclick="statusConfirmRegister(${sale.stock_out_sale},${sale.number_stock},${sale.id_stock},${sale.id_sale},'inStock', '${url}','registers','${sale.url_category}','${sale.image_stock}')"><img src="img/products/${sale.name_category}/stock/${sale.image_stock}" alt="${sale.name_category}" class="rounded-circle"></button>`;
      } 

      countSale = (sale.status_sale != "Cancelado")? sale.count_sale : 0; 
      count_sale += parseInt(countSale); 
      priceSale = (sale.status_sale != "Cancelado")? sale.price_sale : 0; 
      totalPrice += parseFloat(sale.price_sale * countSale);

      if(sale.status_sale != "Cancelado"){
        botonSale = `<a title="Editar" data-toggle="modal" onclick="modalEditSale('${url}','${sale.id_product}','${sale.name_product}','${sale.url_category}','${sale.image_stock}','${sale.color_stock}','${sale.size_stock}','${sale.price_sale}','${sale.count_sale}','${sale.comment_sale}','${peso}','${altura}','${sale.code_stock_sale}','${sale.stock_out_sale}',${sale.number_stock}, '${sale.date_update_stock}', ${sale.id_sale},${id},${count},${parseFloat(price)+parseFloat(pagoPrev)-parseFloat(envio)})" class="btn btn-info btn-circle btn-acciones2"><i class='fa fa-pencil-alt'></i></a>
                    <button title="Cancelar" type="button" class="btn btn-danger btn-circle btn-acciones2" onclick="statusConfirmRegister(${sale.stock_out_sale},${sale.number_stock},${sale.id_stock},${sale.id_sale},'Cancelado', '${url}','registers','${sale.price_sale}','${sale.count_sale}')"><i class='fa fa-trash'></i></button>`
      } else{
        botonSale = `<button title="Activar" type="button" class="btn btn-warning" onclick="statusConfirmRegister(${sale.stock_out_sale},${sale.number_stock},${sale.id_stock},${sale.id_sale},'Cancelado', '${url}','registers','${sale.price_sale}','${sale.count_sale}')">Reactivar</button>`
      }

      listSale += `
      <tr class="bg-${colorStatusSale}" id="bloqueSale-${sale.id_sale}">
        <th scope="row" class="bg-${colorStock}" id="btnImg-${sale.id_sale}">
          <div class="ps-product--cart justify-content-center">
            <div class="ps-product__thumbnail"> 
              ${botonStock}
            </div>
          </div>
        </th>
        <th scope="row" class=" tooltiper centerText">${nombreProducto}<span class="tooltiptext font-weight-bold">${sale.name_product}</span></th>
        <td class="centerText" style="background-color: #${sale.color_hexa_stock};color: ${textColor};">${sale.color_stock}</td>
        <td  class="tooltiper centerText">${sale.size_stock}<span class="tooltiptext "><span class="font-weight-bold">Peso:</span> ${peso} kg <span class="font-weight-bold">Altura:</span> ${altura} M</span></td>
        <td class="centerText">${countSale}</td>
        <td class="centerText">$ ${priceSale}</td>
        <td class="centerText tooltiper">${comentario} <span class="tooltiptext font-weight-bold">${sale.comment_sale}</span></td>
        <td class="centerText">
          <div class=" d-flex align-items-center justify-content-center">
            ${botonSale}
          </div>     
        </td>
      </tr>
      `
    });
    let modalBody = `
    <div class="modal-body">
        <div class="modal-container">
            <div class="row mb-3">
                <div class="col-4 font-weight-bold text-right d-flex align-items-center justify-content-center">Acciones</div>
                <div class="col-8 text-center d-flex align-items-center justify-content-center ">
                ${botonConfirmacion}
                <a title="facebook" href="https://www.facebook.com/messages/t/${follow}" target='_blank' class='btn btn-primary btn-circle btn-acciones1'><i class="fab fa-facebook"></i></a>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <div class="row no-gutters">
                        <div class="col-4 font-weight-bold text-right border rounded-pill text-center">Dia & Hora</div>
                        <div class="col-8 border rounded-pill d-flex justify-content-center align-items-center">${hora} - ${fecha}</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row no-gutters">
                        <div class="col-4 font-weight-bold rounded-pill text-right border text-center">Estacion</div>
                        <div class="col-8 border rounded-pill d-flex justify-content-center align-items-center">${stacion}</div>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
            <div class="col-4">
                    <div class="row no-gutters">
                        <div class="col-4 font-weight-bold text-right border rounded-pill text-center">Cantiad</div>
                        <div class="col-8 border rounded-pill d-flex justify-content-center align-items-center">${count}</div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row no-gutters">
                        <div class="col-4 font-weight-bold text-right border rounded-pill text-center">PagoPrev</div>
                        <div class="col-8 border rounded-pill d-flex justify-content-center align-items-center">$ ${pagoPrev}</div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row no-gutters">
                        <div class="col-4 font-weight-bold text-right border rounded-pill text-center">Envio</div>
                        <div class="col-8 border rounded-pill d-flex justify-content-center align-items-center">$ ${envio}</div>
                    </div>
                </div>
            
            </div>
            <div class="row mb-3">
                <div class="col-4 font-weight-bold rounded-pill text-right border text-center">Pago Total:</div>
                <div class="col-8 font-weight-bold border rounded-pill d-flex justify-content-center align-items-center">$ ${price}</div>
            </div>
            <form class="needs-validation" novalidate method="post">
                <div class="row mb-3">
                    <div class="col-12 col-lg-12 form-group__content input-group mx-0 pr-0 mb-3">
                        <div class="input-group-append font-weight-bold rounded-pill text-right border text-center">
                            <span class="d-flex font-weight-bold justify-content-center align-items-center">
                                Comentarios
                            </span>
                        </div>
                        <input 
                        type="text"
                        class="form-control text-white border rounded-pill d-flex justify-content-center align-items-center"
                        placeholder="Comentarios"
                        name="comentProduct"
                        id="comentProductAdd"
                        value="${coment}"
                        maxlength="50"
                        required
                        pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
                        onchange="validatejs(event, 'parrafo')"
                        >
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback">Acompleta el campo</div>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                <button type="button" class="ps-btn col-4 ps-btn--fullwidth d-flex justify-content-center align-items-center" onclick="agregarProductTicket('pedido')">Agregar</button>
                </div>    
            </form>
        </div>
        <table class="table table-bordered table-dark rounded-lg table-rounded">
            <thead>
                <tr>
                <th scope="col" class="font-weight-bold">Imagen</th>
                <th scope="col" class="font-weight-bold">Nombre</th>
                <th scope="col" class="font-weight-bold">Color</th>
                <th scope="col" class="font-weight-bold">Talla</th>
                <th scope="col" class="font-weight-bold">Cantidad</th>
                <th scope="col" class="font-weight-bold">Precio</th>
                <th scope="col" class="font-weight-bold">Comentario</th>
                <th scope="col" class="font-weight-bold">Acciones</th>
                </tr>
            </thead>
            <tbody>
              ${listSale}
                <tr>
                    <td></td>
                    <th scope="row" class="centerText font-weight-bold">Total</th>
                    <td></td>
                    <td  class="tooltiper"></td>
                    <td class="centerText font-weight-bold">${count_sale}</td>
                    <td class="centerText font-weight-bold">$ ${totalPrice}</td>
                    <td >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `;
    document.querySelector('#viewRegister .modal-content').innerHTML = modalHeader + modalBody;
  });
  // Mostrar el modal
  $('#viewRegister').modal('show');
}
function modalEditSale(url,id,producto,category,imgproduct,color,talla,precio,cantidad,comentario,peso,altura, codeStock, outStock,numberStock,updateStock,idSale,idOrder, countOrder, priceOrder){
  let selectSale = "id_stock,color_stock,size_stock,color_hexa_stock";
  let urlbuyer = url+'stocks?equalTo='+id+'&linkTo=id_product_stock&select='+selectSale+'&token='+ localStorage.getItem("token_user");            
  let settings = {
      url: urlbuyer,
      metod: 'GET',
      timeaot: 0,
  };
  $.ajax(settings).done(function (response) {
    
    let tallas=  "";
    let colores = "";
    let hash = {};
    let response1 = response.result.filter(function(current) {
      var exists = !hash[current.color_stock];
      hash[current.color_stock] = true;
      return exists;
    });
    let response2 = response.result.filter(function(current) {
      var exists = !hash[current.size_stock];
      hash[current.size_stock] = true;
      return exists;
    });

    response1.forEach(item =>{
      colores += `<option class="optproductColor" value="`+id+`_`+item.color_stock+`">`+item.color_stock+`</option>`;
    });
    response2.forEach(item =>{
      tallas += `<option class="optproductTalla" value="`+id+`_`+item.size_stock+`">`+item.size_stock+`</option>`;
    });

    let modalForm = `
      <h3>${producto}<sup class="text-danger">*</sup></h3>
      <figure id="imageProduct" class="imageProduct">
      <img src="img/products/${category}/stock/${imgproduct}" alt="img" class="p-0 m-0 img-circle mw-50 mx-auto d-block imgfunStock">
      </figure>
      <div id="stokeorderProduct" class="stokeorderProduct"></div>
      <input type="hidden" value="${url}" id="urlApi">
      <input type="hidden" value="${outStock}" name="stockApro" id="stockApro2" class="stockApro">
      <input type="hidden" value="${codeStock}" name="stockCode" id="stockCode2" class="stockCode">
      <input type="hidden" class="idTalla" >
      <input type="hidden" class="idColor" >
      <div class="form-group">
          <label>ESPESIFICACIONES ORDEN<sup class="text-danger">*</sup></label>
          <div class="row mb-5">
              <!-- Color -->
              <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 ColorProduct">
                  <div class="input-group-append">
                      <span class="input-group-text">
                          Color:
                      </span>
                  </div>
                  <select 
                  class="form-control"
                  name="ColorProduct"
                  id="colorProductAdd2"
                  onchange="changeColor(event)"
                  required>
                  <option value="1_${color}">${color}</option>
                  ${colores}
                  </select>
                  <div class="valid-feedback"></div>
                  <div class="invalid-feedback">El nombre es requerido</div>
              </div>
              <!-- talla -->
              <div class="col-12 col-lg-6 form-group__content input-group mx-0 pr-0 mb-3 TallaProduct">
                  <div class="input-group-append">
                      <span class="input-group-text">
                          Talla:
                      </span>
                  </div>
                  <select 
                  class="form-control"
                  name="TallaProduct"
                  id="tallaProductAdd2"
                  onclick="changeTalla(event)"
                  required>
                  <option value="1_${talla}">${talla}</option>
                  ${tallas}
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
                  value="${precio}"
                  name="precioProduct"
                  id="precioProductAdd2"
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
                  id="cantidadProductAdd2"
                  value="${cantidad}"
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
                  value="${comentario}"
                  id="comentProductAdd2"
                  maxlength="260"
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
                  id="pesoProductAdd2"
                  value="${peso}"
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
                  value="${altura}"
                  id="alturaProductAdd2"
                  maxlength="50"
                  required
                  pattern = "[.\\,\\0-9]{1,}"
                  onchange="validatejs(event, 'numbers')"
                  onblur="agregarProductTicket('pedido')">
                  <div class="valid-feedback"></div>
                  <div class="invalid-feedback">Acompleta el campo</div>
              </div>
              
          </div>
          <button type="button" class="ps-btn ps-btn--fullwidth" onclick="editarSale(${idSale},'${codeStock}',${outStock},${numberStock},'${updateStock}',${cantidad},${idOrder},${countOrder},${priceOrder},${precio})">Editar</button>
      </div>
    `;
    
    
    document.querySelector('#editSale .needs-validation').innerHTML = modalForm;
  });
   // Mostrar el modal
   $('#editSale').modal('show');
}
function editarSale(id, codeStokOrg, outStockOrg, numberStock,updateStock, cantidadOrg,idOrder, countOrder, priceOrder, precioSale){
  localStorage.setItem('modalOpen', 'true');
  let precio = $("#precioProductAdd2").val();
  let cantidad = $("#cantidadProductAdd2").val();
  let comentario = $("#comentProductAdd2").val();
  let peso = $("#pesoProductAdd2").val();
  let altura = $("#alturaProductAdd2").val();
  let codeStock = $("#stockCode2").val().replace(/"/g, '');
  let stockOut = $("#stockApro2").val();

  if(precio != "" || cantidad != "" || peso != "" || altura != "" || codeStock != "" || stockOut != ""){
    let espesificationsProduct = [{"peso":[peso],"altura":[altura]}];

    let urlbuyer = $("#urlApi").val()+'relations?rel=stocks,products,categories&type=stock,product,category&linkTo=code_stock&equalTo='+codeStock+'&select=id_stock,cost_product_stock,id_product,id_category&token='+ localStorage.getItem("token_user");            
    let settings = {
        url: urlbuyer,
        metod: 'GET',
        timeaot: 0,
    };
    $.ajax(settings).done(function (response2) {
      if (response2.status == 200) {
        let settings2 = {
          "url": $("#urlApi").val()+"sales?id="+id+"&nameId=id_sale&token=" + localStorage.getItem("token_user"),
          "method": "PUT",
          "timeaot": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          "data": {
            "id_product_sale": response2.result[0].id_product,
            "id_stock_sale": response2.result[0].id_stock,
            "id_category_sale": response2.result[0].id_category,
            "code_stock_sale": codeStock,
            "stock_out_sale": stockOut,
            "spesifications_sale": JSON.stringify(espesificationsProduct),
            "cost_sale": response2.result[0].cost_product_stock,
            "count_sale": cantidad,
            "price_sale": precio,
            "comment_sale": comentario
          },
        };
        $.ajax(settings2).done(function (response3) {
          if(response3.status == 200){          
            let settings2 = {
              "url": $("#urlApi").val()+"orders?id="+idOrder+"&nameId=id_order&token=" + localStorage.getItem("token_user"),
              "method": "PUT",
              "timeaot": 0,
              "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              "data": {
                "count_order": parseInt(countOrder) - parseInt(cantidadOrg) + parseInt(cantidad),
                "price_order": parseFloat( priceOrder) + (parseFloat(precio) * parseInt(cantidad)) - (parseInt(cantidadOrg) * parseFloat(precioSale))
              },
            };
            $.ajax(settings2).done(function (response) {
             if(response.status == 200){
              if(codeStokOrg == codeStock){
                switAlert("success", "El producto se Modifico correctamente sin modificarStock!", null, null, 1500);
              }else{
                if(outStockOrg == 0){
                  switAlert("success", "El producto se Modifico correctamente sin modificarStock!", null, null, 1500);
                }else  if(outStockOrg == 1){
                  const givenDate = new Date(updateStock);    
                  const now = new Date();
                  const differenceInMilliseconds = now - givenDate;
                  const millisecondsIn24Hours = 5 * 60 * 60 * 1000;
                  if(numberStock == 0){
                    let settings2 = {
                      "url": $("#urlApi").val()+"stocks?id="+codeStokOrg+"&nameId=code_stock&token=" + localStorage.getItem("token_user"),
                      "method": "PUT",
                      "timeaot": 0,
                      "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      "data": {
                        "number_stock": numberStock + cantidadOrg
                      },
                    };
                    $.ajax(settings2).done(function (response) {
                      if(response.status == 200){
                        switAlert("success", "El producto se modifico correctamente y se agrego al stock!", null, null, 1500);
                      }
                    });

                  }else if(differenceInMilliseconds <= millisecondsIn24Hours){
                    let settings2 = {
                      "url": $("#urlApi").val()+"stocks?id="+codeStokOrg+"&nameId=code_stock&token=" + localStorage.getItem("token_user"),
                      "method": "PUT",
                      "timeaot": 0,
                      "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      "data": {
                        "number_stock": numberStock + cantidadOrg
                      },
                    };
                    $.ajax(settings2).done(function (response) {
                      if(response.status == 200){
                        switAlert("success", "El producto se modifico correctamente y se agrego al stock!", null, null, 1500);
                      }
                    });
                  }else{
                    switAlert("success", "El producto se modifico correctamente sin modificarStock!", null, null, 1500);
                  }
                }else{
                  switAlert("success", "El producto se Modifico correctamente sin modificarStock!", null, null, 1500);
                }
              }
              location.reload();
              }
            });



          }else{
            switAlert("error", "Algo salio mal, Intenta de nuevo!", null, null);
            return;
          }
        });
      }
    });
  }else{
    switAlert("error", "Datos incompletos", null, null);
    return;
  }
}