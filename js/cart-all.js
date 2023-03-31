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
var FulldeliveryFeeNum = 1000; //滿1000免運費
var billSaleNum = 0;
var billTotalNum = 0;

//預先 函數更新
cartQuantityCheck();

//輸出 購物車列表
function createCartList(){
    var cartStr = '';
    if( cartInfoArr.length == 0 ){
        cartStr += `<li class="cart-item">
                        <div class="cart-pic">
                            <a href="index.html"><img src="pic/cat/noproduct.png" alt="產品圖片"></a>
                        </div>
                        <div class="cart-content"><div class="cart-info">
                            <div class="title">沒有商品</div>
                            <div class="price">
                                <div class="price-org">NT$ - </div>
                                <div class="stock">庫存：- </div>
                            </div>
                        </div></div>
                        <hr class="d-md-none"><div class="price-subtotal">NT$ - </div>
                    </li>`;
    }
    for (i=0; i<cartInfoArr.length; i++){
        cartStr += '<li class="cart-item"><div class="cart-pic"><a href="#"><img class="cart-img" data-proid="'+ cartInfoArr[i].id +'" src="'+ products[cartInfoArr[i].id].picSrc +'" alt="產品圖片"></a></div>';

        cartStr += '<div class="cart-content"><div class="cart-info"><div class="title">'+ products[cartInfoArr[i].id].name + '</div><div class="price"><div class="price-org';

        //檢查是否優惠
        var priceOrg = products[cartInfoArr[i].id].price;
        var priceSale = products[cartInfoArr[i].id].sale;
        var subtotal = Math.floor(priceOrg * priceSale);
        if ( priceSale !== 1){
            cartStr += ' is-sale">NT$ '+ priceOrg +'</div><div class="price-sale">NT$ '+ subtotal +'</div>';
        }else{
            cartStr += '">NT$ '+ priceOrg +'</div>';
        }

        cartStr += '<div class="stock">庫存：'+ products[cartInfoArr[i].id].stock +'</div>';

        cartStr += '</div></div><ul class="cart-countbar"><li><a data-proid="'+ cartInfoArr[i].id +'" data-showid="'+ i +'" class="item-modifier-decrease-quantity" href="#">-</a></li><li><a class="quantity" href="#">' + cartInfoArr[i].quantity ;

        cartStr += '</a></li><li><a data-proid="'+ cartInfoArr[i].id +'" data-showid="'+ i +'" class="item-modifier-increase-quantity" href="#">+</a></li></ul></div><hr class="d-md-none">';

        cartStr += '<div class="price-subtotal">NT$ '+ cartInfoArr[i].quantity * subtotal +'</div></li>';

        billSubtotalNum += priceOrg * cartInfoArr[i].quantity;
        billSaleNum += (priceOrg - subtotal) * cartInfoArr[i].quantity;
        billTotalNum += (cartInfoArr[i].quantity * subtotal);
    }
    cartList.innerHTML = cartStr;
    billPrint();
    billSubtotalNum = 0;
    billSaleNum = 0;
    billTotalNum = 0;
}

//帳單輸出
function billPrint(){
    if( billTotalNum >= FulldeliveryFeeNum || cartInfoArr.length == 0 ){
        deliveryFeeNum = 0;
    }else{
        deliveryFeeNum = 100;
    }
    billSubtotal.textContent = 'NT$ ' + billSubtotalNum;
    deliveryFee.textContent = 'NT$ ' + deliveryFeeNum;
    billSale.textContent = 'NT$ ' + billSaleNum;
    billTotal.textContent = 'NT$ ' + (billTotalNum + deliveryFeeNum) ;
}

//檢查購物車內 購買數量
function cartQuantityCheck(){
    if (cartInfoArr.length == 0){
        window.location.pathname = '/E-commerce2/index.html';
        alert('正在跳轉，首頁\n寵物之家歡迎您');
    }
    for (i=0; i<cartInfoArr.length; i++){
        if ( cartInfoArr[i].quantity == undefined ){
            cartInfoArr[i].quantity = 1;
        }
        var str = JSON.stringify(cartInfoArr);
        updateLocal('cartInfo',str);
    }
    createCartList();
}

//增減購物車的 購買數量
function cartQuantityCount(proId,showId,action){

    var cartQuantityNum = parseInt(cartInfoArr[showId].quantity); //購買數量
    if( action == 'decrease' ){ //減少

        if ( cartQuantityNum == 1 ){
            if( confirm ('是否要刪除 '+ products[proId].name + ' 訂單' ) == true ){
                cartInfoArr.splice(showId,1);
                var str = JSON.stringify(cartInfoArr);
                updateLocal('cartInfo',str);
                updateCartNum();
                createCartList();
                alert('已刪除 '+ products[proId].name + ' 訂單');
            }
        }else{
            cartQuantityNum -= 1;
            cartInfoArr[showId].quantity = cartQuantityNum;
            var str = JSON.stringify(cartInfoArr);
            updateLocal('cartInfo',str);
            updateCartNum();
            createCartList();
        }

    }else if( action == 'increase' ){ //增加

        if ( cartQuantityNum == products[proId].stock ){
            alert('抱歉， '+ products[proId].name + ' 庫存只有 '+ products[proId].stock + ' 個');
        }else{
            cartQuantityNum += 1;
            cartInfoArr[showId].quantity = cartQuantityNum;
            var str = JSON.stringify(cartInfoArr);
            updateLocal('cartInfo',str);
            updateCartNum();
            createCartList();
        }
    }

}