

var productsContainer;


if (localStorage.getItem("myData") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("myData"));
    displayProducts();

}

var inps = document.getElementsByClassName("form-control");

function clearForm() {
    for (var i = 0; i < inps.length; i++) {
        inps[i].value = "";
    }

}

function addProduct() {
    var radioButtons = document.getElementsByName("onsale");
    var productName = document.getElementById("productNameInp").value;
    var productPrice = document.getElementById("productPriceInp").value;
    var productCategory = document.getElementById("productCategoryInp").value;
    var productDesc = document.getElementById("productDescInp").value;
    var onSale;

    if (radioButtons[0].checked == true) {
        onSale = true;
    }
    else {
        onSale = false;
    }


    var product =
    {
        name: productName,
        price: productPrice,
        category: productCategory,
        desc: productDesc,
        onSale: onSale
    }
    productsContainer.push(product);




    localStorage.setItem("myData", JSON.stringify(productsContainer))
    displayProducts();
    clearForm();
}

function displayProducts() {
    var temp = "";

    for (var i = 0; i < productsContainer.length; i++) {
        temp += `<div class="col-md-3">
        <div class="product mb-3">
                <img src="images/3.jpg" class="img-fluid">
                <h5>`+ productsContainer[i].name + `<span class="badge ml-3 badge-primary">` + productsContainer[i].category + `</span>  </h5>
                <h6 class="border p-1 border-primary text-center">`+ productsContainer[i].price + `</h6>
                <p>`+ productsContainer[i].desc + `</p>`;

        if (productsContainer[i].onSale == true) {
            temp += '<div class="sale">Sale</div>';
        }

        temp += `<button onclick="deleteProduct(` + i + `)" class="btn btn-sm btn-outline-danger">delete</button>
                <button onclick="updateProduct(`+ i + `)" class="btn btn-sm btn-outline-info">update</button>

            </div>
    </div>`;
    }


    document.getElementById("productsRow").innerHTML = temp;
}

function searchProduct(term) {
    var temp = "";
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) || productsContainer[i].category.toLowerCase().includes(term.toLowerCase())) {


            temp += `<div class="col-md-3">
         <div class="product mb-3">
                 <img src="images/3.jpg" class="img-fluid">
                 <h5>`+ productsContainer[i].name + `<span class="badge ml-3 badge-primary">` + productsContainer[i].category + `</span>  </h5>
                 <h6 class="border p-1 border-primary text-center">`+ productsContainer[i].price + `</h6>
                 <p>`+ productsContainer[i].desc + `</p>`;

            if (productsContainer[i].onSale == true) {
                temp += '<div class="sale">Sale</div>';
            }

            temp += `<button onclick="deleteProduct()" class="btn btn-sm btn-outline-danger">delete</button>
                 <button onclick="updateProduct()" class="btn btn-sm btn-outline-info">update</button>
   
             </div>
     </div>`;
        }
    }
    document.getElementById("productsRow").innerHTML = temp;
}

function deleteProduct(indx) {

    var deleted = productsContainer.splice(indx, 1);
    localStorage.setItem("myData", JSON.stringify(productsContainer))
    displayProducts();

}


function updateProduct(indx) {

    window.alert("Pless type a new data");
    clearForm();

    
    document.getElementById("productNameInp").value = productsContainer[indx].name;
    document.getElementById("productPriceInp").value = productsContainer[indx].price;
    document.getElementById("productCategoryInp").value = productsContainer[indx].category;
    document.getElementById("productDescInp").value = productsContainer[indx].desc;

    var tempp;
    for (var i = 0; i < productsContainer.length; i++) {
       tempp = `<button onclick="updateMe(`+indx+`)" class="btn btn-warning"> New Update </button>`;
    }
    document.getElementById("new").innerHTML = tempp;

}



function updateMe(indx) {

    var productName = document.getElementById("productNameInp").value;
    var productPrice = document.getElementById("productPriceInp").value ;
    var productCategory =document.getElementById("productCategoryInp").value;
    var productDesc =document.getElementById("productDescInp").value;

    var product =
    {
        name: productName,
        price: productPrice,
        category: productCategory,
        desc: productDesc
    }

    productsContainer.push(product);

    console.log(productsContainer);
    var indexx = productsContainer.indexOf(product);

    if(indexx !== -1)
    {
        productsContainer[indx] = product;
        productsContainer.splice(indexx,1);
    }
    displayProducts();


}



