//content script
var clickedEl = null;
var modalContainer = null;
console.log('Scraper Running...')

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) {
        clickedEl = event.target;
    }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request == "doTheThing") {
      openImgSelector([getInstagramSrc(), getDirectSrc(), 'https://scontent-atl3-1.cdninstagram.com/t51.2885-15/e35/20582414_1955195391425396_4054093053160325120_n.jpg'])
      sendResponse(true)
    }
});

getDirectSrc = function(){
  return $(clickedEl).attr('src')
}

getInstagramSrc = function(){
  return $(clickedEl).siblings('div').find('img').attr('src')
}

openImgSelector = function(imgSrcs){
  modalContainer = $('<div class="image-selector-modal-container"></div>').appendTo('body')
  let modal = $('<div class="image-selector-modal"></div>').appendTo(modalContainer)
  let imagesContainer = $('<div class="images-container"></div>').appendTo(modal)
  $(imgSrcs).each(function(i,src){
    if(src){
      let container = $('<div class="image-container"></div>').appendTo(imagesContainer)
      let image = $('<div class="image" style="background-image:url('+src+')"></div>').appendTo(container)
      let controls = $('<div class="controls"></div>').appendTo(container)
      let saveButton = $('<a class="button save" href="'+src+'" download="'+src+'">Save</a>').appendTo(controls)
    }    
  })

  let closeButton = $('<div class="close-button">X<div>').appendTo(modal)
  closeButton.click(closeImgSelector);

}

closeImgSelector = function(){
  modalContainer.hide();
}

