console.log("Json!")

// d3.json använde javascript fetch

//d3.json('https://raw.githubusercontent.com/fw-teaching/vai22-exempel/main/assets/json/currency.json')
d3.json('../assets/json/currency.json')
  .then(function (d) {
    console.log(d);
});

// "New school" asynkron programmering
async function getJson() {
  const d = await d3.json('../assets/json/currency.json');
  //console.log(d);
  createChart(d)
}
getJson();

function createChart(jsonData) {
  console.log(jsonData);

  const chartData = [];
  const xData = [];
  const dates = [];
  for (i in jsonData) {
    chartData.push(jsonData[i].avg);
    xData.push(i); // tillfälligt bara index på X-axeln
    dates.push(new Date(jsonData[i].date));
  }
  
  console.log(dates)
  const width = 500, 
    height = 300, 
    leftMargin = 40,
    bottomMargin = 20;
  
  /** Y-axeln */
  const domainMin = d3.min(chartData)*0.9;
  const domainMax = d3.max(chartData)*1.05;
  const scaleY = d3.scaleLinear() // Vi skapar variabeln scaleY för scaleLinear()-metoden
    .domain([domainMin, domainMax]) // Variationen inom vår datamängd
    .range([0, height]) // "Utrymmet", var domain 0 och max ska vara
  
  const yGuideScale = d3.scaleLinear()
    .domain([domainMin, domainMax])
    .range([height, 0])
  const yTicks = d3.axisLeft(yGuideScale).ticks(10) 

  /** X-axeln  */
  const scaleX = d3.scaleBand()
    .domain(dates)
    .range([0, width-leftMargin])
  const xGuideScale = d3.scaleTime()
    .domain([dates[0], dates[dates.length-1]])
    .range([0, width-leftMargin])
  const xTicks = d3.axisBottom(xGuideScale)
    .ticks(d3.timeWeek)

  const chart = d3.select('#chart')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .style('background', 'silver')
    .append('g')
      .attr('transform', 'translate('+leftMargin+',0)');

  chart.append('path')
    .datum(chartData)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 3)
      .attr('d', d3.line()
        .x((d, i) => scaleX(dates[i]))
        .y((d) => height - scaleY(d))
      )
      /* Old-school:
      .attr('d', d3.line()
        .x(function(d, i) {
          return i * barWidth + barMargin
        })
        .y(function(d) {
          return height - scaleY(d)
        })
      )*/

    d3.select("#chart svg").append("g")
        .attr('transform', 'translate('+leftMargin+',0)')
        .call(yTicks)

    d3.select("#chart svg").append("g")
      .attr('transform','translate('+leftMargin+','+ (height-bottomMargin) +')')
      .call(xTicks)
  
}
