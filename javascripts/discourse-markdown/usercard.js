export function setup(helper) {
  if (!helper.markdownIt) {
    return;
  }

  helper.allowList(["span.usercard-test"]);

  helper.registerPlugin((md) => {
    md.inline.bbcode.ruler.push("usercardtest", {
      tag: "usercardtest",
      wrap: "span.usercard-test",
    });
  });
}
