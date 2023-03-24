//Banner大圖 低解析度 替換 HD
var carouselBanner = document.querySelectorAll('.carousel-inner .carousel-item img');
newBannerCount = 3; //圖片數量
var newBanners = [];

for (i=0; i<newBannerCount; i++ ){
    newBanners.push( new Image() );
    newBanners[i].src = 'pic/banner'+ (i+1) +'.png';
}

newBanners[0].addEventListener('load', imgUpToHD0, false);
newBanners[1].addEventListener('load', imgUpToHD1, false);
newBanners[2].addEventListener('load', imgUpToHD2, false);

function imgUpToHD0(){
    carouselBanner[0].src = newBanners[0].src;
}
function imgUpToHD1(){
    carouselBanner[1].src = newBanners[1].src;
}
function imgUpToHD2(){
    carouselBanner[2].src = newBanners[2].src;
}