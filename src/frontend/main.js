var root = document.location.origin;
var router = new Navigo(root);

// when no route specified it assumes the base route: "/"
router.on("/", window.handleHomeRequest).resolve();
router.on("/meals", window.handleMealsRequest).resolve();
router.on("/meal/:id", window.handleMealRequest).resolve();
router.on("/reviews", window.handleReviewsRequest).resolve();
router.on("/reservations", window.handleReservationRequest).resolve(); // or reservationS
router.on("/about", window.handleAboutRequest).resolve(); 
