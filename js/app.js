$(function () {

    $('.header__menu-mobile').click(function (event) {
        $(this).toggleClass('_active');
        $('.header__menu').toggleClass('_active');
        $('.header__wrapper').toggleClass('_active');
        if ($(this).hasClass('_active')) {
            $('body').data('scroll', $(window).scrollTop());
        }
        $('body').toggleClass('_lock');
        if (!$(this).hasClass('_active')) {
            $('body,html').scrollTop(parseInt($('body').data('scroll')));
        }
    });

    $('.header__link, .header__phone').click(function (event) {
        $(this).toggleClass('_active');
        $('.header__menu').removeClass('_active');
        $('.header__menu-mobile').removeClass('_active');
        $('.header__wrapper').removeClass('_active');
        if ($(this).hasClass('_active')) {
            $('body').data('scroll', $(window).scrollTop());
        }
        $('body').removeClass('_lock');
        if (!$(this).hasClass('_active')) {
            $('body,html').scrollTop(parseInt($('body').data('scroll')));
        }
    });

    let mobileWrapper = document.querySelector('.header__wrapper')

    mobileWrapper.addEventListener("click", (e) => {
        if (e.target === mobileWrapper) {
            if (this) {
                $('.header__menu').removeClass('_active');
                $('.header__menu-mobile').removeClass('_active');
                $('.header__wrapper').removeClass('_active');

                $('body').removeClass('_lock');
                if (!$(this).hasClass('_active')) {
                    $('body,html').scrollTop(parseInt($('body').data('scroll')));
                }
            }
        }
    });

    function forms() {

        //FIELDS
        $('input,textarea').focus(function () {
            if ($(this).val() == $(this).attr('data-value')) {
                $(this).addClass('focus');
                $(this).parent().addClass('focus');
                if ($(this).attr('data-type') == 'pass') {
                    $(this).attr('type', 'password');
                };
                $(this).val('');
            };
            removeError($(this));
        });
        $('input[data-value], textarea[data-value]').each(function () {
            if (this.value == '' || this.value == $(this).attr('data-value')) {
                this.value = $(this).attr('data-value');
                if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
                    $(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
                }
            }
            if (this.value != $(this).attr('data-value') && this.value != '') {
                $(this).addClass('focus');
                $(this).parent().addClass('focus');
                if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
                    $(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
                }
            }

            $(this).click(function () {
                if (this.value == $(this).attr('data-value')) {
                    if ($(this).attr('data-type') == 'pass') {
                        $(this).attr('type', 'password');
                    };
                    this.value = '';
                };
            });
            $(this).blur(function () {
                if (this.value == '') {
                    this.value = $(this).attr('data-value');
                    $(this).removeClass('focus');
                    $(this).parent().removeClass('focus');
                    if ($(this).attr('data-type') == 'pass') {
                        $(this).attr('type', 'text');
                    };
                };
            });
        });
    }
    forms();

    //VALIDATE FORMS
    $('form button[type=submit]').click(function () {
        var er = 0;
        var form = $(this).parents('form');
        var ms = form.data('ms');
        $.each(form.find('.req'), function (index, val) {
            er += formValidate($(this));

        });
        if (er == 0) {

            sendForm();
            removeFormError(form);

            if (ms != null && ms != '') {
                showMessageByClass(ms);

                return false;
            }
        } else {
            return false;
        }
    });
    function formValidate(input) {
        var er = 0;
        var form = input.parents('form');
        if (input.attr('name') == 'email' || input.hasClass('email')) {
            if (input.val() != input.attr('data-value')) {
                var em = input.val().replace(" ", "");
                input.val(em);
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
                er++;
                addError(input);
            } else {
                removeError(input);
            }
        } else {
            if (input.val() == '' || input.val() == input.attr('data-value')) {
                er++;
                addError(input);
            } else {
                removeError(input);
            }
        }
        if (input.attr('type') == 'checkbox') {
            if (input.prop('checked') == true) {
                input.removeClass('err').parent().removeClass('err');
            } else {
                er++;
                input.addClass('err').parent().addClass('err');
            }
        }
        if (input.hasClass('name')) {
            if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
                er++;
                addError(input);
            }
        }
        if (input.hasClass('pass-2')) {
            if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
                addError(input);
            } else {
                removeError(input);
            }
        }
        return er;
    }

    function showMessageByClass(ms) {
        $('.popup').hide();
        popupOpen('message.' + ms, '');
    }

    function addError(input) {
        input.addClass('err');
        input.parent().addClass('err');
        input.parent().find('.form__error').remove();
        if (input.hasClass('email')) {
            var error = '';
            if (input.val() == '' || input.val() == input.attr('data-value')) {
                error = input.data('error');
            } else {
                error = input.data('error');
            }
            if (error != null) {
                input.parent().append('<div class="form__error">' + error + '</div>');
            }
        } else {
            if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
                input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
            }
        }
        if (input.parents('.select-block').length > 0) {
            input.parents('.select-block').parent().addClass('err');
            input.parents('.select-block').find('.select').addClass('err');
        }
    }


    function removeFormError(form) {
        form.find('.form__generalerror').hide().html('');
    }
    function removeError(input) {
        input.removeClass('err');
        input.parent().removeClass('err');
        input.parent().find('.form__error').remove();

        if (input.parents('.select-block').length > 0) {
            input.parents('.select-block').parent().removeClass('err');
            input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
            //input.parents('.select-block').find('.select-options').hide();
        }
    }

    $('._goto').click(function () {
        var el = $(this).attr('href').replace('#', '');
        var offset = 0;
        $('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

        if ($('.header__menu').hasClass('_active')) {
            $('.header__menu, .header__menu-mobile').removeClass('_active');
            $('body').removeClass('_lock');
        }
        return false;
    });

    $.each($('input.phone'), function (index, val) {
        $(this).attr('type', 'tel');
        $(this).focus(function () {
            $(this).inputmask('+7(999) 999 9999', {
                clearIncomplete: true, clearMaskOnLostFocus: true,
                "onincomplete": function () { maskclear($(this)); }
            });
            $(this).addClass('focus');
            $(this).parent().addClass('focus');
            $(this).parent().removeClass('err');
            $(this).removeClass('err');
        });
    });
    $('input.phone').focusout(function (event) {
        maskclear($(this));
    });
    $.each($('input.num'), function (index, val) {
        $(this).focus(function () {
            $(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function () { maskclear($(this)); } });
            $(this).addClass('focus');
            $(this).parent().addClass('focus');
            $(this).parent().removeClass('err');
            $(this).removeClass('err');
        });
    });

    $('input.num').focusout(function (event) {
        maskclear($(this));
    });

    function maskclear(n) {
        if (n.val() == "") {
            n.inputmask('remove');
            if (!n.hasClass('l')) {
                n.val(n.attr('data-value'));
            }
            n.removeClass('focus');
            n.parent().removeClass('focus');
        }
    }



    $('.timer').startTimer();


    var checked = true;
    var popupChecked = true;

    $('.checkbox__input').click(function () {
        if ($(this).prop("checked") == true) {
            checked = true;

        }
        if ($(this).prop("checked") == false) {
            checked = false;
        }
    });

    function sendBtn() {
        if (checked == true) {
            let name = $('#name').val();
            let phone = $('#phone').val();
            let email = $('#email').val();

            if (name.trim() != '' && phone.trim() != '' & email.trim() != '') {
                let th = $(this);
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: { name: name, phone: phone, email: email }
                }).done(function () {
                    setTimeout(function () {
                        $('form').trigger("reset");
                    }, 1000);
                });
                return false;
            }


        } else {
            $("checkbox-style").css({ "color": "#a31c06" });
            return false;
        }

    }

    function sendBtnPopup() {
        if (checked == true) {
            let name = $('#name-popup').val();
            let phone = $('#phone-popup').val();
            let email = $('#email-popup').val();
            if (name.trim() != '' && phone.trim() != '' & email.trim() != '') {
                let th = $(this);
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: { name: name, phone: phone, email: email }
                }).done(function () {
                    setTimeout(function () {
                        $('form').trigger("reset");
                    }, 1000);
                });
                return false;
            }

        } else {
            $("popup-checkbox-style").css({ "color": "#a31c06" });
            return false;
        }
    }



    function sendForm() {
        sendBtn();
        sendBtnPopup();
    }

    $('.close-modal').click(function () {
        $('.modal-ov').fadeOut(300);
    });

    $(document).mouseup(function (e) {
        var popup = $('.modal');
        if (popup.has(e.target).length === 0) {
            $('.modal-ov').fadeOut(300);
        }
    });

    $('.traffics__btn').click(function () {
        $('.new-ov').fadeIn(300);
        if ($(this).hasClass('cold')) {
            $('.intergrate').html('Заказать лендинг под холодный трафик');
        }
        if ($(this).hasClass('hot')) {
            $('.intergrate').html('Заказать лендинг под горячий трафик');
        }
    });

    $('.new-js-close-campaign').click(function () {
        $('.new-ov').fadeOut(300);
    });

    $(document).mouseup(function (e) {
        var popup = $('.new-ov');
        if (popup.has(e.target).length === 0) {
            $('.new-ov').fadeOut(300);
        }
    });





    "use strict";
    (function () {
        let originalPositions = [];
        let daElements = document.querySelectorAll('[data-da]');
        let daElementsArray = [];
        let daMatchMedia = [];
        if (daElements.length > 0) {
            let number = 0;
            for (let index = 0; index < daElements.length; index++) {
                const daElement = daElements[index];
                const daMove = daElement.getAttribute('data-da');
                if (daMove != '') {
                    const daArray = daMove.split(',');
                    const daPlace = daArray[1] ? daArray[1].trim() : 'last';
                    const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
                    const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
                    const daDestination = document.querySelector('.' + daArray[0].trim())
                    if (daArray.length > 0 && daDestination) {
                        daElement.setAttribute('data-da-index', number);
                        originalPositions[number] = {
                            "parent": daElement.parentNode,
                            "index": indexInParent(daElement)
                        };
                        daElementsArray[number] = {
                            "element": daElement,
                            "destination": document.querySelector('.' + daArray[0].trim()),
                            "place": daPlace,
                            "breakpoint": daBreakpoint,
                            "type": daType
                        }
                        number++;
                    }
                }
            }
            dynamicAdaptSort(daElementsArray);

            for (let index = 0; index < daElementsArray.length; index++) {
                const el = daElementsArray[index];
                const daBreakpoint = el.breakpoint;
                const daType = el.type;

                daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
                daMatchMedia[index].addListener(dynamicAdapt);
            }
        }

        function dynamicAdapt(e) {
            for (let index = 0; index < daElementsArray.length; index++) {
                const el = daElementsArray[index];
                const daElement = el.element;
                const daDestination = el.destination;
                const daPlace = el.place;
                const daBreakpoint = el.breakpoint;
                const daClassname = "_dynamic_adapt_" + daBreakpoint;

                if (daMatchMedia[index].matches) {
                    if (!daElement.classList.contains(daClassname)) {
                        let actualIndex = indexOfElements(daDestination)[daPlace];
                        if (daPlace === 'first') {
                            actualIndex = indexOfElements(daDestination)[0];
                        } else if (daPlace === 'last') {
                            actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
                        }
                        daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
                        daElement.classList.add(daClassname);
                    }
                } else {
                    if (daElement.classList.contains(daClassname)) {
                        dynamicAdaptBack(daElement);
                        daElement.classList.remove(daClassname);
                    }
                }
            }
        }

        dynamicAdapt();

        function dynamicAdaptBack(el) {
            const daIndex = el.getAttribute('data-da-index');
            const originalPlace = originalPositions[daIndex];
            const parentPlace = originalPlace['parent'];
            const indexPlace = originalPlace['index'];
            const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
            parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
        }
        function indexInParent(el) {
            var children = Array.prototype.slice.call(el.parentNode.children);
            return children.indexOf(el);
        }
        function indexOfElements(parent, back) {
            const children = parent.children;
            const childrenArray = [];
            for (let i = 0; i < children.length; i++) {
                const childrenElement = children[i];
                if (back) {
                    childrenArray.push(i);
                } else {
                    if (childrenElement.getAttribute('data-da') == null) {
                        childrenArray.push(i);
                    }
                }
            }
            return childrenArray;
        }
        function dynamicAdaptSort(arr) {
            arr.sort(function (a, b) {
                if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
            });
            arr.sort(function (a, b) {
                if (a.place > b.place) { return 1 } else { return -1 }
            });
        }
    }());



    $('.portfolio__item').click(function (event) {
        var i = $(this).data('filter');
        if (i == 1) {
            $('.portfolio__column').show();
        } else {
            $('.portfolio__column').hide();
            $('.portfolio__column.f_' + i).show();
        }
        $('.portfolio__item').removeClass('_active');
        $(this).addClass('_active');

        return false;
    });


    $.each($('.spoller.active'), function (index, val) {
        $(this).next().show();
    });
    $('body').on('click', '.spoller', function (event) {

        if ($(this).parents('.one').length > 0) {
            $(this).parents('.one').find('.spoller').not($(this)).removeClass('_active').next().slideUp(300);
            $(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('_active');
        }

        if ($(this).hasClass('closeall') && !$(this).hasClass('_active')) {
            $.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
                $(this).removeClass('_active');
                $(this).next().slideUp(300);
            });
        }
        $(this).toggleClass('_active').next().slideToggle(300, function (index, val) {
            if ($(this).parent().find('.slick-slider').length > 0) {
                $(this).parent().find('.slick-slider').slick('setPosition');
            }
        });
        return false;
    });

    $('._gallery').each(function() { 
        $(this).magnificPopup({
            delegate: 'a', 
            type: 'image',
            gallery: {
              enabled:true
            }
        });
    });


});
