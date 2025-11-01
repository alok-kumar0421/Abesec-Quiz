const admInput = document.getElementById("adm");
const pinInput = document.getElementById("pin");
const quizInput = document.getElementById("quiz");
const remember = document.getElementById("remember");
const credMsg = document.getElementById("cred-msg");
const quizMsg = document.getElementById("quiz-msg");

const credSection = document.getElementById("cred-section");
const quizSection = document.getElementById("quiz-section");

const REDIRECT_BASE = "https://abesquiz.netlify.app/#/access-quiz?req_id=";

function buildPlaintext(admission, pin, quiz) {
  const date = new Date().toISOString().slice(0, 10);
  return `${date}#_${admission}#_${quiz}#_${pin}`;
}
function saveCreds(adm, pin) {
  localStorage.setItem("abes_adm", adm);
  localStorage.setItem("abes_pin", pin);
}

function loadCreds() {
  const adm = localStorage.getItem("abes_adm");
  const pin = localStorage.getItem("abes_pin");
  if (adm && pin) {
    admInput.value = adm;
    pinInput.value = pin;
    credSection.style.display = "none";
    quizSection.style.display = "block";
  }
}

// Base64 encode -> samjhane ke liye
function encodeBase64(text) {
  return btoa(text);
}

// Save for long time
document.getElementById("save").onclick = () => {
  const adm = admInput.value.trim();
  const pin = pinInput.value.trim();

  if (!adm || !pin) {
    credMsg.textContent = "Admission no. aur PIN dono zaruri hain.";
    return;
  }

  if (remember.checked) {
    saveCreds(adm, pin);
    credMsg.textContent = "Credentials saved!";
    credMsg.className = "msg success";
  }

  credSection.style.display = "none";
  quizSection.style.display = "block";
};

// go on quiz
document.getElementById("go").onclick = () => {
  const adm = admInput.value.trim();
  const pin = pinInput.value.trim();
  const quiz = quizInput.value.trim();

  if (!quiz) {
    quizMsg.textContent = "Please enter quiz code!";
    return;
  }

  const plain = buildPlaintext(adm, pin, quiz);
  const encoded = encodeBase64(plain);
  const finalURL = `${REDIRECT_BASE}${encoded}`;
  window.location.href = finalURL;
};

loadCreds();
