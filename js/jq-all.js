$(document).ready(function(){

    //hambtn
    $('.hambtn i').click(function (e) { 
        $( this ).toggleClass('bx-x');
        $( '.navbar-nav' ).toggleClass('nav-toggle');
    });

    //light&dark
    $('.darkbtn').click(function (e) {
        $( this ).toggleClass('bx-sun');
        $( 'body, .footer, .mailbar, #product-for-page-select' ).toggleClass('dark-mode');
    });
});