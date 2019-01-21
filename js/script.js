$(document).ready(function() {
    var region = dc.selectMenu('#region');
    var totalEmission = dc.pieChart("#total_emission");
    var compositeChart = dc.compositeChart("#years_total_emissions");
    var solidFuel = dc.barChart("#Emissions_from_solid_fuel_consumption");
    var liquidFuel = dc.barChart("#Emissions_from_liquid_fuel_consumption");
    var gasFuel = dc.barChart("#Emissions_from_gas_fuel_consumption");
    var cementProduction = dc.barChart("#Emissions_from_cement_production");
    var gasFlaring = dc.barChart("#Emissions_from_gas_flaring");

    //Using Queue.js for waiting the external data to be loaded
    queue()
        .defer(d3.csv, "data/Regional_fossil_fuel_emission_1751_2014.csv")
        .defer(d3.csv, "data/Countries_Total_CO2.csv")
        .await(makeResults);

    function makeResults(error, co2Data) {

        const ndx = crossfilter(co2Data);

        show_region_selector(ndx);
        show_total_co2_emissions(ndx);
        show_emissions_from_solid_fuel_consumption(ndx);
        show_emissions_from_liquid_fuel_consumption(ndx);
        show_emissions_from_gas_fuel_consumption(ndx);
        show_emissions_from_cement_production(ndx);
        show_emissions_from_gas_flaring(ndx);
        show_total_CO2_per_year(ndx, co2Data);


        dc.renderAll();
    }

    function show_region_selector(ndx) {

        var regionDim = ndx.dimension(dc.pluck('Region'));
        var regionGroup = regionDim.group();

        region
            .dimension(regionDim)
            .group(regionGroup);

    }

    function show_total_co2_emissions(ndx) {
        var regionDim = ndx.dimension(dc.pluck('Region'));
        var totalEmissionGroup = regionDim.group().reduceSum(dc.pluck('Total_CO2_emissions_from_fossil_fuels_and_cement_prod'));

        totalEmission
            .width(540)
            .height(300)
            .transitionDuration(1500)
            .legend(dc.legend().x(-8).y(20).itemHeight(15).gap(7))
            .innerRadius(20)
            .dimension(regionDim)
            .group(totalEmissionGroup);
    }

    function show_total_CO2_per_year(ndx, co2Data) {
        var parseDate = d3.time.format("%Y").parse;
        co2Data.forEach(function(d){
            d.Year = parseDate(d.Year);
        });
        var yearDim = ndx.dimension(dc.pluck('Year'));
        var minDate = yearDim.bottom(1)[0].Year;
        var maxDate = yearDim.top(1)[0].Year;
        var totalEmissionGroup = yearDim.group().reduceSum(dc.pluck('Total_CO2_emissions_from_fossil_fuels_and_cement_prod'));

        var africaTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Africa') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var developingAmericaTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Developing America') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var asiaTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Centrally Planned Asia') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var europeTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Centrally Planned Europe') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var farEastTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Far East') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var germanyTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Germany') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var middleEastTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Middle East') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var northAmericaTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'North America') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var oceaniaTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Oceania') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
        var westernEuropeTotalEmissionsinYears = yearDim.group().reduceSum(function(d) {
            if (d.Region === 'Western Europe') {
                return +d.Total_CO2_emissions_from_fossil_fuels_and_cement_prod;
            }
            else {
                return 0;
            }
        });
    
        compositeChart
            .width(600)
            .height(400)
            .transitionDuration(1500)
            .margins({ top: 10, right: 20, bottom: 40, left: 65 })
            .dimension(yearDim)
            .elasticX(true)
            .brushOn(false)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .yAxisLabel("Total Emissions per Region")
            .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
            .renderHorizontalGridLines(true)
            .compose([
                dc.lineChart(compositeChart)
                .colors('yellow')
                .group(africaTotalEmissionsinYears, 'Africa'),
                dc.lineChart(compositeChart)
                .colors('blue')
                .group(developingAmericaTotalEmissionsinYears, 'Developing America'),
                dc.lineChart(compositeChart)
                .colors('purple')
                .group(asiaTotalEmissionsinYears, 'Asia'),
                dc.lineChart(compositeChart)
                .colors('orange')
                .group(europeTotalEmissionsinYears, 'Europe'),
                dc.lineChart(compositeChart)
                .colors('brown')
                .group(farEastTotalEmissionsinYears, 'Far East'),
                dc.lineChart(compositeChart)
                .colors('black')
                .group(germanyTotalEmissionsinYears, 'Germany'),
                dc.lineChart(compositeChart)
                .colors('#4E9258')
                .group(middleEastTotalEmissionsinYears, 'Middle East'),
                dc.lineChart(compositeChart)
                .colors('steelblue')
                .group(northAmericaTotalEmissionsinYears, 'North America'),
                dc.lineChart(compositeChart)
                .colors('skyblue')
                .group(oceaniaTotalEmissionsinYears, 'Oceania'),
                dc.lineChart(compositeChart)
                .colors('turquoise')
                .group(westernEuropeTotalEmissionsinYears, 'Western Europe'),
            ])
            .brushOn(false)
            .renderLabel(true);
    }

    function show_emissions_from_solid_fuel_consumption(ndx) {
        var regionDim = ndx.dimension(dc.pluck('Region'));
        var solidFuelGroup = regionDim.group().reduceSum(dc.pluck('Emissions_from_solid_fuel_consumption'));

        solidFuel
            .width(450)
            .height(400)
            .dimension(regionDim)
            .group(solidFuelGroup)
            .margins({ top: 20, right: 50, bottom: 85, left: 68 })
            .transitionDuration(2500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Total emissions from solid fuel consumption")
            .yAxis().ticks(16)

        solidFuel.on('pretransition', function(chart) {
            // Rotate X-axis
            chart.selectAll("g.axis.x text")
                .style("text-anchor", "start")
                .attr("dx", "0.2em")
                .attr("dy", "0.4em")
                .attr("transform", "rotate(40)")
        });

    }

    function show_emissions_from_liquid_fuel_consumption(ndx) {
        var regionDim = ndx.dimension(dc.pluck('Region'));
        var liquidFuelGroup = regionDim.group().reduceSum(dc.pluck('Emissions_from_liquid_fuel_consumption'));

        liquidFuel
            .width(450)
            .height(400)
            .dimension(regionDim)
            .group(liquidFuelGroup)
            .margins({ top: 20, right: 50, bottom: 85, left: 68 })
            .transitionDuration(1500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Total emissions from liquid fuel consumption ")
            .yAxis().ticks(16)
        liquidFuel.on('pretransition', function(chart) {
            // Rotate X-axis
            chart.selectAll("g.axis.x text")
                .style("text-anchor", "start")
                .attr("dx", "0.2em")
                .attr("dy", "0.4em")
                .attr("transform", "rotate(40)")
        });

    }

    function show_emissions_from_gas_fuel_consumption(ndx) {
        var regionDim = ndx.dimension(dc.pluck('Region'));
        var gasFuelGroup = regionDim.group().reduceSum(dc.pluck('Emissions_from_gas_fuel_consumption'));

        gasFuel
            .width(450)
            .height(400)
            .dimension(regionDim)
            .group(gasFuelGroup)
            .margins({ top: 20, right: 50, bottom: 85, left: 68 })
            .transitionDuration(1500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Total emissions from liquid fuel consumption ")
            .yAxis().ticks(16)
        gasFuel.on('pretransition', function(chart) {
            // Rotate X-axis
            chart.selectAll("g.axis.x text")
                .style("text-anchor", "start")
                .attr("dx", "0.2em")
                .attr("dy", "0.4em")
                .attr("transform", "rotate(40)")
        });

    }

    function show_emissions_from_cement_production(ndx) {
        var regionDim = ndx.dimension(dc.pluck('Region'));
        var cementGroup = regionDim.group().reduceSum(dc.pluck('Emissions_from_cement_production'));

        cementProduction
            .width(450)
            .height(400)
            .dimension(regionDim)
            .group(cementGroup)
            .margins({ top: 20, right: 50, bottom: 80, left: 68 })
            .transitionDuration(1500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Total emissions from cement production per region")
            .yAxis().ticks(16)
        cementProduction.on('pretransition', function(chart) {
            // Rotate X-axis
            chart.selectAll("g.axis.x text")
                .style("text-anchor", "start")
                .attr("dx", "0.2em")
                .attr("dy", "0.4em")
                .attr("transform", "rotate(25)")
        });

    }

    function show_emissions_from_gas_flaring(ndx) {
        var regionDim = ndx.dimension(dc.pluck('Region'));
        var gasFlaringGroup = regionDim.group().reduceSum(dc.pluck('Emissions_from_gas_flaring'));

        gasFlaring
            .width(450)
            .height(400)
            .dimension(regionDim)
            .group(gasFlaringGroup)
            .margins({ top: 20, right: 50, bottom: 80, left: 68 })
            .transitionDuration(1500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Total emissions from gas flaring per region")
            .yAxis().ticks(16)
        gasFlaring.on('pretransition', function(chart) {
            // Rotate X-axis
            chart.selectAll("g.axis.x text")
                .style("text-anchor", "start")
                .attr("dx", "0.2em")
                .attr("dy", "0.4em")
                .attr("transform", "rotate(25)")
        });

    }



});
