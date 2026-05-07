import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.decorateCookedElement(
    (element) => {
      if (!settings.usercard_enabled) {
        return;
      }

      const items = element.querySelectorAll('span.custom-usercard[data-usercard="true"]');

      items.forEach((item) => {
        if (item.dataset.processed === "true") {
          return;
        }

        const originalText = item.textContent.trim();
        const explicitUsername = item.dataset.username?.trim();

        const username = normalizeUsername(explicitUsername || originalText);

        if (!username) {
          item.dataset.processed = "true";
          return;
        }

        const visibleText = originalText || username;

        const link = document.createElement("a");
        link.href = `/u/${encodeURIComponent(username)}`;
        link.setAttribute("data-user-card", username);
        link.classList.add("custom-usercard-link");
        link.textContent = visibleText;

        item.textContent = "";
        item.appendChild(link);
        item.dataset.processed = "true";
      });
    },
    {
      id: "custom-usercard-links",
      onlyStream: true,
    }
  );
});

function normalizeUsername(value) {
  if (!value) {
    return "";
  }

  return String(value).trim().replace(/^@+/, "");
}
