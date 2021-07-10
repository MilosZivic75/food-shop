Vue.component("showRestaurant", {
    data: function () {
        return {
            restaurant: {name: null, restaurantType: null, articles: [], location: null, status: null, logo: '', averageRating: null},
            comments: []
        }
    },
    template: ` 
    <div>    
        <div class="row" >
            <div class="col-10" style="font-size: 80px; margin-left: 500px; margin-top: 40px;">
                <img :src="restaurant.logo" alt="" width="120" height="120">
                <label for=""> {{restaurant.name}} </label>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="font-size: 35px; margin-left: 300px; margin-top: 150px;">
                <label for=""> Tip: </label>
                <label for=""> {{restaurant.restaurantType}} </label>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="font-size: 35px; margin-left: 300px; margin-top: 20px;">
                <label for=""> Status: </label>
                <label for=""> {{restaurant.status}} </label>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="font-size: 35px; margin-left: 300px; margin-top: 20px;">
                <label for=""> Lokacija: </label>
                <label for=""> {{getAddress(restaurant)}} </label>
            </div>
        </div>
        <div v-if="comments.length !== 0">
            <div class="row">
                <div class="col-10" style="font-size: 35px; margin-left: 300px; margin-top: 20px;">
                    <label for=""> Ocena restorana: </label>
                    <label for=""> {{restaurant.averageRating}} </label>
                </div>
            </div>
            <div class="row">
                <div class="col-10" style="font-size: 35px; margin-left: 300px; margin-top: 20px;">
                    <label for=""> Komentari: </label>
                    <table style="margin-top: 20px; margin-left: 70px; margin-bottom: 100px;">
                        <tr v-for="comment in comments">
                            <td style="font-size: 25px;"> 
                                <label for=""> {{comment.text}} </label>
                                <label for="" style="margin-left: 70px;"> Ocena: {{comment.grade}} </label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="font-size: 35px; margin-left: 300px; margin-top: 20px;">
                <label for=""> Artikli: </label>
                <table style="margin-bottom: 200px; margin-top: 20px; margin-left: 70px;">
                    <tr>
                        <th> Slika </th>
                        <th> Naziv </th>
                        <th> Cena </th>
                        <th> Opis </th>
                    </tr>
                    <tr v-for="article in restaurant.articles">
                        <td> <img :src="article.image" alt="" height="100" width="100"> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{article.name}}</label> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{article.price}}</label> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{article.description}}</label> </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
`
    ,
    mounted() {
        axios
            .get('/getOpenedRestaurant')
            .then(response => {
                this.restaurant = response.data;
            });
        axios
            .get('/getRestaurantComments')
            .then(response => {
                this.comments = response.data;
            });
    },
    methods: {
        getAddress: function(restaurant) {
            let address = restaurant.location.address;
            return (address.street + ' ' + address.number + ' ' + ', ' + address.city + ' ' + address.postalCode + ', ' + address.country);
        }
    }
});