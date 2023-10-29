let products = [];

const Product = function(id, name, price, description, photoSources) {
    let productId = id;
    let productPrice = price;

    //attributes
    this.name = name;
    this.description = description;
    this.photoSources = photoSources;

    //methods 
    this.getId = () => productId;
    this.setPrice = (price) => {
        productPrice = price;
    }
    this.getPrice = () => productPrice;
}

function registerNewProduct(id, name, price, description, photoSources) {
    if (checkIdAlreadyAssigned(products, id)) {
        console.log("Id already taken !");
    } else {
        products.push(new Product(id, name, price, description, photoSources));
    }
}

registerNewProduct(1, "Logo", 50, "Your visual identity is one of the concerns of logo design", ["./logo.png"]);
registerNewProduct(2, "Flyer", 250, "How to annonce your event, present your products? Maybe, a well-designed flyer is the answer to your question", ["./flyer.png"]);


// Add your code below this line
products.forEach(product => {
 let divContainer = document.createElement("div");
 
 let productHtml = "";
    productHtml += '<div class="card product-div" productid="' + product.getId() + '"><div class="card-header"><h4>' + product.name + '</h4></div><div class="card-body"><img src="' +product.photoSources +'" alt="photo of a ' + product.name + '"><br>' + markedResult(product.description);
    productHtml += '</div></div>';
    divContainer.innerHTML = productHtml;
    $("main").append(divContainer);
})

// Add your code above this line
function checkIdAlreadyAssigned(arr, id) {
    return arr.some(item => id == item.getId());
}


// DOM Elements 
$popUpContainer = $(".container.pop-up");
$popUpHeading = $("#current-pop-up h3");
$popUpText = $("#current-pop-up div.info");
$popUpTopView = $(".top-view");
$closePopUpViewButton = $(".close-button");
$primaryCta = $(".primary-cta");
$secondaryCta = $(".secondary-cta")

$productDiv = $(".product-div");


// Event Listeners 
$popUpTopView.on("click", () => {
    applyClickEffectToElement($(this));
    //alert("PopUpView Top Got Clicked");
});

$closePopUpViewButton.on("click", closePopUpView);
$primaryCta.on("click", orderProduct);
$secondaryCta.on("click", addToChart);

$productDiv.on("dblclick", toPopUpView);


function closePopUpView() {
    applyClickEffectToElement($(this));
    $("#current-pop-up").css("display", "none");
}

function toPopUpView() {
   let currentProductId = $(this).attr("productid");
   let product = getProductById(products, currentProductId);
   $("#current-pop-up").css("display", "block");
   $popUpHeading.html(product.name);
   $popUpText.html(product.description);
}


function getProductById(arr, id) {
    return arr[getProductIndexById(arr, id)];
}

function getProductIndexById(arr, id) {
    if (checkIdAlreadyAssigned(arr, id)) {
    return arr.reduce((acc,item, idx) => {
       if (item.getId() == id) {
           acc = idx;
       }
       return acc;
    }, 0);
    } else {
        console.error("Id not found");
    }
}

function orderProduct() {
    applyClickEffectToElement($(this))
}

function addToChart() {
    applyClickEffectToElement($(this))
}

function applyClickEffectToElement(elem) {
    elem.toggleClass("clicked");
    let clickTimeout = setTimeout(() => {
        elem.toggleClass("clicked");
        clearTimeout(clickTimeout);
        clickTimeout = null;
    }, 200)
}

function markedResult(text) {
    return marked.parse(text);
}