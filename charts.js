function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var samplesArray = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var selectedidsamples = samplesArray.filter(data => data.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = selectedidsamples[0];
 
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var  otu_ids = firstSample.otu_ids;
    var otu_labels = firstSample.otu_labels;
    var sample_values = firstSample.sample_values;
 
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last.
 
    var yticks =  otu_ids.slice(0,10).map(id => "OTU " + id).reverse();
    console.log(yticks)
 
    // 8. Create the trace for the bar chart.
    var barData = {
      x: sample_values.slice(0,10).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
        }
    };
    // 9. Create the layout for the bar chart.
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", [barData], barLayout);
 // });
//};


// Deliverable 2 BellyButton_Starter Code
// Bar and Bubble charts
// Create the buildCharts function.
//function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  //d3.json("samples.json").then((data) => {

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    //Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Rainbow"
        },
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: {title: "Bacterial ID"},
      yaxis: {title: "Species Name"},
      hovermode: "closest",
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  //});
//};



// Deliverable 3
// Create the buildChart function.
//function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  //d3.json("samples.json").then((data) => {
    //console.log(data);

    // Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var selectedidsamples = samplesArray.filter(data => data.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;

    // Create a variable that holds the first sample in the array.
    var metadataArray = metadata.filter(data => data.id == sample);  

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaresults = metadataArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var  otu_ids = firstSample.otu_ids;
    var otu_labels = firstSample.otu_labels;
    var sample_values = firstSample.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var wfreqs = metaresults.wfreq;
    // Create the yticks for the bar chart.
    //var yticks =  otu_ids.slice(0,10).map(id => "OTU " + id).reverse();

    // Use Plotly to plot the bar data and layout.
    //Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    //Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: {x: [0, 1], y: [0, 1]},
      value: wfreqs,
      title: {text: "Belly Button Washing Frequency</b><br>Scrubs per week"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
          axis: {range:[null, 10] },
          steps: [
            {range:[0,2], color:"lightcoral"},
            {range:[2,4], color:"lightsalmon"},
            {range:[4,6], color:"lemonchiffon"},
            {range:[6,8], color:"darkseagreen"},
            {range:[8,10], color:"skyblue"}
          ],
          bar: { color: "azure" }
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      automargin: true
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
