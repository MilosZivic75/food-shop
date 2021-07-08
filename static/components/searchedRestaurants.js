Vue.component("foundedRestaurants", {
    data: function () {
        return {
            restaurants: null
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
        <div class="row" style="margin-left: 50px; margin-top: 60px; font-size: 20px; text-align: center;">
            <div class="col-10">
                <label for="" style="font-size: 40px; " v-if="restaurants.length === 0"> Nijedan restoran nije pronadjen! </label>
                <table v-else>
                    <tr>
                        <th> Logo </th>
                        <th> Restoran </th>
                        <th> Tip </th>
                        <th> Adresa </th>
                        <th> Prosečna ocena </th>
                    </tr>
                    <tr v-for="restaurant in restaurants">
                        <td> <img :src="restaurant.logo" alt="" height="80" width="80"> </td>
                        <td> <label for="" style="margin-left: 30px; margin-right: 20px;"> {{restaurant.name}} </label> </td>
                        <td> <label for="" style="margin-left: 30px;"> {{restaurant.restaurantType}} </label> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{getAddress(restaurant)}} </label> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{restaurant.averageRating}} </label> </td>
                        <td> 
                            <button class="btn btn-primary" style="margin-left: 40px;" v-on:click="showRestaurant(restaurant)"> Prikaži </button>
                        </td>
                    </tr>
                </table>
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
            });
    },
    methods: {
        showRestaurant: function(restaurant) {},

        getAddress: function(restaurant) {
            let address = restaurant.location.address;
            return (address.street + ' ' + address.number + ' ' + ', ' + address.city + ' ' + address.postalCode + ', ' + address.country);
        }
    }
});