export function setup(helper) {
  if (!helper.markdownIt) {
    return;
  }

  helper.allowList([
    "span.custom-usercard",
    "span[data-usercard]",
    "span[data-username]",
  ]);

  helper.registerPlugin((md) => {
    md.inline.bbcode.ruler.push("usercard", {
      tag: "usercard",
      wrap(startToken, endToken, tagInfo) {
        const explicitUsername = (tagInfo.attrs._default || "").trim();

        startToken.type = "html_inline";

        if (explicitUsername) {
          startToken.content = `<span class="custom-usercard" data-usercard="true" data-username="${escapeHtmlAttr(
            explicitUsername
          )}">`;
        } else {
          startToken.content =
            `<span class="custom-usercard" data-usercard="true">`;
        }

        endToken.type = "html_inline";
        endToken.content = `</span>`;

        return false;
      },
    });
  });
}

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
