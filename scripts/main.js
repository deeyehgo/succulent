"use strict";!function(){function e(){var e=this.responseText,i=JSON.parse(e);r=i,t()}function t(){function e(e){e.target===s?a+=1:a-=1,a>r.length-1&&(a=0),0>a&&(a=r.length-1),t.setTitle(r[a].title||"").setSrc(r[a].images.hidpi||r[a].images.normal||"")}var t=new i;t.init().setTitle(r[0].title||"").setSrc(r[0].images.hidpi||r[0].images.normal||""),t.element().classList.add("image"),l.appendChild(t.element());var n=document.querySelector(".button--previous"),s=document.querySelector(".button--next"),a=0;s.addEventListener("mousedown",e),n.addEventListener("mousedown",e)}function i(){return this._element=null,this._img=null,this._imgContainer=null,this._src="",this._text="",this._displayText="",this._loaderElement=null,this._throbberElement=null,this}var n="885512ce4b18bbb6132f2c553f716838de07a5e0a49c866213946f5a092ba68e",s="https://api.dribbble.com/v1/shots?access_token="+n,a=new XMLHttpRequest,r={};a.addEventListener("load",e),a.open("GET",s),a.send();var l=document.querySelector(".content");i.prototype.init=function(){return this._imgContainer=document.createElement("div"),this._img=new Image,this._text=document.createElement("div"),this._element=document.createElement("div"),this._loaderElement=document.createElement("div"),this._throbberElement=document.createElement("div"),this._imgContainer.classList.add("image__container"),this._text.classList.add("image__title"),this._loaderElement.classList.add("loader"),this._throbberElement.classList.add("throbber","throbber--medium"),this._img.addEventListener("load",this.handleImageLoaded.bind(this)),this._loaderElement.appendChild(this._throbberElement),this._imgContainer.appendChild(this._img),this._element.appendChild(this._loaderElement),this._element.appendChild(this._text),this._element.appendChild(this._imgContainer),this},i.prototype.handleImageLoaded=function(){this._loaderElement.classList.remove("active"),this._throbberElement.classList.remove("active")},i.prototype.element=function(){return this._element},i.prototype.setTitle=function(e){return this._displayText=e,this._text.innerHTML=this._displayText||"",this._loaderElement.classList.add("active"),this._throbberElement.classList.add("active"),this},i.prototype.setSrc=function(e){return this._src=e,this._img.src=this._src||"",this}}();