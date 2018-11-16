$(document).ready(function(){
//Using Queue.js for waiting the external data to be loaded
queue()
    .defer(d3.csv, "data/Reiki_study_data.csv")
    .defer(d3.csv, "data/Reiki_study_condition.csv")
    .await(makeResults);

function makeResults(error, reikiDataGroups, reikiStudyCondition) {

    const ndx = crossfilter(reikiDataGroups);
    const ndx1 = crossfilter(reikiStudyCondition);

    show_groups_selector(ndx);
    show_gender(ndx);
    show_improvement_percentage_per_gender(ndx);
    show_medical_condition(ndx1);
    show_improvement_percentage_per_med_cond(ndx1);

    dc.renderAll();
}

function show_groups_selector(ndx) {

    var groupDim = ndx.dimension(dc.pluck('Groups'));
    var dimGroup = groupDim.group();

    dc.selectMenu('#groups')
        .dimension(groupDim)
        .group(dimGroup);

}

function show_gender(ndx) {
    var group_dim = ndx.dimension(dc.pluck('Gender'));
    var total_number_of_persons = group_dim.group().reduceSum(dc.pluck('Participant'));

    dc.pieChart("#participants")
        .width(768)
        .height(480)
        .innerRadius(20)
        .dimension(group_dim)
        .group(total_number_of_persons);
}

function show_improvement_percentage_per_gender(ndx) {
    var improveP = ndx.dimension(dc.pluck('improveP'));
    var perGroup = improveP.group();

    dc.barChart("#results")
        .width(250)
        .height(200)
        .dimension(improveP)
        .group(perGroup)
         .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Medical Condition")
        .yAxis().ticks(4);
        
}

function show_medical_condition(ndx1) {
    var groupsDim = ndx1.dimension(dc.pluck('Groups'));
    var groupG = groupsDim.group();

    dc.selectMenu("#medicalCondition")
        .dimension(groupsDim)
        .group(groupG);
}

function show_improvement_percentage_per_med_cond(ndx1) {
    var groupsDim = ndx1.dimension(dc.pluck('Groups'));
    var groupG = groupsDim.group();
    var reikiDim = ndx1.dimension(dc.pluck('Reiki'));
    var reikiGroup = reikiDim.group();
    var pmrDim = ndx1.dimension(dc.pluck("PMR"));
    var pmrGroup = pmrDim.group();
    var controlDim = ndx1.dimension(dc.pluck('Control'));
    var controlGroup = controlDim.group();
    var placeboDim = ndx1.dimension(dc.pluck('Placebo'));
    var placeboGroup = placeboDim.group();

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
         */
    dc.barChart('#results2')
        .width(400)
        .height(200)
        .margins({
        top: 10,
        right: 10,
        bottom: 30,
        left: 30})
        .transitionDuration(1000)
        .dimension(reikiDim)
        .group(reikiGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Medical Condition")
        .yAxis().ticks(4);

}
});