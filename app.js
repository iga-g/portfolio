const header = document.querySelector('header');

window.onscroll = () => {
    if (window.scrollY > 100) {
      header.classList.add('sticky-header');
    } else {
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
      }
  });
}

function mailprompt(form, event) {
  event.preventDefault();

  fetch("https://b2b.candilla.eu/igg/api/mail", {
      body: new FormData(form),
      method: "post"
  }).then(r => {
      console.log(r)
  }).catch(r => {
      console.log("err", r);
  })
}

