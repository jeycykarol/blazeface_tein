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

async function findFaces() {
    const model = await blazeface.load();

    const returnTensors = false;
    const predictions = await model.estimateFaces(img, returnTensors);

    console.log(predictions);

    ctx.drawImage(img, 0, 0, img.width, img.height);

    if (predictions.length > 0) {

        predictions.forEach(element => {
            console.log(element);
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "red";

            ctx.rect(
                element.topLeft[0], element.topLeft[1],
                element.bottomRight[0] - element.topLeft[0],
                element.bottomRight[1] - element.topLeft[1],
            );
            ctx.stroke();

            ctx.fillStyle = "red";
            element.landmarks.forEach((landmark) => {
                ctx.fillRect(landmark[0], landmark[1], 5, 5);
            });
        });
    }

}
async function calcularDistancia() {
    let situ_dist_certa = true;


}