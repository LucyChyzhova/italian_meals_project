window.handleHomeRequest = () => {
  document.body.innerHTML = `
  
  <div class="logo">
  <img id="logo" src="https://live.staticflickr.com/65535/50090093592_4a0c888221_o.jpg" alt="mealsShearing-logo"></img>
  </div>

<div class="first-block">
  <div class="menu">
  <a href="meals" data-navigo>menu</a>
  <a href="meal/7" data-navigo>special proposition</a>
  <a href="reviews" data-navigo>reviews</a>
  </div>

  <div class="first-block-img">
  <img class="main-picture" src="https://live.staticflickr.com/65535/50089191818_2a9d1d594d_o.jpg" alt="main picture pizza"> 
  </div>
</div>

<div class="flag">
  <div class="line-green"></div>
  <div class="line-white"></div>
  <div class="line-red"></div>
</div>

<div class="footer">

  <div class="contacts">
  <p class="contact-title">Contacts:</p>
  <p>phone: +45 50154613</p>
  <p>liudmyla.chyzhova@gmail.com></p>
  <p><a href="https://www.linkedin.com/in/liudmylachyzhova/" target="_blank">LinkedIn</a></p>
  </div>

  
  <a href="/about" data-navigo><img class="cheif-img" src="https://live.staticflickr.com/65535/50097908823_d32062acd9_m.jpg" alt="cheif-img"></a>
  
  

</div>`;

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
