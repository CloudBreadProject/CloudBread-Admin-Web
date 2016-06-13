var Members = new Array();
var Gift = new Array();
var Game = new Array();
var Purchase = new Array();

var Selmem = new Array();
var Selgift = new Array();
var Selgame = new Array();
var Selpur = new Array();

var content_csv = new Array();

var host = '/';
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
      var col_name = Object.keys(value);
      for(var name in col_name) {
        Members.push(name);
        console.log(name);
      }
      resolve("Complete");
    }
  });
});

var pro_gift = new Promise(function (resolve, reject) {
  $.ajax({
    type: "GET",
    url: host + "odata/GiftDepositories?$top=1",
    dataType: "text",
    error: function() {
      reject("Fail");
    },
    success: function(data) {
      var pars = JSON.parse(data);
      var value = pars['value'];
      var col_name = Object.keys(value);
      for(var name in col_name) {
        Gift.push(name);
      }
      resolve("Complete");
    }
  });
});

var pro_game = new Promise(function (resolve, reject) {
  $.ajax({
    type: "GET",
    url: host + "odata/MemberGameInfoes?$top=1",
    dataType: "text",
    error: function() {
      reject("Fail");
    },
    success: function(data) {
      var pars = JSON.parse(data);
      var value = pars['value'];
      var col_name = Object.keys(value);
      for(var name in col_name) {
        Game.push(name);
      }
      resolve("Complete");
    }
  });
});

var pro_purchase = new Promise(function (resolve, reject) {
  $.ajax({
    type: "GET",
    url: host + "odata/MemberItemPurchases?$top=1",
    dataType: "text",
    error: function() {
      reject("Fail");
    },
    success: function(data) {
      var pars = JSON.parse(data);
      var value = pars['value'];
      var col_name = Object.keys(value);
      for(var name in col_name) {
        Purchase.push(name);
      }
      resolve("Complete");
    }
  });
});
function makeCheckbtn(arr, str) {
  console.log(arr);
  console.log(str);
  $("#MLstart").append('<br><br>' + str + '<br>');
  for(var str_arr in arr) {
    $("#MLstart").append('<input type="checkbox" id="' + str_arr + '">' +
      '<label for="' + str_arr + '">' + str_arr + '</label>');
  }
}
function checkBtn(sel_arr, all_arr) {
  for(var str in all_arr) {
    if ($('#' + str).is(":checked")) {
      sel_arr.push(str);
    }
  }
}
function inputContent() {
  var len = 0;
  for(var str in Selmem) {
    content_csv[0][len] = str;
    len++;
  }
  for(var str in Selgift) {
    content_csv[0][len] = str;
    len++;
  }
  for(var str in Selgame) {
    content_csv[0][len] = str;
    len++;
  }
  for(var str in Selpur) {
    content_csv[0][len] = str;
    len++;
  }
}
Promise.all([pro_members, pro_gift, pro_game, pro_purchase]).then(function() {
  $("#submit_loading").empty();
  makeCheckbtn(Members, 'Member Table');
  makeCheckbtn(Gift, 'Gift Table');
  makeCheckbtn(Game, 'GameInfo Table');
  makeCheckbtn(Purchase, 'Purchase Table');
  $("#MLstart").append('<br><button id="makeCSV">Make CSV file</button>');
});

$("#makeCSV").click(function () {
  $("#submit_loading").append('<br>' +
    'Loading...<br>' +
    '<div id="loading">●</div>'
  );
  checkBtn(Selmem, Members);
  checkBtn(Selgift, Gift);
  checkBtn(Selgame, Game);
  checkBtn(Selpur, Purchase);
  inputContent();

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
          for(var j = 0; j < Selmem[j].length; j++) {
            content_csv[i+1][j] = value[i][Selmem[j]];
          }
        }
        resolve("Complete");
      }
    });
  });

  var pro_gift_list = new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      url: host + "odata/GiftDepositories",
      dataType: "text",
      error: function() {
        reject("Fail");
      },
      success: function(data) {
        var pars = JSON.parse(data);
        var value = pars['value'];

        for(var i = 0; i < value.length; i++) {
          for(var j = 0; j < Selgift[j].length; j++) {
            content_csv[i+1][j] = value[i][Selgift[j]];
          }
        }
        resolve("Complete");
      }
    });
  });

  var pro_game_list = new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      url: host + "odata/MemberGameInfoes",
      dataType: "text",
      error: function() {
        reject("Fail");
      },
      success: function(data) {
        var pars = JSON.parse(data);
        var value = pars['value'];

        for(var i = 0; i < value.length; i++) {
          for(var j = 0; j < Selgame[j].length; j++) {
            content_csv[i+1][j] = value[i][Selgame[j]];
          }
        }
        resolve("Complete");
      }
    });
  });

  var pro_pur_list = new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      url: host + "odata/MemberItemPurchases",
      dataType: "text",
      error: function() {
        reject("Fail");
      },
      success: function(data) {
        var pars = JSON.parse(data);
        var value = pars['value'];

        for(var i = 0; i < value.length; i++) {
          for(var j = 0; j < Selpur[j].length; j++) {
            content_csv[i+1][j] = value[i][Selpur[j]];
          }
        }
        resolve("Complete");
      }
    });
  });

  Promise.all([pro_mem_list, pro_gift_list, pro_game_list, pro_pur_list]).then(function() {
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
    filename = 'user-data.csv';

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

});
