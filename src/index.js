// index.js

let ramens = [];

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = (form) => {
  // Add code
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Name:', event.target.elements.name.value);
    console.log('Restaurant:', event.target.elements.restaurant.value);
    console.log('Image:', event.target.elements.image.value);
    console.log('Rating:', event.target.elements.rating.value);
    console.log('Comment:', event.target.elements['new-comment'].value);
    
    try{
      const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target.elements['new-comment'].value,
      id: ramens.length + 1,
    };

    ramens.push(newRamen);

    const ramenMenuDiv = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.addEventListener('click', () => {
      handleClick(newRamen);
    });
    ramenMenuDiv.appendChild(img);

    event.target.reset();
   } 
    catch (error) {
           console.error('Error adding new ramen:', error);
      }
    });
  };

const displayRamens = () => {
  // Add code
  return fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((data) => {
      ramens = data;
      const ramenMenuDiv = document.getElementById('ramen-menu');
      data.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => {
          handleClick(ramen);
        });
        ramenMenuDiv.appendChild(img);
      });
    })
    .catch((error) => {
      console.error('Error fetching ramens:', error);
    });
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  const form = document.getElementById('new-ramen');
  addSubmitListener(form);
};

document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};