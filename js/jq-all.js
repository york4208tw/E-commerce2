$(document).ready(function(){

    //hambtn
    $('.hambtn i').click(function (e) { 
        $( this ).toggleClass('bx-x');
        $( '.navbar-nav' ).toggleClass('nav-toggle');
    });

    $('.welcomebtn').click(function (e) { 
        $( '.welcome' ).toggleClass('no-welcome');
            userState.isReVisit = 1;
            let newStr = JSON.stringify(userState);
            localStorage.setItem('userState',newStr);   
        
    });
    $('.web-info').click(function (e) { 
        $( '.welcome' ).toggleClass('no-welcome');
    });


});