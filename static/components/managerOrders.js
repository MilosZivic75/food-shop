Vue.component("managerOrders", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
            orders: [],
            customers: [],
            uniqueCustomers: [],
            requests: [],
            ordersForView: [],
            priceFrom: '',
            priceTo: '',
            dateFrom: '',
            dateTo: '',
            sortParameter: '',
            sort: '',
            status: ''
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
            <button type="button" class="btn btn-outline-dark col-2" style="margin-right: 20px" data-toggle="modal" data-target="#viewRequestsModal">
                Prikaži zahteve za transport</button>
            <button type="button" class="btn btn-outline-dark col-2" style="margin-right: 200px" data-toggle="modal" data-target="#viewCustomersModal">
                Prikaži kupce</button>
        </div>
        <div class="row" style=" margin-top: 50px; margin-left: 50px;">
            <div class="container sports-container col-12" >
                <div class="form-floating" style="display:inline-block">
                    <input type="number" min="0" oninput="validity.valid||(value=''||value='.');" class="form-control" v-model="priceFrom" id="priceFrom" placeholder="PriceFrom">
                    <label for="priceFrom">Cena od</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <input type="number" min="0" oninput="validity.valid||(value=''||value='.');" class="form-control" v-model="priceTo" id="priceTo" placeholder="PriceTo">
                    <label for="priceTo">Cena do</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <input type="date" class="form-control" v-model="dateFrom" id="dateFrom" placeholder="DateFrom">
                    <label for="dateFrom">Datum od</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <input type="date" class="form-control" v-model="dateTo" id="dateTo" placeholder="DateTo">
                    <label for="dateTo">Datum do</label>
                </div>
                <div class="form-floating" style="display:inline-block;">
                    <select class="form-control" v-model="sortParameter" id="sortParameter" placeholder="SortParameter">
                        <option value="price">Cena porudžbine</option>
                        <option value="date">Datum porudžbine</option>
                    </select>
                    <label for="sortParameter">Parametar</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <select class="form-control" v-model="sort" id="sort" placeholder="Sort">
                        <option value="asc">Rastuće</option>
                        <option value="dsc">Opadajuće</option>
                    </select>
                    <label for="sort">Sortiranje</label>
                </div>
                <div class="form-floating" style="display:inline-block">
                    <select class="form-control" v-model="status" id="status" placeholder="Status">
                        <option value="">Svi</option>
                        <option value="PROCESSING">Obrada</option>
                        <option value="IN_PREPARATION">U pripremi</option>
                        <option value="WAITING_FOR_DELIVERY">Čeka dostavljača</option>
                        <option value="IN_TRANSPORT">U transportu</option>
                        <option value="DELIVERED">Dostavljena</option>
                        <option value="CANCELED">Otkazana</option>
                    </select>
                    <label for="status">Status</label>
                </div>
                <button class="btn btn-outline-dark btn-lg" style="margin-bottom:15px" v-on:click="findOrders"> Traži </button>
            </div>
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
                    <tr v-for="order in ordersForView">
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
                <img src="../images/manager-main.jpg" style="margin-top: 20px; position:relative; bottom:0" class="header-image"
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

        <div class="modal fade" id="viewRequestsModal" role="dialog" aria-labelledby="viewCustomersModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="address-label">Zahtevi za transport</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table width="100%">
                            <tr>
                                <th>ID porudžbine</th>
                                <th>ID dostavljača</th>
                            </tr>
                            <tr v-for="request in requests" v-if="request.approved === undefined">
                                <td>{{request.orderID}}</td>
                                <td>{{request.delivererID}}</td>
                                <td><button class="btn btn-success btn-sm col-10" v-on:click="approve(request)">Odobri</button></td>
                                <td><button class="btn btn-danger btn-sm col-10" v-on:click="reject(request)">Odbij</button></td>
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
                    this.ordersForView = response.data;
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
            axios
                .get('getRequestsByRestaurant')
                .then(response => {
                    for (let request of response.data)
                        this.requests.push({requestID: request.requestID, orderID: request.orderID, delivererID: request.delivererID,
                            approved: request.approved});
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
        },
        approve: function (request) {
            event.preventDefault();

            request.approved = true;
            for (let req of this.requests) {
                if (req.delivererID !== request.delivererID && req.orderID === request.orderID)
                    req.approved = false;
            }
            axios
                .post('/updateRequests', request);
        },
        reject: function (request) {
            event.preventDefault();

            request.approved = false;
            axios
                .post('/updateRequests', request);
        },
        findOrders: function () {
            event.preventDefault();

            this.ordersForView = [];
            for (let o of this.orders) {
                this.ordersForView.push(o);
            }
            if (this.priceFrom !== '' && this.priceTo !== '') {
                this.ordersForView = this.ordersForView.filter(o => (o.price >= this.priceFrom && o.price <= this.priceTo));
            }
            if (this.dateFrom !== '' && this.dateTo !== '') {
                this.ordersForView = this.ordersForView.filter(o => 
                (this.compareDates(this.dateFrom + '00-00', this.getDateReversed(o.date)) < 1 &&
                    this.compareDates(this.dateTo + '00-00', this.getDateReversed(o.date)) > -1
                ));
            }

            if (this.sortParameter === 'price' && this.sort === 'asc')
                this.ordersForView.sort((a, b) => a.price - b.price);
            else if (this.sortParameter === 'price' && this.sort === 'dsc')
                this.ordersForView.sort((a, b) => b.price - a.price);
            else if (this.sortParameter === 'date' && this.sort === 'asc')
                this.ordersForView.sort((a, b) => this.compareDates(this.getDateReversed(a.date),this.getDateReversed(b.date)));
            else if (this.sortParameter === 'date' && this.sort === 'dsc')
                this.ordersForView.sort((a, b) => this.compareDates(this.getDateReversed(b.date),this.getDateReversed(a.date)));

            this.ordersForView = this.ordersForView.filter(o => (o.orderStatus.includes(this.status)));
            
        },
        compareDates: function (a,b) {
            let dateA = a.split('-');
            let dateB = b.split('-');
            if (dateA[0] < dateB[0]) {
                return -1;
            }
            else if (dateA[0] > dateB[0]) {
                return 1;
            }
            else {
                if (dateA[1] < dateB[1]) {
                    return -1;
                }
                else if (dateA[1] > dateB[1]) {
                    return 1;
                }
                else {
                    if (dateA[2] < dateB[2]) {
                        return -1;
                    }
                    else if (dateA[2] > dateB[2]) {
                        return 1;
                    }
                    else {
                        if (dateA[3] < dateB[3]) {
                            return -1;
                        }
                        else if (dateA[3] > dateB[3]) {
                            return 1;
                        }
                        else {
                            if (dateA[4] < dateB[4]) {
                                return -1;
                            }
                            else if (dateA[4] > dateB[4]) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                    }
                }
            }
        },
        getDateReversed: function (date) {
            let day = (date.date.day < 10) ? '0' + date.date.day : date.date.day;
            let month = (date.date.month < 10) ? '0' + date.date.month : date.date.month;
            let hour = (date.time.hour < 10) ? '0' + date.time.hour : date.time.hour;
            let minute = (date.time.minute < 10) ? '0' + date.time.minute : date.time.minute;
            return date.date.year + '-' + month + '-' + day + '-' + hour + '-' + minute;
        }
    }
});