Vue.component("shopping-cart", {
    data: function () {
        return {
            articles: [],
            quantity: [],
            username: null,
            price: null
        }
    },
    template: ` 
    <div>
        <div class="row" style="margin-left: 500px; margin-top: 50px;">
            <div class="col-12">
                <img src="images/shopping-cart.png" alt="" width="100" height="100" style="margin-bottom: 70px;">
                <label for="" style="font-size: 90px; margin-left: 20px;"> <b>Vaša korpa</b> </label>
            </div>
        </div>
        <div class="row" style="margin-left: 200px; margin-top: 40px;">
            <label for="" style="font-size: 30px;"> Narudžbina: </label>
        </div>
        <div class="row" style="margin-left: 200px; margin-top: 10px; font-size: 25px; text-align: center;">
            <div class="col-7">
                <table>
                    <tr>
                        <th> Slika </th>
                        <th> Naziv </th>
                        <th> Cena </th>
                        <th> Količina </th>
                    </tr>
                    <tr v-for="(article, index) in this.articles">
                        <td> <img :src="article.image" alt="" height="100" width="100"> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{article.name}}</label> </td>
                        <td> <label for="" style="margin-left: 40px;"> {{article.price}}</label> </td>
                        <td>
                                <button class="buttonPlusMinus" style="margin-left: 40px; width: 35px;" v-on:click="minusPressed(article, index)">-</button>
                                <input type="text" :id="article.name" disabled :value="quantity[index]" style="width: 35px;">
                                <button class="buttonPlusMinus" style="width: 35px; margin-left: 10px;" v-on:click="plusPressed(article, index)">+</button>
                        </td>
                        <td> <button class="btn btn-warning" style="margin-left: 40px;" v-on:click="removeFromCart(article, index)">Izbaci iz korpe</button></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-8" style="margin-left: 200px; font-size: 20px; margin-top: 40px;">
                <label for=""> Iznos: </label>
                <input type="text" :value="price" disabled> 
            </div>
            
        </div>
        <div class="row">
            <div class="col-4">
                <button class="btn btn-warning" style="margin-left: 200px; margin-top: 30px; font-size: 25px;" v-on:click="backToArticles"> <b>Nastavi naručivanje </b></button>
                <div id="errorReg" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                <div id="successReg" class="alert alert-success m-4" role="alert" style="display: none;"></div>
            </div> 
            <div class="col-4">
                <button class="btn btn-warning" style="margin-left: 200px; margin-top: 30px; font-size: 25px;"> <b>Kreiraj porudžbinu </b></button>
                <div id="errorReg" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                <div id="successReg" class="alert alert-success m-4" role="alert" style="display: none;"></div>
            </div> 
        </div>
    </div>
    `
    ,
    mounted() {
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
            .get('/loggedUser')
            .then(response => {
                if (response.data === 'ERROR') {
                    router.push('/');
                    return;
                }
                this.username = response.data.username;
            });
        axios
            .get('/getPrice')
            .then(response => {
                this.price = response.data;
            });
    },
    methods: {
        minusPressed: function(addedArticle, index) {
           
            if(document.getElementById(addedArticle.name).value == "1") {
                alert("Kolčina ne može biti manja od 1!");
            } else {
                this.quantity[index] = this.quantity[index] - 1;
                document.getElementById(addedArticle.name).value = this.quantity[index]
                this.price = this.price - addedArticle.price;
                axios.post('/addToCart', {
                    name: addedArticle.name,
                    price: addedArticle.price,
                    articleType: addedArticle.articleType,
                    restaurantID: addedArticle.restaurantID,
                    amount: addedArticle.amount,
                    description: addedArticle.description,
                    image: addedArticle.image,
                    quantity: parseInt(document.getElementById(addedArticle.name).value),
                    username: this.username
                })
                    .then(function (response) {
                        
                    });
            }
        },

        plusPressed: function(addedArticle, index) {
            
            this.quantity[index] = this.quantity[index] + 1;
            document.getElementById(addedArticle.name).value = this.quantity[index]
            this.price = this.price + addedArticle.price;
            axios.post('/addToCart', {
                name: addedArticle.name,
                price: addedArticle.price,
                articleType: addedArticle.articleType,
                restaurantID: addedArticle.restaurantID,
                amount: addedArticle.amount,
                description: addedArticle.description,
                image: addedArticle.image,
                quantity: parseInt(document.getElementById(addedArticle.name).value),
                username: this.username
            })
                .then(function (response) {
                    
                });
        },

        backToArticles: function() {
            event.preventDefault();
            router.push('/restaurantArticles');
        },

        removeFromCart: function(selectedArticle, index) {
            this.price = this.price - selectedArticle.price * this.quantity[index];

            axios.post('/removeFromCart', {
                name: selectedArticle.name,
                price: selectedArticle.price,
                articleType: selectedArticle.articleType,
                restaurantID: selectedArticle.restaurantID,
                amount: selectedArticle.amount,
                description: selectedArticle.description,
                image: selectedArticle.image,
                quantity: parseInt(document.getElementById(selectedArticle.name).value),
                username: this.username
            })
                .then(function (response) {
                    document.getElementsByTagName('tr')[index + 1].remove();  
                    alert("Artikal izbačen iz korpe!");
                });
        }
    }
});