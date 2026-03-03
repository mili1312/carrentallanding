const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");
burger?.addEventListener("click", () => {
  menu.classList.toggle("open");
});

function daysBetween(a, b) {
  const ms = 24 * 60 * 60 * 1000;
  return Math.max(1, Math.round((b - a) / ms));
}

function priceFor(type) {
  const base = { Economy: 29, Compact: 35, SUV: 49, Luxury: 89 }[type] ?? 35;
  return base;
}

document.getElementById("bookingForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target;
  const location = form.location.value.trim();
  const pickup = new Date(form.pickupDate.value);
  const ret = new Date(form.returnDate.value);
  const carType = form.carType.value;

  const out = document.getElementById("quoteOutput");

  if (!location) {
    out.textContent = "Please enter a pickup location.";
    return;
  }
  if (Number.isNaN(pickup.getTime()) || Number.isNaN(ret.getTime())) {
    out.textContent = "Please select valid dates.";
    return;
  }
  if (ret <= pickup) {
    out.textContent = "Return date must be after pickup date.";
    return;
  }

  const days = daysBetween(pickup, ret);
  const daily = priceFor(carType);
  const total = days * daily;

  out.textContent = `Estimated quote: €${total} (${days} day(s) • ${carType})`;
});