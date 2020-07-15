window.handleReservationRequest = () => {
  document.body.innerHTML = 

  // make sure the backend api works before working with it here
  fetch(`/api/reservations`) // http://localhost:3000/reservation
    .then((response) => response.json())
    .then(renderReservation);
};

function renderReservation(reservation) {
    const ul = document.createElement("ul");
  
    reservation.forEach((el) => {
      const li = document.createElement("li");
  
      li.innerHTML = `
       <div class ="meals-flex">
       
       <div class="meal-title"><a href="meal/${el.id}" data-navigo>${el.number_of_guests}</a></div>
    
       <div>`;
      ul.appendChild(li);
    });
  
    document.body.appendChild(ul);
  }
