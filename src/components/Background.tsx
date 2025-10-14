import { BackgroundVideo } from '../styles/Styles';
export default function Background (){

  
    return (

      
    <BackgroundVideo preload="auto" autoPlay loop muted playsInline
    onEnded={(e) => {
    const video = e.target as HTMLVideoElement;
    video.currentTime = 0;
    video.play();
  }}>
                <source src="/videos/fundo.webm" type="video/webm" />
                Seu navegador não suporta vídeos em HTML5.
              </BackgroundVideo>
    
    );
}