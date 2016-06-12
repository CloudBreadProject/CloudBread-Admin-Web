google.charts.load('current', {
  packages: ['corechart', 'line']
});

var host = "/";
var DAU_list = new Array();
var DPA_list = new Array();
var WAU_list = new Array();
var MAU_list = new Array();

function callAU() {
  callDAU();
  callWAU();
  callMAU();
}

//DAU Data
function callDAU() {
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'DAU'&$orderby=Fields%20asc",
    dataType: "text",
    error: function() {
      alert('Host not found! Please check the host name.');
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
        DAU_list.push(dataset);
        field_fst = value[i]['Fields'];
      }
        count_max = Number(value[i]['CountNum']);
    }
    var dataset = {
      'Field': field_fst,
      'Count': count_max
    };
    DAU_list.push(dataset);
    google.charts.setOnLoadCallback(drawDAUGraph);
    $("#graph_loading").empty();
  });
}

//DPA Data
function callDPA() {
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'DPA'&$orderby=Fields%20asc",
    dataType: "text",
    error: function() {
      alert('Host not found! Please check the host name.');
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
        DPA_list.push(dataset);
        field_fst = value[i]['Fields'];
      }
        count_max = Number(value[i]['CountNum']);
    }
    var dataset = {
      'Field': field_fst,
      'Count': count_max
    };
    DPA_list.push(dataset);
    google.charts.setOnLoadCallback(drawDPAGraph);
    $("#graph_loading").empty();
  });
}

//WAU Data
function callWAU() {
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'WAU'&$orderby=Fields%20asc",
    dataType: "text",
    error: function() {
      alert('Host not found! Please check the host name.');
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
        WAU_list.push(dataset);
        field_fst = value[i]['Fields'];
      }
        count_max = Number(value[i]['CountNum']);
    }
    var dataset = {
      'Field': field_fst,
      'Count': count_max
    };
    WAU_list.push(dataset);
    google.charts.setOnLoadCallback(drawWAUGraph);
    $("#graph_loading").empty();
  });
}

//MAU Data
function callMAU() {
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$filter=CategoryName%20eq%20'MAU'&$orderby=Fields%20asc",
    dataType: "text",
    error: function() {
      alert('Host not found! Please check the host name.');
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
        MAU_list.push(dataset);
        field_fst = value[i]['Fields'];
      }
        count_max = Number(value[i]['CountNum']);
    }
    var dataset = {
      'Field': field_fst,
      'Count': count_max
    };
    MAU_list.push(dataset);
    google.charts.setOnLoadCallback(drawMAUGraph);
    $("#graph_loading").empty();
  });
}

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

  $('#Graph1').empty();
  $('#Graph1').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'DAU(일일 활성 유저수)' +
      '</div>' +
    '</div>' +
    '<div id="DAU_div"></div>'
  );
  var chart = new google.visualization.ColumnChart(document.getElementById('DAU_div'));
  chart.draw(DAU_data, DAU_options);
}

function drawDPAGraph() {
  var DPA_data = new google.visualization.DataTable();
  DPA_data.addColumn('string', 'Time of Day');
  DPA_data.addColumn('number', '수입 ($)');

  for (i = 0; i < DPA_list.length; i++) {
    var mon = DPA_list[i]['Field'].substring(4, 6);
    var day = DPA_list[i]['Field'].substring(6, 8);
    DPA_data.addRows([
      [{
        v: mon + '/' + day
      }, Number(DPA_list[i]['Count'])]
    ]);
  }
  var DPA_options = {
    title: 'DPA 일일 매출액',
    isStacked: true,
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'DPA ($)'
    },
    backgroundColor: '#FFF'
  };
  $('.graph').empty();
  $('#Graph1').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'DPA(일일 매출액)' +
      '</div>' +
    '</div>' +
    '<div id="DPA_div"></div>'
  );
  var chart = new google.visualization.LineChart(document.getElementById('DPA_div'));
  chart.draw(DPA_data, DPA_options);
}

function drawWAUGraph() {
  var WAU_data = new google.visualization.DataTable();
  WAU_data.addColumn('string', 'Time of Week');
  WAU_data.addColumn('number', '유저 수 (명)');

  for (i = 0; i < WAU_list.length; i++) {
    var mon = WAU_list[i]['Field'].substring(4, 6);
    var day = WAU_list[i]['Field'].substring(6, 8);
    WAU_data.addRows([
      [{
        v: mon + '/' + day
      }, Number(WAU_list[i]['Count'])]
    ]);
  }
  var WAU_options = {
    title: 'WAU 주간 활동 유저수',
    isStacked: true,
    hAxis: {
      title: 'Week'
    },
    vAxis: {
      title: 'WAU (명)'
    },
    backgroundColor: '#FFF'
  };
  $('#Graph2').empty();
  $('#Graph2').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'WAU(주간 활성 유저수)' +
      '</div>' +
    '</div>' +
    '<div id="WAU_div"></div>'
  );
  var chart = new google.visualization.ColumnChart(document.getElementById('WAU_div'));
  chart.draw(WAU_data, WAU_options);
}

function drawMAUGraph() {
  var MAU_data = new google.visualization.DataTable();
  MAU_data.addColumn('string', 'Time of Month');
  MAU_data.addColumn('number', '유저 수 (명)');

  for (i = 0; i < MAU_list.length; i++) {
    var mon = MAU_list[i]['Field'].substring(4, 6);
    var day = MAU_list[i]['Field'].substring(6, 8);
    MAU_data.addRows([
      [{
        v: mon
      }, Number(MAU_list[i]['Count'])]
    ]);
  }
  var MAU_options = {
    title: 'MAU 월간 활동 유저수',
    isStacked: true,
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'MAU (명)'
    },
    backgroundColor: '#FFF'
  };
  $('#Graph3').empty();
  $('#Graph3').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'MAU(월간 활성 유저수)' +
      '</div>' +
    '</div>' +
    '<div id="MAU_div"></div>'
  );
  var chart = new google.visualization.ColumnChart(document.getElementById('MAU_div'));
  chart.draw(MAU_data, MAU_options);
}

$(window).resize(function() {
  if(document.getElementById('DAU_div')) {
    drawDAUGraph();
    drawWAUGraph();
    drawMAUGraph();
  }
  else if(document.getElementById('DPA_div')) {
    drawDPAGraph();
  }
});
