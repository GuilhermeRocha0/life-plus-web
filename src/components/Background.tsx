import { useTheme } from "styled-components";
import { BackgroundVideo } from "../styles/Styles";

export default function Background() {
  const theme = useTheme();

  // decide o vídeo de acordo com o tema atual
  const isDarkMode = theme.background === "#121212";
  const videoSrc = isDarkMode
    ? "/videos/fundoDark.webm"
    : "/videos/fundo.webm";

  return (
    <BackgroundVideo
      key={isDarkMode ? "dark" : "light"} // força o React a recriar o elemento <video>
      preload="auto"
      autoPlay
      loop
      muted
      playsInline
      onEnded={(e) => {
        const video = e.target as HTMLVideoElement;
        video.currentTime = 0;
        video.play();
      }}
    >
      <source src={videoSrc} type="video/webm" />
      Seu navegador não suporta vídeos em HTML5.
    </BackgroundVideo>
  );
}
