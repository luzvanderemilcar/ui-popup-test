const body = document.querySelector("body");
const  resizableContainer = document.querySelector("div.container")
const  resizable = document.querySelector("div.resizable")

console.log(body.style);

const setFontSize = (element, val) => {
    element.style.fontSize = `${val}px`
}

setFontSize(resizableContainer,getElementWidth(resizableContainer))

function getElementWidth(element) {
    return parseFloat(element.style.width)
}

console.log(parseFloat(resizable.style.width))