$(document).ready(function(){

    //hambtn
    $('.hambtn i').click(function (e) { 
        $( this ).toggleClass('bx-x');
        $( '.navbar-nav' ).toggleClass('nav-toggle');
    });

    //light&dark
    $('.darkbtn').click(function (e) {
        $( this ).toggleClass('bx-sun');
        $( 'body, .footer, .mailbar' ).toggleClass('dark-mode');
        // $( '.costbar, .costbar-container' ).toggleClass('grey_mode');
    });
});