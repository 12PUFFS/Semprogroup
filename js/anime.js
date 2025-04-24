document.addEventListener('DOMContentLoaded', function() {
    const videoThumb = document.getElementById('videoThumb');
    const videoFullscreen = document.getElementById('videoFullscreen');
    const mainVideo = document.getElementById('mainVideo');
    const closeBtn = document.getElementById('closeBtn');
    
    // Инициализация
    gsap.set(videoFullscreen, {
      display: 'none',
      opacity: 0,
      scale: 0.95
    });
  
    // Всегда показываем контролы
    mainVideo.controls = true;
  
    // Функция для входа в полноэкранный режим
    async function openFullscreen() {
      try {
        if (videoFullscreen.requestFullscreen) {
          await videoFullscreen.requestFullscreen();
        } else if (videoFullscreen.webkitRequestFullscreen) {
          await videoFullscreen.webkitRequestFullscreen();
        } else if (videoFullscreen.msRequestFullscreen) {
          await videoFullscreen.msRequestFullscreen();
        }
      } catch (e) {
        console.error("Fullscreen error:", e);
      }
    }
  
    // Открытие видео
    videoThumb.addEventListener('click', async function() {
      // Показываем контейнер
      gsap.set(videoFullscreen, { display: 'flex' });
      document.body.classList.add('video-open');
      
      // Анимация появления
      gsap.to(videoFullscreen, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        onComplete: async () => {
          // После анимации - полноэкранный режим
          await openFullscreen();
        }
      });
  
      // Пытаемся запустить видео со звуком
      try {
        // Сначала устанавливаем muted в false
        mainVideo.muted = false;
        
        // Попытка воспроизведения (может потребоваться взаимодействие пользователя)
        const playPromise = mainVideo.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Если воспроизведение со звуком запрещено, пробуем с muted
            console.log('Автовоспроизведение со звуком заблокировано, пробуем с muted');
            mainVideo.muted = true;
            mainVideo.play();
          });
        }
      } catch (e) {
        console.log('Ошибка воспроизведения:', e);
      }
    });
  
    // Функция закрытия
    async function closeVideo() {
      // Выход из полноэкранного режима
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch (e) {
          console.error("Exit fullscreen error:", e);
        }
      }
      
      // Анимация закрытия
      gsap.to(videoFullscreen, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          videoFullscreen.style.display = 'none';
          document.body.classList.remove('video-open');
          mainVideo.pause();
          mainVideo.currentTime = 0;
          // Восстанавливаем звук при следующем открытии
          mainVideo.muted = false;
        }
      });
    }
  
    // Обработчики закрытия
    closeBtn.addEventListener('click', closeVideo);
    
    videoFullscreen.addEventListener('click', function(e) {
      if (e.target === videoFullscreen) {
        closeVideo();
      }
    });
  
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeVideo();
      }
    });
  
    // Обработчик изменения полноэкранного режима
    document.addEventListener('fullscreenchange', function() {
      if (!document.fullscreenElement) {
        closeVideo();
      }
    });
});