const elList = document.querySelector(".js-list");
const elForm = document.querySelector(".js-form");
const elCountry = elForm.querySelector(`input[type="text"]`);
const elRanges = elForm.querySelectorAll(`input[type="range"]`);
const elSelect = elForm.querySelector("select");
const fragment = document.createDocumentFragment();

function render(array) {
	elList.innerHTML = "";
	if (array.length) {
		array.forEach((item) => {
			const itemElement = document.createElement("li");

			itemElement.innerHTML = `
    					<strong>Full name</strong>: ${item.first_name} ${item.last_name} <br />
					<strong>gender</strong>: ${item.gender} <br />
					<strong>country</strong>: ${item.country} <br /><strong>money</strong>: $${item.money}
    `;

			itemElement.classList.add(
				"item",
				"border",
				"border-3",
				"border-black",
				"rounded-2",
				"p-3",
				"flex-grow-1"
			);

			fragment.appendChild(itemElement);
		});
	} else {
		const liElement = document.createElement("li");
		liElement.textContent = "Nothing is found, plaese search correctly";
		fragment.appendChild(liElement);
	}

	elList.appendChild(fragment);
}

render(users);

elRanges.forEach((item) => {
	item.nextSibling.textContent = `$${item.value}`;
	item.addEventListener("change", () => {
		item.nextSibling.textContent = `$${item.value}`;
	});
});

elForm.addEventListener("submit", (evt) => {
	evt.preventDefault();

	if (elSelect.value && elCountry.value) {
		const genderArr = users.filter((item) => item.gender.toLowerCase() == elSelect.value.trim());
		const countryArr = genderArr.filter(
			(item) => item.country.toLowerCase() == elCountry.value.toLowerCase().trim()
		);
		const rangeArr = countryArr.filter(
			(item) => item.money >= +elRanges[0].value && item.money <= +elRanges[1].value
		);
		render(rangeArr);
	} else if (elSelect.value) {
		const genderArr = users.filter((item) => item.gender.toLowerCase() == elSelect.value.trim());
		const rangeArr = genderArr.filter(
			(item) => item.money >= +elRanges[0].value && item.money <= +elRanges[1].value
		);
		render(rangeArr);
	} else if (elCountry.value) {
		const countryArr = users.filter(
			(item) => item.country.toLowerCase() == elCountry.value.toLowerCase().trim()
		);
		const rangeArr = countryArr.filter(
			(item) => item.money >= +elRanges[0].value && item.money <= +elRanges[1].value
		);
		render(rangeArr);
	} else if (!elCountry.value && !elSelect.value) {
		const rangeArr = users.filter(
			(item) => item.money >= +elRanges[0].value && item.money <= +elRanges[1].value
		);
		render(rangeArr);
	} else {
		render(users);
	}
});
