
  const input = document.querySelector("#phone");
  window.intlTelInput(input, {
    initialCountry: "in",
    strictMode: true,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/js/utils.js",
  });
