

const chartData =  [ 50, 25, 66, 73, 100, 10 ];
const width = 300, height = 300, barMargin = 5;
const barWidth = (width-barMargin)/chartData.length;

d3.select('#svg-title').text("Stolpdiagram");

const scaleY = d3.scaleLinear() // Vi skapar variabeln scaleY för scaleLinear()-metoden
  .domain([0, d3.max(chartData)]) // Variationen inom vår datamängd
  .range([0, height-20]) // "Utrymmet", var domain 0 och max ska vara

const chart = d3.select('#bars')
  .append('svg')
    .attr('height', height)
    .attr('width', width)
    .style('background', 'silver');

chart.selectAll('rect')
  .data(chartData).enter() // for each element in chartData
    .append('rect')
      .attr('x', (d, i) => {
        return i * barWidth + barMargin
      })
      .attr('y', (d) => height-scaleY(d)) // Vi får ett nytt värde för y från scaleY()
      .attr('height', (d) => scaleY(d))   // Vi får ett nytt värde för y från scaleY()
      .attr('width', barWidth-barMargin)
      .attr('fill', 'OrangeRed')


