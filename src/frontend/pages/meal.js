window.handleMealRequest = (params) => {
  let orderForm;
  fetch(`/api/meals?availableReservations=true`)
    .then((response) => response.json())
    .then(
      (response) => (orderForm = renderReservationForm(response, params.id))
    )
    .then(()=>
    {
      fetch(`/api/meals/${params.id}`) // http://localhost:3000/meal/4
      .then((response) => response.json())
      .then(renderMeal);
  });
};

function renderMeal(meal) {
  const ul = document.createElement("ul");

  meal.forEach((meal) => {
    const li = document.createElement("li");
    ul.innerHTML = `<div class="meal-title">${meal.title}</div>`;
    li.innerHTML = `<img id="meal-${meal.id}" class="main-picture" src="${meal.picture}" alt="meal-img"></img> <p>${meal.description}</p> `;
    ul.appendChild(li);
  });

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

function renderReservationForm(availableMeals, currentMealId) {
  const availableMeal = availableMeals.filter((m) => m.id == currentMealId);
  let orderForm;
  if (availableMeal.length > 0) {
    orderForm = `<div><p class="form-header">Reserve this meal</p></div>
  <div>
    <form action="../../api/reservations" method="post"> 
    <label for="name">name:</label>
    <input type="text" id="name" name="name"><br><br>
    <label for="email">email:</label>
    <input type="text" id="email" name="email"><br><br>
    <input type="hidden" id="meal_id" name="meal_id" value="${currentMealId}" >
    <label for="number_of_guests">number of guests:</label>
    <input type="int" id="number_of_guests" name="number_of_guests"><br><br>
    <input class="submit-btn" type="submit" value="Submit">
  </form>
    
  </div>
      <div>`;
  } else {
    orderForm = `<p class="form-header">Unfortunately, this meal is not available for reservation</p>`;
  }

  document.body.innerHTML = `
  <div class="logo">
  <a href="/"><img id="logo" src="https://live.staticflickr.com/65535/50090093592_4a0c888221_o.jpg" alt="mealsShearing-logo"></img>
  </div>

  <div class="first-block">

  <div class="menu">
  <a href="/meals" data-navigo>menu</a>
  <a href="/meal/41" data-navigo>special proposition</a>  
  <a href="/reviews" data-navigo>reviews</a>
  </div>
  ${orderForm}
  </div>`;

}
