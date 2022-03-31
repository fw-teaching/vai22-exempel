
d3.select('#svg-title').text("Paint!");

const paint = d3.select('#paint-area')
  .append('svg')
    .attr('height', 300)
    .attr('width', 300)
    .style('background', 'white')
    .on('mousemove mousedown', (event) => {
      if (event.buttons == 1) {
        dot(d3.pointer(event)); // returnerar array med [ x, y ]
      }
    });

// function dot(xy) {   <== samma sak!
const dot = (xy) => {
  paint.append('circle')
  .attr('cx', xy[0])
  .attr('cy', xy[1])
  .attr('r', document.querySelector('#size').value)
  .style('fill', document.querySelector('#color').value)
}


