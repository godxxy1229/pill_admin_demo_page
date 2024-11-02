function approveUser(button) {
  const requestCard = button.parentElement;
  requestCard.remove(); // ������ ��û ī�带 ����
  
  // �������� ���� �޽��� �߰�
  showStatusMessage("ȸ�������� ���εǾ����ϴ�.");
  checkEmptyRequests();
}

function rejectUser(button) {
  const requestCard = button.parentElement;
  requestCard.remove(); // ������ ��û ī�带 ����
  
  // �������� ���� �޽��� �߰�
  showStatusMessage("ȸ�������� �����Ǿ����ϴ�.");
  checkEmptyRequests();
}

// ���� ���� �޽����� ǥ���ϴ� �Լ�
function showStatusMessage(message) {
  const statusMessage = document.getElementById("status-message");
  statusMessage.innerText = message;
  statusMessage.style.display = "block";
  
  // 3�� �Ŀ� �޽��� �����
  setTimeout(() => {
    statusMessage.style.display = "none";
  }, 3000);
}

// ���� �ִ� ��û�� ������ '��û�� �����ϴ�' �޽��� ǥ��
function checkEmptyRequests() {
  const requestList = document.getElementById("user-requests");
  if (requestList.children.length === 0) {
    requestList.innerHTML = "<p>���� ��û�� �����ϴ�.</p>";
  }
}

let serverStatus = { server1: "Ȱ��ȭ", server2: "Ȱ��ȭ" };
let progressIntervals = {};

// DOM�� �ε�� �� �⺻ ���� 'UserApproval'�� �����ϰ�, 'active' Ŭ������ �������� �߰�
document.addEventListener("DOMContentLoaded", () => {
  const userApprovalTab = document.querySelector(".tab button[data-tab='UserApproval']");
  
  // �⺻ ���� ����, �������� active Ŭ���� �߰�
  openTab({ currentTarget: userApprovalTab }, "UserApproval");
  userApprovalTab.classList.add("active");
});

// �� ��ȯ �Լ� - Server Management �� Ŭ�� �� ���� ���� �ڵ� Ȯ��
function openTab(event, tabName) {
  let i, tabcontent, tablinks;
  
  // ��� �� ������ �����
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // ��� �� ��ũ ��Ȱ��ȭ
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  
  // ������ �� ������ ǥ�� �� ���� �� ��ư Ȱ��ȭ
  document.getElementById(tabName).style.display = "block";
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  // Server Management ���� ���� �� ���� ���� �ڵ� Ȯ��
  if (tabName === "ServerManagement") {
    checkServerStatus();
  }
}

// ���� ���� Ȯ�� �Լ� - ���� ���¿� ���� �ùٸ��� ǥ��
function checkServerStatus() {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "flex"; // �ε� �ִϸ��̼� ǥ��

  ["server1", "server2"].forEach((server) => {
    setTimeout(() => {
      const statusElement = document.getElementById(`${server}-status`);
      const pauseButton = document.getElementById(`pause-${server}`);

      // ���� ������ ����� ���� ���¸� ������� ���� ǥ��
      if (serverStatus[server] === "�Ͻ� ����") {
        statusElement.innerText = "�Ͻ� ������";
        pauseButton.disabled = true;
      } else {
        statusElement.innerText = "Ȱ��ȭ";
        pauseButton.disabled = false;
      }

      // �ε� �ִϸ��̼� ����� (��� ������ ������Ʈ�� ��)
      loadingIndicator.style.display = "none";
    }, Math.random() * 1000 + 1000); // 1~2�� ���� �������� ���� ������Ʈ
  });
}


// ���� �Ͻ� ���� �Լ� - ���� ������Ʈ
function pauseServer(server) {
  setTimeout(() => {
    serverStatus[server] = "�Ͻ� ����"; // ���� ������ ���� ���¸� "�Ͻ� ����"�� ������Ʈ
    document.getElementById(`${server}-status`).innerText = "�Ͻ� ������";
    document.getElementById(`pause-${server}`).disabled = true;
  }, Math.random() * 1000 + 1000); // 1~2�� ���� �Ͻ� ����
}

// ���� ���� �Լ� - ���� �� ���¸� "Ȱ��ȭ"�� ������Ʈ
function startServer(server) {
  const progressBar = document.getElementById(`${server}-progress-bar`);
  const progressText = document.getElementById(`${server}-progress-text`);
  const pauseButton = document.getElementById(`pause-${server}`);
  const progressContainer = document.getElementById(`${server}-progress`);
  
  // ���� �߿��� �Ͻ� ���� ��ư ��Ȱ��ȭ
  pauseButton.disabled = true;
  progressContainer.style.display = "block";
  progressBar.style.width = "0%";
  progressText.innerText = "���� ��û ��...";

  let steps = [
    { text: "���� Ȯ��", time: 1000, width: 5 },
    { text: "���� ����� ��û ���۵�", time: 2000, width: 10 },
    { text: "���� ����", time: 1000, width: 15 },
    { text: "��Ʈ�Ҵ�: 5555", time: 600, width: 20 },
    { text: "������ ��������Դϴ�. �� 20�� �ҿ�˴ϴ�.", time: 12000, width: 25 },
    { text: "������ ���۵�. ����: service.biilab.kro.kr, ��Ʈ:5555", time: 3000, width: 20 },
    { text: "�� ���� ����", time: 1000, width: 30 },
    { text: "�� ���� �ε�", time: 600, width: 30 },
    { text: "�� �ε��", time: 5000, width: 50 },
    { text: "�� ����� �׽�Ʈ", time: 1000, width: 60 },
    { text: "���� Ȱ��ȭ��", time: 600, width: 100 },
    { text: "���� Ȱ��ȭ��: service.biilab.kro.kr:5555", time: 600, width: 100 }
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
        // ���� �Ϸ� �� ���� ���¸� "Ȱ��ȭ"�� ������Ʈ
        serverStatus[server] = "Ȱ��ȭ";
        document.getElementById(`${server}-status`).innerText = "Ȱ��ȭ";
        pauseButton.disabled = false; // ���� �Ϸ� �� �Ͻ� ���� ��ư Ȱ��ȭ
      }

      progressIndex++;
    }
  }

  nextStep();
}

// ������ �� ���� Ȯ�� �Լ�
function confirmModelSelection(server) {
  const modelSelect = document.getElementById(`${server}-model-select`);
  const selectedModel = modelSelect.options[modelSelect.selectedIndex].text;
  const messageElement = document.getElementById(`${server}-model-message`);
  
  messageElement.innerText = `���� ��⵿ �� ${selectedModel} ���� ����˴ϴ�.`;
}

// �� ���ε� �Լ� - �ε� �� ���� ���� ǥ��
function uploadModel() {
  const uploadStatus = document.getElementById("upload-status");
  const server1ModelSelect = document.getElementById("server1-model-select");
  const server2ModelSelect = document.getElementById("server2-model-select");
  
  uploadStatus.innerText = "���ε� ����: ���� ��...";
  let progress = 0;

  const initialDelay = 6000; // ó�� 6�� ���� ���ε� ���� ����
  const updateInterval = 2000; // ���� 2�� �������� ���� ���� ������Ʈ
  
  setTimeout(() => {
    const interval = setInterval(() => {
      // 15~25 ������ ���� ������ ����� ����
      const randomIncrease = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
      progress += randomIncrease;

      if (progress >= 100) {
        clearInterval(interval);
        uploadStatus.innerText = "���ε� ����: �Ϸ�";
        
        // ���ε��� ���� �� ������ �� ���� �ɼǿ� �߰�
        const newModel = document.createElement("option");
        newModel.value = "new_model_version_" + new Date().getTime();
        newModel.text = newModel.value;
        
        server1ModelSelect.appendChild(newModel.cloneNode(true));
        server2ModelSelect.appendChild(newModel);
      } else {
        uploadStatus.innerText = `���ε� ����: ${progress}% �Ϸ�`;
      }
    }, updateInterval);
  }, initialDelay); // ó�� 6�� ���Ŀ� ���ε� ���� ����
}

function updatePrompt() {
  const newPrompt = document.getElementById("new-prompt").value;
  if (newPrompt) {
    setTimeout(() => {
      document.getElementById("current-prompt").innerText = newPrompt;
      document.getElementById("prompt-status").innerText = "������Ʈ ����: ���� ���� ��";
      alert("������Ʈ�� ������Ʈ�Ǿ����ϴ�!");
    }, 8000); // 8�� �� ������Ʈ ������Ʈ �Ϸ�
    document.getElementById("prompt-status").innerText = "������Ʈ ������Ʈ ��...";
  } else {
    alert("�� ������Ʈ�� �Է����ּ���.");
  }
}