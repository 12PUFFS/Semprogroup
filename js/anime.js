document.addEventListener('DOMContentLoaded', function() {
    const videoThumb = document.getElementById('videoThumb');
    const videoFullscreen = document.getElementById('videoFullscreen');
    const mainVideo = document.getElementById('mainVideo');
    const closeBtn = document.getElementById('closeBtn');
    const videoSource = mainVideo.querySelector('source');
    
    // 1. Полностью удаляем предзагрузку видео
    videoSource.removeAttribute('src');
    mainVideo.load();
    
    // 2. Инициализация анимации
    gsap.set(videoFullscreen, {
        display: 'none',
        opacity: 0,
        scale: 0.95
    });

    // 3. Контролы включаем только после загрузки
    mainVideo.controls = false;
  
    // Функция для полноэкранного режима
    async function openFullscreen() {
        try {
            await videoFullscreen.requestFullscreen?.() || 
                  videoFullscreen.webkitRequestFullscreen?.();
        } catch (e) {
            console.error("Fullscreen error:", e);
        }
    }
  
    // Обработчик клика на миниатюру
    videoThumb.addEventListener('click', async function() {
        // 4. Загружаем видео только при первом клике
        if (!videoSource.src) {
            videoSource.src = videoThumb.dataset.videoSrc;
            mainVideo.load();
            
            await new Promise(resolve => {
                mainVideo.oncanplay = resolve;
                mainVideo.onerror = resolve; // На случай ошибки
            });
        }
        
        // 5. Анимация открытия
        gsap.to(videoFullscreen, {
            display: 'flex',
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            onComplete: async () => {
                mainVideo.controls = true;
                await openFullscreen();
            }
        });
    
        // 6. Пытаемся воспроизвести
        try {
            mainVideo.muted = false;
            await mainVideo.play().catch(() => {
                mainVideo.muted = true;
                return mainVideo.play();
            });
        } catch (e) {
            console.error('Playback error:', e);
        }
    });
  
    // Функция закрытия
    async function closeVideo() {
        if (document.fullscreenElement) {
            await document.exitFullscreen?.();
        }
        
        gsap.to(videoFullscreen, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                videoFullscreen.style.display = 'none';
                mainVideo.pause();
                mainVideo.currentTime = 0;
                mainVideo.controls = false;
            }
        });
    }
  
    // Обработчики закрытия
    closeBtn.addEventListener('click', closeVideo);
    videoFullscreen.addEventListener('click', e => e.target === videoFullscreen && closeVideo());
    document.addEventListener('keydown', e => e.key === 'Escape' && closeVideo());
    document.addEventListener('fullscreenchange', () => !document.fullscreenElement && closeVideo());
});