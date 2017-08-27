import chrome from 'chrome'

let script = document.createElement("script")
script.src = chrome.extension.getURL('internals.bundle.js')
document.documentElement.appendChild(script)

var port = chrome.runtime.connect({ name: "knockknock" })
console.log(port)

port.postMessage({ joke: "Knock knock" })
port.onMessage.addListener(function (msg) {
  console.log(msg)
  if (msg.question == "Who's there?")
    port.postMessage({answer: "Madame"})
  else if (msg.question == "Madame who?")
    port.postMessage({answer: "Madame... Bovary"})
})
