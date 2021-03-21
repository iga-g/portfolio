"use strict";

var header = document.querySelector('header');

window.onscroll = function () {
  if (window.scrollY > 100) {
    header.classList.add('sticky-header');
  } else if (window.scrollY <= 50 ) {
    header.classList.remove('sticky-header');
  }
};

window.onload = function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (elem) {
    elem.onclick = function (event) {
      if (!elem.hash.startsWith("#")) return;
      event.preventDefault();
      document.querySelector(elem.hash).scrollIntoView({
        behavior: 'smooth'
      });
      window.location.hash = elem.hash;

      if (document.documentElement.clientWidth < 650 && menu.classList.contains('nav-menu_open')) {
        menu.classList.toggle('nav-menu_open');
        menu.toggleAttribute('aria-expanded') === 'false';
        btn.classList.toggle('btn-menu_open');
        btn.toggleAttribute('aria-expanded') === 'false';
      }
    };
  });
};

var btn = document.querySelector('.btn-menu');
var menu = document.querySelector('.nav-menu');
btn.addEventListener('click', function () {
  var isOpened = btn.getAttribute('aria-expanded') === 'true';
  btn.classList.toggle('btn-menu_open', !isOpened);
  btn.setAttribute('aria-expanded', String(!isOpened));
  menu.classList.toggle('nav-menu_open', !isOpened);
});

window.onresize = function () {
  if (document.documentElement.clientWidth > 650 && menu.classList.contains('nav-menu_open')) {
    menu.classList.toggle('nav-menu_open');
    menu.toggleAttribute('aria-expanded') === 'false';
    btn.classList.toggle('btn-menu_open');
    btn.toggleAttribute('aria-expanded') === 'false';
  }
};

function mailprompt(form, event) {
  event.preventDefault();
  fetch("https://b2b.candilla.eu/igg/api/mail", {
    body: new FormData(form),
    method: "post"
  }).then(function (r) {
    console.log(r);
  })["catch"](function (r) {
    console.log("err", r);
  });
}
