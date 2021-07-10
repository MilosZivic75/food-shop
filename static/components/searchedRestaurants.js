Vue.component("foundedRestaurants", {
    data: function () {
        return {
            restaurants: [],
			showingRestaurants: [],
            filterOpened: false,
            filterGrill: false,
            filterFastFood: false,
            filterChinese: false,
            filterPizzeria: false,
            filterFishes: false,
            sortUpName: false,
            sortDownName: false,
            sortUpAddress: false,
            sortDownAddress: false,
            sortUpNum: false,
            sortDownNum: false
        }
    },
    template: ` 
    <div>
        <div class="row" >
            <div class="container" style="margin-top: 30px;">
                <img src="images/search.png" alt="" width="200" height="150" style="margin-bottom: 50px;">
                <label for="" style="font-size: 70px; margin-top: 30px;"> Rezultati pretrage </label>
            </div>
        </div>
        <div class="row" style="margin-left: 50px; margin-top: 60px; font-size: 20px; text-align: center;" v-if="restaurants.length === 0">
            <div class="col-10">
                <label for="" style="font-size: 40px; " > Nijedan restoran nije pronadjen! </label>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-3">
                    <button class="btn btn-outline-dark" style="margin-left: 200px; " v-on:click="showAll" > Prikaži sve </button>
                </div>
            </div>
            <div class="row">
                <div class="col-4" style="font-size: 20px; margin-left: 120px; margin-top: 20px;">
                    <table>
                        <tr>
                            <td> <label for="" > Sortiranje po: </label> </td>
                        <tr>
                            <td> <label for="" > 1. nazivu </label> </td>
                            <td> <input type="radio" style="margin-left: 30px;" v-model="sortUpName" v-on:click="sortUpByName"> Rastuće </td>
                            <td> <input type="radio" style="margin-left: 10px;" v-model="sortDownName" v-on:click="sortDownByName"> Opadajuće </td>
                        </tr>
                        <tr>
                            <td> <label for="" > 2. adresi </label> </td>
                            <td> <input type="radio" style="margin-left: 30px;" v-model="sortUpAddress" v-on:click="sortUpByAddress"> Rastuće </td>
                            <td> <input type="radio" style="margin-left: 10px;" v-model="sortDownAddress" v-on:click="sortDownByAddress"> Opadajuće </td>
                        </tr>
                        <tr>
                            <td> <label for="" > 3. oceni </label> </td>
                            <td> <input type="radio" style="margin-left: 30px; " v-model="sortUpNum" v-on:click="sortUpByNum"> Rastuće </td>
                            <td> <input type="radio" style="margin-left: 10px;" v-model="sortDownNum" v-on:click="sortDownByNum"> Opadajuće </td>   
                        </tr>
                    </table>
                </div>
                <div class="col-5" style="font-size: 20px; margin-left: 40px; margin-top: 20px;">
                    <table>
                        <tr>
                            <td> <label for="" > Filtriranje: </label> </td>
                        </tr>
                        <tr>
                            <td> <label for="" > 1. status </label> </td>
                            <input type="radio" style="margin-left: 30px;" id="opened" v-model="filterOpened" v-on:click="getOpened"> Otvoreni
                        </tr>
                        <tr>
                            <td> <label for="" > 2. tip restorana </label> </td>
                            <td> <input type="radio" style="margin-left: 30px;" id="fastfood" v-model="filterFastFood" v-on:click="getFastFoodRes"> Brza hrana </td>
                            <td> <input type="radio" id="grill" v-model="filterGrill" v-on:click="getGrillRes"> Roštilj </td>
                            <td> <input type="radio" id="chinese" v-model="filterChinese" v-on:click="getChineseRes"> Kineski </td>
                            <td> <input type="radio" id="pizzeria" v-model="filterPizzeria" v-on:click="getPizzeria"> Picerija </td>
                            <td> <input type="radio" id="fishes" v-model="filterFishes" v-on:click="getFishRes"> Riblji </td>
                        </tr>
                    
                    </table>
                </div>
            </div>
            <div class="row" style="margin-left: 50px; margin-top: 60px; font-size: 20px; text-align: center;">
                <div class="col-10">
                    <table id="tableRes" v-if="showingRestaurants.length !== 0">
                        <tr>
                            <th> Logo </th>
                            <th> Restoran </th>
                            <th> Tip </th>
                            <th> Adresa </th>
                            <th> Prosečna ocena </th>
                        </tr>
                        <tr v-for="restaurant in showingRestaurants" id="searchedRes">
                            <td> <img :src="restaurant.logo" alt="" height="80" width="80"> </td>
                            <td> <label for="" style="margin-left: 30px; margin-right: 20px;"> {{restaurant.name}} </label> </td>
                            <td> <label for="" style="margin-left: 30px;"> {{restaurant.restaurantType}} </label> </td>
                            <td> <label for="" style="margin-left: 40px;"> {{getAddress(restaurant)}} </label> </td>
                            <td> <label for="" style="margin-left: 40px;"> {{restaurant.averageRating}} </label> </td>
                            <td> 
                                <button class="btn btn-primary" style="margin-left: 40px;" v-on:click="showDataOfRestaurant(restaurant)"> Prikaži </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
`
    ,
    mounted() {
        axios
            .get("/getRestaurantsAfterSearch")
            .then(response => {
                this.restaurants = response.data;
                this.showingRestaurants = response.data;
            });
    },
    methods: {
        showDataOfRestaurant: function(restaurant) {
            axios.post('/openedRestaurant', {
                name: restaurant.name,
                restaurantType: restaurant.restaurantType,
                articles: restaurant.articles,
                status: restaurant.status,
                location: restaurant.location,
                logo: restaurant.logo,
                averageRating: restaurant.averageRating
            })
                .then(function (response) {
                    router.push('/showRestaurant');
                });
        },

        getAddress: function(restaurant) {
            let address = restaurant.location.address;
            return (address.street + ' ' + address.number + ' ' + ', ' + address.city + ' ' + address.postalCode + ', ' + address.country);
        },

        showAll: function() {
            this.showingRestaurants = this.restaurants;

            this.filterOpened = false,
            this.filterGrill = false,
            this.filterFastFood = false,
            this.filterChinese = false,
            this.filterPizzeria = false,
            this.filterFishes = false,
            this.sortUpName = false,
            this.sortDownName = false,
            this.sortUpAddress = false,
            this.sortDownAddress = false,
            this.sortUpNum = false,
            this.sortDownNum = false
        },

        sortUpByName: function() {
            if(this.sortUpName === false){
                this.showingRestaurants.sort((a,b) => a.name.localeCompare(b.name));
                this.sortDownName = false;
                this.sortUpAddress = false;
                this.sortDownAddress = false;
                this.sortUpNum = false;
                this.sortDownNum = false;
            } 
        },

        sortDownByName: function() {
            if(this.sortDownName === false){
                this.showingRestaurants.sort((a,b) => b.name.localeCompare(a.name));
                this.sortUpName = false;
                this.sortUpAddress = false;
                this.sortDownAddress = false;
                this.sortUpNum = false;
                this.sortDownNum = false;
            } 
        },

        sortUpByAddress: function() {
            if(this.sortUpAddress === false){
                this.showingRestaurants.sort((a,b) => a.location.address.street.localeCompare(b.name));
                this.sortUpName = false;
                this.sortDownName = false;
                this.sortDownAddress = false;
                this.sortUpNum = false;
                this.sortDownNum = false;
            } 
        },

        sortDownByAddress: function() {
            if(this.sortDownAddress === false){
                this.showingRestaurants.sort((a,b) => b.location.address.street.localeCompare(a.name));
                this.sortUpName = false;
                this.sortDownName = false;
                this.sortUpAddress = false;
                this.sortUpNum = false;
                this.sortDownNum = false;
            } 
        },

        sortUpByNum: function() {
            if(this.sortUpNum === false){
                this.showingRestaurants.sort((a,b) => a.averageRating - b.averageRating);
                this.sortUpName = false;
                this.sortDownName = false;
                this.sortUpAddress = false;
                this.sortDownAddress = false;
                this.sortDownNum = false;
            } 
        },
    
        sortDownByNum: function() {
            if(this.sortDownNum === false){
                this.showingRestaurants.sort((a,b) => b.averageRating - a.averageRating);
                this.sortUpName = false;
                this.sortDownName = false;
                this.sortUpAddress = false;
                this.sortDownAddress = false;
                this.sortUpNum = false;
            } 
        },

        getOpened: function() {
            if(this.filterOpened === false){
                this.showingRestaurants = []
                for(var i=0; i<this.restaurants.length; i++){
                    if(this.restaurants[i].status === 'Otvoren'){
                        this.showingRestaurants.push(this.restaurants[i]);
                    }
                }
                
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }             
        },

        getGrillRes: function() {
            if(this.filterGrill === false){
                this.showingRestaurants = []
                for(var i=0; i<this.restaurants.length; i++){
                    if(this.restaurants[i].restaurantType === 'Roštilj'){
                        this.showingRestaurants.push(this.restaurants[i]);
                    }
                }

                this.filterOpened = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        }, 

        getFastFoodRes: function() {
            if(this.filterFastFood === false){
                this.showingRestaurants = []
                for(var i=0; i<this.restaurants.length; i++){
                    if(this.restaurants[i].restaurantType === 'Brza hrana'){
                        this.showingRestaurants.push(this.restaurants[i]);
                    }
                }

                this.filterOpened = false,
                this.filterGrill = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        },

        getChineseRes: function() {
            if(this.filterChinese === false){
                this.showingRestaurants = []
                for(var i=0; i<this.restaurants.length; i++){
                    if(this.restaurants[i].restaurantType === 'Kineski'){
                        this.showingRestaurants.push(this.restaurants[i]);
                    }
                }

                this.filterOpened = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        },

        getPizzeria: function() {
            if(this.filterPizzeria === false){
                this.showingRestaurants = []
                for(var i=0; i<this.restaurants.length; i++){
                    if(this.restaurants[i].restaurantType === 'Picerija'){
                        this.showingRestaurants.push(this.restaurants[i]);
                    }
                }

                this.filterOpened = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterFishes = false
            }             
        },

        getFishRes: function() {
            if(this.filterFishes === false){
                this.showingRestaurants = []
                for(var i=0; i<this.restaurants.length; i++){
                    if(this.restaurants[i].restaurantType === 'Riblji'){
                        this.showingRestaurants.push(this.restaurants[i]);
                    }
                }

                this.filterOpened = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false
            }            
        }

    }   
});