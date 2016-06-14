var Members = new Array();
var Selmem = new Array();

var content_csv = [[]];

var host = '/';

function getDBData() {
  var pro_members = new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      url: host + "odata/Members?$top=1",
      dataType: "text",
      error: function() {
        reject("Fail");
        alert('Host not found! Please check the host name.');
      },
      success: function(data) {
        var pars = JSON.parse(data);
        var value = pars['value'];
        var col_name = Object.keys(value[0]);
        for(var i = 0; i < col_name.length; i++) {
          Members[i] = col_name[i];
        }
        resolve("Complete");
      }
    });
  });

  Promise.all([pro_members]).then(function() {
    $("#submit_loading").empty();
    $("#SelectCol").append('<br><br>Member Table<br>');
    for(var i = 0; i < Members.length; i++) {
      $("#SelectCol").append('<input type="checkbox" id="' + Members[i] + '">' +
        '<label for="' + Members[i] + '">' + Members[i] + '</label>');
    }
    $("#SelectCol").append('<br><button onclick="makeCSV()">Make CSV file</button>');
  });
}

function checkBtn(sel_arr, all_arr) {
  for(var i = 0; i < all_arr.length; i++) {
    if ($('#' + all_arr[i]).is(":checked")) {
      sel_arr.push(all_arr[i]);
    }
  }
}

function makeCSV() {
  $("#submit_loading").append('<br>' +
    'Loading...<br>' +
    '<div id="loading">●</div>'
  );
  checkBtn(Selmem, Members);
  for(var i = 0; i < Selmem.length; i++) {
    content_csv[0][i] = Selmem[i];
  }

  var pro_mem_list = new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      url: host + "odata/Members",
      dataType: "text",
      error: function() {
        reject("Fail");
        alert('Host not found! Please check the host name.');
      },
      success: function(data) {
        var pars = JSON.parse(data);
        var value = pars['value'];

        for(var i = 0; i < value.length; i++) {
          content_csv[i+1] = [];
          for(var j = 0; j < Selmem.length; j++) {
            content_csv[i+1][j] = value[i][Selmem[j]];
          }
        }
        resolve("Complete");
      }
    })
  });

  Promise.all([pro_mem_list]).then(function() {
    function convertArrayToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }
    // Make Data obj's array
    var data, link, filename;
    var csvData = [];
    var tempObj;
    for(var i = 1; content_csv.length; i++) {
      tempObj = {};
      for(var j = 0; content_csv[0].length; j++) {
        tempObj[content_csv[0][j]] = content_csv[i][j];
      }
      csvData[i].push(tempObj);
    }

    // convert csv format
    var csv = convertArrayToCSV({data: csvData});
    filename = 'user_data.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
    $("$submit_loading").empty();
  });
}
