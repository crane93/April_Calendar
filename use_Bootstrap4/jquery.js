$( document ).ready(function() {
    changBackColor();
    alertWeekends();
    easterEgg();
});

var clickedCount = new Object();
for(var i = 1;i <= 31;i++){
  clickedCount[i] = 0;
}

/**
 * 클릭하면 배경색이 바뀌는 함수
 * case1: 흰색배경일때 click이벤트 발생시 빨간색배경으로 바뀜
 * case2: 빨간색배경일때 click이벤트 발생시 흰색배경으로 바뀜
 */
function changBackColor(){
    $(".changeBackground").on("click", 'th', function () {
        var previouSetRedElement = $('.bg-danger');
        var clickedDay = parseInt($(this).text()) || 0;
        if (previouSetRedElement === null) {
            $(this).addClass('bg-danger');
        } else if ($(this).attr("class") === 'bg-danger') {
            $(this).removeClass("bg-danger");
        } else {
            previouSetRedElement.removeClass('bg-danger');
            $(this).addClass('bg-danger');
        }
        countClicked(clickedDay, clickedCount);
    });
}

/**
 * 클릭한 횟수를 저장하는 함수
 * 새로운 div element를 만들어 부모 div인 .rankingView에 append한다
 * @param clickedDay 
 * @param clickedCount 
 */
function countClicked(clickedDay, clickedCount){
    if(clickedDay === 0){
        return;
    }
    if(checkDivExist(clickedDay,clickedCount)){
        return;
    }
    if(limitDivUpto10(clickedCount)){
        alert("클릭하는 날짜는 10개를 넘을 수 없습니다.");
        return;
    }
    clickedCount[clickedDay]++;
    var showHowManyClicked = `클릭한 날짜 ${clickedDay}일은 ${clickedCount[clickedDay]}번 눌렀습니다.`;
    $(".rakingView").append("<div id=day"+clickedDay+">"+showHowManyClicked+"</div>");
}

/**
 * 이미 만들어진 div가 있는지 확인하는 메소드
 * @param clickedDay 
 * @param clickedCount 
 */
function checkDivExist(clickedDay, clickedCount){
    if($("#day"+clickedDay).length === 0){
        return false;
    }

    clickedCount[clickedDay]++;
    $("#day"+clickedDay).html(`클릭한 날짜 ${clickedDay}일은 ${clickedCount[clickedDay]}번 눌렀습니다.`);
    return true;
}

function limitDivUpto10(clickedCount){
    var countDiv = 0;
    for(var property in clickedCount){
      if(clickedCount[property] > 0){
        countDiv++;
      }
    }
  
    if(countDiv > 9){
      return true;
    }
    return false;
}

function alertWeekends() {
    $(".changeBackground").on("click",'th:nth-child(1) , th:nth-child(7)', function(){
        var day = $(this).text();
        alert(`신나는 주말 ${day}일 입니다`);
    });
}

function easterEgg() {
    $("#BD").on("click", function(){
        alert("김유리님 생일이다!");
    });
} 
