Vue.component("managerOrders", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
            orders: [],
            customers: [],
            uniqueCustomers: []
        }
    },
    template: ` 
    <div>
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-1 align-self-end">
                    <img width="80" height="80" src="../favicon.ico">
                </div>
                <div class="col-5 align-self-end">
                    <h1 style="font-size:40px; margin-left: -100%;">Web food shop</h1>
                </div>


                <div class="dropdown col-3 align-self-end">
                    <img src="../images/profile.png" width="30"
                        height="30" style="margin-top: -12px;">
                    <b class="dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false" style="font-size: 30px;">
                        {{user.name}}
                    </b>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                        <a class="dropdown-item" v-on:click="showProfile">Profil</a>
                        <a class="dropdown-item" v-on:click="showRestaurant">Moj restoran</a>
                        <a class="dropdown-item" v-on:click="showOrders">Porudžbine</a>
                        <a class="dropdown-item" v-on:click="showComments">Komentari</a>
                        <a class="dropdown-item" v-on:click="logout">Odjavite se</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-end" style="margin-top: 50px;">
            <button type="button" class="btn btn-outline-dark col-2" style="margin-right: 200px" data-toggle="modal" data-target="#viewCustomersModal">
                Prikaži kupce</button>
        </div>
        <div v-if="orders.length !== 0" class="row" style="margin-left: 200px; margin-top: 10px; font-size: 22px; text-align: center;">
            <div class="col-10">
                <table width="90%">
                    <tr>
                        <th>Porudžbina</th>
                        <th>Kupac</th>
                        <th>Iznos</th>
                        <th>Datum</th>
                        <th>Status</th>
                    </tr>
                    <tr v-for="order in orders">
                        <td> <label>{{order.id}}</label></td>
                        <td> <label>{{order.customerUsername}}</label></td>
                        <td> <label>{{order.price}}</label></td>
                        <td> <label>{{getDate(order.date)}}</label></td>
                        <td> <label>{{orderValue(order.orderStatus)}}</label></td>
                        <td v-if="order.orderStatus === 'PROCESSING'"> <button class="btn btn-warning" v-on:click="prepare(order)">Pošalji na pripremu</button></td>
                        <td v-if="order.orderStatus === 'IN_PREPARATION'"> <button class="btn btn-warning" v-on:click="waitForDeliverer(order)">Čeka dostavljača</button></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row" v-else style="margin-left: 250px; margin-top: 40px; margin-bottom: 140px;">
            <label style="font-size: 25px;"> Nema porudžbina u vašem restoranu trenutno. </label>
        </div>
        <div class="row">
            <div>
                <img src="../images/administrator-main.jpg" style="margin-top: 20px; position:relative; bottom:0" class="header-image"
                    height="300px" width="100%" alt="header image">
            </div>
        </div>

        <div class="modal fade" id="viewCustomersModal" role="dialog" aria-labelledby="viewCustomersModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="address-label">Prikaz kupaca koji su naručili iz vašeg restorana</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table width="100%">
                            <tr>
                                <th>Ime</th>
                                <th>Prezime</th>
                                <th>Korisničko ime</th>
                            </tr>
                            <tr v-for="customer in uniqueCustomers">
                                <td>{{customer.name}}</td>
                                <td>{{customer.lastName}}</td>
                                <td>{{customer.username}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal"><i
                                class="fa fa-check"></i>OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    ,
    mounted() {
        this.initSetup();
    },
    methods: {
        initSetup: function () {
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
                .get('getOrdersByRestaurant')
                .then(response => {
                    this.orders = response.data;
                });
            axios
                .get('getCustomersByRestaurant')
                .then(response => {
                    this.customers = response.data;
                    for (let customer of this.customers) {
                        if (!this.hasCustomer(customer.username))
                            this.uniqueCustomers.push(customer);
                    }
                });
        },
        showProfile: function () {
            event.preventDefault();
            router.push('/userProfile');
        },
        showRestaurant: function () {
            event.preventDefault();
            router.push('/managerRestaurant');
        },
        showOrders: function () {
            event.preventDefault();
            router.push('/managerOrders');
        },
        showComments: function() {
            event.preventDefault();
            router.push('/managerComments');
        },
        logout: function () {
            event.preventDefault();
            router.push('/');
            axios
                .post('/logout');
        },
        orderValue: function (orderStatus) {
            if (orderStatus === 'PROCESSING') {
                return "OBRADA";
            } else if (orderStatus === 'IN_PREPARATION') {
                return "U PRIPREMI";
            } else if (orderStatus === 'WAITING_FOR_DELIVERY') {
                return "ČEKA DOSTAVLJAČA";
            } else if (orderStatus === 'IN_TRANSPORT') {
                return "U TRANSPORTU";
            } else if (orderStatus === 'DELIVERED') {
                return "DOSTAVLJENA";
            } else if (orderStatus === 'CANCELED') {
                return "OTKAZANA";
            }
        },
        hasCustomer: function (customerUsername) {
            for (let customer of this.uniqueCustomers) {
                if (customerUsername === customer.username)
                    return true;
            }
            return false;
        },
        getDate: function (date) {
            let day = (date.date.day < 10) ? '0' + date.date.day : date.date.day;
            let month = (date.date.month < 10) ? '0' + date.date.month : date.date.month;
            let hour = (date.time.hour < 10) ? '0' + date.time.hour : date.time.hour;
            let minute = (date.time.minute < 10) ? '0' + date.time.minute : date.time.minute;
            return day + '.' + month + '.' + date.date.year + '.' + ' ' + hour + ':' + minute;
        },
        prepare: function (order) {
            event.preventDefault();
            
            order.orderStatus = 'IN_PREPARATION';
            axios
                .post('/updateOrder', order)
                .then(response => {
                    this.initSetup();
                });
        },
        waitForDeliverer: function (order) {
            event.preventDefault();
            
            order.orderStatus = 'WAITING_FOR_DELIVERY';
            axios
                .post('/updateOrder', order)
                .then(response => {
                    this.initSetup();
                });
        }
    }
});