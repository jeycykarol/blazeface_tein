let img = document.getElementById("img");
let canvas = document.body.appendChild(document.createElement("canvas"));
let ctx = canvas.getContext("2d");
const message = document.querySelector('.status');
const messages = {
    alerta: 'Alerta! Não está ocorrendo o distanciamento de 1,5 metros!',
    situ_dist_certa: 'Ótimo! Está com distanciamento de 1,5 metros!'
}
ctx.canvas.width = img.width;
ctx.canvas.height = img.height;

async function encontrarRostos() {
    const model = await blazeface.load();

    const returnTensors = false;
    const predictions = await model.estimateFaces(img, returnTensors);
    const rostos = [];
    console.log(predictions);

    ctx.drawImage(img, 0, 0, img.width, img.height);

    if (predictions.length > 0) {

        predictions.forEach(element => {
                console.log(element);
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = "yellow";

                ctx.rect(
                    element.topLeft[0], element.topLeft[1],
                    element.bottomRight[0] - element.topLeft[0],
                    element.bottomRight[1] - element.topLeft[1],
                );
                ctx.stroke();

                ctx.fillStyle = "yellow";
                element.landmarks.forEach((landmark) => {
                    ctx.fillRect(landmark[0], landmark[1], 5, 5);
                });
                for (let i = 0; i < predictions.length; i++) {
                    const start = predictions[i].topLeft;
                    const end = predictions[i].bottomRight;
                    const size = [end[0] - start[0], end[1] - start[1]];

                    context.fillRect(start[0], start[1], size[0], size[1]);

                    rostos.push({
                        topLeft: [start[0], start[1]],
                        bottomRight: [end[0], end[1]]
                    })
                }
            }
        }
    }