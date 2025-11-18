// const datesContainer = document.getElementById("dates");
// const monthInput = document.getElementById("monthInput");
// const selectedDateText = document.getElementById("selectedDate");
// const selectedTimeText = document.getElementById("selectedTime");

// // Time selects
// const hourSel = document.getElementById("hourSelect");
// const minuteSel = document.getElementById("minuteSelect");
// const secondSel = document.getElementById("secondSelect");
// const ampmSel = document.getElementById("ampmSelect");
// const timezoneSel = document.getElementById("timezone");

// const prevBtn = document.getElementById("prevMonth");
// const prevTooltip = document.querySelector(".prev-tooltip");

// /* -----------------------------------------------------------
//    CURRENT DATE LIMITS
// ------------------------------------------------------------*/
// const today = new Date();
// const minYear = today.getFullYear();
// const minMonth = today.getMonth(); // 0-indexed
// let selectedDate = null;

// /* -----------------------------------------------------------
//    START CALENDAR FROM CURRENT MONTH & YEAR
// ------------------------------------------------------------*/
// let current = new Date(minYear, minMonth);

// /* -----------------------------------------------------------
//    TIME DROPDOWNS
// ------------------------------------------------------------*/
// (function initTime() {
//   for (let i = 1; i <= 12; i++) {
//     hourSel.innerHTML += `<option>${String(i).padStart(2, "0")}</option>`;
//   }
//   for (let i = 0; i < 60; i++) {
//     const v = String(i).padStart(2, "0");
//     minuteSel.innerHTML += `<option>${v}</option>`;
//     secondSel.innerHTML += `<option>${v}</option>`;
//   }
// })();

// function updateTimeDisplay() {
//   if (!selectedDate) return;

//   const hour = hourSel.value;
//   const minute = minuteSel.value;
//   const second = secondSel.value;
//   const ampm = ampmSel.value;
//   const tz = timezoneSel.value;

//   selectedTimeText.textContent = `${hour}:${minute}:${second} ${ampm} ${tz}`;
// }

// [hourSel, minuteSel, secondSel, ampmSel, timezoneSel].forEach((el) =>
//   el.addEventListener("change", updateTimeDisplay)
// );

// /* -----------------------------------------------------------
//    RENDER CALENDAR GRID
// ------------------------------------------------------------*/
// function renderCalendar() {
//   const year = current.getFullYear();
//   const month = current.getMonth();

//   monthInput.value = `${current.toLocaleString("default", {
//     month: "long",
//   })} ${year}`;

//   const firstDay = new Date(year, month, 1);
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const startIndex = (firstDay.getDay() + 6) % 7;

//   datesContainer.innerHTML = "";

//   // Empty blocks before the first day
//   for (let i = 0; i < startIndex; i++) {
//     datesContainer.innerHTML += `<div></div>`;
//   }

//   // Actual days
//   for (let day = 1; day <= daysInMonth; day++) {
//     const dateObj = new Date(year, month, day);
//     const div = document.createElement("div");
//     div.className = "date";
//     div.textContent = day;

//     // Disable past days in current month
//     if (year === minYear && month === minMonth && day < today.getDate()) {
//       div.classList.add("disabled");
//     } else {
//       div.onclick = () => selectDate(dateObj, div);
//     }

//     datesContainer.appendChild(div);
//   }
// }

// function selectDate(dateObj, div) {
//   selectedDate = dateObj;

//   document
//     .querySelectorAll(".date")
//     .forEach((d) => d.classList.remove("selected"));
//   div.classList.add("selected");

//   selectedDateText.textContent = selectedDate.toDateString();
//   updateTimeDisplay();
// }

// /* -----------------------------------------------------------
//    PREVENT GOING PAST THE MINIMUM (current month)
// ------------------------------------------------------------*/

// prevBtn.onclick = () => {
//   const y = current.getFullYear();
//   const m = current.getMonth();

//   const atLimit = y === minYear && m === minMonth;

//   if (atLimit) {
//     // show tooltip
//     prevTooltip.classList.add("show");

//     // hide tooltip after 1.8 seconds
//     setTimeout(() => prevTooltip.classList.remove("show"), 1800);

//     return;
//   }

//   current.setMonth(m - 1);
//   renderCalendar();
// };

// /* -----------------------------------------------------------
//    APPLY BLUR EFFECT WHEN AT LIMIT
// ------------------------------------------------------------*/
// function updatePrevButtonState() {
//   const y = current.getFullYear();
//   const m = current.getMonth();

//   if (y === minYear && m === minMonth) {
//     prevBtn.classList.add("disabled-prev");
//   } else {
//     prevBtn.classList.remove("disabled-prev");
//   }
// }

// document.getElementById("nextMonth").onclick = () => {
//   current.setMonth(current.getMonth() + 1);
//   renderCalendar();
// };

// /* -----------------------------------------------------------
//    BLOCK TYPING PAST MONTH/YEAR IN THE INPUT BOX
// ------------------------------------------------------------*/
// monthInput.addEventListener("change", () => {
//   const parts = monthInput.value.trim().split(" ");
//   if (parts.length !== 2) return;

//   const [monthName, yearStr] = parts;
//   const year = parseInt(yearStr);
//   const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

//   if (isNaN(monthIndex)) return;
//   if (year < minYear) return;
//   if (year === minYear && monthIndex < minMonth) return; // ❌ too early

//   current = new Date(year, monthIndex);
//   renderCalendar();
// });

// /* -----------------------------------------------------------
//    INITIAL RENDER
// ------------------------------------------------------------*/
// renderCalendar();

// /* -----------------------------------------------------------
//    SUBMIT BUTTON LOGIC + MODAL
// ------------------------------------------------------------*/
// const submitBtn = document.getElementById("submitSchedule");
// const modal = document.getElementById("scheduleModal");
// const modalDateText = document.getElementById("modalDateText");
// const modalTimeText = document.getElementById("modalTimeText");
// const closeModal = document.getElementById("closeModal");

// submitBtn.onclick = () => {
//   // Validate date selected
//   if (!selectedDate) {
//     alert("Please select a date before submitting.");
//     return;
//   }

//   // Validate time selected
//   const hour = hourSel.value;
//   const minute = minuteSel.value;
//   const second = secondSel.value;
//   const ampm = ampmSel.value;

//   if (!hour || !minute || !second || !ampm) {
//     alert("Please select a full time before submitting.");
//     return;
//   }

//   // Populate modal text
//   modalDateText.textContent = "Date: " + selectedDate.toDateString();
//   modalTimeText.textContent = "Time: " + selectedTimeText.textContent;

//   // Show modal
//   modal.style.display = "flex";
// };

// // CLOSE MODAL
// closeModal.onclick = () => {
//   modal.style.display = "none";
// };

// // Close if user clicks outside modal
// modal.onclick = (e) => {
//   if (e.target === modal) modal.style.display = "none";
// };

/* ------------------------- Elements ------------------------- */
const datesContainer = document.getElementById("dates");
const monthInput = document.getElementById("monthInput");
const selectedDateText = document.getElementById("selectedDate");
const selectedTimeText = document.getElementById("selectedTime");

const prevBtn = document.getElementById("prevMonth");
const prevTooltip = document.querySelector(".prev-tooltip");

/* Modal elements */
const submitBtn = document.getElementById("submitSchedule");
const modal = document.getElementById("scheduleModal");
const modalDateText = document.getElementById("modalDateText");
const modalTimeText = document.getElementById("modalTimeText");
const closeModal = document.getElementById("closeModal");

/* ------------------------- Date limits & state ------------------------- */
const today = new Date();
const minYear = today.getFullYear();
const minMonth = today.getMonth(); // 0-indexed
let selectedDate = null;
let current = new Date(minYear, minMonth);

/* ------------------------- Custom Dropdown Component ------------------------- */
/*
  createDropdown({ id, options, initialIndex }) =>
  returns { el, open(), close(), getValue(), setValue(val) }
*/
function createDropdown({ id, options = [], initialIndex = 0 }) {
  const root = document.getElementById(id);
  const toggle = root.querySelector(".cd-toggle");
  const selectedSpan = root.querySelector(".cd-selected");
  const list = root.querySelector(".cd-list");

  // populate list (clear first)
  list.innerHTML = "";
  options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.className = "cd-option";
    li.setAttribute("data-value", opt.value ?? opt);
    li.textContent = opt.label ?? opt;
    li.tabIndex = -1;
    li.role = "option";
    if (i === initialIndex) li.classList.add("selected");
    list.appendChild(li);
  });

  // internal state
  let isOpen = false;
  let focusedIndex = initialIndex;

  function open() {
    root.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    list.setAttribute("aria-hidden", "false");
    isOpen = true;
    // focus the currently selected option if any
    const items = list.querySelectorAll(".cd-option");
    if (items[focusedIndex]) {
      items[focusedIndex].classList.add("focused");
      items[focusedIndex].focus();
      scrollIntoViewIfNeeded(items[focusedIndex], list);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
  }

  function close() {
    root.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    list.setAttribute("aria-hidden", "true");
    isOpen = false;
    clearFocused();
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onKeyDown);
  }

  function getValue() {
    const sel = list.querySelector(".cd-option.selected");
    return sel ? sel.getAttribute("data-value") : null;
  }

  function setValue(val) {
    const items = Array.from(list.querySelectorAll(".cd-option"));
    items.forEach((it) => it.classList.remove("selected"));
    const found = items.find(
      (it) => it.getAttribute("data-value") === String(val)
    );
    if (found) {
      found.classList.add("selected");
      selectedSpan.textContent = found.textContent;
      focusedIndex = items.indexOf(found);
    } else {
      // fallback: set first
      if (items[0]) {
        items[0].classList.add("selected");
        selectedSpan.textContent = items[0].textContent;
        focusedIndex = 0;
      }
    }
  }

  function onToggleClick(e) {
    e.stopPropagation();
    if (isOpen) close();
    else open();
  }

  function onOptionClick(e) {
    const li = e.currentTarget;
    // remove selected from others
    list.querySelectorAll(".cd-option").forEach((o) => {
      o.classList.remove("selected", "focused");
    });
    li.classList.add("selected");
    selectedSpan.textContent = li.textContent;
    focusedIndex = Array.from(list.children).indexOf(li);
    close();
    // dispatch custom 'change' event on root for listeners
    root.dispatchEvent(new CustomEvent("cd-change", { detail: getValue() }));
  }

  function onDocClick(e) {
    if (!root.contains(e.target)) close();
  }

  function clearFocused() {
    list
      .querySelectorAll(".cd-option")
      .forEach((o) => o.classList.remove("focused"));
  }

  function onKeyDown(e) {
    if (!isOpen) return;

    const items = Array.from(list.querySelectorAll(".cd-option"));
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusedIndex = Math.min(items.length - 1, focusedIndex + 1);
      items.forEach((it) => it.classList.remove("focused"));
      items[focusedIndex].classList.add("focused");
      scrollIntoViewIfNeeded(items[focusedIndex], list);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusedIndex = Math.max(0, focusedIndex - 1);
      items.forEach((it) => it.classList.remove("focused"));
      items[focusedIndex].classList.add("focused");
      scrollIntoViewIfNeeded(items[focusedIndex], list);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items[focusedIndex]) {
        items[focusedIndex].click();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  // small helper to ensure option visible when keyboard navigates
  function scrollIntoViewIfNeeded(el, container) {
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const elTop = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;
    if (elTop < containerTop) container.scrollTop = elTop - 4;
    else if (elBottom > containerBottom)
      container.scrollTop = elBottom - container.clientHeight + 4;
  }

  // event bindings
  toggle.addEventListener("click", onToggleClick);
  root
    .querySelectorAll(".cd-option")
    .forEach((li) => li.addEventListener("click", onOptionClick));

  // expose API
  return { el: root, open, close, getValue, setValue };
}

/* ------------------------- Build dropdowns with options ------------------------- */

function pad(n) {
  return String(n).padStart(2, "0");
}

/* timezone dropdown already has DOM items in HTML; we'll initialize it differently */
const timezoneDropdown = createDropdown({
  id: "dropdown-timezone",
  options: [
    { label: "GMT", value: "GMT" },
    { label: "UTC", value: "UTC" },
    { label: "WAT", value: "WAT" },
  ],
  initialIndex: 0,
});

/* hour/minute/second dropdowns (generate items) */
function numericOptions(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push({ label: pad(i), value: pad(i) });
  return arr;
}

const hourDropdown = createDropdown({
  id: "dropdown-hour",
  options: numericOptions(1, 12),
  initialIndex: 0,
});
const minuteDropdown = createDropdown({
  id: "dropdown-minute",
  options: numericOptions(0, 59),
  initialIndex: 0,
});
const secondDropdown = createDropdown({
  id: "dropdown-second",
  options: numericOptions(0, 59),
  initialIndex: 0,
});
const ampmDropdown = createDropdown({
  id: "dropdown-ampm",
  options: [
    { label: "AM", value: "AM" },
    { label: "PM", value: "PM" },
  ],
  initialIndex: 0,
});

/* ------------------------- Update time display from dropdowns ------------------------- */
function updateTimeDisplay() {
  if (!selectedDate) return;

  const hour = hourDropdown.getValue();
  const minute = minuteDropdown.getValue();
  const second = secondDropdown.getValue();
  const ampm = ampmDropdown.getValue();
  const tz = timezoneDropdown.getValue();

  selectedTimeText.textContent = `${hour}:${minute}:${second} ${ampm} ${tz}`;
}

/* Listen to cd-change events on each dropdown to update display */
[
  hourDropdown,
  minuteDropdown,
  secondDropdown,
  ampmDropdown,
  timezoneDropdown,
].forEach((dd) => {
  dd.el.addEventListener("cd-change", updateTimeDisplay);
});

/* ------------------------- Calendar render & selection logic ------------------------- */

function renderCalendar() {
  const year = current.getFullYear();
  const month = current.getMonth();

  monthInput.value = `${current.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startIndex = (firstDay.getDay() + 6) % 7;

  datesContainer.innerHTML = "";

  // Empty blocks before the first day
  for (let i = 0; i < startIndex; i++) {
    datesContainer.innerHTML += `<div></div>`;
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    const div = document.createElement("div");
    div.className = "date";
    div.textContent = day;

    // Disable past days in current month
    if (year === minYear && month === minMonth && day < today.getDate()) {
      div.classList.add("disabled");
    } else {
      div.onclick = () => selectDate(dateObj, div);
    }

    datesContainer.appendChild(div);
  }

  updatePrevButtonState();
}

function selectDate(dateObj, div) {
  selectedDate = dateObj;

  document
    .querySelectorAll(".date")
    .forEach((d) => d.classList.remove("selected"));
  div.classList.add("selected");

  selectedDateText.textContent = selectedDate.toDateString();
  updateTimeDisplay();
}

/* ------------------------- Prev / Next month logic + tooltip ------------------------- */

prevBtn.onclick = () => {
  const y = current.getFullYear();
  const m = current.getMonth();
  const atLimit = y === minYear && m === minMonth;

  if (atLimit) {
    prevTooltip.classList.add("show");
    setTimeout(() => prevTooltip.classList.remove("show"), 1800);
    return;
  }

  current.setMonth(m - 1);
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
};

function updatePrevButtonState() {
  const y = current.getFullYear();
  const m = current.getMonth();

  if (y === minYear && m === minMonth) {
    prevBtn.classList.add("disabled-prev");
  } else {
    prevBtn.classList.remove("disabled-prev");
  }
}

/* ------------------------- Month input typing block ------------------------- */
monthInput.addEventListener("change", () => {
  const parts = monthInput.value.trim().split(" ");
  if (parts.length !== 2) return;

  const [monthName, yearStr] = parts;
  const year = parseInt(yearStr);
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

  if (isNaN(monthIndex)) return;
  if (year < minYear) return;
  if (year === minYear && monthIndex < minMonth) return; // too early

  current = new Date(year, monthIndex);
  renderCalendar();
});

/* ------------------------- Initial render ------------------------- */
renderCalendar();

/* ------------------------- Submit logic + modal ------------------------- */
submitBtn.onclick = () => {
  // Validate date selected
  if (!selectedDate) {
    // inline friendly feedback
    flashMessage("Please select a date before submitting.");
    return;
  }

  // Validate time selected
  const hour = hourDropdown.getValue();
  const minute = minuteDropdown.getValue();
  const second = secondDropdown.getValue();
  const ampm = ampmDropdown.getValue();

  if (!hour || !minute || !second || !ampm) {
    flashMessage("Please select a date before submitting.");
    return;
  }

  // Populate modal text
  modalDateText.textContent = "Date: " + selectedDate.toDateString();
  modalTimeText.textContent =
    "Time: " +
    `${hour}:${minute}:${second} ${ampm} ${timezoneDropdown.getValue()}`;

  // Show modal
  modal.style.display = "flex";
};

/* close modal */
closeModal.onclick = () => {
  modal.style.display = "none";
};

/* close if clicking outside */
modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

/* small inline flash function instead of alert */
function flashMessage(msg, attachTo = submitBtn) {
  const flashContainer = document.getElementById("flashContainer");

  const toast = document.createElement("div");
  toast.className = "flash-msg";
  toast.textContent = msg;

  // Get button position
  const rect = attachTo.getBoundingClientRect();
  const top = rect.top + window.scrollY - 50; // above button
  const left = rect.left + window.scrollX;

  toast.style.top = `${top}px`;
  toast.style.left = `${left}px`;

  flashContainer.appendChild(toast);

  // Fade in
  requestAnimationFrame(() => toast.classList.add("show"));

  // Fade out
  setTimeout(() => toast.classList.add("hide"), 2000);

  // Remove fully
  setTimeout(() => toast.remove(), 2600);
}

/* ------------------------- Accessibility: keyboard open/close for dropdowns ------------------------- */
/* Provide space/enter to open focused dropdowns */
document.querySelectorAll(".custom-dropdown").forEach((root) => {
  root.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      // simulate toggle click
      root.querySelector(".cd-toggle").click();
    }
  });
});
