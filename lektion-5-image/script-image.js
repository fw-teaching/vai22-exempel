

//const readImg = (image) => {
function readImg(image) {
  console.log(image);

  image.onload = () => {
    console.log("loaded");

    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext("2d");

    canvas.height = image.height;
    canvas.width = image.width;

    context.drawImage(image, 0, 0);

    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);

    console.log(imgData);
    console.log(imgData.data.slice(0,4*10));
    
    const d = imgData.data.slice(0,4*10); // arrayen med pixeldata
    const colorData =  []; // ex. colorData[0] = { b: 163, g: 162, r: 158}
    const rgbData = { r: [], g: [], b: [] };

    for (let i = 0; i < d.length; i+=4) {
      console.log(i)
      colorData.push({
        r: d[i],
        g: d[i+1],
        b: d[i+2]
        //a: d[i+3]
      });

      rgbData.r.push(d[i]);
      rgbData.g.push(d[i+1]);
      rgbData.b.push(d[i+2]);
    }

    console.log(colorData)
    console.log(rgbData)
  }
}

readImg(document.querySelector('#orig-img'));

