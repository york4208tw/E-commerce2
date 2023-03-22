//商品輸出
var prodList = document.querySelector('.product-list');

var categoryList = document.querySelector('.category-list');
var categoryNum = document.querySelectorAll('.category-list span');
var cartNum =  document.querySelectorAll('.navbar span');
var appLink = document.querySelector('.contactbar .link');

var prodLen = products.length;
var prodStr = '';
var allProdArr = [];
var saleArr = [];
var hotArr = [];
var newArr = [];
var saleArr = [];
var showArr = [];

var prodPreHref = 'A0001.html'; //預設 產品頁 預覽 連結
var pageItemNum = 9; //預設 一頁li數量

categoryList.addEventListener('click', category, false);
appLink.addEventListener('click', linkAlert ,false);

//停止a連結的預設觸發行為
var prodArea = document.querySelector('.product');
var mailbar =  document.querySelector('.mailbar');
prodArea.addEventListener('click', preDef,false);
mailbar.addEventListener('click', preDef,false);

var faver = document.querySelectorAll('.faver');
var faverArr = JSON.parse(localStorage.getItem('faverId')) || [] ;

var cartArr = JSON.parse(localStorage.getItem('cartId')) || [] ;

cartNum[0].textContent = cartArr.length;
cartNum[1].textContent = cartArr.length;

allProdCheck();
saleCheck();
hotCheck();
newCheck();
updateProd();


//更新
function updateProd(Btn){
    
    showArr = allProdArr;
    var pageNum = pageCheck(showArr);

    var ProdNum = 0;
    var saleNum = 0;

    switch (Btn){
        case 'allBtn':
            showArr = allProdArr;
            pageNum = pageCheck(showArr);
            break;

        case 'hotBtn':
            showArr = hotArr;
            pageNum = pageCheck(showArr);
            break;

        case 'saleBtn':
            showArr = saleArr;
            pageNum = pageCheck(showArr);
            break;

        case 'newBtn':
            showArr = newArr;
            pageNum = pageCheck(showArr);
            break;
    }

    console.log(pageNum);

    //輸出 showArr[i]的 products的 idex 內容
    for ( i=0; i< showArr.length; i++){
        prodStr += '<li class="product-item">';

        //如果 showArr[i] <= saleArr[num]， 小於：不做事/等於:輸出優惠訊息
        //如果 showArr[i] > saleArr[num]， 做saleArr迴圈，找到與 showArr[i] 相符的 products idex，輸出/如沒找到，離開 if
        if( showArr[i] <= saleArr[saleNum]){
            if ( showArr[i] == saleArr[saleNum]){
                prodStr += '<div class="onsale">本日 '+ products[showArr[i]].sale*10 +' 折優惠</div>';
                saleNum ++;
            }
        }else {
            for ( x=0; x<saleArr.length; x++){
                if ( saleArr[x] == showArr[i] ){
                    prodStr += '<div class="onsale">本日 '+ products[showArr[i]].sale*10 +' 折優惠</div>';
                    saleNum = x;
                }
            }
        }

        var pic = products[showArr[i]].picSrc;
        prodStr += '<img data-prodIndex="'+ showArr[i] +'" data-showIndex="' + i + '" id="' ;

        var isfaver = faverCheck(i);

        if ( isfaver == true ){
            prodStr += 'faver-select';
        }

        prodStr += '" class="faver" src="pic/icon/faver_big.png" alt="faver"><a href="'+ prodPreHref +'"><img class="product-pic" src="'+ pic +'" alt="產品圖片"></a>';

        var name =  products[showArr[i]].name;
        var price =  products[showArr[i]].price;
        prodStr += '<div class="product-info"><a class="name" href="'+ prodPreHref +'">'+ name +'</a><div class="price">NT$ '+ price +'</div></div><a href="#"><div class="cartBtn" data-index="'+ showArr[i] +'">加入購物車</div></a></li>';

        ProdNum ++; 
        if ( showArr.length == ProdNum ){

            var overflowList = ProdNum % 3;

            switch (overflowList){
                case 0:
                    break;
                case 1:
                    prodStr += '<li class="product-item"></li><li class="product-item"></li>';
                    break;
                case 2:
                    prodStr += '<li class="product-item"></li>';
                    break;
            }

            prodList.innerHTML = prodStr;
            prodStr = '';
            faver = document.querySelectorAll('.faver');
            break;
        }
    }
}

function faverIn(dataIndex,showIndex){
    if (faverArr.length == 0){
        faverArr.push(dataIndex);
        var faverStr = JSON.stringify(faverArr);
        localStorage.setItem('faverId',faverStr);
        faver[showIndex].setAttribute('id','faver-select');
    }else{

        var isfaver = false;
        var isfaverId = 0;
        
        //檢查 faverArr內有無點擊的index
        for (i=0; i<faverArr.length; i++){
            if ( faverArr[i] == dataIndex ){
                isfaver = true;
                isfaverId = i;
            }
        }
        if( isfaver == false ){
            faverArr.push(dataIndex);
            var faverStr = JSON.stringify(faverArr);
            localStorage.setItem('faverId',faverStr);
            faver[showIndex].setAttribute('id','faver-select');
        }else{
            faverArr.splice(isfaverId,1);
            var faverStr = JSON.stringify(faverArr);
            localStorage.setItem('faverId',faverStr);
            faver[showIndex].setAttribute('id','');
        }
    }
}

function faverCheck(prodId){
    for ( f=0; f<faverArr.length; f++ ){
        if (prodId == faverArr[f]){
            return(true);
        }
    }
    return(false);
}


//allProdCheck 將index位置push至 allProdArr[] 內
function allProdCheck(e){
    for ( o=0; o<prodLen; o++ ){
        if ( typeof(products[o].id) == 'string'){
            allProdArr.push(o);
        }
    }
    categoryNum[0].textContent = '('+ allProdArr.length +')';
}
//saleCheck 將index位置push至 saleArr[] 內
function saleCheck(e){
    for ( o=0; o<prodLen; o++ ){
        if ( products[o].sale !== 1){
            saleArr.push(o);
        }
    }
    categoryNum[1].textContent = '('+ saleArr.length +')';
}
//hotCheck 將index位置push至 hotArr[] 內
function hotCheck(e){
    for ( o=0; o<prodLen; o++ ){
        if ( products[o].hot == true){
            hotArr.push(o);
        }
    }
    categoryNum[2].textContent = '('+ hotArr.length +')';
}
//newCheck 將index位置push至 newArr[] 內
function newCheck(e){
    for ( o=0; o<prodLen; o++ ){
        if ( products[o].new == true){
            newArr.push(o);
        }
    }
    categoryNum[3].textContent = '('+ newArr.length +')';
}


function category(e){
    if( e.target.nodeName == 'A' ){
        e.preventDefault();
    }
    switch (e.target.className){
        case 'allBtn':
            updateProd('allBtn');
            break;
        
        case 'hotBtn':
            updateProd('hotBtn');
            break;

        case 'saleBtn':
            updateProd('saleBtn');
            break;

        case 'newBtn':
            updateProd('newBtn');
            break;
    }
}


//停止a連結的預設觸發行為 和 faver事件
function preDef(e){

    switch(e.target.className){
        case 'faver':
            faverIn(e.target.dataset.prodindex,e.target.dataset.showindex);
            break;

        case 'cartBtn':
            e.preventDefault();
            cartBtnIn(e.target.dataset.index);
            break;

        case 'preDef':
            e.preventDefault();
            break;

        case 'submit':
            e.preventDefault();
            mailto();
            break;
    }
}

function cartBtnIn(dataIndex){
    if (cartArr.length == 0){
        cartArr.push(dataIndex);
        var cartStr = JSON.stringify(cartArr);
        console.log(cartStr);
        localStorage.setItem('cartId',cartStr);
        cartNum[0].textContent = cartArr.length;
        cartNum[1].textContent = cartArr.length;

    }else{
        var iscart = false;
        var iscartId = 0;
        
        //檢查 faverArr內有無點擊的index
        for (i=0; i<cartArr.length; i++){
            if ( cartArr[i] == dataIndex ){
                iscart = true;
                iscartId = i;
            }
        }
        if( iscart == false ){
            cartArr.push(dataIndex);
            var cartStr = JSON.stringify(cartArr);
            localStorage.setItem('cartId',cartStr);
            cartNum[0].textContent = cartArr.length;
            cartNum[1].textContent = cartArr.length;


        }else{
            cartArr.splice(iscartId,1);
            var cartStr = JSON.stringify(cartArr);
            localStorage.setItem('cartId',cartStr);
            cartNum[0].textContent = cartArr.length;
            cartNum[1].textContent = cartArr.length;
        }
    }
}

//計算頁數
function pageCheck(Arr){
    var num = Arr.length / pageItemNum;
    var pageOverFlow =  Arr.length % pageItemNum;
    var pageNum = 1;
    if (Arr.length > pageItemNum){
        if( pageOverFlow == 0){
            pageNum = num;
        }else{
            pageNum = Math.floor(num) + 1;
        }
    }
    return(pageNum);
}

function mailto(){
    var email = document.querySelector('.email');
    if ( email.value !== ''){
        if ( confirm( '是否使用 ' + email.value + ' 帳號訂閱我們?' ) == true){
            alert( '已使用 ' + email.value + ' 帳號訂閱！'  );
            email.value = '';
        }
    }
}

function linkAlert(e){
    if ( e.target.nodeName =='IMG' ){
        alert('這只是個範例網站，沒辦法跳轉到 ' + e.target.alt + ' 喔~')
    }
}