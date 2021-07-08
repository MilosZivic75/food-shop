Vue.component("managerRestaurant", {
    data: function () {
        return {
            user: { username: null, password: null, name: null, lastName: null, birthDate: null, sex: null },
            restaurant: { name: '', restaurantType: null, articles: [], location: null, status: null, logo: '' },
            article: { name: '', price: '', articleType: '', restaurantId: '', amount: null, description: '', image: '' },
            image: null
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
        <div v-if="restaurant !== null">
            <div class="row" style="margin-left: 500px; margin-top: 50px;">
                        <div class="col-12">
                            <img :src="restaurant.logo" alt="" width="100" height="100" style="margin-bottom: 70px;">
                            <label style="font-size: 90px; margin-left: 20px;"> <b>{{restaurant.name}}</b> </label>
                        </div>
            </div>
            <div class="row justify-content-between" style="margin-left: 200px; margin-top: 40px;">
                <label class="col-2" style="font-size: 30px;"> Ponuda: </label>
                <button type="button" class="btn btn-warning col-2" style="margin-right: 200px" v-on:click="addArticle" data-toggle="modal" data-target="#addArticleModal">
                    Dodaj artikal</button>
            </div>
            <div class="row" v-if="restaurant.articles.length !== 0" style="margin-left: 200px; margin-top: 10px; font-size: 25px; text-align: center;">
                <div class="col-7">
                    <table>
                        <tr>
                            <th> Slika </th>
                            <th> Naziv </th>
                            <th> Cena </th>
                        </tr>
                        <tr v-for="article in restaurant.articles">
                            <td> <img :src="article.image" alt="" height="100" width="100"> </td>
                            <td> <label style="margin-left: 40px;"> {{article.name}}</label> </td>
                            <td> <label style="margin-left: 40px;"> {{article.price}}</label> </td>
                            <td> <button class="btn btn-warning" style="margin-left: 40px;" v-on:click="updateArticle(article)" data-toggle="modal" data-target="#addArticleModal">Izmeni artikal</button></td>
                            <td> <button class="btn btn-danger" style="margin-left: 40px;" v-on:click="deleteArticle(article)">Obriši artikal</button></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row" v-else style="margin-left: 250px; margin-top: 40px;">
                <label style="font-size: 25px;"> Nema artikala u ponudi. </label>
            </div>
        </div>
        <div class="row" v-else style="margin-left: 300px; margin-top: 50px; margin-bottom: 190px;">
                    <div class="col-12">
                        <label style="font-size: 40px; margin-left: 20px;"> <b>Nijedan restoran vam još uvek nije dodeljen.</b> </label>
                    </div>
        </div>
        <div class="row">
            <div>
                <img src="../images/administrator-main.jpg" style="margin-top: 20px; position:relative; bottom:0" class="header-image"
                    height="300px" width="100%" alt="header image">
            </div>
        </div>

        <div class="modal fade" id="addArticleModal" role="dialog" aria-labelledby="addArticleModalLabel"
		aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addArticleModalLabel">Dodaj artikal</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body align-items-center">
                        <form id="addArticleForm">
                            <div class="form-floating m-4 ">
                                <input type="name" class="form-control" v-model="article.name" id="floatingName" placeholder="Name">
                                <label for="floatingName">Naziv</label>
                            </div>
                            <div class="form-floating m-4 ">
                                <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control" v-model="article.price" id="floatingPrice" placeholder="Price">
                                <label for="floatingPrice">Cena</label>
                            </div>
                            <div class="form-floating m-4">
                                <select class="form-control" v-model="article.articleType" id="floatingArticleType" placeholder="ArticleType">
                                    <option value="FOOD">Hrana</option>
                                    <option value="DRINK">Piće</option>
                                </select>
                                <label for="floatingArticleType">Tip artikla</label>
                            </div>
                            <div>
                                <input class="form-control  mx-4" accept="image/*" @change="onFileChanged" id="formFileLg" type="file" style="width: 90%;"/>
                                <label id="imageLabel" class="mx-4" for="formFileLg">Izaberite sliku</label>
                            </div>
                            <div class="form-floating m-4 ">
                                <input type="description" class="form-control" v-model="article.description" id="floatingDescription" placeholder="Description">
                                <label for="floatingDescription">Opis artikla(nije obavezno)</label>
                            </div>
                            <div class="form-floating m-4 ">
                                <input type="number" min="0" step="1" oninput="validity.valid||(value='');" class="form-control" v-model="article.amount" id="floatingAmount" placeholder="Amount">
                                <label for="floatingAmount">Količina(nije obavezno)</label>
                            </div>

                            <button class="m-4 btn btn-lg btn-primary" v-on:click="addOrUpdateArticle" type="submit" style="width: 90%;" id="addButton">
                                Dodaj</button>
                            <div id="errorAddArticle" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                            <div id="successAddArticle" class="alert alert-success m-4" role="alert" style="display: none;"></div>
                            <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
                        </form>
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
                    axios
                        .get('/getRestaurantFromManager', {
                            params: {
                                username: this.user.username
                            }
                        })
                        .then(response => {
                            if (response.data === 'ERROR')
                                this.restaurant = null;
                            else
                                this.restaurant = response.data;
                        });
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
        addArticle: function () {
            event.preventDefault();
            this.article = { name: '', price: '', articleType: '', restaurantId: '', amount: null, description: '', image: '' };
            $('#addArticleModalLabel').html('Dodaj artikal');
            $('#addButton').html('Dodaj');
            $('#floatingName').prop('readonly', false);
            $('#imageLabel').html('Izaberite sliku');
        },
        updateArticle: function (article) {
            event.preventDefault();
            this.article = article;
            $('#addArticleModalLabel').html('Izmeni artikal');
            $('#addButton').html('Izmeni');
            $('#floatingName').prop('readonly', true);
            $('#imageLabel').html('Izaberite sliku (nije obavezno)');
        },
        addOrUpdateArticle: function () {
            event.preventDefault();

            $('#errorAddArticle').hide();
            if (this.article.name === null || this.article.price === null || this.article.articleType === null) {
                $('#errorAddArticle').text('Molimo popunite sva polja.');
                $('#errorAddArticle').show().delay(3000).fadeOut();
                $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                return;
            }
            if (this.article.name.trim() === '' || this.article.articleType.trim() === '') {
                $('#errorAddArticle').text('Molimo popunite sva polja.');
                $('#errorAddArticle').show().delay(3000).fadeOut();
                $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                return;
            }
            if ($('#addArticleModalLabel').html() === 'Dodaj artikal') {
                if (this.image === null || $('#formFileLg').val() === '') {
                    $('#errorAddArticle').text('Molimo popunite sva polja.');
                    $('#errorAddArticle').show().delay(3000).fadeOut();
                    $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                    return;
                }
                this.article.restaurantId = this.restaurant.name;
                axios
                    .post('/uploadArticleImage', this.image)
                    .then(response => {
                        this.article.image = response.data;
                        axios
                            .post('addArticle', this.article)
                            .then(response => {
                                if (response.data === 'SUCCESS') {
                                    $('#successAddArticle').text('Artikal je uspesno dodat.');
                                    $('#successAddArticle').show().delay(3000).fadeOut();
                                    $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                                    this.initSetup();

                                    $('#addArticleModal').hide();
                                    $('.modal-backdrop').hide();
                                    $('body').removeClass('modal-open');
                                }
                                else {
                                    $('#errorAddArticle').text('Artikal sa datim imenom već postoji.');
                                    $('#errorAddArticle').show().delay(3000).fadeOut();
                                    $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                                }
                            });
                    });
            } else {
                if ($('#formFileLg').val() === '') {
                    this.article.image = '';
                    axios
                        .post('updateArticle', this.article)
                        .then(response => {
                            if (response.data === 'SUCCESS') {
                                $('#successAddArticle').text('Artikal je uspesno izmenjen.');
                                $('#successAddArticle').show().delay(3000).fadeOut();
                                $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                                this.initSetup();

                                $('#addArticleModal').hide();
                                $('.modal-backdrop').hide();
                                $('body').removeClass('modal-open');
                            }
                            else {
                                $('#errorAddArticle').text('Artikal sa datim imenom ne postoji.');
                                $('#errorAddArticle').show().delay(3000).fadeOut();
                                $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                            }
                        });
                } else {
                    axios
                        .post('/uploadArticleImage', this.image)
                        .then(response => {
                            this.article.image = response.data;
                            axios
                                .post('updateArticle', this.article)
                                .then(response => {
                                    if (response.data === 'SUCCESS') {
                                        $('#successAddArticle').text('Artikal je uspesno izmenjen.');
                                        $('#successAddArticle').show().delay(3000).fadeOut();
                                        $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                                        this.initSetup();

                                        $('#addArticleModal').hide();
                                        $('.modal-backdrop').hide();
                                        $('body').removeClass('modal-open');
                                    }
                                    else {
                                        $('#errorAddArticle').text('Artikal sa datim imenom ne postoji.');
                                        $('#errorAddArticle').show().delay(3000).fadeOut();
                                        $('#addArticleModal').animate({ scrollTop: document.body.scrollHeight }, "fast");
                                    }
                                });
                        });
                }
            }
        },
        onFileChanged: function (event) {
            this.image = event.target.files[0];
        },
        deleteArticle: function (article) {
            event.preventDefault();

            axios
                .post('deleteArticle', { name: article.name })
                .then(response => {
                    this.initSetup();
                });
        }
    }
});