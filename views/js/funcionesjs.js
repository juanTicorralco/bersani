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
if(urlMaster != "http://bersani.com/acount&login" && urlMaster != "http://bersani.com/acount&enrollment" && !localStorage.getItem("token_user")){
  setCookie("UrlPage", urlMaster, 1);
}
/* funcion para resetear url de los filtros */
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


function statusConfirm(numStock,idStock,idOrder, statusorder,urlApi) {
  if(statusorder == "Finalizado"){
    switAlert("confirm", "Esta seguro de Finalizar la orden?", null, null, null).then(resp => {
      if (resp == true) {
        // revisar que el token coincida con la bd
        let token = localStorage.getItem("token_user");
        let comment = $(".comentOrderVale").val();
        let gastos = $(".gastosOrderVale").val();
        if( comment == undefined ||  comment == ""){
          comment = null;
        }
        if(gastos == undefined || gastos == ""){
          gastos=null;
        }
        let settings = {
          "url": urlApi + "orders?id=" + idOrder + "&nameId=id_order&token=" + token,
          "method": "PUT",
          "timeaot": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          "data": {
            "status_order": statusorder,
            "comment_order": comment,
            "bills_order": gastos,
          },
        };
        $.ajax(settings).done(function (response) {
              if (response.status == 200) {
                switAlert("success", "La orden se finalizo correctamente", null, null, 1500);
                window.location = $("#url").val()+"acount&orders";   
              }else{
                switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
              }
        });
      }
    });
  }else if(statusorder == "Cancelado"){
    switAlert("confirm", "Esta seguro de Cancelar la orden?", null, null, null).then(resp => {
      if (resp == true) {
        // revisar que el token coincida con la bd
        let token = localStorage.getItem("token_user");
        let settings = {
          "url": urlApi + "orders?id=" + idOrder + "&nameId=id_order&token=" + token,
          "method": "PUT",
          "timeaot": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          "data": {
            "status_order": statusorder,
          },
        };
        $.ajax(settings).done(function (response) {
              if (response.status == 200) {
                let settings2 = {
                  "url": urlApi + "stocks?id=" + idStock + "&nameId=id_stock&token=" + token,
                  "method": "PUT",
                  "timeaot": 0,
                  "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  "data": {
                    "number_stock": numStock+1,
                  },
                };
                $.ajax(settings2).done(function (response) {
                  if (response.status == 200) {
                    switAlert("success", "La orden se cancelo correctamente", null, null, 1500);
                    window.location = $("#url").val()+"acount&orders";   
                  }else{
                    switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
                  }
                });
              }else{
                switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
              }
        });
      }
    });
  }else{
    switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
  }
}

function statusConfirmRegister(outStockOrder,numStock,idStock,idOrder, statusorder,urlApi) {
  if(statusorder == "Cancelado"){
    switAlert("confirm", "Esta seguro de Cancelar la orden?", null, null, null).then(resp => {
      if (resp == true) {
        // revisar que el token coincida con la bd
        let token = localStorage.getItem("token_user");
        let settings = {
          "url": urlApi + "orders?id=" + idOrder + "&nameId=id_order&token=" + token,
          "method": "PUT",
          "timeaot": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          "data": {
            "status_order": statusorder,
          },
        };
        $.ajax(settings).done(function (response) {
              if (response.status == 200) {
                if(outStockOrder == 1){
                  let settings2 = {
                    "url": urlApi + "stocks?id=" + idStock + "&nameId=id_stock&token=" + token,
                    "method": "PUT",
                    "timeaot": 0,
                    "headers": {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    "data": {
                      "number_stock": numStock+1,
                    },
                  };
                  $.ajax(settings2).done(function (response) {
                    if (response.status == 200) {
                      switAlert("success", "La orden se cancelo correctamente y se actualizo el stock", null, null, 1500);
                      window.location = $("#url").val()+"acount&registers";   
                    }else{
                      switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
                    }
                  });
                }else if(outStockOrder == 0){
                  switAlert("success", "La orden se cancelo correctamente y no afecto el stock", null, null, 1500);
                      window.location = $("#url").val()+"acount&registers";  
                }
              }else{
                switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
              }
        });
      }
    });
  }else if(statusorder == "Confirmado" && outStockOrder==1){
    switAlert("confirm", "Esta seguro de confirmar la orde/n?", null, null, null).then(resp => {
      if (resp == true) {
        // revisar que el token coincida con la bd    
        let token = localStorage.getItem("token_user");
        let settings = {
          "url": urlApi + "orders?id=" + idOrder + "&nameId=id_order&token=" + token,
          "method": "PUT",
          "timeaot": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          "data": {
            "status_order": statusorder,
          },
        };
        $.ajax(settings).done(function (response) {
          if (response.status == 200) {
              switAlert("success", "La orden se confirmo correctamente pero no hay stock", null, null, 1500);
              window.location = $("#url").val()+"acount&registers";
          }else{
            switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
          }
        });
      }
    });
  }else{
    switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
  }
}

function plusStock(idOrder, urlApi){
  switAlert("confirm", "Esta seguro de que ya hay stock?", null, null, null).then(resp => {
    if (resp == true) {
      // revisar que el token coincida con la bd
      let token = localStorage.getItem("token_user");
      let settings = {
        "url": urlApi + "orders?id=" + idOrder + "&nameId=id_order&token=" + token,
        "method": "PUT",
        "timeaot": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "data": {
          "stock_out_order": 1,
        },
      };
      $.ajax(settings).done(function (response) {
            if (response.status == 200) {
              switAlert("success", "La aprovado el stock", null, null, 1500);
              window.location = $("#url").val()+"acount&registers";   
            }else{
              switAlert("error", "Ocurrio un error. Vuelve a intentarlo", null, null, 1500);
            }
      });
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
    "url": $("#urlApi").val()+"relations?rel=stocks,categories,products&type=stock,category,product&equalTo="+idproduct+","+color+","+idTalla+"&linkTo=id_product_stock,color_stock,size_stock&select=price_product_stock,number_stock,id_category_stock,url_category,image_stock",
    "method":"GET",
    "timeout":0,
  };
  $.ajax(settings).done(function(response){
    $(".precioProduct").val(response.result[0].price_product_stock);
    $(".imageProduct").append(`<img src="img/products/`+response.result[0].url_category+`/stock/`+response.result[0].image_stock+`" alt="img" class="p-0 m-0 img-circle mw-50 mx-auto d-block imgfunStock">`);
    if(response.result[0].number_stock > 0){
      $(".stokeorderProduct").append(`<p class="bg-success text-white text-center stfunStock">Si hay en Stock</p>`);
      $(".stockApro").val(1);
    }else{
      $(".stokeorderProduct").append(`<p class="bg-danger text-white text-center stfunStock">No hay en Stock. Se debe comprar</p>`);
      $(".stockApro").val(0);
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
  let colorF, count=1;
 
  color.forEach(item =>{
    colorF = item.split("_");
    talla.forEach(tallaF=>{
      $('.selectStock').append(`
      <div></div>
        <label>Color: <span class="rounded p-2 border border-dark" style="background-color: `+colorF[1]+`; color: `+colorF[0]+`;">`+colorF[2]+`</span> Talla: <span class="rounded p-2 border border-dark text-dark">`+tallaF+`</span><sup class="text-danger">*</sup></label>
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
                name="s_`+colorF[1]+`_`+colorF[2]+`_`+tallaF+`"
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
                name="p_`+colorF[1]+`_`+colorF[2]+`_`+tallaF+`"
                required
                pattern = '[.\\,\\0-9]{1,}'
                onchange="validatejs(event, 'numbers')">
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">Acompleta el campo</div>
            </div>
            <div class="form-group">
                <label>Imagen Principal Product<sup class="text-danger">*</sup></label>
                <div class="form-group__content">
                    <label class="pb-5" for="`+count+`logoProduct">
                        <img src="img/products/default/default-image.jpg" class="img-fluid `+count+`changeProduct" style="width:150px;">
                    </label>
                    <div class="custom-file">
                        <input 
                        type="file"
                        id="`+count+`logoProduct"
                        class="custom-file-input"
                        name="l_`+colorF[1]+`_`+colorF[2]+`_`+tallaF+`"
                        accept="image/*"
                        maxSize="2000000"
                        onchange="validateImageJs(event,'`+count+`changeProduct')"
                        required>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback">El logo es requerida</div>
                        <label for="logoProduct" class="custom-file-label">Subir</label>
                    </div>
                </div>
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

  // cantidad de productos
  let envioOrderClass= $(".envioOrder");
  let envioOrder =[];

  envioOrderClass.each(i=>{
  envioOrder.push( parseFloat( $(envioOrderClass[i]).html()));
  });

  let quantityOrderClass= $(".quantityOrder");
  let quantityOrder =[];

  quantityOrderClass.each(i=>{
    quantityOrder.push($(quantityOrderClass[i]).html());
  });

  // precio de cada producto 
  let priceProductClass= $(".priceProd");
  let priceProduct =[];

  priceProductClass.each(i=>{
    priceProduct.push(( Number($(priceProductClass[i]).html().replace(/\s+/gi,''))));
  });

  let starProductClass= $(".estrellaStar");
  let starProduct =[];
  let ret = "";

  starProductClass.each(i=>{
    ret = $(starProductClass[i]).val().split(",");
    ret.pop();
    ret = JSON.stringify(ret);
    starProduct.push(ret);  
  });

// crear orden
function newOrden(metodo,status,id,totals){
  // id tienda
  let idStoreClass= $(".idStore");
  let idStore =[];

  idStoreClass.each(i=>{
    idStore.push($(idStoreClass[i]).val());
  });

  // url store
  let urlStoreClass= $(".urlStore");
  let urlStore =[];

  urlStoreClass.each(i=>{
    urlStore.push($(urlStoreClass[i]).val());
  });

  // id usuario
  let idUser = $("#idUser").val();

  // id producto
  let idProductClass= $(".idProduct");
  let idProduct =[];

  idProductClass.each(i=>{
    idProduct.push($(idProductClass[i]).val());
  });

  let stockProductClass= $(".stockProduct");
  let stockProduct =[];

  stockProductClass.each(i=>{
    stockProduct.push($(stockProductClass[i]).val());
  });

  let salesProductClass= $(".salesProduct");
  let salesProduct =[];

  salesProductClass.each(i=>{
    salesProduct.push($(salesProductClass[i]).val());
  });

  // detalles
  let detailOrderClass= $(".detailsOrder");
  let detailsOrder =[];

  detailOrderClass.each(i=>{
    detailsOrder.push($(detailOrderClass[i]).html().replace(/\s+/gi,''));
  });


  // Inforacion del usuario
  let emailOrder = $("#emailOrder").val();
  if(emailOrder == null || emailOrder == undefined || emailOrder == ""){
    return;
  }
  let countryOrder = $("#countryOrder").val().split("_")[0];
  let cityOrder = $("#cityOrder").val();
  let phoneOrder = '';
  let nameUserOrder = $("#nameUserSale").val();
  if(nameUserOrder == null || nameUserOrder == undefined || nameUserOrder == ""){
    return;
  }
  let methodUser = $("#methodUser").val();
  if(methodUser != "administer"){
    phoneOrder = $("#countryOrder").val().split("_")[1]+"_"+ $("#phoneOrder").val();
  }else{
    phoneOrder = $("#phoneOrder").val();
  }
  if(phoneOrder == null || phoneOrder == undefined || phoneOrder == ""){
    return;
  }
  let addresOrder = $("#addresOrder").val();
  let infoOrder = $("#infoOrder").val();
  let mapOrder = null;
  if(document.getElementById('mappp').dataset.value != null){
    mapOrder = [document.getElementById('mappp').dataset.value.split(",")[0], document.getElementById('mappp').dataset.value.split(",")[1]];
  }
  // tiempo de entrega
  let delytimeClass= $(".deliverytime");
  let deliveryTime =[];

  delytimeClass.each(i=>{
    deliveryTime.push($(delytimeClass[i]).val());
  });

  // preguntamos is la cookie ya existe
  let myCookie = document.cookie;
  let listCookie = myCookie.split(";");
  var arrayCoupon = "";

  for (const i in listCookie) {
    let list = listCookie[i].search("cuponMP");
    // si list es mayor a -1 es por qu se ncontro la cooki
    if (list > -1) {
      arrayCoupon = listCookie[i].split("=")[1]
      arrayCoupon = JSON.parse(decodeURIComponent(arrayCoupon));
    } 
  }

  // preguntar si el usuario quiere guardar su direccion
  let saveAdres= $("#create-account")[0].checked;
  if(saveAdres && methodUser != "administer"){
    let settings = {
      "url": $("#urlApi").val()+"users?id="+idUser+"&nameId=id_user&token=" + localStorage.getItem("token_user"),
      "method": "PUT",
      "timeaot": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      "data": {
        "country_user": countryOrder,
        "city_user": cityOrder,
        "phone_user": phoneOrder,
        "address_user": addresOrder,
        "map_user": JSON.stringify(mapOrder)
      },
    };

    $.ajax(settings).done(function (response) {});
  }

  let nameProduct= $(".name_producto");
  let descriptions="";
  let nameProducter =[];

  nameProduct.each(i=>{
    nameProducter.push($(nameProduct[i]).html());
  });

  nameProduct.each(i => {
    descriptions += $(nameProduct[i]).html() + " x " +quantityOrder[i] + ", ";
  });

  descriptions=descriptions.slice(0,-2);

  let foreachend = 0;
  let idOrder=[];
  let idSale=[];

  idProduct.forEach((value,i) => {

    let moment= Math.ceil(Number(deliveryTime[i]/2));
    let sendDate = new Date();
    sendDate.setDate(sendDate.getDate()+moment);

    let delyvereDate= new Date();
    delyvereDate.setDate(delyvereDate.getDate()+Number(deliveryTime[i]));

    let procesOrder=[
      {"stage":"reviewed",
      "status":"ok",
      "comment":"We have received your order, we start delivery process",
      "date":formatFecha(new Date())},

      {"stage":"sent",
      "status":"pending",
      "comment":"",
      "date":formatFecha(sendDate)},
      
      {"stage":"delivered",
      "status":"pending",
      "comment":"",
      "date":formatFecha(delyvereDate)}
    ];

   
    // guardar orden
    let settings = {
      "url": $("#urlApi").val() + "orders?token=" + localStorage.getItem("token_user"),
      "method": "POST",
      "timeaot": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      "data": {
        "id_store_order": idStore[i],
        "id_user_order": idUser,
        "id_product_order": value,
        "details_order": JSON.stringify(detailsOrder[i]),
        "name_vendor_order": nameUserOrder,
        "quantity_order": quantityOrder[i],
        "price_order": priceProduct[i],
        "stars_order": starProduct[i],
        "email_order": emailOrder,
        "country_order": countryOrder,
        "city_order": cityOrder,
        "phone_order": phoneOrder,
        "address_order": addresOrder,
        "notes_order": infoOrder,
        "process_order": JSON.stringify(procesOrder),
        "status_order": status,
        "date_created_order": formatFecha(new Date())  
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      idOrder.push(response.result.idlast);
      if (response.status == 200) {
        // Crear comision
        let unitPrice = 0;
        let commissionPrice = 0;
        let count = 0;
        idOrder.push(response.result.idlast);

        if(arrayCoupon.length > 0){
          arrayCoupon.forEach(value2=> {
            if(value2 == urlStore[i]){
              count--;
            }else{
              count++;
            }
          });
        }
        if(arrayCoupon.length == count){
          // comision organica
          unitPrice= (Number(priceProduct[i])*0.75).toFixed(2);
          commissionPrice=(Number(priceProduct[i])*0.25).toFixed(2);
        }else{
          // comision por cupon
          unitPrice= (Number(priceProduct[i])*0.95).toFixed(2);
          commissionPrice=(Number(priceProduct[i])*0.05).toFixed(2);
        }
        
        // crear venta
        let settings = {
          "url": $("#urlApi").val() + "sales?token=" + localStorage.getItem("token_user"),
          "method": "POST",
          "timeaot": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          "data": {
            "id_order_sale": response.result.idlast,
            "id_store_sale": idStore[i],
            "name_product_sale": nameProducter[i],
            "unit_price_sale": priceProduct[i],
            "commision_sale": 0,
            "payment_method_sale": metodo,
            "id_payment_sale": id,
            "status_sale": status,
            "date_created_sale": formatFecha(new Date())  
          },
        };
        
        $.ajax(settings).done(function (response) {
          idSale.push(response.result.idlast);
          if(response.status==200){
            if(metodo == "paypal"){
               // contruir venta y stock
               let settings2 = {
                "url": $("#urlApi").val()+"products?id="+value+"&nameId=id_product&token=" + localStorage.getItem("token_user"),
                "method": "PUT",
                "timeaot": 0,
                "headers": {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                "data": {
                  "stock_product": Number(stockProduct[i])-Number(quantityOrder[i]),
                  "sales_product": Number(salesProduct[i])+Number(quantityOrder[i])
                },
              };
              $.ajax(settings2).done(function (response) {});
            }
            foreachend++;
            if(foreachend == idProduct.length){
              if(metodo == "efectivo"){
                //Se modifica los valores para que el pago quede estable
                let numero= $(".numerostar").val(), cont=0;
                numero = JSON.parse(numero); 
                idProduct.forEach((idprod, i) => {
                  let url = $("#urlApi").val()+'products?linkTo=id_product&equalTo='+idprod+'&select=stars_product';
                  
                  let settings = {
                      url: url,
                      metod: 'GET',
                      timeaot: 0,
                  };
              
                  $.ajax(settings).done(function (response) {
                      if (response.status == 200) {
                          let stars = JSON.parse(response.result[0].stars_product);  
                          
                          if (stars != null && stars.length > 0) {
                            stars.forEach((list,i) => {
                            if(numero[i] != '' || numero[i] != NULL){
                                  if(numero[i] == list.numero){
                                      if((list.check == 'checkin') && (list.idUser == idUser )){
                                          list.pagado= 'pagado';
                                          list.time= '';
                                          cont++;
                                      }   
                                  }
                              }
                            });
                          }
                          let settings = {
                              'url': $("#urlApi").val() + 'products?id='+idprod+'&nameId=id_product&token=' + localStorage.getItem("token_user"),
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
                                document.cookie = "listSC=; max-age=0";
                                switAlert("success", "El pago se realizo correctamente...", $('#url').val() + "acount&my-shopping", null, 1500);
                              }
                          });
                      }
                   }); 
              });     
              }
              if(metodo == "paypal"){
                document.cookie = "listSC=; max-age=0";
                switAlert("success", "El pago se realizo correctamente...", $('#url').val() + "acount&my-shopping", null, 1500); 
                window.location = $("#url").val()+"acount&my-shopping";    
                return;
              }
              if(metodo == "payu"){

                let action= "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/";
                let merchantId= 508029;
                let accountId=512324;
                let referenceCode= Math.ceil(Math.random()*1000000);
                let apiKey= "4Vj8eK4rloUd272L48hsrarnUA";
                let signature = hex_md5(apiKey+"~"+merchantId+"~"+referenceCode+"~"+totals+"~MXN");
                let test=1;
                let url =$("#url").val()+"checkout";
                let formPayu = ` 
                                  <img src="img/payment-method/PAYULogo.png" style="width:100px"/>
                                  <form method="post" action="`+action+`">
                                    <input name="merchantId"      type="hidden"  value="`+merchantId+`"   >
                                    <input name="accountId"       type="hidden"  value="`+accountId+`" >
                                    <input name="description"     type="hidden"  value="`+descriptions+`"  >
                                    <input name="referenceCode"   type="hidden"  value="`+referenceCode+`" >
                                    <input name="amount"          type="hidden"  value="`+totals+`"   >
                                    <input name="tax"             type="hidden"  value="0"  >
                                    <input name="taxReturnBase"   type="hidden"  value="0" >
                                    <input name="currency"        type="hidden"  value="MXN" >
                                    <input name="signature"       type="hidden"  value="`+signature+`"  >
                                    <input name="test"            type="hidden"  value="`+test+`" >
                                    <input name="buyerEmail"      type="hidden"  value="`+emailOrder+`" >
                                    <input name="responseUrl"     type="hidden"  value="`+url+`" >
                                    <input name="confirmationUrl" type="hidden"  value="`+url+`" >
                                    <input name="Submit" class="ps-btn p-0 px-5" type="submit"  value="Pagar" >
                                  </form>`;
                switAlert("html", formPayu, null, null,null);
                setCookie("idProduct", JSON.stringify(idProduct),1);
                setCookie("quantityOrder", JSON.stringify(quantityOrder),1);
                setCookie("idOrder", JSON.stringify(idOrder),1);
                setCookie("idSale", JSON.stringify(idSale),1);
              }
              if(metodo == "mercado-pago"){

                totals["description"]=descriptions;
                totals["email"]=emailOrder;
                setCookie("idProduct", JSON.stringify(idProduct),1);
                setCookie("quantityOrder", JSON.stringify(quantityOrder),1);
                setCookie("idOrder", JSON.stringify(idOrder),1);
                setCookie("idSale", JSON.stringify(idSale),1);
                setCookie("mp", JSON.stringify(totals),1);

                window.location = $("#url").val()+"checkout";
              }
            }
          }
        });
      }
    });
  });
}


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

function changecategory(event){
  $(".subcategoryProduct").show();
  let idCategory = event.target.value.split("_")[0];
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
      $('[name="subcategoryProduct"]').append(`<option class="optSubCategory" value="`+item.id_subcategory+`_`+item.title_list_subcategory+`">`+item.name_subcategory+`</option>`);
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

function changeProduct(event){
  $(".ColorProduct").show();
  $(".TallaProduct").show();
  let idproduct = event.target.value.split("_")[1];
  let settings = {
    "url": $("#urlApi").val()+"stocks?equalTo="+idproduct+"&linkTo=id_product_stock&select=id_stock,color_stock,size_stock,color_hexa_stock",
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