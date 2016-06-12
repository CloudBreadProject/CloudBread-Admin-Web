var DARPU_list = new Array();
var DPU_list = new Array();
var FPU_list = new Array();
var WPU_list = new Array();
var MPU_list = new Array();

function callPU() {
  callDPU();
  callWPU();
  callMPU();
}

//DARPU Data
function callDARPU() {
  DARPU_list = [];
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$top=10&$filter=CategoryName%20eq%20'DARPU'&$orderby=Fields%20desc",
    dataType: "text",
    error: function() {
      //handled error
    },
    success: function(data) {
      //anything
    }
  }).done(function(data) {
    var pars = JSON.parse(data);
    var value = pars['value'];
    var max = (value.length != 10) ? value.length-1 : 9

    if(value.length == 0) {
      alert('Not exist "DARPU" Data anything');
      return;
    }

    for (var i = max; i >= 0; i--) {
      var dataset = {
        'Field': value[i]['Fields'],
        'Count': Number(value[i]['CountNum'])
      };
      DARPU_list.push(dataset);
    }
    google.charts.setOnLoadCallback(drawDARPUGraph);
    $("#graph_loading").empty();
  });
}

//DPU Data
function callDPU() {
  DPU_list = [];
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$top=10&$filter=CategoryName%20eq%20'DPU'&$orderby=Fields%20desc",
    dataType: "text",
    error: function() {
      //handled error
    },
    success: function(data) {
      //anything
    }
  }).done(function(data) {
    var pars = JSON.parse(data);
    var value = pars['value'];
    var max = (value.length != 10) ? value.length-1 : 9

    if(value.length == 0) {
      alert('Not exist "DPU" Data anything');
      return;
    }

    for (var i = max; i >= 0; i--) {
      var dataset = {
        'Field': value[i]['Fields'],
        'Count': Number(value[i]['CountNum'])
      };
      DPU_list.push(dataset);
    }
    google.charts.setOnLoadCallback(drawDPUGraph);
    $("#graph_loading").empty();
  });
}

//FPU Data
function callFPU() {
  FPU_list = [];
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$top=10&$filter=CategoryName%20eq%20'FPU'&$orderby=Fields%20desc",
    dataType: "text",
    error: function() {
      //handled error
    },
    success: function(data) {
      //anything
    }
  }).done(function(data) {
    var pars = JSON.parse(data);
    var value = pars['value'];
    var max = (value.length != 10) ? value.length-1 : 9

    if(value.length == 0) {
      alert('Not exist "FPU" Data anything');
      return;
    }

    for (var i = max; i >= 0; i--) {
      var dataset = {
        'Field': value[i]['Fields'],
        'Count': Number(value[i]['CountNum'])
      };
      FPU_list.push(dataset);
    }
    google.charts.setOnLoadCallback(drawFPUGraph);
    $("#graph_loading").empty();
  });
}

//WPU Data
function callWPU() {
  WPU_list = [];
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$top=5&$filter=CategoryName%20eq%20'WPU'&$orderby=Fields%20desc",
    dataType: "text",
    error: function() {
      //handled error
    },
    success: function(data) {
      //anything
    }
  }).done(function(data) {
    var pars = JSON.parse(data);
    var value = pars['value'];
    var max = (value.length != 5) ? value.length-1 : 4

    if(value.length == 0) {
      alert('Not exist "WAU" Data anything');
      return;
    }

    for (var i = max; i >= 0; i--) {
      var dataset = {
        'Field': value[i]['Fields'],
        'Count': Number(value[i]['CountNum'])
      };
      WPU_list.push(dataset);
    }
    google.charts.setOnLoadCallback(drawWPUGraph);
    $("#graph_loading").empty();
  });
}

//MPU Data
function callMPU() {
  MPU_list = [];
  $.ajax({
    type: "GET",
    url: host + "odata/StatsDatas?$top=2&$filter=CategoryName%20eq%20'MPU'&$orderby=Fields%20desc",
    dataType: "text",
    error: function() {
      //handled error
    },
    success: function(data) {
      //anything
    }
  }).done(function(data) {
    var pars = JSON.parse(data);
    var value = pars['value'];
    var max = (value.length != 2) ? value.length-1 : 1

    if(value.length == 0) {
      alert('Not exist "MPU" Data anything');
      return;
    }

    for (var i = max; i >= 0; i--) {
      var dataset = {
        'Field': value[i]['Fields'],
        'Count': Number(value[i]['CountNum'])
      };
      MPU_list.push(dataset);
    }
    google.charts.setOnLoadCallback(drawMPUGraph);
    $("#graph_loading").empty();
  });
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
  $('.graph').empty();
  $('#Graph1').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'DARPU(일일 유저 한명당 일 평균 매출)' +
      '</div>' +
    '</div>' +
    '<div id="DARPU_div"></div>'
  );
  var chart = new google.visualization.LineChart(document.getElementById('DARPU_div'));
  chart.draw(DARPU_data, DARPU_options);
}

function drawDPUGraph() {
  var DPU_data = new google.visualization.DataTable();
  DPU_data.addColumn('string', 'Time of Day');
  DPU_data.addColumn('number', '횟수');

  for (i = 0; i < DPU_list.length; i++) {
    var mon = DPU_list[i]['Field'].substring(4, 6);
    var day = DPU_list[i]['Field'].substring(6, 8);
    DPU_data.addRows([
      [{
        v: mon + '/' + day
      }, Number(DPU_list[i]['Count'])]
    ]);
  }
  var DPU_options = {
    title: 'DPU 일일 결제수',
    isStacked: true,
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'DPU (횟수)'
    },
    backgroundColor: '#FFF'
  };
  $('#Graph1').empty();
  $('#Graph1').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'DPU(일일 결제수)' +
      '</div>' +
    '</div>' +
    '<div id="DPU_div"></div>'
  );
  var chart = new google.visualization.LineChart(document.getElementById('DPU_div'));
  chart.draw(DPU_data, DPU_options);
}

function drawFPUGraph() {
  var FPU_data = new google.visualization.DataTable();
  FPU_data.addColumn('string', 'Time of Day');
  FPU_data.addColumn('number', '명');

  for (i = 0; i < FPU_list.length; i++) {
    var mon = FPU_list[i]['Field'].substring(4, 6);
    var day = FPU_list[i]['Field'].substring(6, 8);
    FPU_data.addRows([
      [{
        v: mon + '/' + day
      }, Number(FPU_list[i]['Count'])]
    ]);
  }
  var FPU_options = {
    title: 'FPU 최초결제 유저수',
    isStacked: true,
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'FPU (명)'
    },
    backgroundColor: '#FFF'
  };
  $('.graph').empty();
  $('#Graph1').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'FPU(최초결제 유저수)' +
      '</div>' +
    '</div>' +
    '<div id="FPU_div"></div>'
  );
  var chart = new google.visualization.LineChart(document.getElementById('FPU_div'));
  chart.draw(FPU_data, FPU_options);
}

function drawWPUGraph() {
  var WPU_data = new google.visualization.DataTable();
  WPU_data.addColumn('string', 'Time of Week');
  WPU_data.addColumn('number', '횟수');

  for (i = 0; i < WPU_list.length; i++) {
    var mon = WPU_list[i]['Field'].substring(4, 6);
    var day = WPU_list[i]['Field'].substring(6, 8);
    WPU_data.addRows([
      [{
        v: mon + '/' + day
      }, Number(WPU_list[i]['Count'])]
    ]);
  }
  var WPU_options = {
    title: 'WPU 주간 결제수',
    isStacked: true,
    hAxis: {
      title: 'Week'
    },
    vAxis: {
      title: 'WPU (횟수)'
    },
    backgroundColor: '#FFF'
  };
  $('#Graph2').empty();
  $('#Graph2').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'WPU(주간 결제수)' +
      '</div>' +
    '</div>' +
    '<div id="WPU_div"></div>'
  );
  var chart = new google.visualization.LineChart(document.getElementById('WPU_div'));
  chart.draw(WPU_data, WPU_options);
}

function drawMPUGraph() {
  var MPU_data = new google.visualization.DataTable();
  MPU_data.addColumn('string', 'Time of Month');
  MPU_data.addColumn('number', '횟수');

  for (i = 0; i < MPU_list.length; i++) {
    var mon = MPU_list[i]['Field'].substring(4, 6);
    var day = MPU_list[i]['Field'].substring(6, 8);
    MPU_data.addRows([
      [{
        v: mon + '/' + day
      }, Number(MPU_list[i]['Count'])]
    ]);
  }
  var MPU_options = {
    title: 'MPU 월간 결제수',
    isStacked: true,
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'MPU (횟수)'
    },
    backgroundColor: '#FFF'
  };
  $('#Graph3').empty();
  $('#Graph3').append('<div class="graph_main">' +
      '<div style="margin-top:27px; margin-left:29px;">' +
        'MPU(월간 결제수)' +
      '</div>' +
    '</div>' +
    '<div id="MPU_div"></div>'
  );
  var chart = new google.visualization.LineChart(document.getElementById('MPU_div'));
  chart.draw(MPU_data, MPU_options);
}

$(window).resize(function() {
  if(document.getElementById('DARPU_div')) {
    drawDARPUGraph();
  }
  else if(document.getElementById('DPU_div')) {
    drawDPUGraph();
    drawWPUGraph();
    drawMPUGraph();
  }
  else if(document.getElementById('FPU_div')) {
    drawFPUGraph();
  }
});
