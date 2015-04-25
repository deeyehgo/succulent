(function () {
  // Fetch data
  // TODO: parse location - query buckets?
  var accessToken = '885512ce4b18bbb6132f2c553f716838de07a5e0a49c866213946f5a092ba68e';
  var url = 'https://api.dribbble.com/v1/buckets/266815/shots?access_token=' + accessToken;
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
    var currentImgElement = new Image();
    var nextImgElement = new Image();

    currentImgElement.src = data[0].images.hidpi || data[0].images.normal;
    nextImgElement.src = data[1].images.hidpi || data[1].images.normal;

    currentImgElement.addEventListener('load', handleImageLoaded);
    currentImgElement.addEventListener('progress', handleImageProgress);
    nextImgElement.addEventListener('load', handleImageLoaded);
    nextImgElement.addEventListener('progress', handleImageProgress);
    
    content.appendChild(currentImgElement);
    content.appendChild(nextImgElement);


    for (var dataItem in data) {
      if (data.hasOwnProperty(dataItem)) {
        console.log(data[dataItem]);
      }
    }
    createTitle();
  }

  function handleImageLoaded(event) {
    console.log('image loaded');
  }

  function handleImageProgress(event) {
    console.log('image progress', event);
  }

  function createTitle(text) {
    // var titleElement = document.createElement('div');
    // titleElement.innerHTML = text;
    // content.appendChild(titleElement);
    var customImg = new CustomImage();
    customImg.init({
      content: content,
      displayText: data[0].title || '',
      src: data[0].images.hidpi || data[0].images.normal || ''
    });
    content.appendChild(customImg.element());
    // console.log(customImg.createTitle());
  }

  function CustomImage() {
    var _element = '';
  }

  CustomImage.prototype.init = function(options) {
    var options = options || {};
    
    var content = options.content || document.body;
    var img = new Image();
    var titleTextElement = document.createElement('div');

    img.src = options.src || '';
    titleTextElement.innerHTML = options.displayText || '';
    _element = document.createElement('div');
    _element.appendChild(titleTextElement);
    console.dir(options);
  };

  CustomImage.prototype.element = function() {
    return _element;
  };

  CustomImage.prototype.setTitle = function(displayText) {
    console.log(displayText, this.displayText);
    return this;
  };

  CustomImage.prototype.show = function(fromRight) {
    
  };

  CustomImage.prototype.hide = function(fromRight) {
    
  };

  // Build img
  // Composite img + title
  // Build nav
}());