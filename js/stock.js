  // returns date in year-month-date format
  function getDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    return yyyy + '-' + mm + '-' + dd;
  }

  $(document).ready(function() {
    // Get the name from text field
    $('#btn').on('click', function() {
      var name = $('input').val();

      //json request url
      var prefix = "https://www.quandl.com/api/v1/datasets/WIKI/";
      var mid = ".json?trim_start=";
      var suffix = "&auth_token=1DA7DeyRx4GoZViFE8dd";

      //get today's and week ago's date
      var today = new Date();
      var oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      weekAgo = getDate(oneWeekAgo);

      //complete url
      var url = prefix + name + mid + weekAgo + suffix;
      //alert(url);
      $.getJSON(url, function(data) {
        //console.log(data)
        var stock = data['data'];

        var dates = [];  // dates
        var open = []; // open values
        var high = [];
        var low = [];
        var close = [];

        for(i = stock.length-1; i >= 0; i--) {
          dates.push(stock[i][0]);
          open.push(stock[i][1]);
          high.push(stock[i][2]);
          low.push(stock[i][3]);
          close.push(stock[i][4]);
        }


        var plot = {
          labels: dates,
          series: [{ name: 'Open', data: open}, {name: 'High', data: high}, {name: 'Low', data: low}, {name: 'Close', data: close}]
        }

        // var plugins = {
        //   plugins: [
        //     Chartist.plugins.ctPointLabels({
        //       textAnchor: 'middle'
        //     })
        //   ]
        // }

        // We are setting a few options for our chart and override the defaults
        var options = {
          // Don't draw the line chart points
          showPoint: true,
          // Disable line smoothing
          lineSmooth: true,
          // X-Axis specific configuration
          axisX: {
            // We can disable the grid for this axis
            showGrid: true,
            // and also don't show the label
            showLabel: true
          },
          // Y-Axis specific configuration
          axisY: {
            // Lets offset the chart a bit from the labels
            offset: 60,
            // The label interpolation function enables you to modify the values
            // used for the labels on each axis. Here we are converting the
            // values into million pound.
            // labelInterpolationFnc: function(value) {
            //   return '$' + value + 'B';
            // }
          }
      };


        new Chartist.Line('.ct-chart', plot, options);
      })
      .error(function() { alert("The requested entity does not exist"); });

    });

  });



  //json request url
  var prefix = "https://www.quandl.com/api/v1/datasets/NASDAQOMX/NDX.json?trim_start=";
  var mid = "&trim_end=";
  var suffix = "&auth_token=1DA7DeyRx4GoZViFE8dd";

  //get today's and week ago's date
  var today = new Date();
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  today = getDate(today)
  weekAgo = getDate(oneWeekAgo)

  //complete url
  var url = prefix + weekAgo + mid + today + suffix;

  console.log(url);

  $.getJSON(url, function(data) {
    console.log(data);
    var stock = data['data'];

    var dates = [];  // dates
    var values = []; // index values
    var high = [];
    var low = [];
    for(i = stock.length-1; i >= 0; i--) {
      dates.push(stock[i][0]);
      values.push(stock[i][1]);
      high.push(stock[i][2]);
      low.push(stock[i][3]);
    }


    console.log(dates.length)
    console.log(values.length)
    var plot = {
      labels: dates,
      series: [values, high, low]
    }
    // We are setting a few options for our chart and override the defaults
    var options = {
      // Don't draw the line chart points
      showPoint: true,
      // Disable line smoothing
      lineSmooth: true,
      // X-Axis specific configuration
      axisX: {
        // We can disable the grid for this axis
        showGrid: true,
        // and also don't show the label
        showLabel: true
      },
      // Y-Axis specific configuration
      axisY: {
        // Lets offset the chart a bit from the labels
        offset: 60,
        // The label interpolation function enables you to modify the values
        // used for the labels on each axis. Here we are converting the
        // values into million pound.
        labelInterpolationFnc: function(value) {
          return '$' + value + 'B';
        }
      }
  };

    new Chartist.Line('.ct-chart', plot, options);
  });