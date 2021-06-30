Vue.component("customer", {
	data: function () {
		return {
			user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
		}
	},
	template: ` 
kurcina
`
	,
	methods: {
		loginUser: function () {
			event.preventDefault();

			$('#error').hide();
			if (this.user.username.trim() === '' || this.user.password.trim() === '') {
				$('#error').text('Molimo popunite sva polja.');
				$('#error').show().delay(3000).fadeOut();
				return;
			}
			axios.post('/login', {
				username: this.user.username,
				password: this.user.password
			})
				.then(function (response) {
					if (response.data === 'SUCCESS/administrator') {
						$('#success').text('Korisnik je uspesno prijavljen.');
						$('#success').show().delay(3000).fadeOut();
						console.log(response)
						router.push('/administrator');
					}
					else if (response.data === 'SUCCESS/manager') {
						$('#success').text('Korisnik je uspesno prijavljen.');
						$('#success').show().delay(3000).fadeOut();
						console.log(response)
						router.push('/manager');
					}
					else if (response.data === 'SUCCESS/deliverer') {
						$('#success').text('Korisnik je uspesno prijavljen.');
						$('#success').show().delay(3000).fadeOut();
						console.log(response)
						router.push('/deliverer');
					}
					else if (response.data === 'SUCCESS/customer') {
						$('#success').text('Korisnik je uspesno prijavljen.');
						$('#success').show().delay(3000).fadeOut();
						console.log(response)
						router.push('/customer');
					}
					else if (response.data === 'ERROR') {
						$('#error').text('Pogresno korisnicko ime i/ili lozinka.');
						$('#error').show().delay(3000).fadeOut();
						console.log(response)
					}
				})
		}
	}
});