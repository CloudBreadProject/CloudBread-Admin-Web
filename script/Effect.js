var closeTimer = null;
var counterTimer = 300;
var noClose = 0;
var colNum = 0;
  $(".subMenu").hide();
  $(".mainMenu>li").hover(function() {
    if(colNum == 0) {
      $(".navi_bg").slideDown(200);
      colNum++;
    }
    $(".subMenu").hide();
    $(this).find(".subMenu").stop().slideDown(400);
    mcancelclosetime();
  },function() {
    mclosetime();
  });
// Turn On Close Timer
function mclosetime() {
    closeTimer = window.setTimeout(mclose, counterTimer);
}
// Cancel Close Timer
function mcancelclosetime() {
    if(closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
    }
}
// Close Showed Layer
function mclose() {
  $(".mainMenu>li").find(".subMenu").slideUp(250);
  $(".navi_bg").slideUp(200);
  colNum = 0;
}
