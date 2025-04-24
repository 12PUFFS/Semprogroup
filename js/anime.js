document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const videoThumb = document.getElementById('videoThumb');
    const videoFullscreen = document.getElementById('videoFullscreen');
    const mainVideo = document.getElementById('mainVideo');
    const closeBtn = document.getElementById('closeBtn');
    const videoSource = mainVideo.querySelector('source');
    
    // Инициализация
    gsap.set(videoFullscreen, {
        display: 'none',
        opacity: 0,
        scale: 0.95
    });

    // Отключаем предзагрузку видео
    mainVideo.removeAttribute('src');
    videoSource.removeAttribute('src');
    mainVideo.load();
    
    // Показываем контролы только после загрузки
    mainVideo.controls = false;
  
    // Функция для полноэкранного режима
    async function openFullscreen() {
        try {
            if (videoFullscreen.requestFullscreen) {
                await videoFullscreen.requestFullscreen();
            } else if (videoFullscreen.webkitRequestFullscreen) {
                await videoFullscreen.webkitRequestFullscreen();
            }
        } catch (e) {
            console.error("Fullscreen error:", e);
        }
    }
  
    // Открытие видео
    videoThumb.addEventListener('click', async function() {
        // Устанавливаем источник только при первом клике
        if (!videoSource.src) {
            const videoSrc = videoThumb.dataset.videoSrc;
            videoSource.src = videoSrc;
            mainVideo.load();
            
            // Ждем готовности видео
            await new Promise((resolve) => {
                mainVideo.oncanplaythrough = resolve;
            });
        }
        
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
                await openFullscreen();
                mainVideo.controls = true; // Показываем контролы после открытия
            }
        });
    
        // Пытаемся запустить видео
        try {
            // Сначала пробуем со звуком
            mainVideo.muted = false;
            await mainVideo.play().catch(async (e) => {
                // Если не получилось - пробуем без звука
                console.log('Автовоспроизведение со звуком заблокировано');
                mainVideo.muted = true;
                await mainVideo.play();
            });
        } catch (e) {
            console.error('Ошибка воспроизведения:', e);
        }
    });
  
    // Закрытие видео
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
                mainVideo.controls = false;
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
  
    // Следим за выходом из полноэкранного режима
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            closeVideo();
        }
    });
});