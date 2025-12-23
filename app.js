const app = document.getElementById("app");
const KEY = "timingTap_highScore"



const state = {
  scene: "TITLE",       // TITLE | GAME | RESULT
  difficulty: "easy",   // easy | hard
  totalScore: 0,        // 오늘은 임시값
  triesLeft: 10,        // 오늘은 임시값
};

function setScene(next) {
  state.scene = next;
  render();
}

function render() {
  if (state.scene === "TITLE") return renderTitle();
  if (state.scene === "GAME") return renderGame();
  return renderResult();
}

function renderTitle() {
  app.innerHTML = `
    <div class="card">
      <h1>Timing Tap</h1>
      <p>Perfect 구간에 맞춰 탭!</p>

      <div class="row">
        <button id="easy">EASY</button>
        <button id="hard">HARD</button>
      </div>

      <div class="row">
        <button id="start">START</button>
      </div>

      <p class="hint">오늘 목표: 화면 전환만 완성</p>
      <p class="hint">현재 난이도: <b>${state.difficulty.toUpperCase()}</b></p>
    </div>
  `;

  document.getElementById("easy").onclick = () => {
    state.difficulty = "easy";
    renderTitle(); // TITLE 안에서 표시만 갱신
  };

  document.getElementById("hard").onclick = () => {
    state.difficulty = "hard";
    renderTitle();
  };

  document.getElementById("start").onclick = () => {
    // 오늘은 임시로 점수/횟수 초기화만
    state.totalScore = 0;
    state.triesLeft = 10;
    setScene("GAME");
  };
}

function renderGame() {
  app.innerHTML = `
    <div class="card">
      <h2>GAME</h2>
      <div class="row">
        <div class="badge">남은 횟수: ${state.triesLeft}</div>
        <div class="badge">점수: ${state.totalScore}</div>
      </div>

      <p class="hint">내일 여기서 마커/판정/점수 구현할 거야.</p>

      <div class="row">
        <button id="end">END (임시)</button>
      </div>
    </div>
  `;

  document.getElementById("end").onclick = () => setScene("RESULT");
}

function getGrade(score) {
  // TODO: 네가 컷을 조정해도 됨
  if (score >= 850) return "S";
  if (score >= 700) return "A";
  if (score >= 550) return "B";
  return "C";
}

function renderResult() {
  const grade = getGrade(state.totalScore);
  
  const key = "timingTap_highScore_" + state.difficulty;

  const saved = Number(localStorage.getItem(key)|| 0);         // getItem("어떤키")는 그 키에 저장된 값을 꺼내오는 함수  , A || B는 A가 “참 같은 값(truthy)”이면 A를 선택,A가 “거짓 같은 값(falsy)”이면 B를 선택
  const highScore = Math.max(saved, state.totalScore);
  if (highScore !== saved) {
    localStorage.setItem(key, String(highScore));
  }

  app.innerHTML = `         
    <div class="card">
      <h2>RESULT</h2>
      <p>총점(임시): <b>${state.totalScore}</b></p>
      <p>최고점: <b>${highScore}</b></p>
      
      <div class="row">
        <button id="restart">RESTART</button>
      </div>
    </div>
  `;

  document.getElementById("restart").onclick = () => setScene("TITLE");
}

render();
