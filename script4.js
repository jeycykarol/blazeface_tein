const canvas = document.body.appendChild(document.createElement("canvas"));
const ctx = canvas.getContext("2d");

async function main() {
    const img = document.getElementById("img");
    const model = await blazeface.load();
    const returnTensors = false;
    const predictions = await model.estimateFaces(img, returnTensors);
    const rostos_lindos = [];

    if (predictions.length > 0) {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.lineWidth = 4;
        ctx.fillStyle = "red";
        for (let i = 0; i < predictions.length; i++) {
            const start = predictions[i].topLeft;
            const end = predictions[i].bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];

            ctx.fillRect(start[0], start[1], size[0], size[1]);

            rostos_lindos.push({
                topLeft: [start[0], start[1]],
                bottomRight: [end[0], end[1]],
            });
        }
    }
    return rostos_lindos;
}
main();