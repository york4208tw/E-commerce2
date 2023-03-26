$(document).ready(function(){

    //hambtn
    $('.hambtn i').click(function (e) { 
        $( this ).toggleClass('bx-x');
        $( '.navbar-nav' ).toggleClass('nav-toggle');
    });

});