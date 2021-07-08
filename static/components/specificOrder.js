Vue.component("specificOrder", {
    data: function () {
        return {
            order: null,
            articles: [],
            quantity: []
        }
    },
    template: ` 
    <div>
        <div class="row" style="margin-left: 180px; ">
            <div class="col-8">
                <label for="" style="font-size: 40px; margin-left: 20px; margin-top: 100px;"> Narudžbina:  </label>
                <label for="" style="font-size: 40px; margin-left: 20px; margin-top: 100px;"> {{order.id}}  </label>
            </div>
        </div>
        <div class="row" style="margin-left: 180px; margin-top: 35px;">
            <div class="col-8">
                <label for="" style="font-size: 40px; margin-left: 20px;"> Restoran:  </label>
                <label for="" style="font-size: 40px; margin-left: 20px;"> {{order.restaurantID}}  </label>
            </div>
        </div>
        <div class="row" style="margin-left: 180px; margin-top: 35px;">
            <div class="col-8">
                <label for="" style="font-size: 40px; margin-left: 20px;"> Iznos:  </label>
                <label for="" style="font-size: 40px; margin-left: 20px;"> {{order.price}}  </label>
            </div>
            <div class="col-4" >
                <div class="container" >
                    <img src="images/food-order-icon-26.jpg" style="margin-right: 200px" alt="" height="150" width="150">
                </div>
            </div>
        </div>
        <div class="row" style="margin-left: 180px; margin-top: 35px;">
            <div class="col-8">
                <table style="font-size: 40px; margin-left: 20px;">
                    <tr>
                        <th> Artikli </th>
                        <th> <label for="" style="margin-left: 100px;"> Količina </label> </th>
                    </tr>
                    <tr v-for="(article, index) in articles">
                        <td> <label for="" > {{article.name}}</label> </td>
                        <td> <label for="" style="margin-left: 100px;"> {{quantityValue(article.name)}}  </label> </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
`
    ,
    mounted() {
        axios
            .get('/getSpecificOrder')
            .then(response => {
                this.order = response.data;
            });
        axios
            .get('/getArticlesFromSpecificOrder')
            .then(response => {
                this.articles = response.data;
            });
        axios
            .get('/getQuantityFromSpecificOrder')
            .then(response => {
                this.quantity = response.data;
            });
    },
    methods: {
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