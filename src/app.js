const header = document.querySelector('header');

window.onscroll = () => {
    if (window.scrollY > 100){
      header.classList.add('sticky-header');
    } else if (window.scrollY <= 50 ) {
      header.classList.remove('sticky-header');
    }
};


window.onload = () => {
  document.querySelectorAll('a[href^="#"]').forEach(elem => {
      elem.onclick = (event) => {
          if (!elem.hash.startsWith("#")) return;
          event.preventDefault();
        document.querySelector(elem.hash).scrollIntoView({ behavior: 'smooth' });
        window.location.hash = elem.hash;

        if (document.documentElement.clientWidth < 650 && menu.classList.contains('nav-menu_open')) {
          menu.classList.toggle('nav-menu_open');
          menu.toggleAttribute('aria-expanded') === 'false';
          btn.classList.toggle('btn-menu_open');
          btn.toggleAttribute('aria-expanded') === 'false';
        }
      }
  });
}


const btn = document.querySelector( '.btn-menu' );
const menu = document.querySelector( '.nav-menu' );

btn.addEventListener( 'click', function() {
  const isOpened = btn.getAttribute( 'aria-expanded' ) === 'true';
  
  btn.classList.toggle('btn-menu_open', !isOpened );
  btn.setAttribute('aria-expanded', String( !isOpened ) );
  menu.classList.toggle('nav-menu_open', !isOpened);
});


window.onresize = () => {
  if (document.documentElement.clientWidth > 650 && menu.classList.contains('nav-menu_open')) {
    menu.classList.toggle('nav-menu_open');
    menu.toggleAttribute('aria-expanded') === 'false';
    btn.classList.toggle('btn-menu_open');
    btn.toggleAttribute('aria-expanded') === 'false';
  }
};


const popup = document.querySelector('.popup-wrapper');
const popupClose = document.querySelector('.popup-close');

function closePopup() {
  popup.style.display = "none";
}

function clearErrors() {
  document.querySelectorAll(".err-msg").forEach(elem => {
    elem.innerText = "";
  })
};

function mailprompt(form, event) {
  event.preventDefault();

  clearErrors();

  if (form.name.value.length == 0) {
    document.getElementById("name-validation-msg").innerText = `Fill the name field! I would like to know who contacts me :)`;
  } else if (form.email.value.length == 0) {
    document.getElementById("email-validation-msg").innerText = `I need your e-mail to answer!`;
  } else if (form.msg.value.length == 0) {
    document.getElementById("textarea-validation-msg").innerText = `Type your message!`;
  } else {
    fetch("https://b2b.candilla.eu/igg/api/mail", {
      body: new FormData(form),
      method: "post"
    }).then(function subAnswer() {
      popup.style.display = "flex";
      popupClose.addEventListener('click', closePopup);
      form.reset();
    }).catch(r => {
      console.log("err", r);
    });
  }
}