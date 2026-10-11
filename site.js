(function () {
  var supported = ["en", "tr", "es", "de"];
  var saved = localStorage.getItem("matchspell-lang");
  var browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  var lang = supported.indexOf(saved) >= 0
    ? saved
    : (supported.indexOf(browser) >= 0 ? browser : "en");

  function apply(next) {
    lang = next;
    localStorage.setItem("matchspell-lang", lang);
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang-block]").forEach(function (node) {
      node.classList.toggle("on", node.getAttribute("data-lang-block") === lang);
    });
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var value = node.getAttribute("data-" + lang);
      if (value) node.textContent = value;
    });
    document.querySelectorAll("[data-pick]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-pick") === lang ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-pick]").forEach(function (button) {
    button.addEventListener("click", function () {
      apply(button.getAttribute("data-pick"));
    });
  });

  apply(lang);
})();
