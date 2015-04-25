(function () {
  // Fetch data
  var accessToken = '885512ce4b18bbb6132f2c553f716838de07a5e0a49c866213946f5a092ba68e';
  var url = 'https://api.dribbble.com/v1/shots?access_token=' + accessToken;
  var xhr = new XMLHttpRequest();
  var data = {};
  xhr.responseType = 'json';
  xhr.addEventListener('load', dataLoaded);
  xhr.open('GET', url);
  xhr.send();

  // TODO: fetch data from ls if available
  function dataLoaded(event) {
    var response = this;
    // TODO: save response to localstorage
    // and check if xhr is needed to fetch data
    var _data = JSON.parse(JSON.stringify(this.response));
    data = _data
    createImageElements();  
  }

  // TODO: move
  var content = document.querySelector('.content');
  function createImageElements() {
    var currentImage = document.createElement('img');
    var nextImage = document.createElement('img');

    currentImage.src = data[0].images.hidpi || data[0].images.normal;
    nextImage.src = data[1].images.hidpi || data[1].images.normal;

    currentImage.addEventListener('load', handleImageLoaded);
    currentImage.addEventListener('progress', handleImageProgress);
    nextImage.addEventListener('load', handleImageLoaded);
    nextImage.addEventListener('progress', handleImageProgress);
    
    content.appendChild(currentImage);
    content.appendChild(nextImage);

    // for (var dataItem in data) {
    //   if (data.hasOwnProperty(dataItem)) {
    //     console.log(data[dataItem]);
    //   }
    // }
  }

  function handleImageLoaded(event) {
    console.log('image loaded');
  }

  function handleImageProgress(event) {
    console.log('image progress', event);
  }

  // Build img
  // Composite img + title
  // Build nav
}());