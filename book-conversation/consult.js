document.addEventListener("DOMContentLoaded", () => {
  // Load saved form values
  const fullName = localStorage.getItem("full_name") || "Valued Client";
  document.getElementById("userName").textContent = fullName;

  const goals = JSON.parse(localStorage.getItem("selectedBusinessGoals")) || [];
  const challenges =
    JSON.parse(localStorage.getItem("selectedKeyChallenges")) || [];

  const goalsContainer = document.getElementById("goalsList");
  const challengesContainer = document.getElementById("challengesList");

  // Render selected goals
  goals.forEach((goal) => {
    const item = document.createElement("div");
    item.classList.add("summary-item");
    item.innerHTML = `<span>${goal}</span><img src="../img/marked.png" alt="✔"/>`;
    goalsContainer.appendChild(item);
  });

  // Render selected challenges
  challenges.forEach((ch) => {
    const item = document.createElement("div");
    item.classList.add("summary-item");
    item.innerHTML = `<span>${ch}</span><img src="../img/marked.png" alt="✔"/>`;
    challengesContainer.appendChild(item);
  });
});
