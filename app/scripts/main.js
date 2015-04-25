(function () {
  var accessToken = '885512ce4b18bbb6132f2c553f716838de07a5e0a49c866213946f5a092ba68e';
  var url = 'https://api.dribbble.com/v1/shots?access_token=' + accessToken;
  var xhr = new XMLHttpRequest();
  var data = {};
  xhr.addEventListener('load', dataLoaded);
  xhr.open('GET', url);
  xhr.send();

  // TODO: fetch data from localstorage if available
  function dataLoaded(event) {
    var response = this;
    // TODO: save response to localstorage
    // and check if xhr is needed to fetch data
    var _data = JSON.parse(this.responseText);
    data = _data
    createImageElement();  
  }

  var content = document.querySelector('.content');
  function createImageElement() {
    var currentImg = new CustomImage();

    currentImg
      .init()
      .setTitle(data[0].title || '')
      .setSrc(data[0].images.hidpi || data[0].images.normal || '');

    currentImg.element().classList.add('image');
    content.appendChild(currentImg.element());

    var previousButton = document.querySelector('.button--previous');
    var nextButton = document.querySelector('.button--next');
    var index = 0;

    nextButton.addEventListener('mousedown', handleClickButton);
    previousButton.addEventListener('mousedown', handleClickButton);

    // TODO: place in Nav module
    function handleClickButton(event) {
      if (event.target === nextButton) {
        index += 1;
      } else {
        index -= 1;
      }

      if (index > data.length - 1) {
        index = 0;
      }

      if (index < 0) {
        index = data.length - 1;
      }

      currentImg
        .setTitle(data[index].title || '')
        .setSrc(data[index].images.hidpi || data[index].images.normal || '');
    }

    // TODO: place in Nav module
    function handlePrevious() {
      index -= 1;
      
      currentImg
        .setTitle(data[index].title || '')
        .setSrc(data[index].images.hidpi || data[index].images.normal || '');
    }
  }

  function CustomImage() {
    this._element = null;
    this._img = null;
    this._imgContainer = null
    this._src = '';
    this._text = '';
    this._displayText = '';
    this._loaderElement = null;
    this._throbberElement = null;

    return this;
  }

  CustomImage.prototype.init = function(options) {
    var options = options || {};

    this._imgContainer = document.createElement('div');
    this._img = new Image();
    this._text = document.createElement('div');
    this._element = document.createElement('div');
    this._loaderElement = document.createElement('div');
    this._throbberElement = document.createElement('div');
    
    this._imgContainer.classList.add('image__container');
    this._text.classList.add('image__title');
    this._loaderElement.classList.add('loader');
    this._throbberElement.classList.add('throbber', 'throbber--medium');
    this._img.addEventListener('load', this.handleImageLoaded.bind(this));

    this._loaderElement.appendChild(this._throbberElement);
    this._imgContainer.appendChild(this._img);
    this._element.appendChild(this._loaderElement);
    this._element.appendChild(this._text);
    this._element.appendChild(this._imgContainer);

    return this;
  };

  CustomImage.prototype.handleImageLoaded = function(event) {
    this._loaderElement.classList.remove('active');
    this._throbberElement.classList.remove('active');
  };

  CustomImage.prototype.element = function() {
    return this._element;
  };

  CustomImage.prototype.setTitle = function(displayText) {
    this._displayText = displayText;
    this._text.innerHTML = this._displayText || '';
    this._loaderElement.classList.add('active');
    this._throbberElement.classList.add('active'); 
    return this;
  };

  CustomImage.prototype.setSrc = function(src) {
    this._src = src;
    this._img.src = this._src || '';
    return this;
  };
}());