Vue.component("restaurantsAdministrator", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
            restaurants: null,
            newRestaurant: {name: null, restaurantType: null, location: null, status: null, logo: null}
        }
    },
    template: ` 
    <div>
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-1 align-self-end">
                    <img width="80" height="80" src="../favicon.ico">
                </div>
                <div class="col-5 align-self-end">
                    <h1 style="font-size:40px; margin-left: -100%;">Web food shop</h1>
                </div>

                <div class="dropdown col-3 align-self-end">
                    <img src="../images/profile.png" width="30"
                        height="30" style="margin-top: -12px;">
                    <b class="dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false" style="font-size: 30px;">
                        {{user.name}}
                    </b>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                        <a class="dropdown-item" v-on:click="showProfile">Profil</a>
                        <a class="dropdown-item" v-on:click="showUsers">Korisnici</a>
                        <a class="dropdown-item" v-on:click="showRestaurants">Restorani</a>
                        <a class="dropdown-item" v-on:click="logout">Odjavite se</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-end" style="margin-top: 50px;">
            <button type="button" class="btn btn-outline-dark col-2" style="margin-right: 200px" data-toggle="modal" data-target="#addRestaurantModal">
            Dodaj restoran</button>
        </div>
        <div class="row" style="margin-top: 150px; margin-left: 30px;"> 
			<div class="col-2" v-for="restaurant in restaurants" style="margin-left:30px"> 
				<p style="border:3px; border-style:solid; background-color:#f7f7cb; border-color: #d47400; padding: 1em;">
				<img :src="restaurant.logo" style="width: 40px; height: 40px;"><br />
				Ime: {{restaurant.name}}<br>Tip: {{restaurant.restaurantType}}<br> Stanje: {{restaurant.status}}
                <br> <button class="btn btn-danger btn-sm col-7" v-on:click="deleteRestaurant(restaurant.name)">Obriši</button></p>
			</div>
		</div>
        <div class="row">
            <div>
                <img src="../images/administrator-main.jpg" style="margin-top: 20px; position:relative; bottom:0" class="header-image"
                    height="300px" width="100%" alt="header image">
            </div>
        </div>

        <div class="modal fade" id="addRestaurantModal" tabindex="-1" role="dialog" aria-labelledby="addRestaurantModalLabel"
		aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addRestaurantModalLabel">Dodaj restoran</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body align-items-center">
                        <form id="addRestaurantForm">
                            <div class="form-floating m-4 ">
                                <input type="name" class="form-control" v-model="newRestaurant.name" id="floatingName" placeholder="Name">
                                <label for="floatingName">Naziv</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="restaurantType" class="form-control" v-model="newRestaurant.restaurantType" id="floatingRestaurantType" placeholder="RestaurantType">
                                <label for="floatingRestaurantType">Tip</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="date" class="form-control" v-model="user.birthDate" id="floatingBirthDate" placeholDer="BirthDate">
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
                                <input type="username" class="form-control" v-model="user.username" id="floatingUsername" placeholder="Username">
                                <label for="floatingUsername">Korisničko ime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="password" class="form-control" v-model="user.password" id="floatingPasswordReg" placeholder="PasswordReg">
                                <label for="floatingPasswordReg">Lozinka</label>
                            </div>

                            <button class="m-4 btn btn-lg btn-primary" v-on:click="addRestaurant" type="submit" style="width: 90%;">
                                Dodaj</button>
                            <div id="errorReg" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                            <div id="successReg" class="alert alert-success m-4" role="alert" style="display: none;"></div>
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
        this.initSetup();
    },
    methods: {
        initSetup: function () {
            axios
                .get('/loggedUser')
                .then(response => {
                    if (response.data === 'ERROR') {
                        router.push('/');
                        return;
                    }
                    this.user = response.data;
                });
            axios
                .get('/getRestaurants')
                .then(response => (this.restaurants = response.data));
        },
        showProfile: function () {
            event.preventDefault();
            router.push('/userProfile');
        },
        showUsers: function () {
            event.preventDefault();
            router.push('/usersAdministrator');
        },
        showRestaurants: function () {
            event.preventDefault();
            router.push('/restaurantsAdministrator');
        },
        logout: function () {
            event.preventDefault();
            router.push('/');
            axios
                .post('/logout');
        },
        addRestaurant: function() {
            event.preventDefault();
        },
        deleteRestaurant: function (name) {
            event.preventDefault();

            axios.post('/deleteRestaurant', {
                name: name,
            })
                .then(response => (this.initSetup()));
        }
    }
});