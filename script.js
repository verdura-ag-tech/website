// Mobile menu
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#menu a").forEach((a) => {
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
// Map tooltip hover for nodes
const tip = document.getElementById("mapTip");
const tipName = document.getElementById("tipName");
const tipStatus = document.getElementById("tipStatus");

function setTipStatusClass(status) {
  const pill = tipStatus?.querySelector(".pill-status");
  if (!pill) return;

  pill.classList.remove("on", "warn", "off");
  const s = String(status || "").toLowerCase();

  if (s.includes("online")) pill.classList.add("on");
  else if (s.includes("warning")) pill.classList.add("warn");
  else pill.classList.add("off");
}

document.querySelectorAll(".map-area .node").forEach((node) => {
  node.addEventListener("mouseenter", () => {
    if (!tip || !tipName || !tipStatus) return;

    const name = node.getAttribute("data-name") || "Node";
    const status = node.getAttribute("data-status") || "Online";

    tipName.textContent = name;
    tipStatus.querySelector(".tip-text").textContent = status;
    setTipStatusClass(status);

    tip.hidden = false;
  });

  node.addEventListener("mousemove", (e) => {
    if (!tip) return;
    const map = node.closest(".map-area");
    if (!map) return;

    const rect = map.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // keep tooltip inside bounds
    const pad = 12;
    const w = tip.offsetWidth || 180;
    const h = tip.offsetHeight || 70;

    let left = x + 14;
    let top = y - 14;

    if (left + w + pad > rect.width) left = rect.width - w - pad;
    if (top + h + pad > rect.height) top = rect.height - h - pad;
    if (top < pad) top = pad;

    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  });

  node.addEventListener("mouseleave", () => {
    if (!tip) return;
    tip.hidden = true;
  });
});

document.querySelector(".learn-more")?.addEventListener("click", () => {
    document.querySelector("#technology")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  
