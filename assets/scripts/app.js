const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
const userInputs = document.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdrop = () => {
	backdrop.classList.toggle('visible');
};

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = 'block';
	} else {
		entryTextSection.style.display = 'none';
	}
};
const closeMovieDeleteModal = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove('visible');
};
const deleteMovieHandler = (movieId) => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	movies.slice(movieIndex, 1);
	const listRoot = document.getElementById('movie-list');
	listRoot.children[movieIndex].remove();
	// listRoot.removeChild(listRoot.children[movieIndex]);
	closeMovieDeleteModal();
	updateUI();
};

// localStorage.setItem('Rajan', '12345');
// localStorage.setItem('hair', '12345');
// console.log(localStorage.getItem('Rajan'));
// localStorage.removeItem('hair');

const startDeleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add('visible');
	toggleBackdrop();
	const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
	let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

	confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
	confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

	cancelDeletionButton.removeEventListener('click', closeMovieDeleteModal);

	cancelDeletionButton.addEventListener('click', closeMovieDeleteModal);
	confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement('li');
	newMovieElement.className = 'movie-element';
	newMovieElement.innerHTML = `
    <div class='movie-element__image'>
    <img src='${imageUrl}' alt='${title}'>
    </div>
    <div class='movie-element__info'>
    <h2>${title}</h2>
    <p>${rating}/5 Stars</p>
    </div>`;
	newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
	const listRoot = document.getElementById('movie-list');
	listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
	addMovieModal.classList.remove('visible');
};
const showMovieModal = () => {
	addMovieModal.classList.add('visible');
	toggleBackdrop();
};
const clearMovieInput = () => {
	for (const userInput of userInputs) {
		userInput.value = '';
	}
};
const cancelAddMovie = () => {
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;
	if (
		titleValue.trim() === '' ||
		imageUrValue.trim() === '' ||
		ratingValue.trim() === '' ||
		+ratingValue < 1 ||
		+ratingValue > 5
	) {
		alert('Please enter valid values ( rating between 1 and 5).');
		return;
	}
	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrValue,
		rating: ratingValue,
	};
	movies.push(newMovie);
	console.log(movies);
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
	updateUI();
};

const backdropClickHandler = () => {
	closeMovieModal();
	closeMovieDeleteModal();
	clearMovieInput();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
