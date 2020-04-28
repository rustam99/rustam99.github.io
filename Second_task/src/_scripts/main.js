(function() {
	/*
		Здесь есть два пути решения:
		1) Подключить jquey;
		2) Переписать на нативный, я использовал этот способ, причем использовал xml а не fetch, потому что ради ie пришлось бы подключать fetch-polyfil
	*/
	function addToCartHanlder() {
		const $container = document.querySelector('[data-add-to-cart]');

		$container.addEventListener('click', function(e) {
			const self = e.target;
			
			if (self.classList.contains('btn')) {
				const xhr = new XMLHttpRequest();
				const $btn = self;

				xhr.open('GET', './fakedata/cartResponse.json');
				xhr.send();

				xhr.onload = function() {
					if (xhr.status === 200) {
						$btn.innerText = 'Добавлено';
						$btn.classList.remove('btn-primary');
						$btn.classList.add('btn-success');

						document.querySelector('[data-cart-count]').innerText = JSON.parse(xhr.response).count;
					}
				};
			}
		// 	$.ajax({
		// 		url: './fakedata/cartResponse.json',
		// 		type: 'GET',
		// 		dataType: 'html',
		// 		success: (res) => {
		// 			if (res.succes) {
		// 				$btns
		// 					.text('Добавлено')
		// 					.removeClass('btn-primary')
		// 					.addClass('btn-success');
							
		// 				$('[data-cart-count]').text(res.count);
		// 			}
		// 		}
		// 	});
		// });
		});
	}

	function main() {
		addToCartHanlder();
	};

	main();
}());
