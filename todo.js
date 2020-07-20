// todo 카드 추가 버튼
const enrollmentBtn = document.getElementsByClassName('enrollmentBtn')[0]
enrollmentBtn.addEventListener("click", addNewTodo)

// contentsArea에 eventListener 추가하기
const contentsArea = document.getElementsByClassName("contents")[0]
contentsArea.addEventListener("click", function(e) {
    const target = e.target
    if (target.id === "deleteBtn") deleteCard(target);
})

// 당일 날짜를 yyyy-mm-dd 형식으로 가져오는 함수
function getDate() {
    const today = new Date();

    const yyyy = today.getFullYear(); 
    const mm = today.getMonth() >= 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
    const dd = today.getDate();
    return `${yyyy}-${mm}-${dd}`;
}

// 새로운 todo를 추가하는 함수
function addNewTodo() {
    const title = document.getElementById("title").value
    
    // 제목이 모두 띄어쓰기인지
    const isAllSpace = !title.split("").some(s => s !== " ")

    // title이 없거나 모두 띄어쓰기인지를 체크
    if (!title || isAllSpace) {
        alert('제목은 필수입니다.')
        return
    }

    // contents 부분에 새로운 todo 카드를 추가
    const newTodoCard = createTodoCard(title);
    const contentsArea = document.getElementsByClassName("contents")[0]
    document.getElementById("title").value = "";
    contentsArea.appendChild(newTodoCard);
}

// 엔터키를 누를 경우 addNewTodo 함수를 실행
function onEnter() {
    if (event.keyCode === 13) {
        addNewTodo();
    }
}

// yyyy-mm-dd 형식에 맞는지를 검증하는 함수
function validateTargetDate(date) {
    const regex = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 
    if (!regex.test(date)) return false
    return true
}

// 새로운 todo 카드 만드는 함수
function createTodoCard(title) {
    const card = document.createElement("div");
    card.classList.add("card")
    
    const titleArea = document.createElement("div");
    titleArea.classList.add("title")
    titleArea.innerText = title;

    const targetDateArea = document.createElement("div");
    const targetDate = getDate();
    targetDateArea.classList.add("targetDate")
    targetDateArea.innerText = `생성날짜 : ${targetDate}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.innerText = "X";

    card.appendChild(titleArea)
    card.appendChild(targetDateArea)
    card.appendChild(deleteBtn)
    
    return card;
}

// card를 삭제하는 함수
function deleteCard(target) {
    const card = target.parentNode;
    card.remove();
}