var Dormant15_list = new Array();
var Dormant30_list = new Array();

function callDormant() {
  //Dormant15 Data
  var pro_Dormant15 = new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'Dormant15'&$orderby=Fields%20asc",
      dataType: "text",
      error: function() {
        reject();
        //handled error
      },
      success: function(data) {
        //anything
      }
    }).done(function(data) {
      Dormant15_list = [];
      var max = 0;
      var pars = JSON.parse(data);
      var value = pars['value'];
      var data_num_gap = value.length;
      if(value.length == 0) {
        alert('Not exist Data anything');
        return;
      }
      var field_fst = value[0]['Fields'];
      var count_max = Number(value[0]['CountNum']);
      max = (value.length > 10) ? 10 : value.length;
      data_num_gap = ((data_num_gap - max) > 0) ? (data_num_gap - max) : 0;

      for (var i = data_num_gap; i < max; i++) {
        if (field_fst != value[i]['Fields']) {
          var dataset = {
            'Field': field_fst,
            'Count': count_max
          };
          Dormant15_list.push(dataset);
          field_fst = value[i]['Fields'];
        }
          count_max = Number(value[i]['CountNum']);
      }
      var dataset = {
        'Field': field_fst,
        'Count': count_max
      };
      Dormant15_list.push(dataset);
      resolve("Complete");
    });
  });

  //Dormant30 Data
  var pro_Dormant30 = new Promise(function (resolve, reject) {
    Dormant30_list = [];
    $.ajax({
      type: "GET",
      url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'Dormant30'&$orderby=Fields%20asc",
      dataType: "text",
      error: function() {
        reject();
        //handled error
      },
      success: function(data) {
        //anything
      }
    }).done(function(data) {
      var max = 0;
      var pars = JSON.parse(data);
      var value = pars['value'];
      var data_num_gap = value.length;
      if(value.length == 0) {
        alert('Not exist Data anything');
        return;
      }
      var field_fst = value[0]['Fields'];
      var count_max = Number(value[0]['CountNum']);
      max = (value.length > 10) ? 10 : value.length;
      data_num_gap = ((data_num_gap - max) > 0) ? (data_num_gap - max) : 0;

      for (var i = data_num_gap; i < max; i++) {
        if (field_fst != value[i]['Fields']) {
          var dataset = {
            'Field': field_fst,
            'Count': count_max
          };
          Dormant30_list.push(dataset);
          field_fst = value[i]['Fields'];
        }
          count_max = Number(value[i]['CountNum']);
      }
      var dataset = {
        'Field': field_fst,
        'Count': count_max
      };
      Dormant30_list.push(dataset);
      resolve("Complete");
    });
  });

  Promise.all([pro_Dormant15, pro_Dormant30]).then(function() {
    google.charts.setOnLoadCallback(drawDormantGraph);
    $("#graph_loading").empty();
  });
}

function drawDormantGraph() {
  var Dormant_data = new google.visualization.DataTable();
  Dormant_data.addColumn('string', 'Time of Day');
  Dormant_data.addColumn('number', '30일 휴면유저');
  Dormant_data.addColumn('number', '15일 휴면유저');

  for (i = 0; i < Dormant15_list.length; i++) {
    var hour = Dormant15_list[i]['Field'].substring(8, 10);
    var day = Dormant15_list[i]['Field'].substring(6, 8);
    Dormant_data.addRows([
      [{
        v: day + "." + hour
      }, Number(Dormant30_list[i]['Count']), Number(Dormant15_list[i]['Count'])]
    ]);
  }
  var Dormant_options = {
    title: 'Dormant 휴면유저',
    isStacked: true,
    hAxis: {
      title: 'Day'
    },
    vAxis: {
      title: 'Dormant (명)'
    },
    backgroundColor: '#FFF'
  };
  $('.graph').empty();
  $('#Graph1').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'Dormant(휴면유저)' +
      '</div>' +
    '</div>' +
    '<div id="Dormant_div"></div>'
  );
  var chart = new google.visualization.ColumnChart(document.getElementById('Dormant_div'));
  chart.draw(Dormant_data, Dormant_options);
}

$(window).resize(function() {
  if(document.getElementById('Dormant_div')) {
    drawDormantGraph();
  }
});
