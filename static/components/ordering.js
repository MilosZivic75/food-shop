Vue.component("order", {
    data: function () {
        return {
            restaurants: null
        }
    },
    template: ` 
    <div>
        <div class="container">
            <img src="images/images.jpg" style="margin-top: 30px;" width="90%" height="350">
            <div class="top-left" style="font-size: 100px; margin-top: 150px; margin-left: 150px;"> <b>Naruči hranu</b>
            </div>
        </div>
        <div class="row" style="margin-top: 30px; margin-left: 150px;" v-for="restaurant in restaurants">
            <div class="col-2">
                <button class="buttonStyle" v-on:click="restaurantMenu">
                    <p style="margin-left: 20px; border:3px; border-style:solid; background-color:#f7f7cb; border-color: #d47400; padding: 1em;">
                        <img :src="restaurant.logo" style="width: 40px; height: 40px;"><br />
                        Ime: {{restaurant.name}}<br>Tip: {{restaurant.restaurantType}}<br> Stanje: {{restaurant.status}}
                    </p>
                </button>
            </div>
        </div>
    </div>
    `
    ,
    mounted() {
        axios
            .get('/getRestaurants')
            .then(response => {
                this.restaurants = response.data;
                console.log(this.restaurants);
            });
    },
    methods: {
        restaurantMenu: function () {
            
    }
});