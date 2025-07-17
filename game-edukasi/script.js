
async function loadGame(mode) {
  const container = document.getElementById('game-area');
  container.innerHTML = "Memuat soal...";

  const res = await fetch(`data/${mode}.json`);
  const questions = await res.json();

  let index = 0;
  let score = 0;

  showQuestion();

  function showQuestion() {
    if (index >= questions.length) {
      container.innerHTML = `<h2>🎉 Skor kamu: ${score} / ${questions.length}</h2>`;
      return;
    }

    const q = questions[index];
    let html = `<h3>${q.question}</h3>`;

    q.choices.forEach(choice => {
      html += `<button onclick="checkAnswer('${choice}', '${q.answer}')">${choice}</button><br>`;
    });

    container.innerHTML = html;
  }

  window.checkAnswer = (selected, correct) => {
    if (selected === correct) {
      alert("✅ Benar!");
      score++;
    } else {
      alert(`❌ Salah. Jawaban benar: ${correct}`);
    }
    index++;
    showQuestion();
  };
}
