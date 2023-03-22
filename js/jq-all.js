$(document).ready(function(){

    //hambtn
    $('.hamBtn i').click(function (e) { 
        $( this ).toggleClass('bx-x');
        $( '.navbar-nav' ).toggleClass('nav-toggle');
    });
});
