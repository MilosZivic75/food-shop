$(document).ready(function () {
	$('#loginForm').submit(function (event) {
		event.preventDefault();
		let username = $('input[id="floatingInput"]').val();
		let password = $('input[id="floatingPassword"]').val();
		$('#error').hide();
		if (username.trim() === '' || password.trim() === '') {
			$('#error').text('Molimo popunite sva polja.');
			$('#error').show().delay(3000).fadeOut();
			return;
		}

		axios.post('/login', {
			username: username,
			password: password
		})
		.then(function (response) {
			if(response.data === 'SUCCESS') {
				$('#success').text('Korisnik je uspesno prijavljen.');
				$('#success').show().delay(3000).fadeOut();
				console.log(response)
			}
			else {
				$('#error').text('Pogresno korisnicko ime i/ili lozinka.');
				$('#error').show().delay(3000).fadeOut();
				console.log(response)
			}
		})
	});

	$('#registrationForm').submit(function (event) {
		event.preventDefault();
		let name = $('input[id="floatingName"]').val();
		let lastName = $('input[id="floatingLastName"]').val();
		let birthDate = $('input[id="floatingBirthDate"]').val();
		let sex = $('#floatingSex').val();
		let username = $('input[id="floatingUsername"]').val();
		let password = $('input[id="floatingPasswordReg"]').val();
		$('#errorReg').hide();
		if (name.trim() === '' || lastName.trim() === '' || birthDate.trim() === '' || sex.trim() === '' 
				|| username.trim() === '' || password.trim() === '') {
			$('#errorReg').text('Molimo popunite sva polja.');
			$('#errorReg').show().delay(3000).fadeOut();
			return;
		}

		axios.post('/registration', {
			name: name,
			lastName: lastName,
			birthDate: birthDate,
			sex: sex,
			username: username,
			password: password
		})
		.then(function (response) {
			if(response.data === 'SUCCESS') {
				$('#successReg').text('Korisnik je uspesno registrovan.');
				$('#successReg').show().delay(3000).fadeOut();
				console.log(response)
			}
			else {
				$('#errorReg').text('Korisnik sa datim korisničkim imenom već postoji.');
				$('#errorReg').show().delay(3000).fadeOut();
				console.log(response)
			}
		})
	});
});