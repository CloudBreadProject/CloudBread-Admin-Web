var HAU_list = new Array();

//HAU Data
function callHAU() {
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$top=15&$filter=CategoryName%20eq%20'HAU'&$orderby=Fields%20desc",
    dataType: "text",
    error: function() {
      //handled error
    },
    success: function(data) {
      //anything
    }
  }).done(function(data) {
    HAU_list = [];
    var pars = JSON.parse(data);
    var value = pars['value'];
    var max = (value.length != 15) ? value.length-1 : 14

    if(value.length == 0) {
      alert('Not exist "HAU" Data anything');
      return;
    }

    for (var i = max; i >= 0; i--) {
      var dataset = {
        'Field': value[i]['Fields'],
        'Count': Number(value[i]['CountNum'])
      };
      HAU_list.push(dataset);
    }
    google.charts.setOnLoadCallback(drawHAUGraph);
    $("#graph_loading").empty();
  });
}

function drawHAUGraph() {
  var HAU_data = new google.visualization.DataTable();
  HAU_data.addColumn('string', 'Time of Day');
  HAU_data.addColumn('number', '방문 유저 수');

  for (i = 0; i < HAU_list.length; i++) {
    var hour = HAU_list[i]['Field'].substring(8, 10);
    var day = HAU_list[i]['Field'].substring(6, 8);
    HAU_data.addRows([
      [{
        v: day + "." + hour
      }, Number(HAU_list[i]['Count'])]
    ]);
  }
  var HAU_options = {
    title: 'HAU 시간별 활동 유저수',
    isStacked: true,
    hAxis: {
      title: 'Hour'
    },
    vAxis: {
      title: 'HAU (명)'
    },
    backgroundColor: '#FFF'
  };
  
  var chart = new google.visualization.ColumnChart(document.getElementById('HAU_div'));
  chart.draw(HAU_data, HAU_options);
}

$(window).resize(function() {
  if(document.getElementById('HAU_div')) {
    drawHAUGraph();
  }
});
