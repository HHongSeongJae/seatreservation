/*최종 작업 후 기록용으로 기록한 주석은 notion으로 옮기고 제출할 것!*/

//구역별 가격을 위한 URL 파라미터 호출 -> ?value = 값 추출
const PraM = new URL(location.href).searchParams;
const values = PraM.get('value');

let yourchoice; //내가 선택한 구역 저장하는 변수

//1구역 10000원 2구역 30000원 3구역 50000원 인것을 활용해 /10000 을 통해 나오는 
//수를 case 로 구분하여 1,2,3구역을 판별한다.
switch(values / 10000)
{
  case 1: yourchoice = 1; break; 
  case 3: yourchoice = 2; break;
  case 5: yourchoice = 3; break;
}

//팝업창 띄우기
alert(yourchoice + "구역 좌석입니다.\n 좌석을 선택해주세요!");
 
/*getElementById => 태그에 있는 id속성에 접근하여 하고싶은 작업을 할기 위해 사용*/
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.group .seat:not(.occupied)'); /*선택된 좌석요소들을 가져옴*/
const count = document.getElementById('count');
const total = document.getElementById('total');
const clickButton = document.querySelector('.bt')

let ticketPrice = +values; //구역에 따른 가격 차이

//선택된 좌석수 및 좌석 가격을 실시간으로 업데이트 시켜준다.
function updateSelectedCount() {
  //class 명이 group인 것 중 class 명이 selected인 것을 가져온다.
  const selectedSeats = document.querySelectorAll('.group .selected'); 
  const selectedSeatCount = +selectedSeats.length //리스트 형태로 가져온 것이기 때문에 .lenght를 활용해 개수확인

  //선택된 좌석수 및 좌석 가격을 실시간으로 업데이트 시켜준다.
  count.textContent = selectedSeatCount;
  total.textContent = selectedSeatCount * ticketPrice;
}

//좌석 클릭하면 좌석상태 변화시키는 부분 (click event)
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
    event.target.classList.toggle('selected');

    updateSelectedCount(); //좌석 선택하는 동시에 개수와 가격이 올라가도록 함수 호출
  }
});

//구역 선택에 따른 선택 불가 좌석 만들기
const button = document.querySelector('#fixbt'); //좌석고정시키기 버튼 html에서 불러오기

/*버튼 클릭시 occupied로 class변경 시키기*/
button.addEventListener('click' , function(){
  const checked = document.querySelectorAll('.selected'); //이것을 안에 넣어줌으로써 클릭할 때마다 query를 읽어들인다.
  for(let i = 0 ; i < checked.length; i++)
  {
      if(checked[i].classList.contains('selected'))
      {
        checked[i].classList.remove('selected');
        checked[i].classList.add('occupied');
      }
  }

  updateSelectedCount(); //바로 count update로 실시간으로 반응
});