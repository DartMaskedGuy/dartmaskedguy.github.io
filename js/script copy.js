$(document).ready(function(){
    $('.menu-toggler').click(function(){
        $(this).toggleClass("active");
        $(".navbar").toggleClass("active");
    });
});
