function showSignup() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

function login() {
  document.getElementById('login-form').innerHTML = "<div class='loading'><div class='spinner'></div><span>�α��� ��...</span></div>";
  setTimeout(() => {
    alert('�����ڷ� �α��� �Ǿ����ϴ�.');
    window.location.href = 'admin.html';
  }, 1500);
}

function signup() {
  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("signup-message").value;
  
  if (username && password && email) {
    // �ε� ȭ�� ǥ��
    document.getElementById('signup-form').innerHTML = `
      <div class='loading'>
        <div class='spinner'></div>
        <span>ȸ������ ��û ������...</span>
      </div>
    `;
    
    // 3�� �Ŀ� ȸ������ �Ϸ� �޽��� ǥ��
    setTimeout(() => {
      alert(`ȸ������ ��û�� �Ϸ�Ǿ����ϴ�!\n\n���̵�: ${username}\n�̸���: ${email}\n���Ը޼���: ${message}`);
      showLogin(); // ȸ������ �� �α��� ȭ������ ���ư�
    }, 2400); // 3�� ���� �ε� ǥ��
  } else {
    alert("��� �ʼ� ������ �Է��� �ּ���.");
  }
}