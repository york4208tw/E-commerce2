// DOM
var citySelectDOM = document.querySelector('#cart-to-city');
var districtSelectDOM = document.querySelector('#cart-to-district');
var cityOptionDOM = document.querySelectorAll('#cart-to-city option');
var cartQuantityDOM = document.querySelector('.cart-count-item');
var proBtnDOM = document.querySelector('.pro-btns');

// 變數
var countryAry = [];
var cityAry = [];
var proInCart = false;
var proInFaver = false;

// 監聽
citySelectDOM.addEventListener('change', function(e){
    createDistrictSelect(e.target.value);
});
districtSelectDOM.addEventListener('change', function(e){
    userStateArr.district = e.target.value;
    updateLocal('userState',userStateArr)
});
cartQuantityDOM.addEventListener('click',function(e){
    e.preventDefault();
    switch (e.target.className){
        case 'pro-decreasebtn':
            proQuantityCount('decreasebtn');
            break;
        case 'pro-increasebtn':
            proQuantityCount('increasebtn');
            break;
    }
})
proBtnDOM.addEventListener('click',function(e){
    switch (e.target.className){
        case 'pro-cart-btn':
            proCartAction();
            $('.pro-cart-btn').addClass('cart-select');
            updateCartNum();
            break;
        case 'pro-cart-btn cart-select':
            proCartAction();
            $('.pro-cart-btn').removeClass('cart-select');
            updateCartNum();
            break;
        case 'pro-faver-btn':
            proFaverAction();
            $('.pro-faver-btn').addClass('faver-select');
            $('.pro-faver-btn i').addClass('bxs-heart');
            break;
        case 'pro-faver-btn faver-select':
            proFaverAction();
            $('.pro-faver-btn').removeClass('faver-select');
            $('.pro-faver-btn i').removeClass('bxs-heart');
            break;
    }
})

productInit();

// 初始化
function productInit(){
    if ( userStateArr.focusProId !== undefined ){
        printProductInfo(userStateArr.focusProId);
    }else{
        printProductInfo(0);
    }
    createCitySelect();
    if ( userStateArr.city !== undefined ){
        createDistrictSelect(userStateArr.city);
    }else{
        createDistrictSelect('臺中市');
    }
    proPageCartCheck();
}

// 購物車Arr的增減
function proCartAction(){
    if ( proInCart == true ){
        let cartId = '';
        cartInfoArr.forEach(function(item,id){
            if ( userStateArr.focusProId == item.id ){
                cartId = id;
            }
        })
        proInCart = false;
        cartInfoArr.splice(cartId,1);
        updateLocal('cartInfo',cartInfoArr);
        alert('移除購物車');
    }else{
        proInCart = true;
        let proQuantityNum = document.querySelector('.cart-count-item .pro-quantity').textContent;
        cartInfoArr.push({'id': userStateArr.focusProId, 'quantity': proQuantityNum});
        updateLocal('cartInfo',cartInfoArr);
        alert('將'+ proQuantityNum +'份商品加入購物車');
    }
}
// 我的最愛Arr增減
function proFaverAction(){
    if ( proInFaver == true ){
        let faverId = '';
        faverArr.forEach(function(item,id){
            if ( userStateArr.focusProId == item ){
                faverId = id;
            }
        })
        proInFaver = false;
        faverArr.splice(faverId,1);
        updateLocal('faverId',faverArr);
        alert('移除我的最愛');
    }else{
        proInFaver = true;
        faverArr.push(userStateArr.focusProId);
        updateLocal('faverId',faverArr);
        alert('加到我的最愛');
    }
}

// 數量控制
function proQuantityCount(action){
    let QuantityNum = parseInt(document.querySelector('.cart-count-item .pro-quantity').textContent);
    if ( action == 'decreasebtn' ){
        if ( QuantityNum !== 1 ){
            QuantityNum -= 1;
            document.querySelector('.cart-count-item .pro-quantity').textContent = QuantityNum;
        }
    }else if ( action == 'increasebtn' ){
        if ( QuantityNum == products[userStateArr.focusProId].stock ){
            alert('抱歉， '+ products[userStateArr.focusProId].name + ' 庫存只有 '+ products[userStateArr.focusProId].stock + ' 個');
        }else if( QuantityNum < products[userStateArr.focusProId].stock ){
            QuantityNum += 1;
            document.querySelector('.cart-count-item .pro-quantity').textContent = QuantityNum;
        }
    }
    if ( proInCart == true ){
        let proCartId = '';
        cartInfoArr.forEach(function(item,id){
            if ( item.id == userStateArr.focusProId ){
                proCartId = id;
            }
        })
        cartInfoArr[proCartId].quantity = QuantityNum;
        updateLocal('cartInfo',cartInfoArr);
    }
}

// 印出產品資訊
function printProductInfo(proId){
    //pro-info
    document.querySelector('.pro-pic img').src = products[proId].picSrc;
    document.querySelector('.pro-info .title').textContent = products[proId].name;
    document.querySelector('.star-num span').textContent = products[proId].star;
    document.querySelector('.soldout-num span').textContent = products[proId].sold;
    document.querySelector('.pro-price .price-org').textContent = 'NT$ ' + products[proId].price;
    if ( products[proId].sale !== 1 ){
        let saleNum = products[proId].sale * 10;
        document.querySelector('.pro-price .price-sale').textContent = 'NT$ ' + (products[proId].price * products[proId].sale);
        document.querySelector('.pro-price .price-salenum').textContent = saleNum + '折';
        $( '.pro-price .price-org' ).addClass('is-sale');
    }else{
        $( '.pro-price .price-salenum' ).addClass('d-none');
    }
    document.querySelector('.cart-countbar .stock span').textContent = products[proId].stock;

    //pro-format
    let proFormatListDOM = document.querySelectorAll('.format-item span');
    proFormatListDOM.forEach(function(item,id){
        if ( id == 0 ){
            proFormatListDOM[id].textContent = products[proId].name;
        }else{
            proFormatListDOM[id].textContent = products[proId].dtail[id-1];
        }
    });
    let proContentListDOM = document.querySelector('.pro-content-list');
    let proContentListStr = '';
    products[proId].content.forEach(function(item,id){
        proContentListStr += `<div class="pro-content">${item}</div>`
    });
    proContentListDOM.innerHTML = proContentListStr;
    proPageCartCheck('init');
}

// 產出 縣市清單 並輸出
function createCitySelect(){
    let countryXhr = new XMLHttpRequest();
    countryXhr.open('GET','https://demeter.5fpro.com/tw/zipcodes.json',false);
    countryXhr.send();
    countryAry = JSON.parse(countryXhr.response);
    countryAry.forEach(function(country,countryId){
        let inCity = false;
        cityAry.forEach(function(city,cityId){
            if ( country.city_name == city ){ inCity = true; }
        })
        if ( inCity == false ){
            cityAry.push(country.city_name);
        }
    });

    //產出縣市選單
    let myCity = userStateArr.city;
    if ( myCity == undefined ){
        myCity = '臺中市';
    }
    cityAry.forEach(function(item,id){
        let cityOptionItem = document.createElement('option');
        cityOptionItem.value = item;
        cityOptionItem.textContent = item;
        if (item == myCity){
            cityOptionItem.selected = true;
        }
        citySelectDOM.appendChild(cityOptionItem);
    });
}

// 產出 區域清單 並輸出
function createDistrictSelect( thisCity ){
    let myDistrict = userStateArr.district;
    let districtSelectDOM = document.querySelector('#cart-to-district');
    districtSelectDOM.innerHTML = '';
    countryAry.forEach(function(item,id){
        if ( item.city_name == thisCity ){
            let districtOptionItem = document.createElement('option');
            districtOptionItem.value = item.name;
            districtOptionItem.textContent = item.name;
            if ( myDistrict == item.name ){
                districtOptionItem.selected = true;
            }
            districtSelectDOM.appendChild(districtOptionItem);
        }
    })
    userStateArr.city = thisCity;
    updateLocal('userState',userStateArr);
}

// 初始檢查商品是否在 購物車 最愛內
function proPageCartCheck(){
    cartInfoArr.forEach(function(item,id){
        if ( item.id == userStateArr.focusProId ){
            proInCart = true;
            if (item.quantity == undefined){
                document.querySelector('.cart-count-item .pro-quantity').textContent = 1;
            }else{
                document.querySelector('.cart-count-item .pro-quantity').textContent = item.quantity;
            }
            document.querySelector('.pro-btns .pro-cart-btn').textContent = '已加入購物車';
            $('.pro-cart-btn').addClass('cart-select');
        }
    })
    if( proInCart == false ){
        document.querySelector('.cart-count-item .pro-quantity').textContent = 1;
    }
    faverArr.forEach(function(item,id){
        if ( item == userStateArr.focusProId ){
            proInFaver = true;
            $('.pro-faver-btn i').addClass('bxs-heart');
            $('.pro-faver-btn').addClass('faver-select');
        }
    })
}