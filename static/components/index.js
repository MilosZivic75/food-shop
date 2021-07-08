Vue.component("index", {
	data: function () {
		return {
			user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
			restaurants: null
		}
	},
	template: ` 
	<div class="bg" style="background-image: url('images/main-background.jpg');">
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-4">
                    <h1 style="font-size:50px;">Web food shop</h1>
                </div>
                <div class="col-3 align-self-end">
                    <button type="button" class="btn btn-outline-dark" data-toggle="modal"
                        data-target="#loginModal">Prijava</button>
                    <button type="button" class="btn btn-outline-dark" data-toggle="modal"
                        data-target="#registrationModal">Registracija</button>
                </div>
            </div>
            <div class="row">
                <div class="col-10" style="font-size: 20px; margin-top: 50px; margin-left: 50px;">
                    <label for=""> <b> Pronadjite restorane: </b> </label>
                    <input type="text" value="Naziv restorana" id="nameRes">
                    <input type="text" value="Lokacija restorana" id="locationRes">
                    <select name="cars" id="typeRes">
                        <option value="Tip restorana">Tip restorana</option>
                        <option value="Brza hrana">Brza hrana</option>
                        <option value="Kineski">Kineski</option>
                        <option value="Picerija">Picerija</option>
                        <option value="Roštilj">Roštilj</option>
                        <option value="Riblji">Riblji</option>
                    </select>
                    <select name="cars" id="gradeRes">
                        <option value="Izaberi ocenu">Izaberi ocenu</option>
                        <option value="1-2">1-2</option>
                        <option value="2-3">2-3</option>
                        <option value="3-4">3-4</option>
                        <option value="4-5">4-5</option>
                    </select>
                    <button class="btn btn-outline-dark" style="margin-bottom: 10px; font-size: 20px;" v-on:click="findRestaurants"> Traži </button>
                </div>
            </div>
            <label for="" id="findError" style="font-size: 20px; color: red; display: none;"> Molimo oznacite makar jedan parametar za pretragu! </label> <br>
            <label for="" id="locationError" style="font-size: 20px; color: red; display: none;"> Za pretragu po lokaciji unesite ulicu u kojoj tražie restoran, bez broja! </label>
            <div class="row" style="margin-top: 200px; margin-left: 30px;">
                <div class="col-2" v-for="restaurant in restaurants">
                    <p
                        style="border:3px; border-style:solid; background-color:#f7f7cb; border-color: #d47400; padding: 1em;">
                        <img :src="restaurant.logo" style="width: 40px; height: 40px;"><br />
                        Ime: {{restaurant.name}}<br>Tip: {{restaurant.restaurantType}}<br> Stanje: {{restaurant.status}}
                    </p>
                </div>
            </div>
        </div>
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginModalLabel">Prijava</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body align-items-center">
                        <form id="loginForm">
                            <div class="form-floating m-4 ">
                                <input type="username" class="form-control" v-model="user.username" id="floatingInput"
                                    placeholder="Username">
                                <label for="floatingInput">Korisničko ime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="password" class="form-control" v-model="user.password"
                                    id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Lozinka</label>
                            </div>

                            <div class="checkbox m-4">
                                <label>
                                    <input type="checkbox" value="remember-me"> Zapamti me
                                </label>
                            </div>
                            <button class="m-4 btn btn-lg btn-primary" v-on:click="loginUser" type="submit"
                                style="width: 90%;">Uloguj se</button>
                            <div id="error" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                            <div id="success" class="alert alert-success m-4" role="alert" style="display: none;"></div>
                            <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="registrationModal" tabindex="-1" role="dialog"
            aria-labelledby="registrationModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="registrationModalLabel">Registracija</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body align-items-center">
                        <form id="registrationForm">
                            <div class="form-floating m-4 ">
                                <input type="name" class="form-control" v-model="user.name" id="floatingName"
                                    placeholder="Name">
                                <label for="floatingName">Ime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="lastname" class="form-control" v-model="user.lastName"
                                    id="floatingLastName" placeholder="LastName">
                                <label for="floatingLastName">Prezime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="date" class="form-control" v-model="user.birthDate" id="floatingBirthDate"
                                    placeholDer="BirthDate">
                                <label for="floatingBirthDate">Datum rođenja</label>
                            </div>
                            <div class="form-floating m-4">
                                <select class="form-control" v-model="user.sex" id="floatingSex" placeholder="Sex">
                                    <option value="Muški">Muški</option>
                                    <option value="Ženski">Ženski</option>
                                </select>
                                <label for="floatingSex">Pol</label>
                            </div>
                            <div class="form-floating m-4 ">
                                <input type="username" class="form-control" v-model="user.username"
                                    id="floatingUsername" placeholder="Username">
                                <label for="floatingUsername">Korisničko ime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="password" class="form-control" v-model="user.password"
                                    id="floatingPasswordReg" placeholder="PasswordReg">
                                <label for="floatingPasswordReg">Lozinka</label>
                            </div>

                            <button class="m-4 btn btn-lg btn-primary" v-on:click="registrateUser" type="submit"
                                style="width: 90%;">Registruj
                                se</button>
                            <div id="errorReg" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                            <div id="successReg" class="alert alert-success m-4" role="alert" style="display: none;">
                            </div>
                            <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>	 
`
	,
	mounted() {
		axios
			.get('/getRestaurants')
			.then(response => ( this.restaurants = response.data ));
	},
	methods: {
		loginUser: function () {
			event.preventDefault();

			$('#error').hide();
			if (this.user.username === null || this.user.password === null) {
				$('#error').text('Molimo popunite sva polja.');
				$('#error').show().delay(3000).fadeOut();
				return;
			}
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
						console.log(response);
						router.push('/administrator');
						$('#loginModal').hide();
						$('.modal-backdrop').hide();
					}
					else if (response.data === 'SUCCESS/manager') {
						$('#success').text('Korisnik je uspesno prijavljen.');
						$('#success').show().delay(3000).fadeOut();
						console.log(response);
						router.push('/manager');
						$('#loginModal').hide();
						$('.modal-backdrop').hide();
					}
					else if (response.data === 'SUCCESS/deliverer') {
						$('#success').text('Korisnik je uspesno prijavljen.');
						$('#success').show().delay(3000).fadeOut();
						console.log(response);
						router.push('/deliverer');
						$('#loginModal').hide();
						$('.modal-backdrop').hide();
					}
					else if (response.data === 'SUCCESS/customer') {
						$('#success').text('Korisnik je uspesno prijavljen.');
						$('#success').show().delay(3000).fadeOut();
						console.log(response);
						router.push('/customer');
						$('#loginModal').hide();
						$('.modal-backdrop').hide();
					}
					else if (response.data === 'ERROR') {
						$('#error').text('Pogresno korisnicko ime i/ili lozinka.');
						$('#error').show().delay(3000).fadeOut();
						console.log(response);
					}
					else if (response.data === 'BLOCKED') {
						$('#error').text('Vaš nalog je blokiran, za više informacija obratite se administratoru.');
						$('#error').show().delay(3000).fadeOut();
						console.log(response);
					}
				});
		},
		registrateUser: function () {
			event.preventDefault();
			$('#errorReg').hide();
			if (this.user.name === null || this.user.lastName === null || this.user.birthDate === null
				|| this.user.sex === null || this.user.username === null || this.user.password === null) {
				$('#errorReg').text('Molimo popunite sva polja.');
				$('#errorReg').show().delay(3000).fadeOut();
				$('#registrationModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
				return;
			}
			if (this.user.name.trim() === '' || this.user.lastName.trim() === '' || this.user.birthDate.trim() === ''
				|| this.user.sex.trim() === '' || this.user.username.trim() === '' || this.user.password.trim() === '') {
				$('#errorReg').text('Molimo popunite sva polja.');
				$('#errorReg').show().delay(3000).fadeOut();
				$('#registrationModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
				return;
			}

			axios.post('/registration', {
				name: this.user.name,
				lastName: this.user.lastName,
				birthDate: this.user.birthDate,
				sex: this.user.sex,
				username: this.user.username,
				password: this.user.password
			})
				.then(function (response) {
					if (response.data === 'SUCCESS') {
						$('#successReg').text('Korisnik je uspesno registrovan.');
						$('#successReg').show().delay(3000).fadeOut();
						$('#registrationModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
						console.log(response)
						router.push('/customer');
						$('#registrationModal').hide();
						$('.modal-backdrop').hide();
					}
					else {
						$('#errorReg').text('Korisnik sa datim korisničkim imenom već postoji.');
						$('#errorReg').show().delay(3000).fadeOut();
						$('#registrationModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
						console.log(response)
					}
				})
		},
		findRestaurants: function() {
			axios.post('/findRestaurants', {
                name: document.getElementById('nameRes').value,
                location: document.getElementById('locationRes').value,
                type: document.getElementById('typeRes').value,
				grade: document.getElementById('gradeRes').value
            })
                .then(function (response) {
                    if(response.data === 'NO PARAMETERS'){
						$('#findError').show().delay(3000).fadeOut();
					} else {
						router.push('/foundedRestaurants');
					}
                });
		}
	}
});