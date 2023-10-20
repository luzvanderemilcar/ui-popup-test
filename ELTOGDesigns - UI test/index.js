// DOM Elements 
$closePopUpViewButton = $(".close-button");
$expandPopUpViewButton = $(".expand-view-button");
$primaryCta = $(".primary-cta");
$secondaryCta = $(".secondary-cta")


// Event Listeners 
$closePopUpViewButton.on("click", closePopUpView);
$expandPopUpViewButton.on("click", expandPopUpView);
$primaryCta.on("click", orderArticle);
$secondaryCta.on("click", exploreItem);

function closePopUpView() {
    applyClickEffectToElement($(this));
}

function expandPopUpView() {
    applyClickEffectToElement($(this));
}

function orderArticle() {
    applyClickEffectToElement($(this))
}

function exploreItem() {
    applyClickEffectToElement($(this))
}

function applyClickEffectToElement(elem) {
    elem.toggleClass("clicked");
    let clickTimeout = setTimeout(()=>{
       elem.toggleClass("clicked");
        clearTimeout(clickTimeout);
        clickTimeout = null;
    }, 200)
}