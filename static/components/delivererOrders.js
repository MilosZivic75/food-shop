Vue.component("delivererOrders", {
    data: function () {
        return {
            orders: [],
            user: null,
            restaurants: [],
            showingOrders: [],
            searchValue: 'Pretraga',
            nameRes: '',
            startPrice: '',
            endPrice: '',
            startDate: '',
            endDate: '',
            filterProcessing: false,
            filterInPreparation: false,
            filterWaitingDelivery: false,
            filterInTransport: false,
            filterDelivered: false,
            filterCanceled: false,
            filterGrill: false,
            filterFastFood: false,
            filterChinese: false,
            filterPizzeria: false,
            filterFishes: false,
            sortUpName: false,
            sortDownName: false,
            sortUpDate: false,
            sortDownDate: false,
            sortUpNum: false,
            sortDownNum: false
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
        <div class="row" style="margin-left: 200px; margin-top: 60px; font-size: 22px; text-align: center;" v-if="orders.length === 0 ">
            <div class="col-10">
                <label for="" style="font-size: 40px; " > Trenutno nema porudžbina! </label>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-6" >
                    <button class="btn btn-outline-dark" style="margin-left: 200px; " v-on:click="changeValue('Pretraga')" > Prikaži sve </button>
                    <label for="" style="font-size: 20px; margin-top: 23px; margin-left: 250px;"> Pretražite porudžbine: </label>
                </div>
                <div class="col-5" style="font-size: 20px;  margin-top: 20px;">
                    <button class="btn btn-outline-dark" v-on:click="changeValue('Restoran')"> Po imenu restorana </button>
                    <button class="btn btn-outline-dark" v-on:click="changeValue('Cena')"> Po ceni </button>
                    <button class="btn btn-outline-dark" v-on:click="changeValue('Datum')"> Po datumu </button>
                </div>
            </div>
            <div class="row" v-if="searchValue === 'Restoran'">
                <div class="col-7" style="font-size: 20px; margin-left: 500px; margin-top: 20px">
                    <label for="" > Ime restorana: </label>
                    <input type="text" style="width: 200px" v-model="nameRes"/>
                    <button class="btn btn-outline-dark" v-on:click="searchByRestaurant"> Pretraži </button>
                </div>
            </div>
            <div class="row" v-if="searchValue === 'Cena'">
                <div class="col-7" style="font-size: 20px; margin-left: 500px; margin-top: 20px">
                    <label for="" > Od: </label>
                    <input type="number" style="width: 150px" v-model="startPrice">
                    <label for="" > Do: </label>
                    <input type="number" style="width: 150px" v-model="endPrice">
                    <button class="btn btn-outline-dark" v-on:click="searchByPrice"> Pretraži </button>
                </div>
            </div>
            <div class="row" v-if="searchValue === 'Datum'">
                <div class="col-7" style="font-size: 20px; margin-left: 500px; margin-top: 20px">
                    <label for="" > Od: </label>
                    <input type="date" v-model="startDate" >
                    <label for="" > Do: </label>
                    <input type="date" v-model="endDate" >
                    <button class="btn btn-outline-dark" v-on:click="searchByDate"> Pretraži </button>
                </div>
            </div>
            <div class="row">
                <div class="col-4" style="font-size: 18px; margin-left: 120px; margin-top: 20px;">
                    <table>
                        <tr>
                            <td> <label for="" > Sortiranje po: </label> </td>
                        <tr>
                            <td> <label for="" > 1. imenu restorana </label> </td>
                            <td> <input type="radio" style="margin-left: 30px;" v-model="sortUpName" v-on:click="sortUpByName"> Rastuće </td>
                            <td> <input type="radio" style="margin-left: 10px;" v-model="sortDownName" v-on:click="sortDownByName"> Opadajuće </td>
                        </tr>
                        <tr>
                            <td> <label for="" > 2. ceni </label> </td>
                            <td> <input type="radio" style="margin-left: 30px;" v-model="sortUpNum" v-on:click="sortUpByNum"> Rastuće </td>
                            <td> <input type="radio" style="margin-left: 10px;" v-model="sortDownNum" v-on:click="sortDownByNum"> Opadajuće </td>
                        </tr>
                        <tr>
                            <td> <label for="" > 3. datumu </label> </td>
                            <td> <input type="radio" style="margin-left: 30px; " v-model="sortUpDate" v-on:click="sortUpByDate"> Rastuće </td>
                            <td> <input type="radio" style="margin-left: 10px;" v-model="sortDownDate" v-on:click="sortDownByDate"> Opadajuće </td>   
                        </tr>
                    </table>
                </div>
                <div class="col-7" style="font-size: 18px; margin-top: 20px;">
                    <table>
                        <tr>
                            <td> <label for="" > Filtriranje: </label> </td>
                        </tr>
                        <tr>
                            <td> <label for="" > 1. status </label> </td>
                            <td> <input type="radio" style="margin-left: 30px;" id="opened" v-model="filterProcessing" v-on:click="getProcessing"> Obrada </td>
                            <td> <input type="radio" id="opened" v-model="filterInPreparation" v-on:click="getInPreparation"> U pripremi </td>
                            <td> <input type="radio" id="opened" v-model="filterWaitingDelivery" v-on:click="getWaitingDelivery"> Čeka dostavljača </td>
                            <td> <input type="radio" id="opened" v-model="filterInTransport" v-on:click="getInTransport"> U transportu </td>
                            <td> <input type="radio" id="opened" v-model="filterDelivered" v-on:click="getDelivered"> Dostavljena </td>
                            <td> <input type="radio" id="opened" v-model="filterCanceled" v-on:click="getCanceled"> Otkazana </td>
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
            <div class="row" style="margin-left: 200px; margin-top: 10px; font-size: 22px; text-align: center;" v-if="showingOrders.length === 0">
                <div class="col-10">
                    <label for="" style="font-size: 40px; " > Nijedna porudžbina nije pronadjena! </label>
                </div>
            </div>
            <div class="row" v-else style="margin-left: 200px; margin-top: 10px; font-size: 22px; text-align: center;">
                <div class="col-10">
                    <table id="orderTable">
                        <tr>
                            <th> Porudžbina </th>
                            <th> Restoran </th>
                            <th> Iznos </th>
                            <th> Status </th>
                        </tr>
                        <tr v-for="(order, index) in showingOrders">
                            <td> <label for="" style="margin-left: 20px;"> {{order.id}} </label> </td>
                            <td> <label for="" style="margin-left: 30px; margin-right: 20px;"> {{order.restaurantID}} </label> </td>
                            <td> <label for="" style="margin-left: 30px;"> {{order.price}} </label> </td>
                            <td> <label for="" :id="order.id" style="margin-left: 40px;"> {{orderValue(order.orderStatus)}} </label> </td>
                            <td> 
                                <button class="btn btn-primary" style="margin-left: 40px;" v-on:click="showOrder(order)"> Prikaži </button>
                                <button class="btn btn-danger" :id="index" style="margin-left: 40px;" v-if="order.requested === false && order.orderStatus === 'WAITING_FOR_DELIVERY'" v-on:click="getOrder(order, index)"> Preuzmi </button>
                                <button class="btn btn-danger" :id="order.date" style="margin-left: 40px;" v-if="order.orderStatus === 'IN_TRANSPORT'" v-on:click="changeOrderStatus(order, index)"> Porudžbina dostavljena</button>
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
                this.orders = response.data;
                this.showingOrders = response.data;
                for(var i=0; i<this.user.orders.length; i++){
                    if(this.user.orders[i].orderStatus !== 'DELIVERED'){
                        this.showingOrders.push(this.user.orders[i]);
                    }
                }

            });
        axios
            .get('/getRestaurants')
            .then(response => {
                this.restaurants = response.data;
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

        changeOrderStatus: function(order, index) {
            document.getElementById(order.date).remove();
            document.getElementById(order.id).innerHTML = "DOSTAVLJENA";
            document.getElementById('orderTable').deleteRow(index+1);

            axios.post('/changeOrderStatus', {
                delivererID: this.user.username,
                orderID: order.id
            })
                .then(function (response) {
                    alert("Porudžbina dostavljena!");
                });
        },

        changeValue: function(value) {
            if(value === 'Pretraga'){
                this.showingOrders = this.orders;

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false,
                this.sortUpName = false,
                this.sortDownName = false,
                this.sortUpDate = false,
                this.sortDownDate = false,
                this.sortUpNum = false,
                this.sortDownNum = false
            }

            this.searchValue = value;
        },

        searchByRestaurant: function() {
            if(this.nameRes == ""){
                alert("Popunite polja za pretragu!");
                return;
            }

            this.showingOrders = [];
            for(var i=0; i<this.orders.length; i++){
                if(this.orders[i].restaurantID.toLowerCase().includes(this.nameRes.toLowerCase())){
                    this.showingOrders.push(this.orders[i]);
                }
            }
        },

        searchByPrice: function() {
            if(this.startPrice == "" || this.endPrice == ""){
                alert("Popunite polja za pretragu!");
                return;
            }

            this.showingOrders = [];
            for(var i=0; i<this.orders.length; i++){
                if(this.orders[i].price >= this.startPrice && this.orders[i].price <= this.endPrice){
                    this.showingOrders.push(this.orders[i]);
                }
            }
        },

        searchByDate: function() {
            if(this.startDate == "" || this.endDate == ""){
                alert("Popunite polja za pretragu!");
                return;
            }
            
            this.showingOrders = [];
            var d1 = this.startDate.split("-");
            var d2 = this.endDate.split("-");
            
            sDate = new Date(d1[0], parseInt(d1[1])-1, d1[2]);
            eDate = new Date(d2[0], parseInt(d2[1])-1, d2[2]);
            for(var i=0; i<this.orders.length; i++){
                var checkDate = new Date(this.orders[i].date.date.year, this.orders[i].date.date.month-1, this.orders[i].date.date.day);
                if(checkDate >= sDate && checkDate <= eDate){
                    this.showingOrders.push(this.orders[i]);
                }
            }
        },

        sortUpByName: function() {
            if(this.sortUpName === false){
                this.showingOrders.sort((a,b) => a.restaurantID.localeCompare(b.restaurantID));
                this.sortDownName = false;
                this.sortUpDate = false;
                this.sortDownDate = false;
                this.sortUpNum = false;
                this.sortDownNum = false;
            } 
        },

        sortDownByName: function() {
            if(this.sortDownName === false){
                this.showingOrders.sort((a,b) => b.restaurantID.localeCompare(a.restaurantID));
                this.sortUpName = false;
                this.sortUpDate = false;
                this.sortDownDate = false;
                this.sortUpNum = false;
                this.sortDownNum = false;
            } 
        },

        sortUpByDate: function() {
            if(this.sortUpDate === false){
                this.showingOrders.sort((a,b) => new Date(a.date.date.year, a.date.date.month, a.date.date.day) 
                - new Date(b.date.date.year, b.date.date.month, b.date.date.day));
                this.sortUpName = false;
                this.sortDownName = false;
                this.sortDownDate = false;
                this.sortUpNum = false;
                this.sortDownNum = false;
            } 
        },

        sortDownByDate: function() {
            if(this.sortDownDate === false){
                this.showingOrders.sort((a,b) => new Date(b.date.date.year, b.date.date.month, b.date.date.day) 
                - new Date(a.date.date.year, a.date.date.month, a.date.date.day));
                this.sortUpName = false;
                this.sortDownName = false;
                this.sortUpDate = false;
                this.sortUpNum = false;
                this.sortDownNum = false;
            } 
        },

        sortUpByNum: function() {
            if(this.sortUpNum === false){
                this.showingOrders.sort((a,b) => a.price - b.price);
                this.sortUpName = false;
                this.sortDownName = false;
                this.sortUpDate = false;
                this.sortDownDate = false;
                this.sortDownNum = false;
            } 
        },
    
        sortDownByNum: function() {
            if(this.sortDownNum === false){
                this.showingOrders.sort((a,b) => b.price - a.price);
                this.sortUpName = false;
                this.sortDownName = false;
                this.sortUpDate = false;
                this.sortDownDate = false;
                this.sortUpNum = false;
            } 
        },

        getProcessing: function() {
            if(this.filterProcessing === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    if(this.orders[i].orderStatus === 'PROCESSING'){
                        this.showingOrders.push(this.orders[i]);
                    }
                }

                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        },

        getInPreparation: function() {
            if(this.filterInPreparation === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    if(this.orders[i].orderStatus === 'IN_PREPARATION'){
                        this.showingOrders.push(this.orders[i]);
                    }
                }

                this.filterProcessing = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        },

        getWaitingDelivery: function() {
            if(this.filterWaitingDelivery === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    if(this.orders[i].orderStatus === 'WAITING_FOR_DELIVERY'){
                        this.showingOrders.push(this.orders[i]);
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        },

        getInTransport: function() {
            if(this.filterInTransport === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    if(this.orders[i].orderStatus === 'IN_TRANSPORT'){
                        this.showingOrders.push(this.orders[i]);
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        },

        getDelivered: function() {
            if(this.filterDelivered === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    if(this.orders[i].orderStatus === 'DELIVERED'){
                        this.showingOrders.push(this.orders[i]);
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        },

        getCanceled: function() {
            if(this.filterCanceled === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    if(this.orders[i].orderStatus === 'CANCELED'){
                        this.showingOrders.push(this.orders[i]);
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }           
        },

        getGrillRes: function() {
            if(this.filterGrill === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    for(var j=0; j<this.restaurants.length; j++){
                        if(this.restaurants[j].name === this.orders[i].restaurantID){
                            if(this.restaurants[j].restaurantType === 'Roštilj'){
                                this.showingOrders.push(this.orders[i]);
                            }
                        }
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }            
        }, 

        getFastFoodRes: function() {
            if(this.filterFastFood === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    for(var j=0; j<this.restaurants.length; j++){
                        if(this.restaurants[j].name === this.orders[i].restaurantID){
                            if(this.restaurants[j].restaurantType === 'Brza hrana'){
                                this.showingOrders.push(this.orders[i]);
                            }
                        }
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterChinese = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }           
        },

        getChineseRes: function() {
            if(this.filterChinese === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    for(var j=0; j<this.restaurants.length; j++){
                        if(this.restaurants[j].name === this.orders[i].restaurantID){
                            if(this.restaurants[j].restaurantType === 'Kineski'){
                                this.showingOrders.push(this.orders[i]);
                            }
                        }
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterPizzeria = false,
                this.filterFishes = false
            }           
        },

        getPizzeria: function() {
            if(this.filterPizzeria === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    for(var j=0; j<this.restaurants.length; j++){
                        if(this.restaurants[j].name === this.orders[i].restaurantID){
                            if(this.restaurants[j].restaurantType === 'Picerija'){
                                this.showingOrders.push(this.orders[i]);
                            }
                        }
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterFishes = false
            }            
        },

        getFishRes: function() {
            if(this.filterFishes === false){
                this.showingOrders = []
                for(var i=0; i<this.orders.length; i++){
                    for(var j=0; j<this.restaurants.length; j++){
                        if(this.restaurants[j].name === this.orders[i].restaurantID){
                            if(this.restaurants[j].restaurantType === 'Riblji'){
                                this.showingOrders.push(this.orders[i]);
                            }
                        }
                    }
                }

                this.filterProcessing = false,
                this.filterInPreparation = false,
                this.filterWaitingDelivery = false,
                this.filterInTransport = false,
                this.filterDelivered = false,
                this.filterCanceled = false,
                this.filterGrill = false,
                this.filterFastFood = false,
                this.filterChinese = false,
                this.filterPizzeria = false
            }             
        }

    }
});