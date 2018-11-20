$(document).ready(function() {
    //Using Queue.js for waiting the external data to be loaded
    queue()
        .defer(d3.csv, "data/Romania_Deforestation_per_County.csv")
        .await(makeResults);

    function makeResults(error, deforestationData) {

        const ndx = crossfilter(deforestationData);

        show_county_selector(ndx);
        show_total_illegal_cutting_in_time(ndx);
        show_cutting_per_county_in_years(ndx);
        show_prejudice_per_county(ndx);
        show_total_prejudice_in_time_period(ndx);
        show_volume_of_wood_county(ndx);
        /* show_medical_condition(ndx1);
         show_improvement_percentage_per_med_cond(ndx1);
        */
        dc.renderAll();
    }

    function show_county_selector(ndx) {

        var countyDim = ndx.dimension(dc.pluck('County'));
        var countyGroup = countyDim.group();

        dc.selectMenu('#county')
            .dimension(countyDim)
            .group(countyGroup);

    }

    function show_total_illegal_cutting_in_time(ndx) {
        var yearsDim = ndx.dimension(dc.pluck('Time_period'));
        var totalCutting = yearsDim.group().reduceSum(dc.pluck('Illegal_cutting_of_trees'));

        dc.barChart("#totalCutting")
            .width(300)
            .height(400)
            .dimension(yearsDim)
            .group(totalCutting)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .xAxisLabel("Total cutting of trees between 2009-2016")
            .yAxis().ticks(10);
    }

    function show_cutting_per_county_in_years(ndx) {
        var countyDim = ndx.dimension(dc.pluck('County'));
        var countyGroup = countyDim.group().reduceSum(dc.pluck('Illegal_cutting_of_trees'));

        dc.barChart("#total_trees_per_county")
            .width(1400)
            .height(300)
            .dimension(countyDim)
            .group(countyGroup)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .transitionDuration(800)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Total cutting of trees per county")
            .xAxisLabel("Counties in Romania where illegally cutting of trees occured")
            .yAxis().ticks(10);

    }

    function show_prejudice_per_county(ndx) {
        var countyDim = ndx.dimension(dc.pluck('County'));
        var totalPrejudiceCountyGroup = countyDim.group().reduceSum(dc.pluck('Prejudice_per_county'));
        var filtertotalPrejudiceCountyGroup = {
            all: function() {
                return totalPrejudiceCountyGroup.top(Infinity).filter(function(d) { return d.Prejudice_per_county !== 0; })
            }
        };

        dc.pieChart('#prejudicePerCounty')
            .width(400)
            .height(300)
            .transitionDuration(1500)
            .legend(dc.legend().x(5).y(20).itemHeight(15).gap(5))
            .dimension(countyDim)
            .group(totalPrejudiceCountyGroup)
            .group(filtertotalPrejudiceCountyGroup);
    }

    function show_total_prejudice_in_time_period(ndx) {
        var timeDim = ndx.dimension(dc.pluck('Time_period'));
        var totalPrejudice = timeDim.group().reduceSum(dc.pluck('Total_prejudice'));


        dc.rowChart('#totalPeriodPrejudice')
            .width(400)
            .height(150)
            .transitionDuration(1500)
            .dimension(timeDim)
            .group(totalPrejudice);


    }

    function show_volume_of_wood_county(ndx) {
        var countyDim = ndx.dimension(dc.pluck('County'));
        var woodGroup = countyDim.group().reduce(reduceAdd, reduceRemove, reduceInitial);

        function reduceAdd(p, v) {
            ++p.count;
            p.total += v.Wood_volume_illegaly_cut;
            return p;
        }

        function reduceRemove(p, v) {
            --p.count;
            p.total -= v.Wood_volume_illegaly_cut;
            return p;
        }

        function reduceInitial() {
            return { count: 0, total: 0 };
        }
        woodGroup.top(Infinity).filter(function(d){
            return d.Wood_volume_illegaly_cut > 0;
        });
        dc.rowChart("#woodVolumePerCounty")
            .width(700)
            .height(400)
            .transitionDuration(800)
            .dimension(countyDim)
            .group(woodGroup);

    }
    /*
    function show_medical_condition(ndx1) {
        var groupsDim = ndx1.dimension(dc.pluck('Groups'));
        var groupG = groupsDim.group();

        dc.selectMenu("#medicalCondition")
            .dimension(groupsDim)
            .group(groupG);
    }

    function show_improvement_percentage_per_med_cond(ndx) {
        var group_dim = ndx.dimension(dc.pluck('Dependent_variable'));
        var improveGroup = group_dim.group();
        

        /* var stackedChart = dc.barChart("#results2");
         stackedChart
             .width(800)
             .height(400)
             .transitionDuration(1000)
             .dimension(groupsDim)
             .group(reikiGroup, "Reiki")
             .stack(pmrGroup, "PMR", function(d){
                 return d.value;
             })
             .stack(controlGroup, "Control", function(d){
                 return d.value;
             })
             .stack(placeboGroup, "Placebo", function(d){
                 return d.value;
             })
             .legend(dc.legend().x(200).y(40).itemHeight(13).gap(5))
             .x(d3.scale.linear().domain([0, 100]))
             .brushOn(false)
             .renderLabel(true)
             .xUnits(dc.units.ordinal)
             .xAxisLabel("Medical condition")
             .yAxisLabel("Improvement");
             
        dc.barChart('#results2')
            .width(460)
            .height(100)
            .margins({
            top: 10,
            right: 10,
            bottom: 30,
            left: 30})
            .transitionDuration(1000)
            .dimension(group_dim)
            .group(improveGroup)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Medical Condition")
            .yAxis().ticks(4);

    }
    */
});
