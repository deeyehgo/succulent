(function () {
  // Fetch data
  // TODO: parse location - query buckets?
  var accessToken = '885512ce4b18bbb6132f2c553f716838de07a5e0a49c866213946f5a092ba68e';
  var url = 'https://api.dribbble.com/v1/buckets/266815/shots?access_token=' + accessToken;
  var xhr = new XMLHttpRequest();
  var data = {};
  xhr.addEventListener('load', dataLoaded);
  xhr.open('GET', url);
  xhr.send();

  // TODO: fetch data from ls if available
  function dataLoaded(event) {
    var response = this;
    // TODO: save response to localstorage
    // and check if xhr is needed to fetch data
    var _data = JSON.parse(this.responseText);
    data = _data
    createImageElements();  
  }

  // TODO: move
  var content = document.querySelector('.content');
  function createImageElements() {
    var currentImg = new CustomImage();
    currentImg
      .init()
      .setTitle(data[0].title || '')
      .setSrc(data[0].images.hidpi || data[0].images.normal || '');
    content.appendChild(currentImg.element());

    var nextImg = new CustomImage();
    nextImg
      .init()
      .setTitle(data[1].title || '')
      .setSrc(data[1].images.hidpi || data[1].images.normal || '');
    content.appendChild(nextImg.element());

    var previousButton = document.querySelector('.previous');
    var nextButton = document.querySelector('.next');
    var index = 0;

    nextButton.addEventListener('click', handleNext);
    previousButton.addEventListener('click', handlePrevious);

    for (var dataItem in data) {
      if (data.hasOwnProperty(dataItem)) {
        console.log(data[dataItem]);
      }
    }

    // TODO: place in Nav module
    function handleNext() {
      // index += 1;
      if(index < data.length - 1) {
        index += 1;
      } else {
        index = 0;
      }
      console.log(index, data[index].title);
      currentImg
        .setTitle(data[index].title || '')
        .setSrc(data[index].images.hidpi || data[index].images.normal || '');

      nextImg
        .setTitle(data[index + 1].title || 0)
        .setSrc(data[index + 1].images.hidpi || data[index + 1].images.normal || '');
    }

    // TODO: place in Nav module
    function handlePrevious() {
      if(index > 0) {
        index -= 1;
      } else {
        index = data.length - 1;
      }

      currentImg
        .setTitle(data[index].title || '')
        .setSrc(data[index].images.hidpi || data[index].images.normal || '');

      nextImg
        .setTitle(data[index - 1].title || 0)
        .setSrc(data[index - 1].images.hidpi || data[index - 1].images.normal || '');
    }
  }

  function CustomImage() {
    var _element = '';
    var _img = '';
    var _src = '';
    var _text = '';
    var _displayText = '';

    return this;
  }

  CustomImage.prototype.init = function(options) {
    var options = options || {};
    
    _img = new Image();
    _img.addEventListener('load', this.handleImageLoaded);
    _text = document.createElement('div');

    _element = document.createElement('div');
    _element.appendChild(_text);
    _element.appendChild(_img);
    return this;
  };

  CustomImage.prototype.handleImageLoaded = function() {
    console.log('image loaded');
  };

  CustomImage.prototype.element = function() {
    return _element;
  };

  CustomImage.prototype.setTitle = function(displayText) {
    _displayText = displayText;
    _text.innerHTML = _displayText || '';
    return this;
  };

  CustomImage.prototype.setSrc = function(src) {
    _src = src;
    _img.src = _src || '';
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