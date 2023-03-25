//DOM
var cartList = document.querySelector('.cart-list');
var billSubtotal = document.querySelector('.subtotal span');
var deliveryFee = document.querySelector('.delivery-fee span');
var billSale = document.querySelector('.bill-sale span');
var billTotal = document.querySelector('.bill-total span');
var checkoutBtn = document.querySelector('.checkout-btn');

cartList.addEventListener('click',btnAction,false);
checkoutBtn.addEventListener('click',btnAction,false);

//變數
var billSubtotalNum = 0;
var deliveryFeeNum = 100;
var FulldeliveryFeeNum = 500; //滿500免運費
var billSaleNum = 0;
var billTotalNum = 0;

createCartList();
//輸出 購物車列表
function createCartList(){
    var cartStr = '';
    for (i=0; i<cartArr.length; i++){
        cartStr += '<li class="cart-item"><div class="cart-pic"><a href="'+ productHref +'"><img src="'+ products[cartArr[i]].picSrc +'" alt="產品圖片"></a></div>';

        cartStr += '<div class="cart-content"><div class="cart-info"><div class="title">'+ products[cartArr[i]].name +'</div><div class="price"><div class="price-org';

        //檢查是否優惠
        var priceOrg = products[cartArr[i]].price;
        var priceSale = products[cartArr[i]].sale;
        var subtotal = Math.floor(priceOrg * priceSale);
        if ( priceSale !== 1){
            cartStr += ' is-sale">NT$ '+ priceOrg +'</div><div class="price-sale">NT$ '+ subtotal +'</div></div></div>';
        }else{
            cartStr += '">NT$ '+ priceOrg +'</div></div></div>';
        }

        cartStr += '<ul class="cart-countbar"><li><a class="item-modifier-decrease-quantity" href="#">-</a></li><li><a class="quantity" href="#">1</a></li><li><a class="item-modifier-increase-quantity" href="#">+</a></li></ul></div><hr class="d-md-none">';

        cartStr += '<div class="price-subtotal">NT$ '+ subtotal +'</div></li>';

        billSubtotalNum += priceOrg;
        billSaleNum += (priceOrg - subtotal);
        billTotalNum += subtotal;
    }
    cartList.innerHTML = cartStr;
    billPrint();
}

//帳單輸出
function billPrint(){
    if( billTotalNum >= FulldeliveryFeeNum ){
        deliveryFeeNum = 0;
    }
    billSubtotal.textContent = 'NT$ ' + billSubtotalNum;
    deliveryFee.textContent = 'NT$ ' + deliveryFeeNum;
    billSale.textContent = 'NT$ ' + billSaleNum;
    billTotal.textContent = 'NT$ ' + (billTotalNum + deliveryFeeNum) ;
}