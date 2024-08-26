$(document).ready(function () {
    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                },
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                },
            },
        ],
    });

    const dateTimePicker = $('#dateTimeReserve').flatpickr({
        locale: 'ru',
        dateFormat: 'd-m-Y, H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate: null,
    });

    $('#dateTimeReserve').attr('data-default', $('#dateTimeReserve').val() || '');

    $('#number').inputmask({'mask': '+7 (999) 999 - 99 - 99'});

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    let menu = $('#burger__menu');

    $('#menu-button-line').click(function () {
        menu.addClass('open');
    });

    $('.close-button-menu').click(function () {
        menu.removeClass('open');
    });

    $('.burger__menu-link').click(function () {
        menu.removeClass('open');
    });

    $('#submit_form').click(function (event) {
        event.preventDefault();

        let hasError = false;

        $('.error-input').hide();
        $('.input').css('border', '');

        let dateTimeInput = $('#dateTimeReserve');
        let errorInput = dateTimeInput.closest('.reserve__input--time').find('.error-input');

        if (!dateTimeInput.val()) {
            errorInput.show();
            dateTimeInput.css('border', '1px solid red');
            hasError = true;
        }

        let fields = ['#name', '#number'];
        fields.forEach(function (field) {
            let input = $(field);
            if (!input.val()) {
                input.next('.error-input').show();
                input.css('border', '1px solid red');
                hasError = true;
            }
        });

        if (!hasError) {
            let formData = {
                name: $('#name').val(),
                number: $('#number').val(),
                dateReserve: $('#dateTimeReserve').val(),
            };

            $.ajax({
                type: 'POST',
                url: 'https://testologia.ru/checkout',
                data: formData,
                success: function (response) {
                    if (response.success === 1) {
                        alert('Возникла ошибка при бронировании, позвоните нам и сделайте заказ');
                    } else if (response.success === 0) {
                        $('.reserve__container form').hide();
                        $('.reserve__text').hide();
                        $('.reserve__title').text('Спасибо, мы свяжемся с вами в ближайшее время!');
                    }
                },
                error: function () {
                    alert('Произошла ошибка при отправке запроса. Пожалуйста, попробуйте позже.');
                },
            });
        }
    });
});
