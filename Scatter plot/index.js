


// D3 graphic Bar chart

let dataLink = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

/*Data sample
{
  "Time": "38:14",
  "Place": 7,
  "Seconds": 2294,
  "Name": "Miguel Indurain",
  "Year": 1995,
  "Nationality": "ESP",
  "Doping": "1994 Failed test for salbutemol, not a banned drug at that time",
  "URL": "http://www.independent.co.uk/sport/drugs-in-sport-indurain-allowed-to-use-banned-drug-1379584.html"
}*/

// Asynchronous data fetching;
document.addEventListener("DOMContentLoaded", () => {
  fetch(dataLink).
  then(res => res.json()).
  then(data => {
    display(data);
  }).
  catch(err => console.error(err));
});

function display(dataset) {
  let sectionWidth = parseFloat(document.querySelector("section").offsetWidth);
  let [h, w, padding] = [250, 400, 40];
  // Change the width according to viewport section
  if (sectionWidth < w) {
   w = sectionWidth - 2 * padding;}

  let availableWidth = w - 2 * padding;
  let availableHeigth = h - 2 * padding;
  let barWidth = availableWidth / dataset.length;

  const [mainColor, redColor, yellowColor, greenColor] = ["#020202", "#f00", "yellow", "#0f0"];

  //Setting the scale
  let timeParserX = d3.timeParse("%Y");
  let datesX = dataset.map(d => timeParserX(d.Year));

  const xScale = d3.scaleTime()
  .domain(d3.extent(datesX))
  .range([0, availableWidth]);

let timeParserY = d3.timeParse("%M:%S");
let count = dataset.map(d => timeParserY(d.Time));

  const yScale = d3.scaleTime().
  domain(d3.extent(count)).
  range([availableHeigth, 0]);

  const svg = d3.select("#scatter-plot").
  append("svg").
  attr("class", "svg-plot").
  attr("width", w).
  attr("height", h);


  svg.append("title").
  text("Cycling").
  attr("x", w / 2).
  attr("y", 7).
  attr("text-anchor", "middle").
  attr("fill", "darkgray").
  attr("id", "title").
  style("font-size", 10);

  let tooltip = svg.append("text").
  style("position", "relative").
  attr("id", "tooltip").
  style("opacity", 0);

  // Rectangle element for data-key-name
  svg.selectAll("circle.dot").
  data(dataset).
  enter().
  append("circle").
  attr("r", 1).
  attr("cx", (d) => xScale(timeParserX(d.Year))+ padding).
  attr("cy", d => yScale(timeParserY(d.Time)) + padding).
  attr("fill", `${mainColor}`).
  attr("class", "dot").
  attr("data-xvalue", d => d.Year).
  attr("data-yvalue", d => d.Time)/*.
  on("mouseover", (d, i) => {

    let rect = event.target;
    let position = rect.getBoundingClientRect();

    //Tooltip setting
    tooltip.transition().duration(150).style("opacity", .9).
    attr("data-date", rect.getAttribute("data-date")).
    attr("x", rect.getAttribute("x")).
    attr("y", rect.getAttribute("y")).
    text(`${rect.getAttribute("data-gdp")} Billions`);
  }).
  on('mouseout', d => {
    tooltip.transition().duration(500).style("opacity", 0);
  })*/;

  // Setting the bottom axis
  const xAxis = d3.axisBottom(xScale);

  svg.append("g").
  attr("transform", `translate(${padding},${availableHeigth + padding})`).
  attr("id", "x-axis").
  call(xAxis);

  const yAxis = d3.axisLeft(yScale);

  svg.append("g").
  attr("transform", `translate(${padding},${padding})`).
  attr("id", "y-axis").
  call(yAxis);

  svg.select("#x-axis").selectAll("text").
  attr("class", "tick");

  svg.select("#y-axis").selectAll("text").
  attr("class", "tick");
}
