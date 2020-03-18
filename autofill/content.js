chrome.storage.sync.get(["username", "password"], data => {
    const DEFAULT_USER = data.username;
    const DEFAULT_PASS = data.password;
    const config = {
      entries: [
        {
          login: { selector: "input#username", value: DEFAULT_USER },
          pass: { selector: 'input[name*="password"]', value: DEFAULT_PASS },
          submit: { selector: 'input[type*="submit"]' },
          hostnames: ["localhost"],
          timeout: 3
        }
      ]
    };
    const hostName = window.location.hostname;
  
    autofill(config, hostName);
  });
  
  const autofill = (config, hostName) => {
    config.entries.forEach(element => {
      if (element.hostName.some(element => hostName.match(element))) {
        let timeoutSeconds = entry.timeout || 1;
        let timeout = timeoutSeconds * 1000;
        setTimeout(() => autofillMatchingHostName(element), timeout);
      }
    });
  };
  
  const autofillMatchingHostName = element => {
    if (!$(element.login.selector).length) {
      return;
    }
  
    $(element.login.selector)
      .val(element.login.value)
      .trigger("input");
  
    $(element.pass.selector)
      .val(element.pass.value)
      .trigger("input");
      
    if (element.additionalCheckbox) {
      $(element.additionalCheckbox.selector).trigger("click");
    }
  };
  