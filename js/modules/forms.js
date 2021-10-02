function forms() {
    //forms

    const forms = document.querySelectorAll('form');
    const message =  {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };


    forms.forEach(item =>{
        bindPostData(item);
    });

    const postData = async(url, data) =>{
        const res = await fetch (url, {
            method: "POST",
                headers: {
                    'Content-type':'application/json'
                },
                body: data

            });
            return await res.json();
    };

    function bindPostData (form){
        form.addEventListener('submit', (e) =>{
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            ;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend',statusMessage);

            

            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json )
            
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                
                tatusMessage.remove();})
                .catch(() =>{
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
            });


  
        });
    }

    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = 'modal__content'>
                <div class = 'modal__close' data-close>&times;</div>
                <div class = 'modal__title'>${message}</div> 
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWraper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWraper).width;
    
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWraper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
    dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;

    slider.append(indicators);

    for(let i = 0; i < slides.length; i++ ){
        const dot = document.createElement('li');
        
        dot.setAttribute('data-slideto', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i == 0){
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () =>{

        if(offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        }else {
            offset += deleteNotDigits(width);
        }


        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });


    prev.addEventListener('click', () =>{
        if(offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        }else {
            offset -= deleteNotDigits(width);
        }


        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }



        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slideto');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1); 

            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slides.length < 10){
                current.textContent = `0${slideIndex}`;
            }else{
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });


}

module.exports = forms;