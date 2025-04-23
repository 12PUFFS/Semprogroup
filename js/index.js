document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Открытие модального окна
    openModalBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    });
    
    // Закрытие модального окна
    closeModalBtn.addEventListener('click', function() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Восстанавливаем скролл
    });
    
 

    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? '+7' : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
      });
    }
    
    // Отправка формы
    const callbackForm = document.querySelector('.callback-form');
    if (callbackForm) {
      callbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(callbackForm);
        const data = {};
        
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        console.log('Форма отправлена:', data);
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        callbackForm.reset();
      });
    }
  });