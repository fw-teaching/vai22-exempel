
d3.select('#svg-title').text("SVG med D3");

d3.select('body')
  .append('div')
    .text('Morjens')
    .style('color', 'red')
    .style('font-size', '2em')
    .style('opacity', 0)
    .transition()
      .duration(2000)
      .style('opacity', 1);

const shapes = d3.select('#shapes')
  .append('svg')
    .attr('height', 300)
    .attr('width', 300)
    .style('background', 'LightSlateGray')

shapes.append('rect')
  .attr('x', 30)
  .attr('y', 30)
  .attr('height', 240)
  .attr('width', 240)  
  .style('fill', 'SandyBrown')