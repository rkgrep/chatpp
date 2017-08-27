import '../img/icon16.png'
import '../img/icon32.png'
import '../img/icon64.png'
import '../img/icon128.png'
import '../img/icon256.png'
import chrome from 'chrome'

function logURL(requestDetails) {
  console.log("Loading: " + requestDetails.url);
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == "knockknock")
  port.onMessage.addListener(function (msg) {
      console.log(msg)
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Who's there?"})
    else if (msg.answer == "Madame")
      port.postMessage({question: "Madame who?"})
    else if (msg.answer == "Madame... Bovary")
      port.postMessage({question: "I don't get it."})
  })
})

