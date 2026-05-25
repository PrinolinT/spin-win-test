const validateBtn = document.getElementById("validateBtn");
const wheelSection = document.getElementById("wheelSection");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

validateBtn.addEventListener("click", () => {

  const q1 = document.getElementById("q1").value.toLowerCase().trim();
  const q2 = document.getElementById("q2").value.trim();

  if (q1 === "blue" && q2 === "4") {

    wheelSection.classList.remove("hidden");

    alert("Correct! You can now spin.");

  } else {

    alert("Incorrect answers.");

  }

});

spinBtn.addEventListener("click", async () => {

  spinBtn.disabled = true;

  result.innerHTML = "Spinning...";

  setTimeout(() => {

    result.innerHTML = "🎉 YOU WON A TEST VOUCHER!";

    confetti();

  }, 2000);

});
