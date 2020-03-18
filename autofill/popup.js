const BUTTON_SELECTOR = "button#save";
const MESSAGE_SELECTOR = "span#message";
const USERNAME_SELECTOR = "input#username";
const PASSWORD_SELECTOR = "input#password";
const STORAGE_KEY_USERNAME = "username";
const STORAGE_KEY_PASSWORD = "password";

const KEYCODE_ENTER = 13;

document.addEventListener("DOMContentLoaded", () => {
  $(BUTTON_SELECTOR).on("click", function() {
    let username = $(USERNAME_SELECTOR).val();
    let password = $(PASSWORD_SELECTOR).val();
    let obj = {
      [STORAGE_KEY_USERNAME]: username,
      [STORAGE_KEY_PASSWORD]: password
    };
    console.log("saving", obj);
    chrome.storage.sync.set(obj, function() {
      logMessage("saved");
    });
  });

  $(`${USERNAME_SELECTOR}, ${PASSWORD_SELECTOR}`).keypress(function() {
    var keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode == KEYCODE_ENTER) {
      $(BUTTON_SELECTOR).trigger("click");
    }
  });

  chrome.storage.sync.set(obj, function() {
    $(USERNAME_SELECTOR).val(data.username);
  });

  chrome.storage.sync.set(obj, function() {
    $(PASSWORD_SELECTOR).val(data.password);
  });
});

const logMessage = (message, timeout = 1000) => {
  $(MESSAGE_SELECTOR).text(message);
  setTimeout(() => $(MESSAGE_SELECTOR).text("", timeout));
};
