/*
* Author: Felicia van Gastel
* Student number: 11096187
* Date: 20/04/2018
* Subject: Data Processing
*
* Script for line graph of average temperature in 2017 in the Netherlands, measured by De Bilt.
* ! Unfortunately I didn't manage to make this file working.!
*/

// Get data from csv file
http();

// From data.csv it gets the data and returns next function that will process this data
function http(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          // Remove whitespace from rawdata and split at enter
          var rawdata = [];
          rawdata = document.getElementById("rawdata").value.toString();
          var rawdataCleaned = rawdata.split(' ').join('');
          var rawdataSplitted = rawdataCleaned.split("\n");

          // Create array containing dates only
          var dateLength = 8;
          var dateOnly = [];
          for (var day in rawdataSplitted) {
            if (day <= 365) { // Fix weird array length (367 entries)
              dateOnly.push(rawdataSplitted[day].substring(0, dateLength));
            }
          }

          // Create array containing temperatures only
          var maxTempLength = 3;
          var tempOnly = [];
          for (var temp in rawdataSplitted) {
            if (temp <= 365) { // Fix weird array length (367 entries)
              tempOnly.push(rawdataSplitted[temp].substring(9, 9 + maxTempLength)); // Temperatures values start after 9 characters
            }
          }

          // Convert dateString to valid JavaScript date
          var fixedDateOnly = [];
          for (var dateString in dateOnly) {
            var year = dateOnly[dateString].substring(0, 4); // YYYY
            var month = dateOnly[dateString].substring(4, 6); // MM
            var day = dateOnly[dateString].substring(6, 8); // DD
            var date = new Date(year, month-1, day);
            fixedDateOnly.push(date);
          }

          // Convert numbers to valid JavaScript numbers
          var fixedTempOnly = [];
          for (var number in tempOnly) {
            var number = Number(tempOnly[number]);
            fixedTempOnly.push(number);
          }
          console.log(fixedTempOnly);

          // Create new list with .getTime() output to use for transformations
          var calcDate = [];
          for (var date in fixedDateOnly) {
            var newDateInMilliseconds = fixedDateOnly[date].getTime();
            var millisecondsSinceEpochToStartDataSet = 1483225200000;
            var newDateInDays = ((newDateInMilliseconds - millisecondsSinceEpochToStartDataSet) + 86400000) / 86400000;
            var roundedNewDateInDays = Math.round(newDateInDays);
            calcDate.push(roundedNewDateInDays);
          }

          // Find min and max of date and temperatures
          var maxDate = Math.max.apply(null, calcDate);
          var minDate = Math.min.apply(null, calcDate);
          var maxTemp = Math.max.apply(null, fixedTempOnly);
          var minTemp = Math.min.apply(null, fixedTempOnly);

          // Create multiple canvasses to quickly add elements to the plot
          var c = document.getElementById('avgTempPerDay').getContext('2d');
          var cXLines = document.getElementById('xLines').getContext('2d');
          var cYLines = document.getElementById('yLines').getContext('2d');
          var cText = document.getElementById('xText').getContext('2d');
          var ctYText = document.getElementById('yText').getContext('2d');

          function createTransform(domain, range){
            // domain is a two-element array of the data bounds [domain_min, domain_max]
            // range is a two-element array of the screen bounds [range_min, range_max]
            // this gives you two equations to solve:
            // range_min = alpha * domain_min + beta
            // range_max = alpha * domain_max + beta
              // a solution would be:
              var domainMin = domain[0]
              var domainMax = domain[1]
              var rangeMin = range[0]
              var rangeMax = range[1]

              // formulas to calculate the alpha and the beta
              var alpha = (rangeMax - rangeMin) / (domainMax - domainMin)
              var beta = rangeMax - alpha * domainMax

              // returns the function for the linear transformation (y= a * x + b)
              return function(x){
                return alpha * x + beta;
              }
          }
          var dateRange = [minDate, maxDate];
          var tempRange = [minTemp, maxTemp];
          var xRange = [585, 0];
          var yRange = [300, 0];
          xScale = createTransform(dateRange, xRange);
          yScale = createTransform(tempRange, yRange);
          var xScaled = [];
          var yScaled = [];
          for (var date in calcDate) {
              var transformedDate = Math.round(xScale(calcDate[date]));
              xScaled.push(transformedDate);
          }
          for (var temp in fixedTempOnly) {
              var transformedTemp = yScale(fixedTempOnly[temp]);
              yScaled.push(transformedTemp);
          }

          // Define measurements
          var cWidth = 600;
          var cHeight = 300;
          var cWidthXLines = 20;
          var cWidthXText = 50;
          var cHeightXLines = 300;
          var cHeightXText = 335;
          var cWidthYLines = 585;
          var cWidthYText = 615;
          var cHeightYLines = 20;
          var cHeightYText = 50;

          // Draw data points into a line graph
          var year = 366;
          c.beginPath();
          for (i = 0; i <= year; i++) {
            c.strokeStyle = "black";
            c.lineWidth=0.05;
            c.moveTo(15 + xScaled[i], yScaled[i]);
            c.lineTo(15 + xScaled[i+1], yScaled[i+1]);
            c.stroke();
          }
          c.closePath();
          // Draw Y-axis
          c.beginPath();
          c.strokeStyle = "black";
          c.lineWidth=2;
          c.moveTo(15, cHeight);
          c.lineTo((cWidth), cHeight);
          c.stroke();
          c.closePath();
          // Draw X-axis
          c.beginPath();
          c.strokeStyle = "black";
          c.lineWidth=2;
          c.moveTo(0, cHeight);
          c.lineTo(0, 0);
          c.stroke();
          c.closePath();
          // Draw Y-axis lines
          var stepsY = 6;
          cXLines.beginPath();
          cXLines.strokeStyle = "black";
          cXLines.lineWidth=1.5;
          cXLines.moveTo(0, cHeightXLines);
          cXLines.lineTo(cWidthXLines, cHeightXLines);
          for (i = 1; i <= stepsY; i++) {
            cXLines.moveTo(0, (cHeightXLines - ((cHeightXLines / stepsY) * i)));
            cXLines.lineTo(cWidthXLines, (cHeightXLines - ((cHeightXLines / stepsY) * i)));
            cXLines.stroke();
          }
          cXLines.closePath();

          // Draw X-axis lines
          var stepsX = 11;
          cYLines.beginPath();
          cYLines.strokeStyle = "black";
          cYLines.lineWidth=1.5;
          cYLines.moveTo(0, 0);
          cYLines.lineTo(0, cHeightYLines);
          for (i = 1; i <= stepsX; i++) {
            cYLines.moveTo(0 + ((cWidthYLines / stepsX) * i), 0);
            cYLines.lineTo(0 + ((cWidthYLines / stepsX) * i), cHeightYLines);
            cYLines.stroke();
          }
          cYLines.closePath();

          // Initialize months
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

          // Draw text for each month, evenly spaced out throughout the canvas
          ctYText.font = "13px Arial";
          var counterX = 1;
          for (var month in months) {
            ctYText.fillText(months[month], ((cWidthYText / months.length) * counterX) - 43, (cHeightYText - 35));
            counterX++;
          }

          // Draw X-axis label
          ctYText.font = "16px Arial";
          ctYText.fillText("Months", (cWidthYText / 2) - 30, cHeightYText - 5);

          // Initialize temps
          var temps = ["-5", "0", "5", "10", "15", "20", "25"];

          // Draw text for each temperature label, evenly spaced out throughout the canvas
          cText.font = "13px Arial";
          var counterY = 1;
          for (var temp in temps) {
            cText.fillText(temps[temp], (cWidthXText - 20), (cHeightXText + 10) - (cHeightXText / temps.length) * counterY);
            counterY++;
          }

          // Draw Y-axis label
          cText.rotate(270 * Math.PI / 180);
          cText.font = "16px Arial";
          cText.fillText("Temperature in degrees Celsius", (-cHeightXText + 70), 12);

        }
    };
    xhttp.open("get", "data.csv", true);
    xhttp.send();
}
