Vue.component("restaurantArticles", {
    data: function () {
        return {
            restaurant: {name: null, restaurantType: null, location: null, status: null, logo: ''},
            user: null,
            articles: [],
            quantity: [],
            comments: []
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
        <div class="row" style="margin-left: 200px; margin-top: 10px; font-size: 22px; text-align: center;">
            <div class="col-8">
                <table>
                    <tr>
                        <th> Slika </th>
                        <th> Naziv </th>
                        <th> Cena </th>
                        <th> Količina </th>
                    </tr>
                    <tr v-for="article in restaurant.articles">
                        <td> <img :src="article.image" alt="" height="100" width="100"> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{article.name}}</label> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{article.price}}</label> </td>
                        <td>
                            <button class="buttonPlusMinus" style="margin-left: 40px; width: 35px;" v-on:click="minusPressed(article.name)">-</button>
                            <input type="text" :id="article.name" disabled :value="quantityValue(article.name)" style="width: 35px;">
                            <button class="buttonPlusMinus" style="width: 35px; margin-left: 10px;" v-on:click="plusPressed(article.name)">+</button>
                        </td>
                        <td> <button class="btn btn-warning" style="margin-left: 40px;" v-on:click="addToCart(article)">Dodaj u korpu</button></td>
                    </tr>
                </table>
            </div>
            <div class="col-4">
                <div class="container" style="margin-right: 100px; margin-top: 100px;" >
                    <img src="images/shopping-cart.png" alt="" height="70" width="70">
                    <button class="btn btn-warning" v-on:click="shoppingCart" style=" font-size: 25px; margin-right: 100px; "> <b> Vaša korpa </b></button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-5">
                <div class="container" style="margin-top: 40px; text-align: center;" >
                    <img src="images/comment.png"  width="40" height="40" alt="">
                    <label for="" style="font-size: 30px;"> Komentari: </label>
                </div>
            </div>
        </div>
        <div class="row" style="margin-left: 200px; margin-top: 20px;">
            <div class="col-12">
                <table style="margin-bottom: 250px">
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
`
    ,
    mounted() {
        axios
            .get('/getOpenedRestaurant')
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
        axios
            .get('/getArticles')
            .then(response => {
                this.articles = response.data;
            });
        axios
            .get('/getQuantity')
            .then(response => {
                this.quantity = response.data;
            });
        axios
            .get('/getRestaurantComments')
            .then(response => {
                this.comments = response.data;
            });
    },
    methods: {
        shoppingCart: function() {
            event.preventDefault();
            router.push('/shoppingCart');
        },

        addToCart: function (addedArticle) {
            axios.post('/addToCart', {
                name: addedArticle.name,
                price: addedArticle.price,
                articleType: addedArticle.articleType,
                restaurantID: addedArticle.restaurantID,
                amount: addedArticle.amount,
                description: addedArticle.description,
                image: addedArticle.image,
                quantity: parseInt(document.getElementById(addedArticle.name).value),
                username: this.user.username
            })
                .then(function (response) {
                    alert("Artikal dodat u korpu!");
                });
            
        },

        minusPressed: function(name) {
            if(document.getElementById(name).value == "1") {
                alert("Količina ne može biti manja od 1!");
            } else {
                document.getElementById(name).value = parseInt(document.getElementById(name).value) - 1;
            }
        },

        plusPressed: function(name) {
            document.getElementById(name).value = parseInt(document.getElementById(name).value) + 1;
        },

        quantityValue: function(articleName){
            for(let i=0; i<this.articles.length; i++){
                if(this.articles[i].name == articleName){
                    return this.quantity[i].toString();
                }
            }
            return "1";
        }
    }
});