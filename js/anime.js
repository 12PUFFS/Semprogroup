document.addEventListener('DOMContentLoaded', function() {
    const videoThumb = document.getElementById('videoThumb');
    const videoFullscreen = document.getElementById('videoFullscreen');
    const mainVideo = document.getElementById('mainVideo');
    const closeBtn = document.getElementById('closeBtn');
    
    // Открытие видео
    videoThumb.addEventListener('click', function() {
      videoFullscreen.style.display = 'flex';
      document.body.classList.add('video-open');
      
      // Пытаемся запустить автоматически
      mainVideo.muted = true; // Обязательно для автозапуска
      mainVideo.play().catch(e => {
        console.log('Автовоспроизведение заблокировано, включаем контролы');
        mainVideo.controls = true;
      });
    });
    
    // Закрытие видео
    function closeVideo() {
      videoFullscreen.style.display = 'none';
      document.body.classList.remove('video-open');
      mainVideo.pause();
      mainVideo.currentTime = 0;
      mainVideo.controls = false;
    }
    
    closeBtn.addEventListener('click', closeVideo);
    
    // Закрытие по клику вне видео
    videoFullscreen.addEventListener('click', function(e) {
      if (e.target === videoFullscreen) {
        closeVideo();
      }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeVideo();
      }
    });
  });