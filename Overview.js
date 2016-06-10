google.charts.load('current', {
  packages: ['corechart', 'line']
});

var host = "/";
var DAU_list = new Array();
var DARPU_list = new Array();
var HAU_list = new Array();

//DAU Data
$.ajax({
  type: "GET",
  url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'DAU'&$orderby=Fields%20asc",
  dataType: "text",
  error: function() {
    alert('Host not found! Please check the host name.');
  },
  success: function(data) {
    console.log(data);
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
      console.log("loop");
      var dataset = {
        'Field': field_fst,
        'Count': count_max
      };
      DAU_list.push(dataset);
      field_fst = value[i]['Fields'];
      count_max = Number(value[i]['CountNum']);
    } else {
      if (count_max < Number(value[i]['CountNum'])) {
        count_max = Number(value[i]['CountNum']);
      }
    }
  }
  var dataset = {
    'Field': field_fst,
    'Count': count_max
  };
  DAU_list.push(dataset);
  google.charts.setOnLoadCallback(drawDAUGraph);
  $("#graph_loading").empty();
});

//DARPU Data
$.ajax({
  type: "GET",
  url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'DARPU'&$orderby=Fields%20asc",
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
      DARPU_list.push(dataset);
      field_fst = value[i]['Fields'];
      count_max = Number(value[i]['CountNum']);
    } else {
      if (count_max < Number(value[i]['CountNum'])) {
        count_max = Number(value[i]['CountNum']);
      }
    }
  }
  var dataset = {
    'Field': field_fst,
    'Count': count_max
  };
  DARPU_list.push(dataset);
  google.charts.setOnLoadCallback(drawDARPUGraph);
  $("#graph_loading").empty();
});

//HAU Data
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
      count_max = Number(value[i]['CountNum']);
    } else {
      if (count_max < Number(value[i]['CountNum'])) {
        count_max = Number(value[i]['CountNum']);
      }
    }
  }
  var dataset = {
    'Field': field_fst,
    'Count': count_max
  };
  DARPU_list.push(dataset);
  google.charts.setOnLoadCallback(drawHAUGraph);
  $("#graph_loading").empty();
});

function drawDAUGraph() {
  var DAU_data = new google.visualization.DataTable();
  DAU_data.addColumn('string', 'Time of Day');
  DAU_data.addColumn('number', '재방문 유저');
  DAU_data.addColumn('number', '신규 유저');

  for (i = 0; i < DAU_list.length; i++) {
    var mon = DAU_list[i]['Field'].substring(4, 6);
    var day = DAU_list[i]['Field'].substring(6, 8);
    DAU_data.addRows([
      [{
        v: mon + '/' + day
      }, Number(DAU_list[i]['Count']), 1]
    ]);
  }
  var DAU_options = {
    title: 'DAU 일일 활동 유저수',
    isStacked: true,
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'DAU (명)'
    },
    backgroundColor: '#FFF',
    legend: {position: 'top', maxLines: 1, alignment: 'end'}
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('DAU_div'));
  chart.draw(DAU_data, DAU_options);
}

function drawDARPUGraph() {
  var DARPU_data = new google.visualization.DataTable();
  DARPU_data.addColumn('string', 'Time of Day');
  DARPU_data.addColumn('number', '수입 ($)');

  for (i = 0; i < DARPU_list.length; i++) {
    var mon = DARPU_list[i]['Field'].substring(4, 6);
    var day = DARPU_list[i]['Field'].substring(6, 8);
    DARPU_data.addRows([
      [{
        v: mon + '/' + day
      }, Number(DARPU_list[i]['Count'])]
    ]);
  }
  var DARPU_options = {
    title: 'DARPU 유저 한명당 일 평균 매출',
    isStacked: true,
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'DARPU ($/명)'
    },
    backgroundColor: '#FFF'
  };
  var chart = new google.visualization.LineChart(document.getElementById('DARPU_div'));
  chart.draw(DARPU_data, DARPU_options);
}

function drawHAUGraph() {
  var HAU_data = new google.visualization.DataTable();
  HAU_data.addColumn('string', 'Time of Day');
  HAU_data.addColumn('number', '재방문 유저');
  HAU_data.addColumn('number', '신규 유저');

  for (i = 0; i < HAU_list.length; i++) {
    var hour = HAU_list[i]['Field'].substring(8, 10);
    var day = HAU_list[i]['Field'].substring(6, 8);
    HAU_data.addRows([
      [{
        v: day + "." + hour
      }, Number(HAU_list[i]['Count']), 1]
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
  drawDAUGraph();
  drawDARPUGraph();
  drawHAUGraph();
});
