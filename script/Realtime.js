var HAU_list = new Array();

//HAU Data
function callHAU() {
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'HAU'&$orderby=Fields%20asc",
    dataType: "text",
    error: function() {
      //handled error
    },
    success: function(data) {
      //anything
    }
  }).done(function(data) {
    var i = 1;
    var pars = JSON.parse(data);
    var value = pars['value'];

    var field_fst = value[0]['Fields'];
    var count_max = Number(value[0]['CountNum']);

    for (; i < value.length; i++) {
      if (field_fst != value[i]['Fields']) {
        var dataset = {
          'Field': field_fst,
          'Count': count_max
        };
        HAU_list.push(dataset);
        field_fst = value[i]['Fields'];
      }
      count_max = Number(value[i]['CountNum']);
    }
    var dataset = {
      'Field': field_fst,
      'Count': count_max
    };
    HAU_list.push(dataset);
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
  $('.graph').empty();
  $('#Graph1').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'HAU(시간별 활동 유저수)' +
      '</div>' +
    '</div>' +
    '<div id="HAU_div"></div>'
  );
  var chart = new google.visualization.ColumnChart(document.getElementById('HAU_div'));
  chart.draw(HAU_data, HAU_options);
}

$(window).resize(function() {
  if(document.getElementById('HAU_div')) {
    drawHAUGraph();
  }
});
