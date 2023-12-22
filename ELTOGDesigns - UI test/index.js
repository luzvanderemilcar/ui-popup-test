
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

registerNewProduct(1, "Logo", 50, "Your visual identity is one of the concerns of logo design\nA logo is a visual representant of an enterprise. A logo tells a lot about the enterprise' products, missions, values or goals. That is, if you you want your logo to bring your real message, you need to be carefull on how to design it.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.", ["./logo.png"]);
registerNewProduct(2, "Flyer", 250, "How to annonce your event, present your products? Maybe, a well-designed flyer is the answer to your question", ["./flyer.png"]);


// Add your code below this line
products.forEach(product => {
 let divContainer = document.createElement("div");
 
 let productHtml = "";
    productHtml += '<div class="card product-div" productid="' + product.getId() + '"><div class="card-header"><h4>' + product.name + '</h4></div><div class="card-body"><img src="' +product.photoSources +'" alt="photo of a ' + product.name + '"><br>' + markedResult(product.description);
    productHtml += '</div></div>';
    divContainer.innerHTML = productHtml;
    $("#main-products").append(divContainer);
})

// Add your code above this line
function checkIdAlreadyAssigned(arr, id) {
    return arr.some(item => id == item.getId());
}


// DOM Elements
$popUpElement = $("#current-pop-up")
$popUpBar = $("#current-pop-up .top-view");
$popUpHeading = $("#current-pop-up h3");
$popUpText = $("#current-pop-up div.info");
$closePopUpViewButton = $(".close-button");
$primaryCta = $(".primary-cta");
$secondaryCta = $(".secondary-cta")

$productDiv = $(".product-div");


let popUpLastRelativePosition = {top : 0,
left : 0};

// Interact.js


interact("#current-pop-up")
  .resizable({
    // resize from all edges and corners except top
        edges: { left: true, right: true, bottom: true, top: false },

        listeners: {
            move(event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'

                // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top

                target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
            }
        },
        modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
                outer: 'parent'
            }),

      // minimum size
      interact.modifiers.restrictSize({
                min: { width: 100, height: 50 }
            })
    ],

        inertia: true
    })
    .draggable({
        listeners: { move: window.dragMoveListener },
        inertia: true,
        modifiers: [
      interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
    ]
    });

$closePopUpViewButton.on("click", closePopUpView);
$primaryCta.on("click", orderProduct);
$secondaryCta.on("click", addToChart);

$productDiv.on("dblclick", toPopUpView);


function closePopUpView() {
    applyClickEffectToElement($(this));
    $popUpElement.css("visibility", "hidden");
}

function toPopUpView() {
   let currentProductId = $(this).attr("productid");
   let product = getProductById(products, currentProductId);
   // set top initial position for 
   let [x,y] = [window.scrollX, window.scrollY];
   $popUpElement.css("top", y + 20);
   $popUpElement.css("left", x +20);
   $popUpElement.css("visibility", "visible");
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