/* funcion para formatear las alertas */
function formatearAlertas() {
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
}

function notiAlert(type, text) {
  notie.alert({
    type: type,
    text: text,
    time: 10,
  });
}

function switAlert(type, text, url, icon, time) {
  switch (type) {
    // cuando ocurre un error
    case "error":
      if (url == null && icon == null) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: text,
          showConfirmButton: false,
          timer: time,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: text,
        }).then((result) => {
          if (result.value) {
            window.open(url, "_top");
          }
        });
      }
      break;

    // cuando ocurre un successfull
    case "success":
      if (url == null && icon == null) {
        Swal.fire({
          icon: "success",
          title: text,
          showConfirmButton: false,
          timer: time,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: text,
          showConfirmButton: false,
          timer: time,
        }).then((result) => {
          if (result.value) {
            window.open(url, "_top");
          }
        });
        window.location = url;
      }
      break;

    case "loading":
      Swal.fire({
        allowOutsideClick: false,
        title: text,
        width: 1000,
        padding: "3em",
        color: "#fff",
        background: "#fff no-repeat center top url(img/users/default/fondo.png)",
        backdrop: `
            rgba(0,0,123,0.4)
            url("img/users/default/we4.png")
            center top
            no-repeat
        `,
      });
      Swal.showLoading();
      break;

    case "close":
        Swal.close();
    break;

    // cnfiracion de eliminar
    case "confirm":
      
      return new Promise(resolve=>{
        Swal.fire({
          title: 'Estas seguro?',
          text: text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Estoy seguro!',
          customClass: {
            popup: 'swal2-z-index'
          }
        }).then(function(result){
          resolve(result.value);
        });
      });

    break;

    // cnfiracion de pago
    case "html":

        Swal.fire({
          allowOutsideClick: false,
          title: 'Click para seguir con el pago',
          html: text,
          icon: 'info',
          showCancelButton: true,
          showConfirmButton:false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, pagar!'
        })
    break;
  }
}

/* funcion para cear una cooky para la vitrina */
function setCookie(name, value, exp) {
  let now = new Date();
  now.setTime(now.getTime() + exp * 24 * 60 * 60 * 1000);

  let expDate = "expires=" + now.toUTCString();
  document.cookie = name + "=" + value + "; " + expDate;
}

//funcion para recordar el email
function rememberme(e){
  
  if(e.target.checked){
    localStorage.setItem("emailRem", $('[name="logEmail"]').val());
    localStorage.setItem("checkRem", true);
  }else{
    localStorage.removeItem("emailRem");
    localStorage.removeItem("checkRem");
  }
}

//Agredamos articulos al carrito de compras
function addBagCard(urlProduct, category, image, name, price, path, urlApi) {
  // Traer informacion del producto 
  let select = "stock_product,specifications_product,shipping_product,offer_product";

  let settings = {
    url:
      urlApi + "products?linkTo=url_product&equalTo=" + urlProduct + "&select=" + select,
    method: "GET",
    timeaot: 0,
  };

  $.ajax(settings).done(function (response) {
    
    if (response.status == 200) {
      let quantity = 1;

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
          // Preguntar si el producto existe
          var count2 = 0;
          var index = null;
          for (let i in arrayList) {
            if (arrayList[i].product == urlProduct) {
              count2--;
              index = i;
            } else {
              count2++;
            }
          }
          
          if (count2 == arrayList.length) {
            arrayList.push({
              "product": urlProduct,
              // "details": detalleProduct,
               "quantity": parseInt(quantity)
            });
          } else {
            arrayList[index].quantity += parseInt( quantity);
          }
         
          // creamos una cookie
          setCookie("listSC", JSON.stringify(arrayList), 1);
          window.location= path +urlProduct;
        }
      } 
      else {
        // creamos una cookie
        var arrayList = [];
        arrayList.push({
          "product": urlProduct,
          // "details": detalleProduct,
          "quantity": parseInt(quantity)
        });

        setCookie("listSC", JSON.stringify(arrayList), 1);
        window.location= path +urlProduct;
      }
    }
  });
}

// /* funcion para validar un formiulario */
// function validatejs(e, tipo) {
//   if (tipo == "text") {
//     let pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;
//     if (!pattern.test(e.target.value)) {
//       $(e.target).parent().addClass("was-validated");
//       $(e.target)
//         .parent()
//         .children(".invalid-feedback")
//         .html("No uses numeros ni caracteres especiales");
//       return;
//     }
//   } 
//   if (tipo == "text&number") {
//     let pattern = /^[0-9A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;
//     if (!pattern.test(e.target.value)) {
//       $(e.target).parent().addClass("was-validated");
//       $(e.target).parent().children(".invalid-feedback").html("No uses caracteres especiales");
//       return;
//     }
//   } 
//   if (tipo == "email") {
//     let pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
//     if (!pattern.test(e.target.value)) {
//       $(e.target).parent().addClass("was-validated");
//       $(e.target)
//         .parent()
//         .children(".invalid-feedback")
//         .html("Solo se acepta un formato email");
//       return;
//     }
//   } 
//   if (tipo == "pass") {
//     let pattern = /^[#\\=\\$\\;\\*\\_\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-Z]{1,}$/;
//     if (!pattern.test(e.target.value)) {
//       $(e.target).parent().addClass("was-validated");
//       $(e.target)
//         .parent()
//         .children(".invalid-feedback")
//         .html(
//           "No se admiten espacios ni tampoco algunos caracteres especiales"
//         );
//       e.target.value = "";
//       return;
//     }
//     if(e.target.value.length < 9){
//       $(e.target).parent().addClass("was-validated");
//       $(e.target)
//         .parent()
//         .children(".invalid-feedback")
//         .html(
//           "La contraseña debe tener almenos 8 caracteres"
//         );
//         e.target.value = "";
//       return;
//     }
//   } 
//   if (tipo == "passEnt") {
//     let pattern = /^[#\\=\\$\\;\\*\\_\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-Z]{1,}$/;
//     if (!pattern.test(e.target.value)) {
//       $(e.target).parent().addClass("was-validated");
//       $(e.target)
//         .parent()
//         .children(".invalid-feedback")
//         .html(
//           "No se admiten espacios ni tampoco algunos caracteres especiales"
//         );
//       e.target.value = "";
//       return;
//     }
//   }
//   if(tipo=="phone"){
//     let  pattern = /^[-\\(\\)\\0-9 ]{1,}$/; 
//     if (!pattern.test(e.target.value)) {
//       $(e.target).parent().addClass("was-validated");
//         $(e.target)
//           .parent()
//           .children(".invalid-feedback")
//           .html("Solo se aceptan numeros");
//       return;
//     }
//   }
//   if(tipo=="parrafo"){
//     let  pattern = /^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}$/; 
//     if (!pattern.test(e.target.value)) {
//       $(e.target).parent().addClass("was-validated");
//         $(e.target)
//           .parent()
//           .children(".invalid-feedback")
//           .html("Algun caracter que estas usando no es valido");
//       return;
//     }
//   }
//   if(tipo=="numbers"){
//     let  pattern = /^[.\\,\\0-9]{1,}$/; 
//     if (!pattern.test(e.target.value)) {
//       $(e.target).parent().addClass("was-validated");
//         $(e.target)
//           .parent()
//           .children(".invalid-feedback")
//           .html("Solo se aceptan numeros");
//       return;
//     }
//   }
//   if(tipo == "repeatPass"){

//     let validar = e.target;
//     let valor = $("#createPassword").val();
//     if(validar.value !== valor){
//       $(validar).parent().addClass("was-validated");
//       $(validar).parent().children(".invalid-feedback").html("Las contraseñas no coinciden");
//       validar.value = "";
//       return;
//     }
//   }
// }

// function validateImageJs(e, input){
//   let image = e.target.files[0];
//   if (image["type"] !== "image/jpeg" && image["type"] !== "image/png") {
//     switAlert("error", "La imagen tiene que ser PNG  JPEG", null, null);
//     return;
//   } else if (image["size"] > 2000000) {
//     switAlert("error", "La imagen tiene que ser menor a 2MB", null, null);
//     return;
//   } else {
//     var data = new FileReader();
//     data.readAsDataURL(image);

//     $(data).on("load", function (event) {
//       let path = event.target.result;
//       $("."+input).attr("src", path);
//     });
//   }
// }

// /* funcion para validar un formiulario */
// function dataRepeat(e, type){
//   let table = "";
//   let linkTo = "";
//   let select = ""

//   if(type == "email"){
//      table = "users";
//      linkTo = "email_user";
//      select = "email_user"
//   }

//   if(type == "store"){
//      table = "stores";
//      linkTo = "name_store";
//      select = "name_store"
//   }

//   if(type == "product"){
//     table = "products";
//     linkTo = "name_product";
//     select = "name_product"
//  }

//   let settings = {
//     url:$("#urlApi").val() + table+"?equalTo=" + e.target.value +"&linkTo="+linkTo+"&select="+select,
//     metod: "GET",
//     timeaot: 0,
//   };

//   $.ajax(settings).error(function (response) {
//     if (response.responseJSON.status == 404) {
//       if(type == "email"){
//         validatejs(e, "email");
//       }

//       if(type == "store"){
//         validatejs(e, "text&number");
//         urlCreate(e,"urlStore");
//       }

//       if(type == "product"){
//         validatejs(e, "text&number");
//         urlCreate(e,"urlProduct");
//       }
//     }
//   });

//   $.ajax(settings).done(function (response) {
//     if (response.status == 200) {
      
//       $(e.target).parent().addClass("was-validated");

//       if(type == "email"){
//         $(e.target).parent().children(".invalid-feedback").html("Este email ya esta registrado");
//       }

//       if(type == "store" || type == "product"){
//         $(e.target).parent().children(".invalid-feedback").html("El nombre "+  e.target.value +" ya esta ocupado");
//       }
      
//       e.target.value = "";
//       return;
//     }
//   }); 
// }

// function changeContry(event){
//   $(".dialCode").html(event.target.value.split("_")[1]);
// }

// function goTermins(){
//   $("html, body").animate({
//     scrollTop: $("#tabContent").offset().top-50 
//   });
// }

// function aceptTermins(event){
//   if(event.target.checked){
//     $("#crearStore").tab("show");
//     $(".btnCreateStore").removeClass("disabled");
//     $("html, body").animate({
//       scrollTop: $("#crearStore").offset().top-100 
//     });
//   }else{
//     $("#crearStore").removeClass("active");
//     $(".btnCreateStore").addClass("disabled");
//   }
// }

// function urlCreate(e,urlStore){
//   var value = e.target.value;

//   value = value.toLowerCase();
//   value = value.replace(/[ ]/g, "-");
//   value = value.replace(/[á]/g, "a");
//   value = value.replace(/[é]/g, "e");
//   value = value.replace(/[í]/g, "i");
//   value = value.replace(/[ó]/g, "o");
//   value = value.replace(/[ú]/g, "u");

//   if(urlStore == "urlStore"){

//     $('[name="'+urlStore+'"]').val(value);
    
//     //mapa
//     let resultList =  document.getElementById('mappp').value;

//     if(resultList == undefined || resultList == null || resultList == "" ){
//         resultList = [19.42847,-99.12766];
//     }else{
//       resultList = JSON.parse( resultList);
//     }

//     const title = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
//     let myMap=0;

//     function mapa(resultList){

//       if(myMap!=0){
//         myMap.remove();
//       }

//     let finalMap= document.getElementById("mappp");
//     finalMap.setAttribute("value", resultList);

//     myMap= L.map('myMap').setView(resultList, 25);

//     L.tileLayer(title,{
//         maxZoom: 18,
//     }).addTo(myMap);

//     let iconMarker = L.icon({
//         iconUrl:'img/mark.png',
//         iconSize:[40,40],
//         iconAnchor: [20,20]
//     });

//     let marker=  L.marker(resultList, {
//       icon: iconMarker,
//       draggable: true
//     }).addTo(myMap);
//     marker.on("moveend", (e)=> { 
//       document.getElementById("mappp").setAttribute("value", [e.target._latlng.lat, e.target._latlng.lng ]);  
//     });
//     myMap.doubleClickZoom.disable();
//     }

//     mapa(resultList);

//     document.getElementById('addresStore').addEventListener('change', () => {
//         const pais= document.getElementById('countryStore').value.split("_")[0];
//         const city= document.getElementById('cityStore').value;
//         const adres= document.getElementById('addresStore').value;
//         const query = pais + ", " + city + ", " + adres;

//         fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
//             .then(result => result.json())
//             .then(parsedResult => {
//                 resultList=[ parseFloat(parsedResult[0].lat) , parseFloat( parsedResult[0].lon)];
//                 mapa(resultList);
//                 switAlert("success", "Puedes mover el marcador para una mejor localizacion", null, null, 1500);
//             }).catch(error => switAlert("error", "Algun campo esta mal, intenta corregirlo para colocar tu direccion en el mapa...", null,null,null )
//             );
//     });
//   }

//   if(urlStore == "urlProduct"){
//     $('[name="'+urlStore+'"]').val(value);
//   }

// }

// function validarStore(){
//   let formStore = $(".formStore");
//   let error=0;
//   formStore.each(i=>{
//     if($(formStore[i]).val() == "" || $(formStore[i]).val() == undefined){
//       error++;
//       $(formStore[i]).parent().addClass("was-validated");
//     }
//   });
//   if(error > 0){
//     switAlert("error", "Algunos campos faltan o estan mal", null, null);
//     return;
//   }

//   $("#crearProduct").tab("show");
//   $(".btnCreateProduct").removeClass("disabled");

//   $("html, body").animate({
//     scrollTop: $("#crearProduct").offset().top-100 
//   });
// }

// function changecategory(event){
//   $(".subcategoryProduct").show();
//   let idCategory = event.target.value.split("_")[0];
//   let settings = {
//     "url": $("#urlApi").val()+"subcategories?equalTo="+idCategory+"&linkTo=id_category_subcategory&select=id_subcategory,name_subcategory,title_list_subcategory",
//     "method":"GET",
//     "timeout":0,
//   };

//   $.ajax(settings).done(function(response){
//     let limpiar= $(".optSubCategory");
//     limpiar.each(i=>{
//       $(limpiar[i]).remove();
//     });
//     response.result.forEach(item =>{
//       $('[name="subcategoryProduct"]').append(`<option class="optSubCategory" value="`+item.id_subcategory+`_`+item.title_list_subcategory+`">`+item.name_subcategory+`</option>`);
//     });
//   });
// }

// function addInput(elem,type){
//   let inputs = $("."+type);
  
//   if(inputs.length < 5){
//     if(type == "inputSummary"){
//       $(elem).before(`
//       <div class="form-group__content input-group mb-3 inputSummary">
//                 <div class="input-group-append">
//                     <span class="input-group-text">
//                         <button type="button" class="btn btn-danger" onclick="removedInput(`+inputs.length+`,'inputSummary')">&times;</button>
//                     </span>
//                 </div>
//                 <input 
//                 class="form-control"
//                 type="text"
//                 name="summaryProduct_`+inputs.length+`"
//                 required
//                 pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
//                 onchange="validatejs(event, 'parrafo')">
//                 <div class="valid-feedback"></div>
//                 <div class="invalid-feedback">Acompleta el campo</div>
//             </div>
//       `);
//     }

//     if(type == "inputDetails"){
//       $(elem).before(`
//           <div class="row mb-3 inputDetails">
//           <div class="col-12 col-lg-6 form-group__content input-group">
//               <div class="input-group-append">
//                   <span class="input-group-text">
//                       <button type="button" class="btn btn-danger" onclick="removedInput(`+inputs.length+`,'inputDetails')">&times;</button>
//                   </span>
//               </div>
//               <div class="input-group-append">
//                   <span class="input-group-text">
//                       Title:
//                   </span>
//               </div>
//               <input 
//               class="form-control"
//               type="text"
//               name="detailsTitleProduct_`+inputs.length+`"
//               required
//               pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
//               onchange="validatejs(event, 'parrafo')">
//               <div class="valid-feedback"></div>
//               <div class="invalid-feedback">Acompleta el campo</div>
//           </div>
//           <div class="col-12 col-lg-6 form-group__content input-group">
//               <div class="input-group-append">
//                   <span class="input-group-text">
//                       Value:
//                   </span>
//               </div>
//               <input 
//               class="form-control"
//               type="text"
//               name="detailsValueProduct_`+inputs.length+`"
//               required
//               pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
//               onchange="validatejs(event, 'parrafo')">
//               <div class="valid-feedback"></div>
//               <div class="invalid-feedback">Acompleta el campo</div>
//           </div>
//       </div>
//       `);
//   }

//   if(type == "inputEspesifications"){
//     $(elem).before(`
//     <div class="row mb-3 inputEspesifications">
//         <div class="col-12 col-lg-6 form-group__content input-group">
//             <div class="input-group-append">
//                 <span class="input-group-text">
//                     <button type="button" class="btn btn-danger" onclick="removedInput(`+inputs.length+`,'inputEspesifications')">&times;</button>
//                 </span>
//             </div>
//             <div class="input-group-append">
//                 <span class="input-group-text">
//                     Type:
//                 </span>
//             </div>
//             <input 
//             class="form-control"
//             type="text"
//             name="EspesificTypeProduct_`+inputs.length+`"
//             required
//             pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
//             onchange="validatejs(event, 'parrafo')">
//             <div class="valid-feedback"></div>
//             <div class="invalid-feedback">Acompleta el campo</div>
//         </div>
//         <div class="col-12 col-lg-6 form-group__content input-group">
//             <input 
//             class="form-control tags-input"
//             data-role="tagsinput"
//             type="text"
//             placeholder="Escribe y preciona enter" 
//             name="EspesificValuesProduct_`+inputs.length+`"
//             required
//             pattern = '[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}'
//             onchange="validatejs(event, 'parrafo')">
//             <div class="valid-feedback"></div>
//             <div class="invalid-feedback">Acompleta el campo</div>
//         </div>
//     </div>
//     `);
//     fcnTagInput();
// }
//   $('[name="'+type+'"]').val(inputs.length+1);  
//   }else{
//     switAlert("error", "Solo puedes colocar 5 summarys", null, null);
//     return;
//   }
// }

// function removedInput(indice,type){
//   let inputs = $("."+type);
  
//   if(inputs.length > 1){
//     inputs.each(i=>{
//       if(i==indice){
//         $(inputs[i]).remove();
//       }
//     });
//     $('[name="'+type+'"]').val(inputs.length-1); 
//   }else{
//     switAlert("error", "Ya no puedes eliminar ninguno", null, null);
//     return;
//   }
// }

// function fcnTagInput(){
//   let target = $('.tags-input');
//   if(target.length > 0){
//     $(target).tagsinput();
//   }
// }

// fcnTagInput();

// // // Dropzone.autoDiscover = false;
// // // let arrayFiles=[];
// // // let countrrayfiles= 0;

// // $(".dropzone").dropzone({
// //   url: "/",
// //   addRemoveLinks: true,
// //   acceptedFiles: "image/jpeg, image/png",
// //   maxFilesSize: 2,
// //   maxFiles:10
// //   // init: function(){
// //   //   this.on("addedfile", function(file){
// //   //     countrrayfiles++;
// //   //     setTimeout( function(){
// //   //       arrayFiles.push({
// //   //         "file":file.dataURL,
// //   //         "type":file.type,
// //   //         "width":file.width,
// //   //         "height":file.height
// //   //       });
// //   //       $("[name='galeryProduct']").val(JSON.stringify(arrayFiles));
// //   //     },1000*countrrayfiles);
// //   //   });
// //   //   this.on("removedfile", function(file){
// //   //     countrrayfiles++;
// //   //     setTimeout( function(){
// //   //       let index = arrayFiles.indexOf({
// //   //         "file":file.dataURL,
// //   //         "type":file.type,
// //   //         "width":file.width,
// //   //         "height":file.height
// //   //       });
// //   //       arrayFiles.splice(index,1);
// //   //       $("[name='galeryProduct']").val(JSON.stringify(arrayFiles));
// //   //     },1000*countrrayfiles);
// //   //   });
// //   //   myDropzone = this;
// //   //   $(".saveBtn").click(function(){
// //   //     if(arrayFiles.length >= 1 ){
// //   //       myDropzone.processQueue();
// //   //     }else{
// //   //       switAlert("error", "La galeria esta vacia", null, null);
// //   //     }
// //   //   });
// //   // }
// // });


// function changeOfer(type){
//   if(type.target.value == "Discount"){
//     $(".typeOffer").html("Percent %:");
//   }
//   if(type.target.value == "Fixed"){
//     $(".typeOffer").html("Price $:");
//   }
// }

// function dispararmapa(){

//   setTimeout(() => {
    
  
//   //mapa
//   if(document.getElementById('mapppp')){
//     let resultList =  document.getElementById('mapppp').value;
    
//     if(resultList != ""){
//       if(resultList == undefined){
//           resultList = [19.42847,-99.12766];
//       }else{
//         resultList = JSON.parse( resultList);
//       }

//       const title = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
//       let myMap=0;

//       function mapa(resultList){

//         if(myMap!=0){
//           myMap.remove();
//         }

//       let finalMap= document.getElementById("mapppp");
//       finalMap.setAttribute("value", resultList);

//       myMap= L.map('myMapp').setView(resultList, 25);

//       L.tileLayer(title,{
//           maxZoom: 18,
//       }).addTo(myMap);

//       let iconMarker = L.icon({
//           iconUrl:'img/mark.png',
//           iconSize:[40,40],
//           iconAnchor: [20,20]
//       });

//       let marker=  L.marker(resultList, {
//         icon: iconMarker,
//         draggable: true
//       }).addTo(myMap);
//       marker.on("moveend", (e)=> { 
//         document.getElementById("mapppp").setAttribute("value", [e.target._latlng.lat, e.target._latlng.lng ]);  
//       });
//       myMap.doubleClickZoom.disable();
//       }

//       mapa(resultList);

//       document.getElementById('addresStore').addEventListener('change', () => {
//           const pais= document.getElementById('countryStore').value.split("_")[0];
//           const city= document.getElementById('cityStore').value;
//           const adres= document.getElementById('addresStore').value;
//           const query = pais + ", " + city + ", " + adres;

//           fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
//               .then(result => result.json())
//               .then(parsedResult => {
//                   resultList=[ parseFloat(parsedResult[0].lat) , parseFloat( parsedResult[0].lon)];
//                   mapa(resultList);
//                   switAlert("success", "Puedes mover el marcador para una mejor localizacion", null, null, 1500);
//               }).catch(error => switAlert("error", "Algun campo esta mal, intenta corregirlo para colocar tu direccion en el mapa...", null,null,null )
//               );
//       });
//     }
//   }
// }, 1000);
// }
