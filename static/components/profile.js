Vue.component("profile", {
	data: function () {
		return {
			user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
		}
	},
	template: `<div class="container-fluid">
	<div class="row">
		<div class="col-1">
			<div class="media">
				<div class="media-left">
					<img width="100" height="100" style="margin-top: 20px; margin-left: 70px;" class="media-object"
						src="../favicon.ico">
				</div>
			</div>
		</div>
		<div class="col-3" style="margin-top: 45px;">
			<h1 class="text-danger" style="font-size:35px; text-align: center; vertical-align: middle;">Web food shop
			</h1>
		</div>
		<div class="col-8 text-right">
			<div style="display: flex; flex-direction: row; padding: 0px 15px;">
				<div class="command-button dropdown" style="margin-left: 750px; margin-top: 45px;">
					<img src="../images/profile.png" width="30" height="30" style="margin: auto; margin-bottom: 5px;">
					<b class="dropdown-toggle" id="dropdownVisibilidad" style="font-size: 30px;"
						data-bs-toggle="dropdown" aria-expanded="false">
						{{user.name}}
					</b>
					<ul class="dropdown-menu" aria-labelledby="dropdownVisibilidad">
						<li><a class="dropdown-item" v-on:click="showProfile" style="font-size: 20px;" type="submit"> Profil </a></li>
						<li><a class="dropdown-item" v-on:click="logout" style="font-size: 20px;" type="submit">Odjavite se </a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<label for="profile" style="font-size: 55px; margin-left: 670px; "> <b>Profil</b> </label>
	<div class="row" style="margin-left: 520px; margin-top: 50px;">
		<div class="col-md-9">
			<form id="registrationForm">
				<div class="form-floating m-4 col-6">
					<input type="username" class="form-control" v-model="user.username" id="profileUsername" placeholder="Username" readonly>
					<label for="profileUsername">Korisničko ime</label>
				</div>
				<div class="form-floating m-4 col-6">
					<input type="name" class="form-control" v-model="user.name" id="profileName" placeholder="Name">
					<label for="profileName">Ime</label>
				</div>
				<div class="form-floating m-4 col-6">
					<input type="lastname" class="form-control" v-model="user.lastName" id="profileastName" placeholder="LastName">
					<label for="floatingLastName">Prezime</label>
				</div>
				<div class="form-floating m-4 col-6">
					<input type="password" class="form-control" v-model="user.password" id="profilePassword" placeholder="Password">
					<label for="profilePassword">Lozinka</label>
				</div>

				<button class="m-4 col-6 btn btn-lg btn-warning" v-on:click="save" type="submit">Sačuvaj</button>
				<div id="errorProfile" class="alert alert-danger col-6 m-4" role="alert" style="display: none;"></div>
				<div id="successProfile" class="alert alert-success col-6 m-4" role="alert" style="display: none;"></div>
			</form>

			<!--<form id="user-profile-form" class="has-validation-callback">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group has-success">
							<label for="firstname" style="font-size: 17px;"><b>Ime</b></label>
							<input type="text" data-validation="required" style="width: 300px; font-size: 17px;"
								name="firstName" id="firstname" v-model="user.name" class="form-control valid"
								data-validation-error-msg="Ovo je obavezno polje">
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group has-success">
							<label for="lastname" style="font-size: 17px;"><b>Prezime</b></label>
							<input type="text" data-validation="required" style="width: 300px; font-size: 17px;"
								name="lastName" id="lastname" v-model="user.lastName" class="form-control valid"
								data-validation-error-msg="Ovo je obavezno polje">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group has-success">
							<div class="field-required">
								<label for="username" style="font-size: 17px;"><b>Korisničko ime</b></label>
								<input type="text" readonly="readonly" id="username"
									style="width: 300px; font-size: 17px;" class="form-control valid" v-model="user.username"
									data-validation="required"
									data-validation-error-msg="Potrebno nam je vaše korisničko ime">
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<span id="update_user_profile_message" class="alert d-none" role="alert"
							data-success-message="Podaci su uspešno ažurirani."
							data-fail-message="Došlo je do problema sa promenom vaših detalja.">
						</span>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6" style="margin-top: 30px; ">
						<button type="submit" name="submit" style="font-size: 17px;" id="submit_user_profile"
							class="btn btn-warning btn-block" v-on:click="save">
							<b>Sačuvajte izmene </b></button>
					</div>
				</div>
			</form>-->
		</div>
	</div>

	<div class="row">
		<div>
			<img src="../images/stock-food-photos-bundle-bypeople-deals.png" style="margin-top: 20px;"
				class="header-image" height="300px" width="1520px" alt="header image">
		</div>
	</div>
</div>
`
	,
	mounted() {
		axios
			.get('/loggedUser')
			.then(response => {
				if (response.data === 'ERROR') {
					router.push('/');
					return;
				}
				this.user = response.data;
			});
	},
	methods: {
		showProfile: function () {
			event.preventDefault();
			router.push('/userProfile');
		},
		logout: function () {
			event.preventDefault();
			router.push('/');
			axios
				.post('/logout');
		},
		save: function () {
			event.preventDefault();

			$('#error').hide();
			if (this.user.username === null || this.user.password === null || this.user.name === null || this.user.lastName === null) {
				$('#errorProfile').text('Molimo popunite sva polja.');
				$('#errorProfile').show().delay(3000).fadeOut();
				$('html, body').animate({ scrollTop: document.body.scrollHeight }, "fast");
				return;
			}
			if (this.user.username.trim() === '' || this.user.password.trim() === '' || this.user.name.trim() === '' || this.user.lastName.trim() === '') {
				$('#errorProfile').text('Molimo popunite sva polja.');
				$('#errorProfile').show().delay(3000).fadeOut();
				$('html, body').animate({ scrollTop: document.body.scrollHeight }, "fast");
				return;
			}
			axios
				.post('/updateUser', this.user)
				.then(function (response) {
					$('#successProfile').text('Uspešno ste promenili podatke.');
					$('#successProfile').show().delay(3000).fadeOut();
					$('html, body').animate({ scrollTop: document.body.scrollHeight }, "fast");
					console.log(response);
				})
		}
	}
});