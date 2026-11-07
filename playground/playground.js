document.addEventListener("DOMContentLoaded", () => {
  for (const button of document.querySelectorAll("[data-busy-toggle]")) {
    button.addEventListener("click", () => {
      const container = document.getElementById(
        button.getAttribute("aria-controls"),
      );
      const busy = container.getAttribute("aria-busy") !== "true";
      container.setAttribute("aria-busy", String(busy));
      button.setAttribute("aria-pressed", String(busy));
    });
  }

  for (const input of document.querySelectorAll("[data-indeterminate]")) {
    input.indeterminate = true;
  }

  for (const button of document.querySelectorAll("[data-password-toggle]")) {
    button.addEventListener("click", () => {
      const input = document.getElementById(
        button.getAttribute("aria-controls"),
      );
      const visible = input.type === "password";
      input.type = visible ? "text" : "password";
      button.setAttribute("aria-pressed", String(visible));
    });
  }

  for (const button of document.querySelectorAll(
    "[data-button-examples] button[data-loader-demo]",
  )) {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (button.disabled) return;

      const previousBusy = button.getAttribute("aria-busy");
      button.setAttribute("aria-busy", "true");
      button.disabled = true;

      setTimeout(() => {
        if (previousBusy === null) button.removeAttribute("aria-busy");
        else button.setAttribute("aria-busy", previousBusy);
        button.disabled = false;
      }, 1500);
    });
  }
});
