// App.js
import React from 'react';
import './App.css';
import musicImage1 from './jass.png';
import musicImage2 from './swag.png'; // Nova imagem
import musicFile from './song.MP3';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      backgroundColor: '#ffffff', // Cor inicial do fundo
      currentImage: musicImage1, // Imagem atual
    };
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    // Define um intervalo para atualizar a cor de fundo enquanto o áudio está tocando
    this.intervalId = setInterval(this.updateBackgroundColor, 100);
  }

  componentWillUnmount() {
    // Limpa o intervalo quando o componente é desmontado
    clearInterval(this.intervalId);
  }

  updateBackgroundColor = () => {
    const audio = this.audioRef.current;
    // Se o áudio estiver tocando, atualiza a cor de fundo com base no tempo de áudio
    if (!audio.paused) {
      const currentTime = audio.currentTime;
      // Calcula a cor com base no tempo atual
      const hue = (currentTime * 10) % 360; // Ajuste o valor 10 conforme necessário para velocidade e alcance desejados
      const backgroundColor = `hsl(${hue}, 70%, 80%)`; // Usando HSL para criar cores vivas
      this.setState({ backgroundColor });
    }
  };

  toggleImage = () => {
    this.setState((prevState) => ({
      currentImage: prevState.currentImage === musicImage1 ? musicImage2 : musicImage1,
    }));
  };

  handleClick = () => {
    const audio = this.audioRef.current;

    if (this.state.isPlaying) {
      audio.pause();
      audio.currentTime = 0; // Resetando o áudio para o início
    } else {
      audio.play();
    }

    this.toggleImage(); // Alternando a imagem quando o botão é clicado
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  handleAudioEnded = () => {
    this.setState({ isPlaying: false });
    this.toggleImage(); // Voltando à imagem original quando a música termina
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: this.state.backgroundColor }}>
        <div className="container">
          <img
            className={this.state.isPlaying ? "music-image playing" : "music-image"}
            src={this.state.currentImage}
            alt="Music"
            onClick={this.handleClick}
          />
          <audio
            ref={this.audioRef}
            src={musicFile}
            onEnded={this.handleAudioEnded} // Evento chamado quando a música termina
          ></audio>
        </div>
      </div>
    );
  }
}

export default App;
