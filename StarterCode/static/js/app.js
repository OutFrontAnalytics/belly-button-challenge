const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'





function updateMenu() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

  
    d3.json(url).then((data) => {
        console.log(data)
        let names = data.names
        console.log(names)
        names.forEach((element) => {
        dropdownMenu.append('option').text(element)
          });
          infotable(names[0])
          plots(names[0])
    })

  }
  
function optionChanged(sample_id){
    infotable(sample_id)
    plots(sample_id)

}

function infotable(sample_id){

    let infoMenu = d3.select("#sample-metadata");

    d3.json(url).then((data) => {
        console.log(data)
        let metadata = data.metadata
        console.log(metadata)
        metaresult = metadata.filter(x => x.id == sample_id)[0];

        infoMenu.html('')

          Object.entries(metaresult).forEach(entry => {
            const [key, value] = entry;
            infoMenu.append('h5').text(` ${key}: ${value}`)
          });

    })


}

function plots(sample_id){

    d3.json(url).then((data) => {
        console.log(data)
        let samplesdata = data.samples
        console.log(samplesdata)
        samplesresult = samplesdata.filter(x => x.id == sample_id)[0];

        sample_values = samplesresult.sample_values
        otu_ids = samplesresult.otu_ids
        otu_labels = samplesresult.otu_labels

        var bardata = [{
            type: 'bar',
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(x=> `otu ${x}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'
          }];

          var barlayout = {
            title: "Top Ten OTU's",
         
          };
          
          Plotly.newPlot('bar',bardata, barlayout);


          var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,  


            mode: 'markers',
            marker: {
              color: otu_ids,
             
              size: sample_values
            }
          };
          
          var data2 = [trace1];
          
          var layout = {
            title: 'Bubble Chart for Each Sample',
         
          };
          
          Plotly.newPlot('bubble', data2, layout);






          Object.entries(metaresult).forEach(entry => {
            const [key, value] = entry;
            infoMenu.append('h5').text(` ${key}: ${value}`)
          });

    })


}

  updateMenu()