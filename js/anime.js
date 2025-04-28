document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    const videoThumb = videoContainer.querySelector('.video-thumb');
    const mainVideo = document.getElementById('mainVideo');
    
    videoThumb.addEventListener('click', function() {

      mainVideo.style.display = 'block';
      

      if (mainVideo.requestFullscreen) {
        mainVideo.requestFullscreen();
      } else if (mainVideo.webkitRequestFullscreen) {
        mainVideo.webkitRequestFullscreen();
      } else if (mainVideo.msRequestFullscreen) {
        mainVideo.msRequestFullscreen();
      }
      
      
      mainVideo.play().catch(e => {
        console.log('Автовоспроизведение заблокировано:', e);
        mainVideo.controls = true;
      });
      
      
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