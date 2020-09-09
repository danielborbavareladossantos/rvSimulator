/*
  Autor: Daniel dos Santos
  Data: 11/04/2020
  Observação: Classe que controla processamento de imagem
*/

class CamProcess {

    static actionAtiva = async () => {
        if (!Camera.isLigado()) {
            Camera.ativa();

            //espera camera ligar
            setTimeout(() => {
                
                //chama processamento a cada 10 frames
                window.setInterval(() => {
                    CamProcess.processaImagem();
                }, 10);

            }, 3000);

        } else {
            alert("Sua camera já esta ligada!");
        }
    };

    static actionDesativa = async () => {
        if (Camera.isLigado()) {
            Camera.desliga();
            clearInterval();
        } else {
            alert("Sua camera já esta desligada!");
        }
    };

    static processaImagem = () => {

        //desenha no canvas imagem original do video
        var context = Control.getSnapshot().getContext('2d');
        context.drawImage(Control.getPlayer(), 0, 0, Control.getSnapshot().width, Control.getSnapshot().height);

        //captura do canvas stream do video
        var imgData = context.getImageData(0, 0, Control.getSnapshot().width, Control.getSnapshot().height);
        
        //processa imagem
        CamProcess.deixaBranco(imgData);

        //coloca imagem processada em canvas novamente
        context.putImageData(imgData, 0, 0);

        //cria objeto na tela
        CamProcess.criaObjeto(imgData, context);

        //coloca imagem processada em canvas novamente
        // context.putImageData(imgData, 0, 0);

    };

    static deixaBranco = (imgData) => {
        var min = 128;
        var max = 255;
        for (var i = 0; i < imgData.data.length; i+=4) {

            //r
            if (
                imgData.data[i] > min && 
                imgData.data[i] < max && 
                imgData.data[i+1] < 62 && 
                imgData.data[i+2] < 62 
            )
                imgData.data[i] = 255;
            else
                imgData.data[i] = 0;

            //g
            if (imgData.data[i] == max)
                imgData.data[i+1] = 255;
            else
                imgData.data[i+1] = 0;

            //b
            if (imgData.data[i] == max)
                imgData.data[i+2] = 255;
            else
                imgData.data[i+2] = 0;

        }
    };

    static criaObjeto = (imgData, context) => {
        var array = CamProcess.setObjeto(imgData);
        var Xmax = Number.MIN_VALUE;
        var Xmin = Number.MAX_VALUE;
        var Ymax = Number.MIN_VALUE;
        var Ymin = Number.MAX_VALUE;
        array.forEach(element => {
            if (element.x > Xmax)
                Xmax = element.x;
            if (element.y > Ymax)
                Ymax = element.y;
            if (element.x < Xmin)
                Xmin = element.x;
            if (element.y < Ymin)
                Ymin = element.y;
        });
        context.fillStyle = "rgba(255, 0, 0, 0.4)";
        context.fillRect(Xmin, Ymin, Xmax-Xmin, Ymax-Ymin);
        if (build.game)
            build.game.setPositions(Xmax-Xmin, Ymax-Ymin);
    };

    static setObjeto = (imgData) => {
        var array = [];
        var nivel = 0;
        for (var i = 0; i < imgData.data.length; i+=4) {
            nivel = 0;
            if (imgData.data[i] == 255) {
                nivel++;
            }
            if (imgData.data[i+1] == 255) {
                nivel++;
            }
            if (imgData.data[i+2] == 255) {
                nivel++;
            }
            if (nivel >= 3) {
                var dados = CamProcess.getXYByIndex(i);
                array.push(dados);
            }
        }
        return array;
    };

    static getXYByIndex = ( i ) => {
        var width = Control.getSnapshot().width;
        var randomPx = i/4;
        var x = randomPx % width;
        var y = (randomPx - x) / width;
        return {
            x: x,
            y: y
        };
    };

  }