document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    const videoThumb = videoContainer.querySelector('.video-thumb');
    const mainVideo = document.getElementById('mainVideo');
    
    videoThumb.addEventListener('click', function() {
      // Показываем видео
      mainVideo.style.display = 'block';
      
      // Включаем полноэкранный режим
      if (mainVideo.requestFullscreen) {
        mainVideo.requestFullscreen();
      } else if (mainVideo.webkitRequestFullscreen) {
        mainVideo.webkitRequestFullscreen();
      } else if (mainVideo.msRequestFullscreen) {
        mainVideo.msRequestFullscreen();
      }
      
      // Запускаем воспроизведение
      mainVideo.play().catch(e => {
        console.log('Автовоспроизведение заблокировано:', e);
        mainVideo.controls = true;
      });
      
      // Обработчик выхода из полноэкранного режима
      function exitHandler() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          mainVideo.style.display = 'none';
          mainVideo.pause();
          mainVideo.currentTime = 0;
          document.removeEventListener('fullscreenchange', exitHandler);
          document.removeEventListener('webkitfullscreenchange', exitHandler);
          document.removeEventListener('MSFullscreenChange', exitHandler);
        }
      }
      
      document.addEventListener('fullscreenchange', exitHandler);
      document.addEventListener('webkitfullscreenchange', exitHandler);
      document.addEventListener('MSFullscreenChange', exitHandler);
    });
  });