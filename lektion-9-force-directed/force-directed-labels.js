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
        target: data[i].links[j], // t.ex. "bole"  
        traffic: data[i].volume / 2 // Påhittat värde för mängden trafik
      })
    }
  }

  //console.log({nodes: data, links: edges})
  
  createLabeledGraph({
    nodes: data, 
    links: edges
  });

})();

function createLabeledGraph(data) {
  console.log("LABELS!")
  // Källa för boilerplate: https://www.pluralsight.com/guides/creating-force-layout-graphs-in-d3

  const simulation = d3.forceSimulation(data.nodes)
    // charge: "laddning", nodernas attraktionskraft. 
    // Om den är negativ skjuter den noderna ifrån varandra
    .force('charge', d3.forceManyBody().strength(-100))
    .force('link', d3.forceLink(data.links).id(d => d.id)
      .distance(70))
    .force('center', d3.forceCenter(width/2, height/2)) // Nodernas mittpunkt i medeltal

  const svg = d3.select("#chart-labels").append('svg')
    .style('background', 'aliceblue')
    // Responsiv SVG med viewBox!
    .attr("viewBox", [0, 0, width, height]);

  const link = svg
    .selectAll('path.link')
    .data(data.links)
    .enter()
      .append('path')
      .attr('stroke', 'teal')
      .attr('stroke-width', d => d.traffic * 0.3)
      .attr('fill', 'none');

  const node = svg.selectAll('myNodes')
    .data(data.nodes)
    .enter()
      .append('g') // Group för att kunna flytta på flera element samtidigt
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
          tooltip.style('display', 'none');
        })
        .on('end', (event, d) => {
          d.fx = null;
          d.fy = null;
          if (!event.active) simulation.alphaTarget(0);
        })
      )
      .style('cursor', 'default')

  node.append('circle')
    .attr('r', d => d.volume/2+5)
    .attr('fill', 'white')
    .attr('stroke', 'crimson')

  // text-element i SVG
  node.append('text')
    .style('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('font-size', d => d.volume/5+8)
    .text(d => d.id)

  const lineGenerator = d3.line();

  // 'tick' är event för varje "frame" i animationen
  simulation.on('tick', () => {
    //node.attr('cx', d => d.x).attr('cy', d => d.y);
    node.attr('transform', d => `translate(${d.x}, ${d.y})`)

    link.attr('d', d => lineGenerator([
      [d.source.x, d.source.y],
      [d.target.x, d.target.y]])
    )

  });

}


