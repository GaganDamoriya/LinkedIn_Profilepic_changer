chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    checkTabUrl(tab);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    checkTabUrl(tab);
  }
});

function checkTabUrl(tab) {
  const linkedInPattern = /https:\/\/www\.linkedin\.com/;
  if (linkedInPattern.test(tab.url)) {
    chrome.action.setPopup({ tabId: tab.id, popup: "popup.html" });
  } else {
    chrome.action.setPopup({ tabId: tab.id, popup: "not_linkedin.html" });
  }
}
