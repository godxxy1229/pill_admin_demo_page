function approveUser(button) {
  const requestCard = button.parentElement;
  requestCard.remove(); // 승인한 요청 카드를 제거
  
  // 동적으로 승인 메시지 추가
  showStatusMessage("회원가입이 승인되었습니다.");
  checkEmptyRequests();
}

function rejectUser(button) {
  const requestCard = button.parentElement;
  requestCard.remove(); // 거절한 요청 카드를 제거
  
  // 동적으로 거절 메시지 추가
  showStatusMessage("회원가입이 거절되었습니다.");
  checkEmptyRequests();
}

// 동적 상태 메시지를 표시하는 함수
function showStatusMessage(message) {
  const statusMessage = document.getElementById("status-message");
  statusMessage.innerText = message;
  statusMessage.style.display = "block";
  
  // 3초 후에 메시지 숨기기
  setTimeout(() => {
    statusMessage.style.display = "none";
  }, 3000);
}

// 남아 있는 요청이 없으면 '요청이 없습니다' 메시지 표시
function checkEmptyRequests() {
  const requestList = document.getElementById("user-requests");
  if (requestList.children.length === 0) {
    requestList.innerHTML = "<p>남은 요청이 없습니다.</p>";
  }
}

let serverStatus = { server1: "활성화", server2: "활성화" };
let progressIntervals = {};

// DOM이 로드된 후 기본 탭을 'UserApproval'로 설정하고, 'active' 클래스를 수동으로 추가
document.addEventListener("DOMContentLoaded", () => {
  const userApprovalTab = document.querySelector(".tab button[data-tab='UserApproval']");
  
  // 기본 탭을 열고, 수동으로 active 클래스 추가
  openTab({ currentTarget: userApprovalTab }, "UserApproval");
  userApprovalTab.classList.add("active");
});

// 탭 전환 함수 - Server Management 탭 클릭 시 서버 상태 자동 확인
function openTab(event, tabName) {
  let i, tabcontent, tablinks;
  
  // 모든 탭 콘텐츠 숨기기
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // 모든 탭 링크 비활성화
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  
  // 선택한 탭 콘텐츠 표시 및 현재 탭 버튼 활성화
  document.getElementById(tabName).style.display = "block";
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  // Server Management 탭이 열릴 때 서버 상태 자동 확인
  if (tabName === "ServerManagement") {
    checkServerStatus();
  }
}

// 서버 상태 확인 함수 - 서버 상태에 따라 올바르게 표시
function checkServerStatus() {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "flex"; // 로딩 애니메이션 표시

  ["server1", "server2"].forEach((server) => {
    setTimeout(() => {
      const statusElement = document.getElementById(`${server}-status`);
      const pauseButton = document.getElementById(`pause-${server}`);

      // 전역 변수에 저장된 서버 상태를 기반으로 상태 표시
      if (serverStatus[server] === "일시 정지") {
        statusElement.innerText = "일시 정지됨";
        pauseButton.disabled = true;
      } else {
        statusElement.innerText = "활성화";
        pauseButton.disabled = false;
      }

      // 로딩 애니메이션 숨기기 (모든 서버가 업데이트된 후)
      loadingIndicator.style.display = "none";
    }, Math.random() * 1000 + 1000); // 1~2초 내에 랜덤으로 상태 업데이트
  });
}


// 서버 일시 정지 함수 - 상태 업데이트
function pauseServer(server) {
  setTimeout(() => {
    serverStatus[server] = "일시 정지"; // 전역 변수에 서버 상태를 "일시 정지"로 업데이트
    document.getElementById(`${server}-status`).innerText = "일시 정지됨";
    document.getElementById(`pause-${server}`).disabled = true;
  }, Math.random() * 1000 + 1000); // 1~2초 내에 일시 정지
}

// 서버 구동 함수 - 구동 시 상태를 "활성화"로 업데이트
function startServer(server) {
  const progressBar = document.getElementById(`${server}-progress-bar`);
  const progressText = document.getElementById(`${server}-progress-text`);
  const pauseButton = document.getElementById(`pause-${server}`);
  const progressContainer = document.getElementById(`${server}-progress`);
  
  // 구동 중에는 일시 정지 버튼 비활성화
  pauseButton.disabled = true;
  progressContainer.style.display = "block";
  progressBar.style.width = "0%";
  progressText.innerText = "구동 요청 중...";

  let steps = [
    { text: "상태 확인", time: 1000, width: 5 },
    { text: "서비스 재시작 요청 전송됨", time: 2000, width: 10 },
    { text: "서비스 시작", time: 1000, width: 15 },
    { text: "포트할당: 5555", time: 600, width: 20 },
    { text: "웹서비스 재시작중입니다. 약 20초 소요됩니다.", time: 12000, width: 25 },
    { text: "웹서비스 시작됨. 서버: service.biilab.kro.kr, 포트:5555", time: 3000, width: 20 },
    { text: "모델 구동 시작", time: 1000, width: 30 },
    { text: "모델 파일 로딩", time: 600, width: 30 },
    { text: "모델 로드됨", time: 5000, width: 50 },
    { text: "모델 입출력 테스트", time: 1000, width: 60 },
    { text: "서비스 활성화됨", time: 600, width: 100 },
    { text: "서비스 활성화됨: service.biilab.kro.kr:5555", time: 600, width: 100 }
  ];

  let progressIndex = 0;

  function nextStep() {
    if (progressIndex < steps.length) {
      let { text, time, width } = steps[progressIndex];
      progressText.innerText = text;
      progressBar.style.width = `${width}%`;

      if (time > 0) {
        setTimeout(nextStep, time);
      } else {
        // 구동 완료 후 서버 상태를 "활성화"로 업데이트
        serverStatus[server] = "활성화";
        document.getElementById(`${server}-status`).innerText = "활성화";
        pauseButton.disabled = false; // 구동 완료 후 일시 정지 버튼 활성화
      }

      progressIndex++;
    }
  }

  nextStep();
}

// 서버별 모델 선택 확인 함수
function confirmModelSelection(server) {
  const modelSelect = document.getElementById(`${server}-model-select`);
  const selectedModel = modelSelect.options[modelSelect.selectedIndex].text;
  const messageElement = document.getElementById(`${server}-model-message`);
  
  messageElement.innerText = `서버 재기동 시 ${selectedModel} 모델이 적용됩니다.`;
}

// 모델 업로드 함수 - 로딩 및 진행 상태 표시
function uploadModel() {
  const uploadStatus = document.getElementById("upload-status");
  const server1ModelSelect = document.getElementById("server1-model-select");
  const server2ModelSelect = document.getElementById("server2-model-select");
  
  uploadStatus.innerText = "업로드 상태: 시작 중...";
  let progress = 0;

  const initialDelay = 6000; // 처음 6초 동안 업로드 중지 상태
  const updateInterval = 2000; // 이후 2초 간격으로 진행 상태 업데이트
  
  setTimeout(() => {
    const interval = setInterval(() => {
      // 15~25 사이의 랜덤 값으로 진행률 증가
      const randomIncrease = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
      progress += randomIncrease;

      if (progress >= 100) {
        clearInterval(interval);
        uploadStatus.innerText = "업로드 상태: 완료";
        
        // 업로드한 모델을 각 서버의 모델 선택 옵션에 추가
        const newModel = document.createElement("option");
        newModel.value = "new_model_version_" + new Date().getTime();
        newModel.text = newModel.value;
        
        server1ModelSelect.appendChild(newModel.cloneNode(true));
        server2ModelSelect.appendChild(newModel);
      } else {
        uploadStatus.innerText = `업로드 상태: ${progress}% 완료`;
      }
    }, updateInterval);
  }, initialDelay); // 처음 6초 이후에 업로드 진행 시작
}

function updatePrompt() {
  const newPrompt = document.getElementById("new-prompt").value;
  if (newPrompt) {
    setTimeout(() => {
      document.getElementById("current-prompt").innerText = newPrompt;
      document.getElementById("prompt-status").innerText = "프롬프트 상태: 정상 구동 중";
      alert("프롬프트가 업데이트되었습니다!");
    }, 8000); // 8초 후 프롬프트 업데이트 완료
    document.getElementById("prompt-status").innerText = "프롬프트 업데이트 중...";
  } else {
    alert("새 프롬프트를 입력해주세요.");
  }
}