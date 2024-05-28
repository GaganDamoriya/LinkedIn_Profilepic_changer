document
  .getElementById("profilePicInput")
  .addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function () {
      chrome.storage.local.set({ profilePic: reader.result }, function () {
        console.log("Profile picture saved.");
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  });

document
  .getElementById("changeProfilePics")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: replaceProfilePictures,
      });
    });
  });

function replaceProfilePictures() {
  chrome.storage.local.get("profilePic", function (data) {
    if (data.profilePic) {
      const profilePicSelector = [
        "img.EntityPhoto-circle-0",
        "img.EntityPhoto-circle-1",
        "img.EntityPhoto-circle-2",
        "img.EntityPhoto-circle-3",
        "img.EntityPhoto-circle-4",
        "img.EntityPhoto-circle-5",
        "img.global-nav__me-photo",
        "img.global-nav__me-photo-1",
      ];
      const allSelectors = profilePicSelector.join(",");

      function replacePics() {
        const profilePics = document.querySelectorAll(allSelectors);
        profilePics.forEach((pic) => {
          pic.src = data.profilePic;
          pic.srcset = data.profilePic;
        });
      }

      replacePics();
      const observer = new MutationObserver(replacePics);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
}
