
d3.select('#svg-title').text("SVG med D3");

const shapes = d3.select('#shapes')
  .append('svg')
    .attr('height', 300)
    .attr('width', 300)
    .style('background', 'LightSlateGray');

shapes.append('rect')
  .attr('x', 30)
  .attr('y', 30)
  .attr('height', 240)
  .attr('width', 240)  
  .style('fill', 'SandyBrown');

shapes.append('circle')
  .attr('cx', 150)
  .attr('cy', 150)
  .attr('r', 100)
  .attr('fill', 'PaleGreen');

shapes.append('rect') 
  .attr('x', 100)
  .attr('y', 100)
  .attr('height', 100)
  .attr('width', 100)  
  .style('fill', 'coral')
  .on('click', (event) => {
    console.log(d3.pointer(event));
    d3.select(event.currentTarget)
      .style('fill', 'black')
  });

function toggleLine() {

  if (!document.querySelector('#toggle-line')) {

    shapes.append('line')
      .attr('id', 'toggle-line')
      .attr('x1', 50)
      .attr('y1', 50)
      .attr('x2', 250)
      .attr('y2', 250)
      .attr('stroke', 'black')
      .style('stroke-width', 5);
   
  } else {
    shapes.select('#toggle-line').remove();
  }

}
