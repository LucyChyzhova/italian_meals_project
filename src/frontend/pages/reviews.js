
window.handleReviewsRequest = () => {
  document.body.innerHTML = `<div class="logo">
  <a href="/"><img id="logo" src="https://live.staticflickr.com/65535/50090093592_4a0c888221_o.jpg" alt="mealsShearing-logo"></img>
  </div>
  <div class="first-block">

  <div class="menu">
  <a href="meals" data-navigo>menu</a>
  <a href="meal/41" data-navigo>special proposition</a>
  <a href="reviews" data-navigo>reviews</a>
  <a href="/about" data-navigo>about</a>
  </div>
  </div>`;

  // make sure the backend api works before working with it here
  fetch("/api/reviews")
      .then((response) => response.json())
      .then(renderReviews);

};
function renderReviews(reviews) {
  const ul = document.createElement("ul");

  reviews.forEach((review) => {
    const li = document.createElement("li");

  let showDate = review.created_date;
  let showOnlyDate = showDate.substr(0, 10);

     li.innerHTML =`
     
    <div class="review">
    <div><p class="date">Date: ${showOnlyDate} </p></div>  
    <div><p> ${review.description} </p></div>
    <div><p class="star">Stars:  ${review.stars}</p></div>
    </div>`;
    ul.appendChild(li);
  });

  document.body.appendChild(ul);
  
  document.body.appendChild(ul);

  const myfooter = document.createElement("div")
  myfooter.innerHTML = `
  <div class="footer">

  <div class="contacts">
  <p class="contact-title">Contacts:</p>
  <p>phone: +45 50154613</p>
  <p>liudmyla.chyzhova@gmail.com></p>
  <p><a href="https://www.linkedin.com/in/liudmylachyzhova/" target="_blank">LinkedIn</a></p>
  </div>
  <div>
  <a href="/about" data-navigo> <img class="cheif-img" src="https://live.staticflickr.com/65535/50116548013_320ebf7640.jpg" alt="cheif-img"> </a>
  </div>
</div>`
  document.body.appendChild(myfooter);
}