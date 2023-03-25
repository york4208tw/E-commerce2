//DOM
var categoryList = document.querySelector('.category-list');
var categoryNum = document.querySelectorAll('.category-list span');
var productArea = document.querySelector('.product');
var categoryTitle = document.querySelector('.category-name');
var categoryTitleNum = document.querySelector('.category-num');
var productForPageSelect = document.querySelector('#product-for-page-select');
var productList = document.querySelector('.product-list');
var pageList = document.querySelector('.page-list .pagebtns');
var cart = document.querySelectorAll('.cartbtn');
var faver = document.querySelectorAll('.faver');

//監聽
categoryList.addEventListener('click', btnAction, false);
productArea.addEventListener('click', btnAction, false);
productForPageSelect.addEventListener('change', changeProductForPage,false);

//變數
var allArr = [];
var saleArr = [];
var hotArr = [];
var newArr = [];
var saleArr = [];
var lowPriceArr = [];

var showArr = [];
var nowPage = 1;

//預先 函數更新
categoryCheck();
updateNum();
createProductList(allArr,1);

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
        if( products[i].price * products[i].sale <= 150 ){
            lowPriceArr.push(i);
        }
    }
}

//產生商品清單
function createProductList(categoryArr,pageNum){
    
    //頁數控制
    var pageStr = '';
    var num = pageCount(categoryArr);
    var newStartNum = 0; //新for迴圈起始數字
    var Len = categoryArr.length; //新for迴圈陣列長度
    if( num > pageNum ){
        newStartNum = (pageNum-1) * productForPage;
        Len = pageNum * productForPage;
    }else if ( num !== 1 && num == pageNum ){
        newStartNum = (pageNum-1) * productForPage;
    }

    //輸出頁數按鈕
    pageStr += '<li class="page-arrow"><a class="prebtn" href="#"><i class="ri-arrow-left-s-fill"></i></a></li>';
    for( p=0; p<num; p++){
        pageStr += '<li class="options"><a class="pagebtn';
        if ( p + 1 == pageNum){
            pageStr += ' active';
        }
        pageStr += '" href="#">'+ (p+1) +'</a></li>';
    }
    pageStr += '<li class="page-arrow"><a class="nextbtn" href="#"><i class="ri-arrow-right-s-fill"></i></a></li>';
    pageList.innerHTML = pageStr;
    
    //輸出Li內容
    var str = '';
    for ( i=newStartNum; i<Len; i++){
        str += '<li class="product-item">';

        //輸出 優惠資訊
        var isSale = false;
        for ( s=0; s<saleArr.length; s++ ){
            if( saleArr[s] ==  categoryArr[i] ){
                str += '<div class="onsale">本日 '+ products[categoryArr[i]].sale*10 +' 折優惠</div>';
                isSale = true;
            }
        }
        var pic = products[categoryArr[i]].picSrc;
        str += '<img data-proid="'+ categoryArr[i] +'" data-showid="' + (i - (pageNum-1)*productForPage ) + '" id="' ;

        //輸出 最愛資訊
        for ( f=0; f<faverArr.length; f++ ){
            if( faverArr[f] ==  categoryArr[i] ){
                str += 'faver-select';;
            }
        }
        str += '" class="faver';
        if ( isSale == false ){
            str += ' faver-nosale';
        }
        str += '" src="pic/icon/faver_big.png" alt="faver"><a href="'+ productHref +'"><img class="product-pic" src="'+ pic +'" alt="產品圖片"></a>';
        //輸出 文字資訊
        var name =  products[categoryArr[i]].name;
        var price =  products[categoryArr[i]].price;
        str += '<div class="product-info"><a class="name" href="'+ productHref +'">'+ name +'</a><div class="price">NT$ '+ price +'</div></div><a href="#"><div id="';
        
        //輸出 購物車資訊
        var isCart = false;
        for ( c=0; c<cartArr.length; c++ ){
            if( cartArr[c] ==  categoryArr[i] ){
                str += 'cart-select';
                isCart = true;
            }
        }
        str +='" class="cartbtn" data-proid="'+ categoryArr[i] +'" data-showid="'+ (i - (pageNum-1)*productForPage ) +'">';
        if ( isCart == true ){
            str +='已加入購物車<span class="material-symbols-outlined">pets</span></div></a></li>';
        }else{
            str +='加入購物車</div></a></li>';
        }
    }
    var overNum = categoryArr.length % productForPage; //當前商品 不滿一頁的數量
    var overRowNum = overNum % productForRow; //當前商品 不滿一列的數量
    if ( overRowNum < productForRow && overRowNum !==0 && pageNum == num){
        for (o=0; o<productForRow-overRowNum; o++){
            str += '<li class="product-item mb-0 d-none d-md-block"><img class="product-pic" src="pic/cat/noproduct.png" alt="沒有產品"><div class="product-info"><a class="name no-product" href="#">-</a><div class="price">-</div></div><div class="no-cartbtn">沒有商品</div></li>';
        }
    }
    if ( overNum <= productForRow && overNum !== 0 && pageNum == num){
        str += '<li class="product-item mb-8 d-none d-md-block"></li>';
    }

    productList.innerHTML = str;
    showArr = categoryArr;
    nowPage = pageNum;
    cart = document.querySelectorAll('.cartbtn');
    faver = document.querySelectorAll('.faver');
    categoryTitle.textContent = categoryTitleName ;
    categoryTitleNum.textContent = '共 '+ showArr.length +' 筆';
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
    categoryNum[0].textContent = '( '+ allArr.length +' )';
    categoryNum[1].textContent = '( '+ saleArr.length +' )';
    categoryNum[2].textContent = '( '+ hotArr.length +' )';
    categoryNum[3].textContent = '( '+ newArr.length +' )';
    categoryNum[4].textContent = '( '+ lowPriceArr.length +' )';
    categoryNum[5].textContent = '( '+ faverArr.length +' )';
    categoryTitleNum.textContent = '共 '+ showArr.length +' 筆';
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
            updateNum();
            check = false;
            break;
        }
    }
    if ( check == true ){
        faverArr.push( proId );
        arr = setSmToLg(faverArr,'Str');
        updateLocal('faverId',arr);
        faver[showId].setAttribute('id','faver-select');
        updateNum();
    }
}

//檢查 購物車是否有資料 並上傳local
function cartCheck(proId,showId){
    var check = true;
    var arr =[];
    for ( i=0; i<cartArr.length; i++ ){
        
        if ( cartArr[i] == proId ){
            cartArr.splice( i, 1 );
            arr = setSmToLg(cartArr,'Str');
            updateLocal('cartId',arr);
            cart[showId].setAttribute('id','');
            cart[showId].innerHTML = '加入購物車';
            updateCartNum();
            check = false;
            break;
        }
    }
    if ( check == true ){
        cartArr.push( proId );
        arr = setSmToLg(cartArr,'Str');
        updateLocal('cartId',arr);
        cart[showId].setAttribute('id','cart-select');
        cart[showId].innerHTML = '已加入購物車<span class="material-symbols-outlined">pets</span>';
        updateCartNum();
    }
}

function pageAction(pageName){
    var num = pageCount(showArr);
    if( pageName == 'prebtn' ){
        if( nowPage != 1 ){
            var goPage = Number(nowPage)-1;
            createProductList( showArr, goPage );
        }else{
            alert('已經是第一頁了歐！');
        }
    }else if( pageName == 'nextbtn' ){
        if( nowPage != num ){
            var goPage = Number(nowPage)+1;
            createProductList( showArr, goPage );
        }else{
            alert('已經是最後一頁了歐！');
        }
    }else{
        createProductList( showArr, pageName );
    }
}

//使用者控制一頁顯示數量
function changeProductForPage(e){
    productForPage = e.target.value;
    createProductList(showArr,1);
}