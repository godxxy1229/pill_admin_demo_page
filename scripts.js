function showSignup() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

function login() {
  document.getElementById('login-form').innerHTML = "<div class='loading'><div class='spinner'></div><span>로그인 중...</span></div>";
  setTimeout(() => {
    alert('관리자 권한으로 로그인되었습니다.');
    window.location.href = 'admin.html';
  }, 1500);
}

function signup() {
  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("signup-message").value;
  
  if (username && password && email) {
    // 로딩 화면 표시
    document.getElementById('signup-form').innerHTML = `
      <div class='loading'>
        <div class='spinner'></div>
        <span>회원가입 신청 진행중...</span>
      </div>
    `;
    
    // 3초 후에 회원가입 완료 메시지 표시
    setTimeout(() => {
      alert(`회원가입 신청이 완료되었습니다!\n\n아이디: ${username}\n이메일: ${email}\n가입메세지: ${message}`);
      showLogin(); // 회원가입 후 로그인 화면으로 돌아감
    }, 2400); // 3초 동안 로딩 표시
  } else {
    alert("모든 필수 정보를 입력해 주세요.");
  }
}
