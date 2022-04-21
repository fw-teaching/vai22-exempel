console.log("hello");

// Namnlös funktion som anropas genast
(async () => {

  const data = await d3.json('../assets/json/graphData.json');

  const edges = [];
  for (i in data) { // Samma sak som: for (let i = 0; i < data.length; i++)
   // console.log(data[i])

    for (j in data[i].links) {
      edges.push({
        source: data[i].id, // t.ex. "gumt"
        target: data[i].links[j] // t.ex. "bole"  
      })
    }
  }

  //console.log({nodes: data, links: edges})
  
  createGraph({
    nodes: data, 
    links: edges
  });

})();

const width = 600, height = 600;

function createGraph(data) {
  // Källa för boilerplate: https://www.pluralsight.com/guides/creating-force-layout-graphs-in-d3

  const tooltip = d3.select("#chart").append('div')
    .attr('id', 'tooltip')
    .style('position', 'absolute')
    .style('display', 'none')

  const simulation = d3.forceSimulation(data.nodes)
    // charge: "laddning", nodernas attraktionskraft. 
    // Om den är negativ skjuter den noderna ifrån varandra
    .force('charge', d3.forceManyBody().strength(-100))
    .force('link', d3.forceLink(data.links).id(d => d.id)
      .distance(70))
    .force('center', d3.forceCenter(width/2, height/2)) // Nodernas mittpunkt i medeltal

  const svg = d3.select("#chart").append('svg')
    .style('background', 'aliceblue')
    // Responsiv SVG med viewBox!
    .attr("viewBox", [0, 0, width, height]);

  const link = svg
    .selectAll('path.link')
    .data(data.links)
    .enter()
      .append('path')
      .attr('stroke', 'black')
      .attr('fill', 'none');

  const node = svg.selectAll('circle')
    .data(data.nodes)
    .enter()
      .append('circle')
        .attr('r', d => d.volume/2+5)
        .attr('fill', 'white')
        .attr('stroke', 'crimson')
      .on('mouseover', showTooltip)
      .on('mouseout', () => {
        tooltip.style('display', 'none')
      })

  const lineGenerator = d3.line();

  // 'tick' är event för varje "frame" i animationen
  simulation.on('tick', () => {
    node.attr('cx', d => d.x)
      .attr('cy', d => d.y);

    link.attr('d', d => lineGenerator([
      [d.source.x, d.source.y],
      [d.target.x, d.target.y]])
    )

  });

  function showTooltip(event, d) {
    console.log(d)
    // När vi använder viewBox måste vi räkna ut positionen
    const realWidth = svg.style('width').replace("px", "");
    const coefficient = realWidth / width;
    tooltip.style('display', 'block')
      .style('left', d.x * coefficient + 30 + "px")
      .style('top', d.y * coefficient + "px")
    tooltip.html(d.name)
  }


  //return svg.node();

}


