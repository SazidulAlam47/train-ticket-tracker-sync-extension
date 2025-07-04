(function () {
    const token = localStorage.getItem("token");
    if (token) {
        chrome.storage.local.set({ bdTrainToken: token }, () => {});
    }
})();
