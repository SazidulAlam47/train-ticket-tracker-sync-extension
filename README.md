# Train Ticket Tracker Sync

**Train Ticket Tracker Sync** is a Chrome extension that helps you seamlessly sync your authentication token between the official Bangladesh Railway e-ticketing site and the [Train Ticket Tracker BD](https://train-ticket-tracker-bd.vercel.app/) app. This allows you to use your e-ticket account directly in the tracker app without manual copy-pasting.

## Features

-   One-click sync of your e-ticket authentication token to the tracker app
-   Simple popup UI for easy operation
-   Automatic handling of login state and error messages

## Installation

1. Download or clone this repository.
   [Download Now](https://github.com/SazidulAlam47/train-ticket-tracker-sync-extension/archive/refs/heads/main.zip)
2. Unzip it.
3. Open Chrome and go to `chrome://extensions/`.
4. Enable **Developer mode** (top right).
5. Click **Load unpacked** and select this project folder (Not the zip).
6. The extension icon ![icon](icon.png) should appear in your toolbar.

## Usage

1. Log in to [eticket.railway.gov.bd](https://eticket.railway.gov.bd/) in a browser tab.
2. Open [Train Ticket Tracker BD](https://train-ticket-tracker-bd.vercel.app/) in another tab.
3. Click the extension icon and then the **Sync Account** button in the popup.
4. The extension will:
    - Grab your token from the e-ticket site
    - Store it locally
    - Inject it into the tracker app
    - Reload or redirect the tracker app as needed
5. Success and error messages will be shown in the popup.
