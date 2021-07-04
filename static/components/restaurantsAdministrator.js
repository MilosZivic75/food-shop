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
            image: null
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
                            <input class="form-control form-control-lg m-4" accept="image/*" @change="onFileChanged" id="formFileLg" type="file" style="width: 90%;"/>

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

        <div class="modal fade" id="location-modal" tabindex="-1" role="dialog" aria-labelledby="location-modal" aria-hidden="true">
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
        addRestaurant: function () {
            event.preventDefault();

            const formData = new FormData()
            formData.append('myFile', this.image, this.image.name)
            axios.post('/uploadLogo', formData)
            //console.log(this.image);
        },
        deleteRestaurant: function (name) {
            event.preventDefault();

            axios.post('/deleteRestaurant', {
                name: name,
            })
                .then(response => (this.initSetup()));
        },
        initModal: function() {
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

					$('#latitude').val(pos.lat);
					$('#longitude').val(pos.lng);

					marker.setPosition(pos);

					map.setCenter(marker.getPosition());
					this.geocodePosition(marker.getPosition());
				});
			}
        },
        geocodePosition: function(pos) {
            geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				latLng: pos
			},
				(results, status) => {
					if (status == google.maps.GeocoderStatus.OK) {
						console.log(results);
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
                        console.log(this.newRestaurant);
						$('#address-label').html(cyrillicToLatin(results[0].formatted_address));
						$('#floatingLocation').val(cyrillicToLatin(results[0].formatted_address));
					} else {
						$('#address-label').html('Cannot determine address at this location.');
					}
				}
			);
        },
        closeMapModal: function() {
            event.preventDefault();

            $('#location-modal').modal('hide');
			//$('.modal-backdrop').hide();
        },
        onFileChanged: function(event) {
            this.image = event.target.files[0];
        },
        uploadImage(event) {

            const URL = '/uploadLogo'; 
        
            let data = new FormData();
            data.append('name', 'my-picture');
            data.append('file', event.target.files[0]); 
        
            let config = {
              header : {
                'Content-Type' : 'image/png'
              }
            }
        
            axios.put(
              URL, 
              data,
              config
            ).then(
              response => {
                console.log('image upload response > ', response)
              }
            )
          }
    }
});