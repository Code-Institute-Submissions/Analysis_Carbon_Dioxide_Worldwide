//Using Queue.js for waiting the external data to be loaded
 queue()
    .defer(d3.csv, "/data/Reiki_study_data.csv")
    .await(makeResults);
    
    function makeResults(error, reikiData) {
        
        var ndx = crossfilter(reikiData);
        
        
        var groupDim = ndx.dimension(dc.pluck('Groups'));
        var dimGroup = groupDim.group();
        
          dc.selectMenu("#groups")
            .dimension(groupDim)
            .group(dimGroup)
            .promptText("Groups");
        
        var group_dim = ndx.dimension(dc.pluck('Gender'));
        var total_number_of_persons = group_dim.group().reduceSum(dc.pluck('Participant'));
        
          dc.pieChart("#participants")
            .width(768)
            .height(480)
            .slicesCap(4)
            .innerRadius(100)
            .dimension(group_dim)
            .group(total_number_of_persons);
        
        var improveP = ndx.dimension(dc.pluck('improveP'));
        var perGroup = improveP.group();
            
           dc.rowChart("#results")
             .width(400)
             .height(200)
             .dimension(improveP)
             .group(perGroup)
             .elasticX(true)
            .xAxis().ticks(20);

   dc.renderAll();
   console.log(dimGroup.all());
                
    }
   