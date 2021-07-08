Vue.component("delivererOrders", {
    data: function () {
        return {
            ordersWhichAreWaitingDeliverers: null,
            user: null
        }
    },
    template: ` 
    <div>
        <div class="row" >
            <div class="container" style="margin-top: 30px;">
                <img src="images/deliverer-orders.jpg" alt="" width="200" height="150" style="margin-bottom: 50px;">
                <label for="" style="font-size: 70px; margin-top: 30px;"> Porudžbine </label>
            </div>
        </div>
        <div class="row" style="margin-left: 200px; margin-top: 60px; font-size: 22px; text-align: center;">
            <div class="col-10">
                <label for="" style="font-size: 40px; " v-if="ordersWhichAreWaitingDeliverers.length === 0 && user.orders.length === 0"> Trenutno nema porudžbina! </label>
                <table v-else>
                    <tr>
                        <th> Porudžbina </th>
                        <th> Restoran </th>
                        <th> Iznos </th>
                        <th> Status </th>
                    </tr>
                    <tr v-for="(order, index) in ordersWhichAreWaitingDeliverers">
                        <td> <label for="" style="margin-left: 20px;"> {{order.id}} </label> </td>
                        <td> <label for="" style="margin-left: 30px; margin-right: 20px;"> {{order.restaurantID}} </label> </td>
                        <td> <label for="" style="margin-left: 30px;"> {{order.price}} </label> </td>
                        <td> <label for="" :id="order.id" style="margin-left: 40px;"> {{orderValue(order.orderStatus)}} </label> </td>
                        <td> 
                            <button class="btn btn-primary" style="margin-left: 40px;" v-on:click="showOrder(order)"> Prikaži </button>
                            <button class="btn btn-danger" :id="index" style="margin-left: 40px;" v-if="order.requested === false" v-on:click="getOrder(order, index)"> Preuzmi </button> 
                        </td>
                    </tr>
                    <tr v-for="order in user.orders">
                        <td> <label for="" style="margin-left: 20px;"> {{order.id}} </label> </td>
                        <td> <label for="" style="margin-left: 30px; margin-right: 20px;"> {{order.restaurantID}} </label> </td>
                        <td> <label for="" style="margin-left: 30px;"> {{order.price}} </label> </td>
                        <td> <label for="" :id="order.id" style="margin-left: 40px;"> {{orderValue(order.orderStatus)}} </label> </td>
                        <td> 
                            <button class="btn btn-primary" style="margin-left: 40px;" v-on:click="showOrder(order)"> Prikaži </button>
                            <button class="btn btn-danger" :id="order.date" style="margin-left: 40px;" v-if="isDelivered(order.orderStatus) === false" v-on:click="changeOrderStatus(order)"> Porudžbina dostavljena</button>
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
            .get('/loggedUser')
            .then(response => {
                if (response.data === 'ERROR') {
                    router.push('/');
                    return;
                }
                this.user = response.data;
            });
        axios
            .get('/waitingDeliveryOrders')
            .then(response => {
                this.ordersWhichAreWaitingDeliverers = response.data
            });
    },
    methods: {
        showOrder: function(selectedOrder) {
            axios.post('/showOrder', {
                id: selectedOrder.id,
                articles: selectedOrder.articles,
                quantity: selectedOrder.quantity,
                restaurantID: selectedOrder.restaurantID,
                date: selectedOrder.date,
                price: selectedOrder.price,
                customerUsername: selectedOrder.customerUsername,
                orderStatus: selectedOrder.orderStatus
            })
                .then(function (response) {
                    event.preventDefault();
                    router.push('/specificOrder');
                });
        },

        orderValue: function(orderStatus) {
            if(orderStatus === 'PROCESSING'){
                return "OBRADA";
            } else if(orderStatus === 'IN_PREPARATION'){
                return "U PRIPREMI";
            } else if(orderStatus === 'WAITING_FOR_DELIVERY'){
                return "ČEKA DOSTAVLJAČA";
            } else if(orderStatus === 'IN_TRANSPORT'){
                return "U TRANSPORTU";
            } else if(orderStatus === 'DELIVERED'){
                return "DOSTAVLJENA";
            } else if(orderStatus === 'CANCELED'){
                return "OTKAZANA";
            }
        }, 

        getOrder: function(order, index) {
            document.getElementById(index).remove();

            axios.post('/addRequest', {
                delivererID: this.user.username,
                orderID: order.id
            })
                .then(function (response) {
                    
                });
        },

        changeOrderStatus: function(order) {
            document.getElementById(order.date).remove();
            document.getElementById(order.id).innerHTML = "DOSTAVLJENA";

            axios.post('/changeOrderStatus', {
                delivererID: this.user.username,
                orderID: order.id
            })
                .then(function (response) {
                    
                });
        },

        isDelivered: function(orderStatus){
            if(orderStatus === 'DELIVERED'){
                return true;
            }

            return false;
        }

    }
});