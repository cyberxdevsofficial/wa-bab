async function checkNumber() {
  const number = document.getElementById("numberInput").value.trim();
  const resultBox = document.getElementById("result");

  if (!number) {
    resultBox.innerHTML = "❌ Please enter a number!";
    resultBox.style.background = "#7f1d1d";
    return;
  }

  resultBox.innerHTML = "Checking...";
  resultBox.style.background = "rgba(255,0,0,0.3)";

  try {
    const res = await fetch(`/api/check?number=${number}`);
    const data = await res.json();

    if (data.status === "active") {
      resultBox.style.background = "#064e3b";
      resultBox.innerHTML = "✅ This number is ACTIVE on WhatsApp";
    } else {
      resultBox.style.background = "#7f1d1d";
      resultBox.innerHTML = "❌ Number not found / inactive / banned";
    }
  } catch (e) {
    resultBox.style.background = "#7f1d1d";
    resultBox.innerHTML = "⚠️ Error checking number!";
  }
}
