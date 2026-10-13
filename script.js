// Interaksi halaman login dan validasi form
const loginSection = document.getElementById("loginSection");
const openLoginBtn = document.getElementById("openLoginBtn");
const closeLoginBtn = document.getElementById("closeLoginBtn");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const loginMessage = document.getElementById("loginMessage");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

openLoginBtn.addEventListener("click", () => {
  loginSection.classList.remove("d-none");
  loginSection.scrollIntoView({ behavior: "smooth", block: "start" });
  loginEmail.focus();
});

closeLoginBtn.addEventListener("click", () => {
  loginSection.classList.add("d-none");
});

togglePasswordBtn.addEventListener("click", () => {
  const isHidden = loginPassword.type === "password";
  loginPassword.type = isHidden ? "text" : "password";
  togglePasswordBtn.textContent = isHidden ? "Sembunyikan" : "Lihat";
  togglePasswordBtn.setAttribute("aria-label", isHidden ? "Sembunyikan password" : "Tampilkan password");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Bersihkan pesan dan tanda validasi dari percobaan sebelumnya.
  loginMessage.textContent = "";
  loginMessage.className = "form-message mt-3 mb-0";
  emailError.textContent = "Masukkan alamat email yang valid.";
  passwordError.textContent = "";
  loginEmail.classList.remove("is-invalid", "is-valid");
  loginPassword.classList.remove("is-invalid", "is-valid");

  let isValid = true;
  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value;

  // Periksa email tidak kosong dan memiliki format yang benar.
  if (emailValue === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    loginEmail.classList.add("is-invalid");
    isValid = false;
  } else {
    loginEmail.classList.add("is-valid");
  }

  // Periksa password tidak kosong dan minimal 8 karakter.
  if (passwordValue.trim() === "") {
    passwordError.textContent = "Password wajib diisi.";
    loginPassword.classList.add("is-invalid");
    isValid = false;
  } else if (passwordValue.length < 8) {
    passwordError.textContent = "Password harus terdiri dari minimal 8 karakter.";
    loginPassword.classList.add("is-invalid");
    isValid = false;
  } else {
    loginPassword.classList.add("is-valid");
  }

  if (!isValid) {
    loginMessage.textContent = "Periksa kembali kolom yang ditandai.";
    loginMessage.classList.add("error");
    return;
  }

  // Ini hanya simulasi. Login belum memeriksa akun ke database.
  loginMessage.textContent = "Validasi berhasil! Form sudah terisi dengan benar.";
  loginMessage.classList.add("success");
  loginForm.reset();
  loginEmail.classList.remove("is-valid");
  loginPassword.classList.remove("is-valid");
  loginPassword.type = "password";
  togglePasswordBtn.textContent = "Lihat";
  togglePasswordBtn.setAttribute("aria-label", "Tampilkan password");
});
