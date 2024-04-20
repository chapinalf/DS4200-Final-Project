// Define data
let data = [
  { name: 0    , rating: 97.54082505931740 },
  { name: 1    , rating: 137.32505979760800 },
  { name: 2   , rating: 178.29982223401400 },
  { name: 3, rating: 187.13135135135100 },
  { name: 9  , rating: 95.0 },
  { name: 10  , rating: 108.805 }
];

// Create SVG
let width = 600, height = 400;

let margin = {
  top: 30, 
  bottom: 60, // Increased bottom margin to accommodate x-axis label
  left: 60,   // Increased left margin to accommodate y-axis label
  right: 30
};

let svg = d3.select('body')
  .append('svg')  
  .attr('width', width)
  .attr('height', height)
  .style('background', '#e9f7f2');

// Make the y axis 
let yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.rating)])
  .range([height - margin.bottom, margin.top]);

let yAxis = svg.append('g') 
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft().scale(yScale));

// Add y axis title
svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -height / 2)
  .attr('y', margin.left / 2)
  .attr('text-anchor', 'middle')
  .style('font-size', '14px')
  .text('Average Daily Rate')
  .style('fill', 'blue'); // Change color of y-axis title

// Make the x axis
let xScale = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([margin.left, width - margin.right])
  .padding(0.5);

let xAxis = svg.append('g')
  .attr('transform', `translate(0, ${height - margin.bottom})`)
  .call(d3.axisBottom().scale(xScale));

// Add x axis title
svg.append('text')
  .attr('x', width / 2)
  .attr('y', height - margin.bottom / 3) // Adjust position of x-axis title
  .attr('text-anchor', 'middle')
  .style('font-size', '14px')
  .text('# of Kids')
  .style('fill', 'red'); // Change color of x-axis title

// Add gradient to bars
let colorScale = d3.scaleLinear()
  .domain([0, data.length])
  .range(['#FFC107', '#FF5722']); // Gradient colors from yellow to red

let bar = svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', d => xScale(d.name))
  .attr('y', d => yScale(d.rating))
  .attr('width', xScale.bandwidth())
  .attr('height', d => height - margin.bottom - yScale(d.rating))
  .style('fill', (d, i) => colorScale(i));
