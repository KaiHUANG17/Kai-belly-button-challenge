/*
This function, buildMetadata, should perform to display metadata information for a given sample ID. It fetches metadata from an external JSON file and populates the metadata panel in the HTML with key-value pairs. Additionally, it provides a bonus feature to build a Gauge Chart based on the washing frequency.
*/
function buildMetadata(sample) {
    // Fetch metadata asynchronously from an external JSON file using D3.js
    const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

    d3.json(url).then((data) => {
        // Extract the 'metadata' array from the fetched data
        let metadata = data.metadata;
        // Filter the 'metadata' array based on the provided 'sample' ID
        let filterMetadata = data.metadata.filter(item => item.id == sample);
        // Extract the first result from the filtered array
        let resultArray = filterMetadata;
        let result = resultArray[0];
        // Select the HTML panel with the id of `#sample-metadata` using D3
        let PANEL = d3.select("#sample-metadata");

        // Clear any existing metadata in the panel using `.html("")`
        PANEL.html("");

        // Iterate through each key-value pair in the metadata and append them as <h6> tags to the panel
        for (let key in result){
            if (result.hasOwnProperty(key)) {
                // Create an <h6> tag to store key_value pair
                let h6Tag = PANEL.append("h6");
                // Set the text content to dispaly key_value
                h6Tag.text(`${key}: ${result[key]}`);
            }

        }
    });
}

// Make Compare Function for sorting data
function compareValue(key, order = 'asc') {
    // Return a comparison function that takes two elements, a and b
    return function(a,b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // if equality
            return 0;
        }

        // Ensure the all elements to uppercase if they are strings
        let A = (typeof a[key] == 'string') ? a[key].toUpperCase() : a[key];
        let B = (typeof b[key] == 'string') ? b[key].toUpperCase() : b[key];

        // compare A and B
        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }

        // Return the comparison result, multiplied by -1 if the order is descenidng
        return (order == 'desc') ? (comparison * -1) : comparison;
    };
}

  /*
This function, buildCharts, is designed to generate visualizations (Bubble Chart and Bar Chart) based on sample data retrieved from an external JSON file. It uses D3.js to fetch the data asynchronously. The function filters the samples based on a provided sample ID, then extracts relevant data (OTU IDs, OTU labels, and sample values) to populate the charts.
The Bubble Chart displays the distribution of bacteria cultures per sample, with OTU IDs on the x-axis and sample values on the y-axis. The size and color of markers represent sample values and OTU IDs, respectively.
The Bar Chart visualizes the top 10 bacteria cultures found in the sample. It presents OTU IDs as y-axis ticks and corresponding sample values as bars. The chart's title indicates its purpose.
this function efficiently utilizes Plotly.js to create interactive and informative visualizations, enhancing data exploration and understanding.
*/
function buildCharts(sample) {
    // Fetch data asynchronously from an external JSON file using D3.js
    const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
    d3.json(url).then((data) => {
        // Extract the 'samples' array from the fetched data
        var samples = data.samples;
        // Filter the 'samples' array based on the provided 'sample' ID
        let filterSample = samples.filter(item => item.id == sample);
        // Extract the first result from the filtered array
        let resultArray = filterSample;
        let result = resultArray[0];
    
        // Extract relevant data for Bubble Chart
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
      
    
        // Build layout for Bubble Chart
        let bubbleLayout = {
            showlegend: false,
            height: 600,
            width: 1500,
            xaxis:  {title: 'OTU ID'},
            
        };

        // Define data for Bubble Chart
        let bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Jet',
                    opacity: 0.8
                }
            }
        ];
    
        // Generate Bubble Chart using Plotly
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Sort and slice the list of objects
        var combinedList = [];
        for (let i = 0; i < sample_values.length; i++) {
            let otu_id = otu_ids[i];
            let otu_idText = "OTU " + otu_id.toString();
            let combinedObject = {"sample_values": sample_values[i], "otu_ids": otu_idText, "otu_labels": otu_labels[i]};
            combinedList.push(combinedObject);
        }
        
        // Sort the objects
        let sortedList = combinedList.sort(compareValue("sample_values", "desc"));
        
        //Slice the list to get the top 10 values
        let slicedList = sortedList.slice(0,10);
    
        // Extract top 10 OTU IDs, sample_values, labels for Bar Chart
        let top10_otu_ids = slicedList.map(item => item.otu_ids).reverse();
        let top10_sample_values = slicedList.map(item => item.sample_values).reverse();
        let top10_otu_labels = slicedList.map(item => item.otu_labels).reverse();
        // Define data for Bar Chart
        let barData = [
         {
            x: top10_sample_values,
            y: top10_otu_ids,
            text: top10_otu_labels,
            type:'bar',
            orientation: 'h'

         }
       ];
    
        // Build layout for Bar Chart
        let layout = {
            title: "Top 10 OTUS Information",
            xaxis: {title:'values'},
            yaxis: {title:'IDs'}
        };
    
        // Generate Bar Chart using Plotly
        Plotly.newPlot('bar',barData, layout);
    });
}



  /*
The init() function initializes the webpage by populating a dropdown menu with sample names retrieved from an external JSON file. It then builds the initial plots based on the first sample from the dropdown.
*/

function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");

    // Fetch data asynchronously from an external JSON file using D3.js
    const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
    d3.json(url).then((data) => {
        // Extract sample names from the fetched data
        let sampleNames = data.names;
   

        // Iterate through each sample name to populate the dropdown menu
        for (let i in sampleNames) {
            // Append an <option> element for each sample name
            selector.append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);

        }
        // Use the first sample from the list to build the initial plots
        let firstSample = sampleNames[0];
        // Build charts based on the first sample
        buildCharts(firstSample);
        // Display metadata for the first sample
        buildMetadata(firstSample);
    });
}


/*
The optionChanged() function is triggered whenever a new sample is selected from the dropdown. It fetches new data and updates the plots accordingly. 
*/
function optionChanged(newSample) {
    // Fetch new data and update charts and metadata when a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}

  
  // Initialise the dashboard
  init();
  
