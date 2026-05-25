import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const vouchersRef = collection(window.db, "vouchers");

  const q = query(vouchersRef, where("used", "==", false));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {

    result.innerHTML = "No vouchers remaining.";

    return;

  }

  const voucherDoc = snapshot.docs[0];

  const voucherData = voucherDoc.data();

  await updateDoc(doc(window.db, "vouchers", voucherDoc.id), {
    used: true
  });

  await addDoc(collection(window.db, "entrants"), {
    name,
    email,
    phone,
    voucher: voucherData.code,
    won: true,
    createdAt: new Date()
  });

  setTimeout(() => {

    result.innerHTML =
      `🎉 YOU WON: ${voucherData.code}`;

    confetti();

  }, 2000);

});
