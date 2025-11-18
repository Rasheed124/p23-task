

document.addEventListener("DOMContentLoaded", () => {
  /*************************************
   * GLOBAL CUSTOM SELECT HANDLER
   *************************************/
  const allCustomSelects = document.querySelectorAll(".custom-select");

  allCustomSelects.forEach((customSelect) => {
    const trigger = customSelect.querySelector(".custom-select-trigger");
    const text = customSelect.querySelector(".custom-select-text");
    const options = customSelect.querySelectorAll(".custom-option");
    const selectName = customSelect.dataset.select;
    const hiddenSelect = document.querySelector(`select[name="${selectName}"]`);

    // Toggle dropdown open/close
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".custom-select.open").forEach((openSelect) => {
        if (openSelect !== customSelect) openSelect.classList.remove("open");
      });
      customSelect.classList.toggle("open");
    });

    // Handle option click
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const value = option.dataset.value;
        const label = option.textContent;

        // Update visible text + active state
        text.textContent = label;
        options.forEach((o) => o.classList.remove("active"));
        option.classList.add("active");

        // Sync to hidden select
        if (hiddenSelect) hiddenSelect.value = value;

        // Close dropdown
        customSelect.classList.remove("open");

        //  If this is the "industry" select, trigger category update
        if (selectName === "industry") {
          updateCategories(value);
        }
      });
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".custom-select.open").forEach((openSelect) => {
      if (!openSelect.contains(e.target)) openSelect.classList.remove("open");
    });
  });

  /*************************************
   * INDUSTRY → CATEGORY HANDLER
   *************************************/
  const industryCategories = {
    agriculture: [
      "Crop Production",
      "Livestock Farming",
      "AgroTech",
      "Food Processing",
    ],
    manufacturing: [
      "Textile Production",
      "Automobile Manufacturing",
      "Electronics",
      "Pharmaceuticals",
    ],
    mining: [
      "Gold Mining",
      "Oil & Gas Exploration",
      "Quarrying",
      "Metal Refining",
    ],
    logistics: [
      "Freight Forwarding",
      "Warehousing",
      "Transportation",
      "Supply Chain Solutions",
    ],
  };

  const defaultTags = [
    "Agrobusiness",
    "Business Growth",
    "Sustainability",
    "Leadership",
  ];

  const selectedCategories = {}; // store selections by industry
  const categoryContainer = document.getElementById("categoryContainer");
  const industrySelect = document.querySelector('select[name="industry"]');
  const hiddenCategoryInput = document.getElementById("selectedCategories");

  // Initial render (default tags)
  renderTags(defaultTags, true);

  /** Update when user selects a new industry **/
  function updateCategories(industry) {
    categoryContainer.innerHTML = "";
    hiddenCategoryInput.value = "";

    if (!industry || !industryCategories[industry]) {
      renderTags(defaultTags, true);
      return;
    }

    const categories = industryCategories[industry];
    const saved = selectedCategories[industry] || [];

    renderTags(categories, false, saved);
  }

  /** Render tags **/
  function renderTags(categories, isDefault = false, saved = []) {
    categoryContainer.innerHTML = "";

    categories.forEach((category) => {
      const tag = document.createElement("div");
      tag.className = "interest-form-tag";
      if (saved.includes(category)) tag.classList.add("active");

      tag.innerHTML = `
        <span class="check-icon ${saved.includes(category) ? "active" : ""}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
          </svg>
        </span>
        <span>${category}</span>
      `;

      // Add click event
      tag.addEventListener("click", () => {
        const currentIndustry = industrySelect.value;

        // Toggle visual state
        tag.classList.toggle("active");
        const icon = tag.querySelector(".check-icon");
        icon.classList.toggle("active");

        // Handle storage
        if (!isDefault && currentIndustry) {
          if (!selectedCategories[currentIndustry]) {
            selectedCategories[currentIndustry] = [];
          }

          if (tag.classList.contains("active")) {
            selectedCategories[currentIndustry].push(category);
          } else {
            selectedCategories[currentIndustry] = selectedCategories[
              currentIndustry
            ].filter((c) => c !== category);
          }
        }

        updateHiddenInput();
      });

      categoryContainer.appendChild(tag);
    });
  }

  /** Sync hidden field for submission **/
  function updateHiddenInput() {
    const allSelected = Object.values(selectedCategories).flat();
    hiddenCategoryInput.value = allSelected.join(",");
  }
});




// document.addEventListener("DOMContentLoaded", () => {
//   // Collect all forms and headings
//   const formStages = document.querySelectorAll(
//     ".first-stage-form-container, .second-stage-form-container, .third-stage-form-container, .fourth-stage-form-container"
//   );

//   const mobileHeadings = document.querySelectorAll(
//     ".mobile-heading .first-form-heading, .mobile-heading .second-form-heading, .mobile-heading .third-form-heading, .mobile-heading .fourth-form-heading"
//   );

//   const desktopHeadings = document.querySelectorAll(
//     ".desktop-heading .first-form-heading, .desktop-heading .second-form-heading, .desktop-heading .third-form-heading, .desktop-heading .fourth-form-heading"
//   );

//   const proceedButtons = document.querySelectorAll(
//     ".interest-form-proceed-button"
//   );
//   const returnButtons = document.querySelectorAll(
//     ".interest-form-return-button"
//   );

//   let currentStep = 0;
//   const totalSteps = formStages.length;

//   // Initialize form and heading display
//   function showStep(step) {
//     // Hide all stages
//     formStages.forEach((form) => form.classList.add("hidden"));
//     mobileHeadings.forEach((heading) => heading.classList.add("hidden"));
//     desktopHeadings.forEach((heading) => heading.classList.add("hidden"));

//     // Show current stage
//     formStages[step].classList.remove("hidden");
//     mobileHeadings[step].classList.remove("hidden");
//     desktopHeadings[step].classList.remove("hidden");

//     updateProgress(step);
//   }

//   // Update progress bar for all instances
//   function updateProgress(step) {
//     const progressSteppers = document.querySelectorAll(".progress-stepper");

//     progressSteppers.forEach((stepper) => {
//       const steps = stepper.querySelectorAll(".step");
//       const progress = (step / totalSteps) * 100;
//       stepper.style.setProperty("--progress-width", `${progress}%`);
//       steps.forEach((s, i) => {
//         s.classList.remove("active", "completed");
//         if (i < step) s.classList.add("completed");
//         else if (i === step) s.classList.add("active");
//       });
//     });
//   }

//   // Handle navigation
//   proceedButtons.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       if (currentStep < totalSteps - 1) {
//         currentStep++;
//         showStep(currentStep);
//       }
//     });
//   });

//   returnButtons.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       if (currentStep > 0) {
//         currentStep--;
//         showStep(currentStep);
//       }
//     });
//   });

//   // Initialize first view
//   showStep(currentStep);
// });







