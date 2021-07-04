Vue.component("restaurantArticles", {
    data: function () {
        return {
            restaurant: null
        }
    },
    template: ` 
        <div>    
            <div class="row" style="margin-left: 500px; margin-top: 50px;">
                <div class="col-12">
                <img :src="restaurant.logo" alt="" width="100" height="100" style="margin-bottom: 70px;">
                <label for="" style="font-size: 90px; margin-left: 20px;"> <b>{{restaurant.name}}</b> </label>
                </div>
            </div>
            <div class="row" style="margin-left: 200px; margin-top: 40px;">
                <label for="" style="font-size: 30px;"> Ponuda: </label>
            </div>
            <div class="row" style="margin-left: 200px; margin-top: 10px; font-size: 25px; text-align: center;">
                <div class="col-7">
                    <table>
                        <tr>
                            <th> Slika </th>
                            <th> Naziv </th>
                            <th> Količina </th>
                        </tr>
                        <tr>
                            <td> <img src="images/hamburgerMcDonalds.png" alt="" height="100" width="100"> </td>
                            <td> <label for="" style="margin-left: 40px;"> hamburger</label> </td>
                            <td>
                                <button class="buttonPlusMinus" style="margin-left: 40px; width: 35px; ">-
        
                                </button><span class="cc-controls-quantity-input" style="margin-left: 15px;">1</span>
                                <button class="buttonPlusMinus" style="width: 35px; margin-left: 10px;">+</button>
                            </td>
                            <td> <button class="btn btn-warning" style="margin-left: 40px;">Dodaj u korpu</button></td>
                        </tr>
                    </table>
                </div>
                <div class="col-5">
                    <div class="container" style="margin-right: 100px; margin-top: 100px;" >
                        <img src="images/shopping-cart.png" alt="" height="70" width="70">
                        <button class="btn btn-warning" v-on:click="shoppingCart" style=" font-size: 25px; margin-right: 100px; "> <b> Vaša korpa </b></button>
                    </div>
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
    },
    methods: {
        shoppingCart: function() {
            event.preventDefault();
            router.push('/shoppingCart');
        }
    }
});