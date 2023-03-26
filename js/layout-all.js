//讀取 購物車 & 我的最愛 localStorage 資訊
var cartInfoArr = JSON.parse(localStorage.getItem('cartInfo')) || [] ;
var faverArr = JSON.parse(localStorage.getItem('faverId')) || [] ;
var userState =  JSON.parse(localStorage.getItem('userState')) || {isDark: 0} ;
localStorage.removeItem('cartId'); //刪除原有的 local data

//DOM
var naverbar = document.querySelector('.navbar');
var cartNum = document.querySelectorAll('.navbar .cart-num'); //購物車數量
var appLink = document.querySelector('.contactbar .link'); //fb & line
var mailBar = document.querySelector('.mailbar');
var toTop = document.querySelector('.totop');

//監聽
window.addEventListener('scroll', toTopAction, false);
appLink.addEventListener('click', btnAction, false);
mailBar.addEventListener('click', btnAction, false);
naverbar.addEventListener('click', btnAction, false);

//網頁預設資訊
var productLen = products.length;
var productHref = '#'; //預覽用產品頁
var productForPage = 6; // 產品一頁顯示數量
var productForRow = 3; // 產品一列顯示數量，以目前版型請勿更動
var isOpen = false; //分類表單收合狀態
var categoryTitleName = '所有商品';

//預先 函數更新
updateCartNum();
darkModeControl('firstOpen');

//按鈕動作
function btnAction(e){

    switch (e.target.className){

        // layout
        case 'linebtn':
            lineBtnAlert('line');
            break;
        case 'fbbtn':
            lineBtnAlert('facebook');
            break;
        case 'submit':
            e.preventDefault();
            mailTo();
            break;
        case 'cart-icon':
            e.preventDefault();
            if ( cartInfoArr.length !== 0 ){
                window.location.pathname = '/cart.html';
            }else{
                alert('您的購物車內還沒有物品喔!');
            }
            break;
        case 'cart-num':
            e.preventDefault();
            if ( cartInfoArr.length !== 0 ){
                window.location.pathname = '/cart.html';
            }else{
                alert('您的購物車內還沒有物品喔!');
            }
            break;
        

        // 商品類別 category
        case 'allbtn':
            e.preventDefault();
            categoryTitleName = '所有商品';
            createProductList(allArr,1);
            break;
        case 'salebtn':
            e.preventDefault();
            categoryTitleName = '本日優惠';
            createProductList(saleArr,1);
            break;
        case 'hotbtn':
            e.preventDefault();
            categoryTitleName = '人氣推薦';
            createProductList(hotArr,1);
            break;
        case 'newbtn':
            e.preventDefault();
            categoryTitleName = '新品上市';
            createProductList(newArr,1);
            break;
        case 'lowPricebtn':
            e.preventDefault();
            categoryTitleName = '小資商品';
            createProductList(lowPriceArr,1);
            break;
        case 'myFaverbtn':
            e.preventDefault();
            if ( faverArr.length !== 0 ){
                categoryTitleName = '我的最愛';
                createProductList(faverArr,1);
            }else{
                alert('您還沒有最愛的商品唷!\n快找個商品按按看上面的愛心吧～');
            }
            break;
        case 'category-list':
            var toggle = document.querySelectorAll('.hide-item');
            if ( isOpen == false ){
                toggle[0].setAttribute('id','open-item');
                toggle[1].setAttribute('id','open-item');
                isOpen = true;
            }else{
                toggle[0].setAttribute('id','');
                toggle[1].setAttribute('id','');
                isOpen = false;
            }
            break;

        //Product清單
        case 'product-pic':
            e.preventDefault();
            break;
        case 'faver':
            faverCheck(e.target.dataset.proid, e.target.dataset.showid);
            break;
        case 'faver faver-nosale':
            faverCheck(e.target.dataset.proid, e.target.dataset.showid);
            break;
        case 'cartbtn':
            e.preventDefault();
            cartCheck(e.target.dataset.proid, e.target.dataset.showid);
            break;
        case 'pagebtn':
            e.preventDefault();
            pageAction(e.target.textContent);
            break;
        case 'prebtn':
            e.preventDefault();
            pageAction(e.target.className);
            break;
        case 'nextbtn':
            e.preventDefault();
            pageAction(e.target.className);
            break;
        case 'name no-product':
            e.preventDefault();
            break;

        //購物車頁面
        case 'item-modifier-decrease-quantity':
            e.preventDefault();
            cartQuantityCount(e.target.dataset.proid, e.target.dataset.showid, 'decrease');
            break;
        case 'quantity':
            e.preventDefault();
            break;
        case 'item-modifier-increase-quantity':
            e.preventDefault();
            cartQuantityCount(e.target.dataset.proid, e.target.dataset.showid, 'increase');
            break;
        case 'checkout-btn':
            e.preventDefault();
            if ( cartInfoArr.length == 0){
                alert('您的購物車內還沒有商品喔!\n跳轉回首頁');
                window.location.pathname = '/index.html';
            }else{
                if ( confirm( '確定要結單了嗎?\n本網站體驗到此，結單將會清空購物車內容！' ) == true ){
                    cartInfoArr = '[]';
                    localStorage.setItem('cartInfo',cartInfoArr);
                    window.location.pathname = '/index.html';
                }
            }
            break;

        default:
            //console.log(e.target.innerHTML);
            //console.log(e.target.className);
            // console.log(e);
    }
    switch (e.target.id){
        case 'darkbtn':
            e.preventDefault();
            if ( userState.isDark == 0 ){
                userState.isDark = 1;
            }else{
                userState.isDark = 0;
            }
            var body = document.body;
            body.style.transition = 'all .2s ease';
            darkModeControl();
            var str = JSON.stringify(userState);
            updateLocal('userState',str);
    }
}

//line & fb 彈跳視窗
function lineBtnAlert(linkName){
    alert('這只是個範例網站，沒辦法跳轉到 ' + linkName + ' 喔~');
}

//訂閱寵物之家 信箱驗證
function mailTo(){

    var email = document.querySelector('.email');
    if ( email.value !== ''){
        var emailRegxp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

        if (emailRegxp.test(email.value) != true){
            alert('您填寫的 Email 格式並不正確喔！');
        }else{

            if ( confirm( '是否使用 ' + email.value + ' 帳號訂閱我們?' ) == true){
                alert( '已使用 ' + email.value + ' 帳號訂閱！' );
                email.value = '';
            }
        }
    }
}

//購物車 & 我的最愛 數字陣列 小到大排序 Arr轉Arr或Str
function setSmToLg(Arr,ArrOrStr){

    var smToLgArr = []; // 小至大 暫存用陣列
    for ( i = 0; i < productLen; i++ ){
        for( o=0; o < Arr.length; o++){
            if( i == Arr[o] ){
                smToLgArr.push( i );
            }
        }
    }
    switch ( ArrOrStr ){
        case 'Arr':
            return(smToLgArr);
        case 'Str':
            var string = JSON.stringify(smToLgArr);
            return(string);
    }
}

//toTop
function toTopAction(e){
    if( window.scrollY < 400){
        toTop.style.transform = 'translateX(100px)';
    }else{
        toTop.style.transform = 'translateX(0px)';
    }
}

//
function updateCartNum(){
    cartNum[0].textContent = cartInfoArr.length;
    cartNum[1].textContent = cartInfoArr.length;
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

function darkModeControl(isLoad){
    if ( isLoad == 'firstOpen' ){
        if ( userState.isDark == 1 ){
            $( '.darkbtn-li' ).toggleClass('bx-sun');
            $( 'body, .footer, .mailbar, #product-for-page-select' ).toggleClass('dark-mode');
        }
    }else{
        $( '.darkbtn-li' ).toggleClass('bx-sun');
        $( 'body, .footer, .mailbar, #product-for-page-select' ).toggleClass('dark-mode');
        console.log(userState.isDark);
    }
}