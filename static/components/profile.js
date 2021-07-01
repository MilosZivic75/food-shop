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
	<div class="row" style="margin-left: 370px; margin-top: 50px;">
		<div class="col-md-9">
			<form id="user-profile-form" class="has-validation-callback">
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
							class="btn btn-warning btn-block">
							<b>Sačuvajte izmene </b></button>
					</div>
				</div>
			</form>
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
        }
    }
});