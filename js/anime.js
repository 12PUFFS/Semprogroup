\document.addEventListener('DOMContentLoaded', function() {
    const videoThumb = document.getElementById('videoThumb');
    const videoFullscreen = document.getElementById('videoFullscreen');
    const closeBtn = document.getElementById('closeBtn');
    
    // 1. Создаем видео ТОЛЬКО при клике
    let mainVideo = null;
    let videoLoaded = false;

    // 2. Настройка анимаций
    gsap.set(videoFullscreen, {
        display: 'none',
        opacity: 0,
        scale: 0.95
    });

    // 3. Функция создания видео элемента
    function createVideoElement() {
        if (mainVideo) return mainVideo;
        
        const video = document.createElement('video');
        video.id = 'mainVideo';
        video.controls = true;
        
        const source = document.createElement('source');
        source.src = videoThumb.dataset.videoSrc;
        source.type = 'video/mp4';
        
        video.appendChild(source);
        document.querySelector('.video-wrapper').appendChild(video);
        
        return video;
    }

    // 4. Открытие видео
    videoThumb.addEventListener('click', async function() {
        // Создаем элемент только при первом клике
        if (!mainVideo) {
            mainVideo = createVideoElement();
        }
        
        // Показываем контейнер
        gsap.set(videoFullscreen, { display: 'flex' });
        
        // Анимация
        gsap.to(videoFullscreen, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            onComplete: async () => {
                if (!videoLoaded) {
                    await mainVideo.play().catch(e => {
                        mainVideo.muted = true;
                        return mainVideo.play();
                    });
                    videoLoaded = true;
                }
            }
        });
    });

    // 5. Закрытие видео
    async function closeVideo() {
        gsap.to(videoFullscreen, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                videoFullscreen.style.display = 'none';
                if (mainVideo) {
                    mainVideo.pause();
                    mainVideo.currentTime = 0;
                }
            }
        });
    }

    // Обработчики закрытия
    closeBtn.addEventListener('click', closeVideo);
    videoFullscreen.addEventListener('click', e => e.target === videoFullscreen && closeVideo());
    document.addEventListener('keydown', e => e.key === 'Escape' && closeVideo());
});