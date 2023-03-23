//DOM
var categoryList = document.querySelector('.category-list');
var categoryNum = document.querySelectorAll('.category-list span');
var productArea = document.querySelector('.product');
var productList = document.querySelector('.product-list');
var cart = document.querySelectorAll('.cartbtn');
var faver = document.querySelectorAll('.faver');

//監聽
categoryList.addEventListener('click', btnAction, false);
productArea.addEventListener('click', btnAction, false);

//變數
var allArr = [];
var saleArr = [];
var hotArr = [];
var newArr = [];
var saleArr = [];
var showArr = [];

var nowPage = 1;

//預先 更新 函數
categoryCheck();
updateNum();
creatProductList(allArr,2);




//將商品依類別分類至各 Arr
function categoryCheck(){
    for( i=0; i<productLen; i++ ){
        if( typeof( products[i].id ) == 'string'){
            allArr.push(i);
        }
        if( products[i].sale !== 1 ){
            saleArr.push(i);
        }
        if( products[i].hot == true ){
            hotArr.push(i);
        }
        if( products[i].new == true ){
            newArr.push(i);
        }
    }
}

//產生商品清單
function creatProductList(categoryName,pageNum){
    

    //頁數控制
    var num = pageCount(categoryName);
    var newStartNum = 0;
    var Len = categoryName.length;
    if( num > pageNum ){
        newStartNum = (pageNum-1) * productForPage;
        Len = pageNum * productForPage;
    }else if ( num !== 1 && num == pageNum ){
        newStartNum = (pageNum-1) * productForPage;
    }
    
    //輸出Li內容
    var str = '';
    for ( i=newStartNum; i<Len; i++){
        str += '<li class="product-item">';

        //輸出 優惠資訊
        for ( s=0; s<saleArr.length; s++ ){
            if( saleArr[s] ==  categoryName[i] ){
                str += '<div class="onsale">本日 '+ products[categoryName[i]].sale*10 +' 折優惠</div>';
            }
        }
        var pic = products[categoryName[i]].picSrc;
        str += '<img data-proid="'+ categoryName[i] +'" data-showid="' + (i - (pageNum-1)*9 ) + '" id="' ;

        //輸出 最愛資訊
        for ( f=0; f<faverArr.length; f++ ){
            if( faverArr[f] ==  categoryName[i] ){
                str += 'faver-select';;
            }
        }
        str += '" class="faver" src="pic/icon/faver_big.png" alt="faver"><a href="'+ productHref +'"><img class="product-pic" src="'+ pic +'" alt="產品圖片"></a>';
        //輸出 文字資訊
        var name =  products[categoryName[i]].name;
        var price =  products[categoryName[i]].price;
        str += '<div class="product-info"><a class="name" href="'+ productHref +'">'+ name +'</a><div class="price">NT$ '+ price +'</div></div><a href="#"><div id="';
        //輸出 購物車資訊
        var cartBoolean = false;
        for ( c=0; c<cartArr.length; c++ ){
            if( cartArr[c] ==  categoryName[i] ){
                str += 'cart-select';
                cartBoolean = true;
            }
        }

        str +='" class="cartbtn" data-proid="'+ categoryName[i] +'" data-showid="'+ (i - (pageNum-1)*9 ) +'">';

        if ( cartBoolean == true ){
            str +='已';
        }
        str += '加入購物車</div></a></li>';
    }
    productList.innerHTML = str;
    str = '';
    cart = document.querySelectorAll('.cartbtn');
    faver = document.querySelectorAll('.faver');
}

//計算類別頁數
function pageCount(Arr){
    var num = Math.floor(Arr.length / productForPage);
    var overNum = Arr.length % productForPage;
    if( overNum !== 0){
        return(num + 1);
    }else{
        return(num);
    }
}

//更新資訊到 商品類別數量 & 購物車數量
function updateNum(){
    categoryNum[0].textContent = '('+ allArr.length +')';
    categoryNum[1].textContent = '('+ saleArr.length +')';
    categoryNum[2].textContent = '('+ hotArr.length +')';
    categoryNum[3].textContent = '('+ newArr.length +')';
    cartNum[0].textContent = cartArr.length;
    cartNum[1].textContent = cartArr.length;
}

//更新資訊到 localStorage 可放 Arr/Str/Boolean
function updateLocal(keyName,data){
    
    if ( typeof(data) == 'string' ){
        localStorage.setItem(keyName,data);
    }
    else if( typeof(data) == 'boolean' ){
        localStorage.setItem(keyName,data);
    }
    else if( Array.isArray(data) == true ){
        var str = JSON.stringify(data);
        localStorage.setItem(keyName,str);
    }
    else{
        console.log('更新localStorge失敗');
    }
}

//檢查 最愛是否有資料 並上傳local
function faverCheck(proId,showId){
    var check = true;
    var arr =[];
    for ( i=0; i<faverArr.length; i++ ){
        
        if ( faverArr[i] == proId ){
            faverArr.splice( i, 1 );
            arr = setSmToLg(faverArr,'Str');
            updateLocal('faverId',arr);
            faver[showId].setAttribute('id','');
            check = false;
            break;
        }
    }
    if ( check == true ){
        faverArr.push( proId );
        arr = setSmToLg(faverArr,'Str');
        updateLocal('faverId',arr);
        faver[showId].setAttribute('id','faver-select');
    }
}

function cartCheck(proId,showId){
    var check = true;
    var arr =[];
    for ( i=0; i<cartArr.length; i++ ){
        
        if ( cartArr[i] == proId ){
            cartArr.splice( i, 1 );
            arr = setSmToLg(cartArr,'Str');
            updateLocal('cartId',arr);
            cart[showId].setAttribute('id','');
            cart[showId].textContent = '加入購物車';
            updateNum();
            check = false;
            break;
        }
    }
    if ( check == true ){
        cartArr.push( proId );
        arr = setSmToLg(cartArr,'Str');
        updateLocal('cartId',arr);
        cart[showId].setAttribute('id','cart-select');
        cart[showId].textContent = '已加入購物車';
        updateNum();
    }
}