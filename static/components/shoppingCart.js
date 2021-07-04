Vue.component("shopping-cart", {
    data: function () {
        return {
            articles: null
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
                        <td> <button class="btn btn-warning" style="margin-left: 40px;">Izbaci iz korpe</button></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-8" style="margin-left: 200px; font-size: 20px; margin-top: 40px;">
                <label for=""> Unesite adresu(npr Knez Mihajlova 7, Beograd): </label>
                <input type="text" value="" width="150"> 
            </div>
            
        </div>
        <div class="row">
            <div class="col-6">
                <button class="btn btn-warning" style="margin-left: 200px; margin-top: 30px; font-size: 25px;"> <b>Kreiraj porudžbinu </b></button>
                <div id="errorReg" class="alert alert-danger m-4" role="alert" style="display: none;"></div>
                <div id="successReg" class="alert alert-success m-4" role="alert" style="display: none;"></div>
            </div> 
        </div>
    </div>
    `
    ,
    mounted() {

    },
    methods: {

    }
});