/* DFT course: reusable quiz component.
 *
 * Markup:
 *   <div class="quiz" data-answer="2" data-why="Explanation shown after answering.">
 *     <p class="q">Question text</p>
 *     <div class="options">
 *       <button class="opt">Option one</button> ...
 *     </div>
 *   </div>
 *   <p class="quiz-score" data-quiz-score></p>   (optional running score)
 *
 * data-answer is the 1-based index of the correct option.
 * data-why may contain simple inline HTML (<sup>, <i>); use real <sup> rather than Unicode superscripts.
 * One attempt per question: retrieval practice, not trial-and-error.
 */
(function () {
  function init() {
    var quizzes = Array.prototype.slice.call(document.querySelectorAll(".quiz"));
    var answered = 0, correct = 0;
    var scoreEl = document.querySelector("[data-quiz-score]");
    function updateScore() {
      if (!scoreEl) return;
      scoreEl.textContent = answered === quizzes.length
        ? "Score: " + correct + " / " + quizzes.length +
          (correct === quizzes.length ? " — solid. Come back in a few days and try again from memory."
                                       : " — reread the parts you missed, then retry tomorrow.")
        : answered + " of " + quizzes.length + " answered";
    }
    quizzes.forEach(function (quiz, qi) {
      var q = quiz.querySelector(".q");
      if (q && !q.querySelector("b")) {
        var b = document.createElement("b"); b.textContent = "Q" + (qi + 1);
        q.insertBefore(b, q.firstChild);
      }
      var answer = parseInt(quiz.getAttribute("data-answer"), 10) - 1;
      var why = quiz.getAttribute("data-why") || "";
      var opts = Array.prototype.slice.call(quiz.querySelectorAll("button.opt"));
      var fb = document.createElement("p"); fb.className = "feedback"; fb.setAttribute("aria-live", "polite");
      quiz.appendChild(fb);
      opts.forEach(function (btn, i) {
        btn.type = "button";
        btn.addEventListener("click", function () {
          opts.forEach(function (o) { o.disabled = true; });
          opts[answer].classList.add("correct");
          answered++;
          if (i === answer) { correct++; fb.className = "feedback ok"; fb.textContent = "Correct."; }
          else { btn.classList.add("wrong"); fb.className = "feedback bad"; fb.textContent = "Not quite."; }
          if (why) { var s = document.createElement("span"); s.className = "why"; s.innerHTML = why; /* authored HTML, e.g. <sup> */ fb.appendChild(s); }
          updateScore();
        });
      });
    });
    updateScore();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
