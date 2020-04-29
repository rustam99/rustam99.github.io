document.addEventListener('DOMContentLoaded', function () {
	// Toggle текста ->
	(function () {
		const $text = document.querySelector('.toggle-text__content');
		const $controller = document.querySelector('.toggle-text__controller');
		let flag = true;

		$controller.addEventListener('click', function () {
			if (flag) {
				$text.classList.add('toggle-text__content_active');
				$controller.classList.add('toggle-text__controller_active');
				$controller.innerText = 'Скрыть';

				flag = false;
			} else {
				$text.classList.remove('toggle-text__content_active');
				$controller.classList.remove('toggle-text__controller_active');
				$controller.innerText = 'Подробнее';

				flag = true;
			}
		});
	})();
	// <- Toggle текста

	// Рейтинг ->
	(function () {
		const $starsValue = document.querySelector('.stars__value');
		const $stars = document.querySelectorAll('.stars__icon');
		const $ratingValues = document.querySelectorAll('.rating-list__value');
		let rating = 0;

		for (let i = 0; i < $ratingValues.length; i++) {
			let value = parseInt($ratingValues[i].innerText);

			rating += value;
		}

		rating /= $ratingValues.length;

		$starsValue.innerText = rating.toFixed(1);

		const fullStars = parseInt(rating);
		const halfStars = rating < 5 ? fullStars + 1 : 0;

		for (let i = 0; i < $stars.length; i++) {
			if (i === halfStars - 1) {
				$stars[i].classList.add('stars__icon_half');
			}

			if (i > halfStars - 1 && halfStars !== 0) {
				$stars[i].classList.add('stars__icon_empty');
			}
		}
	})();
	// <- Рейтинг

	// Модальное окно ->
	(function () {
		const $body = document.body;
		const $imagesContainer = document.querySelector('.reviews__images');
		const modal = document.createElement('div');

		$imagesContainer.addEventListener('click', function (e) {
			const self = e.target;

			if (self.classList.contains('reviews__img')) {
				const imgUrl = self.getAttribute('src').split('/');
				const imgName = imgUrl[imgUrl.length - 1].split('.')[0] += '_big';

				imgUrl[imgUrl.length - 1] = imgName;

				const url = imgUrl.join('/') + '.png';

				modal.innerHTML = `
					<img class="modal__img" src="${url}" alt="${imgName}">
					<div class="modal__close"></div>
				`;
				modal.classList.add('modal', 'modal_active');

				$body.append(modal);
			}
		});

		modal.addEventListener('click', closeModal);
		document.addEventListener('keyup', closeModal);

		function closeModal(e) {
			const self = e.target;
			const key = e.key;

			if (self.classList.contains('modal__close')) {
				modal.classList.remove('modal_active');
				modal.style = '';
			}

			if (key === 'Escape') {
				modal.classList.remove('modal_active');
				modal.style = '';
			}
		}
	})();
	// <- Модальное окно
});
