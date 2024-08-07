// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    
    let metadata = data.metadata;

    let resultArray = metadata.filter(sampleObj =>sampleObj.id ==sample);

    let result = resultArray[0];

      // Filter the metadata for the object with the desired sample number
    
    let metadata_sample = metadata.filter(current_dict => current_dict.id == sample)[0]
      console.log(metadata_sample.length)


    // Use d3 to select the panel with id of `#sample-metadata`

    let panel = d3.select("#sample-metadata")

    for( i  in metadata_sample){

      console.log(i)

    }
    
    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.


    for (key in result){
      panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };
   // 

});
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sample_field = data.samples;


    // Filter the samples for the object with the desired sample number
    let resultArray2 = sample_field.filter(sampleObj =>sampleObj.id ==sample);

    let result2 = resultArray2[0];
    console.log(result2)

    // Get the otu_ids, otu_labels, and sample_values
    let out_ids = result2.otu_ids;
    let otu_labels = result2.otu_labels;
    let sample_values = result2.sample_values;
    // Build a Bubble Chart
   
  

    let trace1 = {
      x: out_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: out_ids,
        text: otu_labels
      }
    };
    
    let data2 = [trace1];


    let layout2 = {
      height: 600,
      width: 800,
      title: "Bacteria Cultures Per Sample",
      xaxis: {'title':"OTU ID"},
      yaxis: {'title':"Number of Bacteria"}
    };    
    // Render the Bubble Chart
    Plotly.newPlot('bubble',data2, layout2);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
   // console.log(out_ids)
    let otu_ids_ticks = out_ids.map(out_id => (`OTU ${out_id} `))
   
    
   

    // Build a Bar Chart


    let trace2 = [{
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids_ticks.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h'
    }];
    console.log(otu_ids_ticks)
    let layout = {
     // height: 400,
     // width: 600,
      margin: {t:30, l:150},
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {'title':"Number of Bacteria"}
    };
  
    // Don't forget to slice and reverse the input data appropriately
      //.reverse
     // let data3 = [trace2].reverse;
     //Render the Bar Chart
    Plotly.newPlot('bar',trace2, layout);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sample_names = data.names;
    

    // Use d3 to select the dropdown with id of `#selDataset`
    let drop_down_list = d3.select('#selDataset');
    

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i< sample_names.length; i++){

      drop_down_list.append("option").text(sample_names [i]).property(sample_names [i])


    }

    // Get the first sample from the list
    

    // Build charts and metadata panel with the first sample
    buildMetadata(sample_names[0])
    buildCharts(sample_names[0])
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
}

// Initialize the dashboard
init();
