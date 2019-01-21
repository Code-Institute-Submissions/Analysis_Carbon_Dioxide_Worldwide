# Analysis Carbon Dioxide Worldwide

I am interested in lots of subjects that effect life of people on Earth. One of them is
clean air, forests and different substances that affect globally. After many ups and downs 
regarding research on this topics, I have found the official website of [Carbon Dioxide Information Analysis Center](https://cdiac.ess-dive.lbl.gov/) 
and their database regarding emissions of CO2 per Region of Earth or emissions of CO2 per Country from 1751 to 2014 and decided to implement the data 
from emissions of CO2 per Region.
Global CO2 emissions increased in 2017, after a three-year period of stabilization, thus all nations now have to triple their efforts
to reach by 2030 the 2 degrees Celsius increase in global temperature. [United Nations Environment Programme Report](https://www.unenvironment.org/news-and-stories/press-release/nations-must-triple-efforts-reach-2degc-target-concludes-annual?fbclid=IwAR1ZzXmW5BlLBlMgc0KhSmtd0xknE-v_39UGL8QMYSRVMB2NzcuIUFAE2NQ)
## UX

The website was created for better visualizing the data gathered and stored on the CDIAC official website regarding CO2 emissions, but also, due to the nature of the charts,
regions can be selected from the **Select region** menu and the charts are rearranged according to that dimension.
The user can better see per region the emissions from different fossil fuels or cement production or in relation to another region by selecting the region wanted from the pie chart.
We can see the fluctuation of total carbon emissions per year, in the time span of 1751-2014.

###### User stories



## Features

###### Existing features
**_The website contains a single page_ and contains information regarding the project of CDIAC and charts.**

 **Home page - index.html**
   1. CO2 button - the user can click to toggle between showing text information or hide it to better view the charts.
   2. SelectAll menu - for selecting desired region if any.  
   3. Reset button - for reseting all charts to default state.
   4. pieChart - represents total emissions of CO2 per Region.
   5. compositeChart - represents total emissions of CO2 from 1751-2014 of the regions.
   6. The next five charts are 5 in number as follows:
      - barChart to represent **total emissions from solid fuels consumption per region**;
       - barChart to represent **total emissions from liquid fuel consumption per region**;
        - barChart to represent **total emissions from gas fuel consumption per region**;
         - barChart to represent **total emissions from cement production per region**;
          - barChart to represent **total emissions from emissions from gas flaring per region**;
   7. Logo of CDIAC with link to the official website.
###### **_Features left to implement_**

  1. Creating second webpage with data from CDIAC with CO2 emissions per country from 1751-2014;
  2. Creating third webpage with data from [IRENA](https://www.irena.org/) to observe and compare the trends worldwide regarding renewable energy.
  3. Implementing in the future responsiveness to the charts with the help of the following resources:
     - [DC Resizing made by Gordon Woodhull](https://dc-js.github.io/dc.js/resizing/);
     - [Article D3 resizing](https://blog.webkid.io/responsive-chart-usability-d3/).
## Technologies Used

 [HTML 5](https://www.w3schools.com/html/html5_intro.asp) 
 
 For rendering the page.
 
 [CSS3](https://www.w3schools.com/css/default.asp)
 
 Added the code from [Jo_wings](https://github.com/Wings30306/my_library) to extend some
 responsiveness to the charts and better alignment. Thanks #Wings30306
 
 [Bootstrap 4.1.3](https://getbootstrap.com/) 
 
 Framework to create the project, using the responsive grid system they use, mobile-first, and
 other classes for elements used in this project.
 
 **Thanks Mike Bostock !**
 
 [Data-Driven Documents JavaScript Libray](https://d3js.org/)
 > D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. 
 
 [Dimensional Charting JavaScript Libray](https://dc-js.github.io/dc.js/)
 > dc is a javascript charting library with native crossfilter support, allowing highly efficient exploration on large multi-dimensional datasets. It leverages d3 to render charts in CSS-friendly SVG format. Charts rendered using dc.js are data driven and reactive and therefore provide instant feedback to user interaction.

[Crossfilter Library](http://square.github.io/crossfilter/)
> Crossfilter is a JavaScript library for exploring large multivariate datasets in the browser.

[Queue Library](https://github.com/d3/d3-queue)
 Library to help with first awaiting to load the complete dataset, second to throw an error if any and third to load the charts.


 [JavaScript](https://getbootstrap.com/docs/4.1/getting-started/javascript/)
 
 All the above libraries are based on Javascript.
 
 ## Testing
 ##### CSV validation
 [Validator](https://csvlint.io/)
 Downloading the csv file from CDIAC website and validate it through online tool.
 
 #####
 
 ##### HTML5 validation
 [Validator](https://html5.validator.nu/)
 > The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0.
 
 ##### CSS validation
 
 I have run the validation online through [Css validator](https://jigsaw.w3.org/css-validator/https://jigsaw.w3.org/css-validator/) but the only problems where that of Bootstrap's css, because I have relied only on it
 and my stylesheet is not big at all.
 
 ##### JavaScript
 
 I didn't have much things to check here, because the website relies mostly on charts using js libraries mentioned above. However, I have checked manually if the charts are displaying correctly and if they are displaying 
 the region mentioned, the values from CO2 emissions or the date.
 
 
 ## Deployment
 
 The project is deployed to the platform GitHub Pages.

 ## Credits
 
 **Content**
  Information and data was obtained from [CDIAC](https://cdiac.ess-dive.lbl.gov/) official website.
  
  
  
  **Acknowledgements**
 #Neil_mentor thanks for clearing out that I need a bigger data file with several entries to work with and use crossfilter.
 
 Thanks to several videos better explaining the concepts  behind DC.js and Crossfilter.js :
 - [Tutorial how to create charts with DC and crossfilter](https://www.youtube.com/watch?v=8TBh5ghRZrI&t=464s);
 - [Crossfilter tutorial](https://www.youtube.com/watch?v=86XVqKwpqpw);
 - several other useful groups regarding DC.js and crossfilter, from google groups and github. I have learned a lot from there.
 - [csv validator](https://csvlint.io/) because at the beginning of the project I had problems with crossfilter not reading dimensions and the problem is that , in some cases, after converting a file
 from excel to csv, it leaves in the header spaces and the dimension is incorrect.
  

