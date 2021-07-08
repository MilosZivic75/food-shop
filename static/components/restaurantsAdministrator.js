Vue.component("restaurantsAdministrator", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
            restaurants: null,
            newRestaurant: {
                name: null, restaurantType: null, location: {
                    latitude: null, longitude: null,
                    address: { street: null, number: null, postalCode: null, city: null, country: null }
                }, status: null, logo: null
            },
            image: null,
            managers: [],
            selectedManager: null,
            managerToAdd: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null }
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
                        <a class="dropdown-item" v-on:click="showComments">Komentari</a>
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

        <div class="modal fade" id="addRestaurantModal" role="dialog" aria-labelledby="addRestaurantModalLabel"
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
                                <select class="form-control" v-model="newRestaurant.restaurantType" id="floatingRestaurantType" placeholder="RestaurantType">
                                    <option value="Kineski">Kineski</option>
                                    <option value="Italijanski">Italijanski</option>
                                    <option value="Sendviči">Sendviči</option>
                                    <option value="Picerija">Picerija</option>
                                    <option value="Brza hrana">Brza hrana</option>
                                    <option value="Grill">Grill</option>
                                </select>
                                <label for="floatingRestaurantType">Tip restorana</label>
                            </div>
                            <div class="form-floating m-4">
                                <select class="form-control" v-model="newRestaurant.status" id="floatingStatus" placeholder="Status">
                                    <option value="Otvoren">Otvoren</option>
                                    <option value="Zatvoren">Zatvoren</option>
                                </select>
                                <label for="floatingStatus">Status</label>
                            </div>
                            <div class="form-floating m-4 ">
                                <input type="location" class="form-control"  readonly="readonly" id="floatingLocation" placeholder="Location">
                                <label for="floatingLocation">Adresa</label>
                                <a class="btn btn-primary" v-on:click="initModal"><i class="fa fa-map-marker mr-2"></i>Izaberite
								lokaciju</a>
                            </div>
                            <div>
                                <input class="form-control  mx-4" accept="image/*" @change="onFileChanged" id="formFileLg" type="file" style="width: 90%;"/>
                                <label class="mx-4" for="formFileLg">Izaberite logo</label>
                            </div>
                            <div class="form-floating m-4">
                                <select class="form-control" v-model="selectedManager" @change="openAddManagerModal" id="floatingManager" placeholder="Manager">
                                    <option v-for="manager in managers" v-bind:value="manager.username">{{manager.name}} {{manager.lastName}}</option>
                                    <option v-if="managers.length == 0">Dodaj menadžera</option>
                                </select>
                                <label for="floatingManager">Menadžer</label>
                            </div>

                            <button class="m-4 btn btn-lg btn-primary" v-on:click="addRestaurant" type="submit" style="width: 90%;">
                                Dodaj</button>
                            <div id="errorAddRes" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                            <div id="successAddRes" class="alert alert-success m-4" role="alert" style="display: none;"></div>
                            <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="location-modal" role="dialog" aria-labelledby="location-modal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="address-label">Izaberite lokaciju</h5>
                        <button type="button" v-on:click="closeMapModal" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="map" style="width: 100%; height: 400px;"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" v-on:click="closeMapModal" class="btn btn-primary" data-dismiss="modal"><i
                                class="fa fa-check"></i>Završeno</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="addManagerModal" role="dialog" aria-labelledby="addManagerModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addManagerModalLabel">Dodaj novog menadžera</h5>
                    </div>
                    <div class="modal-body align-items-center">
                        <form id="addManagerForm">
                            <div class="form-floating m-4 ">
                                <input type="name" class="form-control" v-model="managerToAdd.name" id="addManagerName" placeholder="Name">
                                <label for="addManagerName">Ime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="lastname" class="form-control" v-model="managerToAdd.lastName" id="addManagerLastName" placeholder="LastName">
                                <label for="addManagerLastName">Prezime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="date" class="form-control" v-model="managerToAdd.birthDate" id="addManagerBirthDate" placeholDer="BirthDate">
                                <label for="addManagerBirthDate">Datum rođenja</label>
                            </div>
                            <div class="form-floating m-4">
                                <select class="form-control" v-model="managerToAdd.sex" id="addManagerSex" placeholder="Sex">
                                    <option value="Muški">Muški</option>
                                    <option value="Ženski">Ženski</option>
                                </select>
                                <label for="addManagerSex">Pol</label>
                            </div>
                            <div class="form-floating m-4 ">
                                <input type="username" class="form-control" v-model="managerToAdd.username" id="addManagerUsername" placeholder="Username">
                                <label for="addManagerUsername">Korisničko ime</label>
                            </div>
                            <div class="form-floating m-4">
                                <input type="password" class="form-control" v-model="managerToAdd.password" id="addManagerPasswordReg" placeholder="Password">
                                <label for="addManagerPasswordReg">Lozinka</label>
                            </div>

                            <button class="m-4 btn btn-lg btn-primary" v-on:click="addManager" type="submit" style="width: 90%;">
                                Dodaj</button>
                            <div id="errorAddManager" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                            <div id="successAddManager" class="alert alert-success m-4" role="alert" style="display: none;"></div>
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
            axios
                .get('/getFreeManagers')
                .then(response => (this.managers = response.data));
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
        showComments: function () {
            event.preventDefault();
            router.push('/commentsAdministrator');
        },
        logout: function () {
            event.preventDefault();
            router.push('/');
            axios
                .post('/logout');
        },
        addRestaurant: function () {
            event.preventDefault();

            $('#errorAddRes').hide();
            if (this.newRestaurant.name === null || this.newRestaurant.status === null || this.newRestaurant.restaurantType === null
                || this.image === null || $('#floatingLocation').val() === null || this.selectedManager === null) {
                $('#errorAddRes').text('Molimo popunite sva polja.');
                $('#errorAddRes').show().delay(3000).fadeOut();
                $('#addRestaurantModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                return;
            }
            if (this.newRestaurant.name.trim() === '' || $('#floatingLocation').val().trim() === '' || $('#formFileLg').val() === '' ||
                this.selectedManager === 'Dodaj menadžera') {
                $('#errorAddRes').text('Molimo popunite sva polja.');
                $('#errorAddRes').show().delay(3000).fadeOut();
                $('#addRestaurantModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                return;
            }

            axios.post('/uploadLogo', this.image)
                .then(response => {
                    this.newRestaurant.logo = response.data;
                    axios.post('/addRestaurant', this.newRestaurant)
                        .then(response => {
                            if (response.data === 'SUCCESS') {
                                axios.post('/addRestaurantToManager', {username: this.selectedManager, restaurantId: this.newRestaurant.name});
                                $('#successAddRes').text('Restoran je uspesno dodat.');
                                $('#successAddRes').show().delay(3000).fadeOut();
                                $('#addRestaurantModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                                this.initSetup();

                                $('#addRestaurantModal').hide();
                                $('.modal-backdrop').hide();
                                $('body').removeClass('modal-open');
                            }
                            else {
                                $('#errorAddRes').text('Restoram sa datim imenom već postoji.');
                                $('#errorAddRes').show().delay(3000).fadeOut();
                                $('#addRestaurantModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                            }
                        });
                });
        },
        deleteRestaurant: function (name) {
            event.preventDefault();

            axios.post('/deleteRestaurant', {
                name: name,
            })
                .then(response => (this.initSetup()));
        },
        initModal: function () {
            event.preventDefault();

            var map, marker;

            $("#location-modal").modal('show');
            var location = new google.maps.LatLng(0, 0);
            var mapProperty = {
                center: location,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map'), mapProperty);
            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: location
            });

            this.geocodePosition(marker.getPosition());

            google.maps.event.addListener(marker, 'dragend', () => {
                map.setCenter(marker.getPosition());
                this.geocodePosition(marker.getPosition());
                $('#latitude').val(marker.getPosition().lat());
                $('#longitude').val(marker.getPosition().lng());
            });

            currentLat = $('#latitude').val();
            currentLng = $('#longitude').val();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    //$('#latitude').val(pos.lat);
                    //$('#longitude').val(pos.lng);
                    this.newRestaurant.location.latitude = pos.lat;
                    this.newRestaurant.location.longitude = pos.lng;

                    marker.setPosition(pos);

                    map.setCenter(marker.getPosition());
                    this.geocodePosition(marker.getPosition());
                });
            }
        },
        geocodePosition: function (pos) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                latLng: pos
            },
                (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                        for (let a of results[0].address_components) {
                            if (a.types[0] === 'street_number')
                                this.newRestaurant.location.address.number = cyrillicToLatin(a.long_name);
                            else if (a.types[0] === 'route')
                                this.newRestaurant.location.address.street = cyrillicToLatin(a.long_name);
                            else if (a.types[0] === 'locality')
                                this.newRestaurant.location.address.city = cyrillicToLatin(a.long_name);
                            else if (a.types[0] === 'postal_code')
                                this.newRestaurant.location.address.postalCode = cyrillicToLatin(a.long_name);
                            else if (a.types[0] === 'country')
                                this.newRestaurant.location.address.country = cyrillicToLatin(a.long_name);
                        }
                        $('#address-label').html(cyrillicToLatin(results[0].formatted_address));
                        $('#floatingLocation').val(cyrillicToLatin(results[0].formatted_address));
                    } else {
                        $('#address-label').html('Cannot determine address at this location.');
                    }
                }
            );
        },
        closeMapModal: function () {
            event.preventDefault();

            $('#location-modal').modal('hide');
            //$('.modal-backdrop').hide();
        },
        onFileChanged: function (event) {
            this.image = event.target.files[0];
        },
        openAddManagerModal: function () {
            if (this.managers.length == 0) {
                $('#addManagerModal').modal('show');
            }

        },
        addManager: function () {
            $('#errorAddManager').hide();
            if (this.managerToAdd.name === null || this.managerToAdd.lastName === null || this.managerToAdd.birthDate === null
                || this.managerToAdd.sex === null || this.managerToAdd.username === null || this.managerToAdd.password === null) {
                $('#errorAddManager').text('Molimo popunite sva polja.');
                $('#errorAddManager').show().delay(3000).fadeOut();
                $('#addManagerModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                return;
            }
            if (this.managerToAdd.name.trim() === '' || this.managerToAdd.lastName.trim() === '' || this.managerToAdd.birthDate.trim() === ''
                || this.managerToAdd.sex.trim() === '' || this.managerToAdd.username.trim() === '' || this.managerToAdd.password.trim() === '') {
                $('#errorAddManager').text('Molimo popunite sva polja.');
                $('#errorAddManager').show().delay(3000).fadeOut();
                $('#addManagerModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                return;
            }

            axios.post('/addUser', {
                name: this.managerToAdd.name,
                lastName: this.managerToAdd.lastName,
                birthDate: this.managerToAdd.birthDate,
                sex: this.managerToAdd.sex,
                username: this.managerToAdd.username,
                password: this.managerToAdd.password,
                userRole: 'Menadžer'
            })
                .then(response => {
                    if (response.data === 'SUCCESS') {
                        $('#successAddManager').text('Menadžer je uspesno dodat.');
                        $('#successAddManager').show().delay(3000).fadeOut();
                        $('#addManagerModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                        this.initSetup();

                        $('#addManagerModal').hide();
                        $('.modal-backdrop').hide();
                    }
                    else {
                        $('#errorAddManager').text('Korisnik sa datim korisničkim imenom već postoji.');
                        $('#errorAddManager').show().delay(3000).fadeOut();
                        $('#addManagerModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                    }
                });
        }
    }
});