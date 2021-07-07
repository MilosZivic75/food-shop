Vue.component("rateRestaurant", {
    data: function () {
        return {
            restaurant: {name: null, restaurantType: null, location: null, status: null, logo: ''},
            rateValue: 0,
            user: null
        }
    },
    template: ` 
    <div>
        <div class="row" style="margin-left: 500px; ">
            <div class="col-12">
                <img :src="restaurant.logo" alt="" width="100" height="100" style="margin-bottom: 70px;">
                <label for="" style="font-size: 90px; margin-left: 20px;"> <b> {{restaurant.name}} </b> </label>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <p style="margin-left: 200px;  font-size: 25px;"> Ocena: </p>
            </div>
            <div class="col-5" >
                <button class="btn btn-default" v-on:click="changedRate(1)"> 1 </button>
                <button class="btn btn-default" style="margin-left: 20px" v-on:click="changedRate(2)"> 2 </button>
                <button class="btn btn-default" style="margin-left: 20px" v-on:click="changedRate(3)"> 3 </button>
                <button class="btn btn-default" style="margin-left: 20px" v-on:click="changedRate(4)"> 4 </button>
                <button class="btn btn-default" style="margin-left: 20px" v-on:click="changedRate(5)"> 5 </button>
            </div>
            <div class="col-4">
                <button class="btn btn-success" style=" font-size: 20px; margin-left: 40px;" v-on:click="addRate"> Zabeleži ocenjivanje </button>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <label for="" style="margin-left: 200px; margin-top: 50px; font-size: 25px;"> Komentar: </label>
            </div>
            <div class="col-9"> 
                <input type="text" id="comment" style=" margin-top: 50px; font-size: 25px; width: 90%; "> 
            </div>
        </div>
        <div class="container">
            <img src="images/rating-restaurant.jpg" alt="" width="100%" height="300" style="margin-left: 30px; margin-top: 80px;"> 
        </div>
    </div>
`
    ,
    mounted() {
        axios
            .get('/ratingRestaurant')
            .then(response => {
                this.restaurant = response.data;
            });
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
        changedRate: function(rate) {
            this.rateValue = rate;
        },

        addRate: function() {
            axios.post('/addRate', {
                customerUsername: this.user.username,
                restaurantID: this.restaurant.name,
                text: document.getElementById("comment").value,
                grade: this.rateValue
            })
                .then(function (response) {
                    alert("Komentar zabeležen!");
                    router.push('/customer');
                });
        }
    }
});