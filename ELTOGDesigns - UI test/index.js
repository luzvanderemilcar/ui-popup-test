// DOM Elements 
$closePopUpViewButton = $(".close-button");
$expandPopUpViewButton = $(".expand-view-button");

// Event Listeners 
$closePopUpViewButton.on("click", closePopUpView);


function closePopUpView(e) {
    applyClickEffectToElement(e.target.class());
}


function applyClickEffectToElement(classList) {
    let elem = $("." + classList);
    elem.toggleClass("clicked");
    let clickTimeout = setTimeout(()=>{
       elem.toggleClass("clicked");
        clearTimeout(clickTimeout);
        clickTimeout = null;
    }, 300)
    
}