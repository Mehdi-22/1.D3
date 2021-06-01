/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.8 - Activity: Your first visualization!
 */
var margin = { left: 100, right: 10, top: 10, bottom: 150 };
var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//X Label

g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 80)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");


// Y Label

g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

d3.json("data/revenues.json").then(function(data) {
    console.log(data);
    data.forEach(function(d) { d.revenue = +d.revenue; });

    var x = d3.scaleBand()
        .domain(data.map(function(d) {
            return d.month;
        }))
        .range([0, width])
        .paddingInner(0.5)
        .paddingOuter(0.8);

    var y = d3.scaleLinear().domain([0, d3.max(data, function(d) {
            return d.revenue;
        })])
        .range([height, 0]);

    var xAxisCall = d3.axisBottom(x);

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

    var yAxisCall = d3.axisLeft(y)
        .ticks()
        .tickFormat(function(d) {
            return d + " $";
        });

    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    var rects = g.selectAll("rect").data(data)
        .enter()
        .append("rect")
        .attr("y", function(d) {
            return y(d.revenue);
        })
        .attr("x", function(d) {
            return x(d.month);
        })
        .attr("width", x.bandwidth)
        .attr("height", function(d) {
            return height - y(d.revenue);
        })
        .attr("fill", function(d) {
            return "red";
        });
})