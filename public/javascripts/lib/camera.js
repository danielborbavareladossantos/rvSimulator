/*
  Autor: Daniel dos Santos
  Data: 11/04/2020
  Observação: Classe que controla camera.
*/

class Camera {

  constructor() {
    this.videoTracks = null;
    this.ligado = false;
  }

  static ativa = async () => {
    this.ligado = true;
    var stream = await navigator.mediaDevices.getUserMedia({video: this.ligado});
    Control.getPlayer().srcObject = stream;
    this.videoTracks = stream.getVideoTracks();
  };

  static desliga = async () => {
    this.ligado = false;
    this.videoTracks.forEach((track) => {track.stop()});
  };

  static isLigado = () => {
    return this.ligado;
  };

  static getVideoTracks = () => {
    return this.videoTracks;
  };
  
}