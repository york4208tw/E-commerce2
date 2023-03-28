//Banner大圖 低解析度 替換 HD
bannerInit();

function bannerInit(){
    //DOM
    let carouselBN = document.querySelectorAll('.js-BN .carousel-item img'); //首頁BN
    let carouselBNLayout = document.querySelectorAll('.js-BN-Layout .carousel-item img'); //LayoutBN
    //變數
    let newBN = [];
    let newBNLayout = [];
    createBannerImage(newBN,carouselBN,'BN-Index');
    createBannerImage(newBNLayout,carouselBNLayout,'BN-Layout');
}
// 生成HD圖片Ary
function createBannerImage(aryBN,DOMBN,position){
    if ( DOMBN.length == 0 ){return}
    DOMBN.forEach(function(item,id){
        aryBN.push( new Image() );
        switch ( position ){
            case 'BN-Index':
                aryBN[id].src = 'pic/banner'+ (id+1) +'.png';
                break;
            case 'BN-Layout':
                aryBN[id].src = 'pic/banner'+ (id+1) +'_layout.png';
                break;
        }
    });
    changeToHD(aryBN,DOMBN);
}
// 待HD圖片讀取完，動態變更DOM的圖片位置
function changeToHD(aryBN,DOMBN){
    aryBN.forEach(function(item,id){
        aryBN[id].addEventListener('load', function(){
            DOMBN[id].src = aryBN[id].src;
        }, false);
    });
}