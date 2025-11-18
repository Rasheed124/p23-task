document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".form-step");
  const stepTitles = document.querySelectorAll(".step-title");
  const nextBtns = document.querySelectorAll(".next-btn");
  const backBtns = document.querySelectorAll(".back-btn");

  const progressFill = document.querySelector(".progress-fill");
  const progressText = document.querySelector(".progress-text");
  const counterCircleText = document.querySelector(".counter-circle span");

  //  Custom Select Dropdown
  const select = document.getElementById("industrySelect");
  const optionsBox = document.querySelector(".custom-options");
  const hiddenInput = document.getElementById("industryInput");
  const selectedOption = select.querySelector(".selected-option");

  //  Load saved step or default to 0
  let currentStep = parseInt(localStorage.getItem("currentStep")) || 0;

  //  Update Steps
  function updateStep() {
    steps.forEach((step) => step.classList.remove("active"));
    stepTitles.forEach((title) => title.classList.remove("active"));

    steps[currentStep].classList.add("active");
    stepTitles[currentStep].classList.add("active");

    const percent = ((currentStep + 1) / steps.length) * 100;
    progressFill.style.width = percent + "%";
    progressText.textContent = `0${currentStep + 1} of 0${steps.length}`;
    counterCircleText.textContent = `0${currentStep + 1}`;

    localStorage.setItem("currentStep", currentStep);

    const backButton = steps[currentStep].querySelector(".back-btn");
    if (backButton) backButton.disabled = currentStep === 0;

    document.querySelectorAll(".form-step, .step-title").forEach((el) => {
      el.classList.remove("fade-in");
      void el.offsetWidth;
      el.classList.add("fade-in");
    });
  }

  //  NEXT BUTTONS
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateStep();
      }
    });
  });

  //  BACK BUTTONS
  backBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        updateStep();
      }
    });
  });

  //  Initialize
  updateStep();

  //  Custom Select Dropdown Logic
  select.addEventListener("click", () => {
    select.classList.toggle("open");
    optionsBox.classList.toggle("show");
  });

  document.querySelectorAll(".custom-options li").forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      selectedOption.textContent = value;
      hiddenInput.value = value;
      select.classList.remove("open");
      optionsBox.classList.remove("show");
    });
  });

  document.addEventListener("click", function (e) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
      optionsBox.classList.remove("show");
    }
  });

  // === Handle Selectable Goal Cards ===
  function handleSelectableCards(selector, maxSelection, storageKey) {
    const cards = document.querySelectorAll(`${selector} .goal-card`);
    const inputs = document.querySelectorAll(
      `${selector} input[type="checkbox"]`
    );

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        const checked = Array.from(inputs).filter((i) => i.checked);

        // Apply selected / unselected styles
        cards.forEach((card) => {
          const checkbox = card.querySelector('input[type="checkbox"]');
          card.classList.toggle("selected", checkbox.checked);
        });

        // Blur unselected if max reached
        if (checked.length >= maxSelection) {
          cards.forEach((card) => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) card.classList.add("blurred");
          });
        } else {
          cards.forEach((card) => card.classList.remove("blurred"));
        }

        // Save selections to localStorage
        const selectedValues = checked.map((i) => i.value);
        localStorage.setItem(storageKey, JSON.stringify(selectedValues));
      });
    });
  }

  // Step 2: Business Goals (max 2)
  handleSelectableCards(".step2-wrapper", 2, "selectedBusinessGoals");

  // Step 3: Key Challenges (max 3)
  handleSelectableCards(".step3-wrapper", 3, "selectedKeyChallenges");

  // STEP 4 — Navigate to Summary Page
  const summaryBtn = document.querySelector(".summary-btn");
  if (summaryBtn) {
    summaryBtn.addEventListener("click", () => {
      // Save all form fields to localStorage
      const form = document.getElementById("multiStepForm");
      const formData = new FormData(form);

      formData.forEach((value, key) => {
        localStorage.setItem(key, value);
      });

      // Redirect to summary screen
      window.location.href = "consultation-summary.html";
    });
  }
});
