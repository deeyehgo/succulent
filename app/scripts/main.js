(function () {
  // Fetch data
  var accessToken = '885512ce4b18bbb6132f2c553f716838de07a5e0a49c866213946f5a092ba68e';
  var url = 'https://api.dribbble.com/v1/buckets/266815/shots?access_token=' + accessToken;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', dataLoaded);
  xhr.open('GET', url);
  xhr.send();

  function dataLoaded(event) {
    var response = this.response;
    for (var responseItem in response) {
      if (response.hasOwnProperty(responseItem)) {
        console.log(response[responseItem]);
      }
    }
  }
}());