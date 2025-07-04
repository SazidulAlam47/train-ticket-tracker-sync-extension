document.getElementById("syncBtn").addEventListener("click", async () => {
    const statusEl = document.getElementById("status");
    statusEl.textContent = "Syncing...";

    try {
        // STEP 1: Grab token from eticket
        const [eticketTab] = await chrome.tabs.query({
            url: "*://eticket.railway.gov.bd/*",
        });

        if (!eticketTab) {
            statusEl.textContent = "";
            const msg = document.createElement("span");
            msg.textContent = "Open eticket.railway.gov.bd first. ";
            const btn = document.createElement("button");
            btn.textContent = "Visit eticket";
            btn.onclick = () => {
                chrome.tabs.create({ url: "https://eticket.railway.gov.bd/" });
            };
            statusEl.appendChild(msg);
            statusEl.appendChild(btn);
            return;
        }

        await chrome.scripting.executeScript({
            target: { tabId: eticketTab.id },
            files: ["sync.js"],
        });

        statusEl.textContent = "Token copied. Now injecting...";

        // STEP 2: Inject token into tracker app
        const [trackerTab] = await chrome.tabs.query({
            url: "*://train-ticket-tracker-bd.vercel.app/*",
        });

        if (!trackerTab) {
            statusEl.textContent = "";
            const msg = document.createElement("span");
            msg.textContent = "Open the tracker site. ";
            const btn = document.createElement("button");
            btn.textContent = "Visit tracker";
            btn.onclick = () => {
                chrome.tabs.create({
                    url: "https://train-ticket-tracker-bd.vercel.app/",
                });
            };
            statusEl.appendChild(msg);
            statusEl.appendChild(btn);
            return;
        }

        await chrome.scripting.executeScript({
            target: { tabId: trackerTab.id },
            func: () => {
                chrome.storage.local.get("bdTrainToken", (result) => {
                    const token = result.bdTrainToken;
                    if (token) {
                        localStorage.setItem("token", token);
                    } else {
                        chrome.runtime.sendMessage({ type: "NO_TOKEN_FOUND" });
                    }
                });
            },
        });

        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.type === "NO_TOKEN_FOUND") {
                statusEl.textContent = "Sync failed, log in to eticket first.";
            }
        });

        statusEl.textContent = "Account synced successfully!";

        // Redirect or reload to homepage
        chrome.scripting.executeScript({
            target: { tabId: trackerTab.id },
            func: () => {
                if (window.location.pathname === "/login") {
                    window.location.href = "/";
                } else if (window.location.pathname === "/") {
                    window.location.reload();
                }
            },
        });
    } catch (err) {
        statusEl.textContent = "Sync failed.";
    }
});
