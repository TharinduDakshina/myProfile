let regxName = /^[A-z ]{3,20}$/;
let regxEmailAddress = /^[A-z 0-9@.,]{3,30}$/;


$(window).on('load', function () {
    $("#loader_content").fadeOut(1500);
});

$(document).ready(function () {
    $(".darkModeButton").click(function () {
        $(".darkModeButtonInner").toggleClass("active");
        $("body,#homeMainSelection,#contactNavigationSelection,#about,#education,#skill,#projects,#gallery,#contact").toggleClass('dark');
    });
});

$("#formSubmit").attr('disabled', true);


$('.carousel').flipster({
    style: 'carousel',
    spacing: -0.01
});

const to_Top = $('.toTop');

window.addEventListener('scroll',function (){

    if (window.pageYOffset > 100) {
        to_Top.addClass("active");
    } else {
        to_Top.removeClass("active");
    }
});

$("#email,#name,#feedback").on('keyup', function () {
    contactValidation();
});

function contactValidation() {
    var emailAddress = $("#email").val();
    if (regxEmailAddress.test(emailAddress)) {
        $("#email").css('border', '3px solid green');
        var name = $("#name").val();
        if (regxName.test(name)) {
            var feedBack = $('#feedback').val();
            $("#name").css('border', '3px solid green');
            if (feedBack != '') {
                $("#feedback").css('border', '3px solid green');
                $("#formSubmit").attr('disabled', false);
            } else {
                $("#feedback").css('border', '3px solid red');
                $("#formSubmit").attr('disabled', true);
            }
        } else {
            $("#name").css('border', '3px solid red');
            $("#formSubmit").attr('disabled', true);
        }
    } else {
        $("#email").css('border', '3px solid red');
        $("#formSubmit").attr('disabled', true);
    }
}
