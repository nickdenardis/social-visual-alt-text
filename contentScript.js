// If sync.get fails, we default to everything on
let twitterImages = true,
    twitterGifs = true;

// Get the users preferences
chrome.storage.sync.get(["twitterImages", "twitterGifs"], function (result) {
    twitterImages = result.twitterImages;
    twitterGifs = result.twitterGifs;
});

// Search for items with alt text
let insertAlt = function () {
    // Twitter images (single or multiple)
    const timelineImages = twitterImages
        ? document.querySelectorAll(
              'main div[data-testid="primaryColumn"] img[src^="https://pbs.twimg.com/media/"]'
          )
        : [];

    // Twitter GIFs
    const timelineGifs = twitterGifs
        ? document.querySelectorAll(
              'main div[data-testid="primaryColumn"] video[src^="https://video.twimg.com/tweet_video/"]'
          )
        : [];

    // Instagram images
    const instagramImages = document.querySelectorAll(
        'main article img[src^="https://instagram"]:not([data-testid="user-avatar"])'
    );

    instagramImages.forEach(function (igImage) {
        if (igImage.getAttribute("data-altdisplayed") !== "true") {
            // Instagram June 2021 visible container (single image working)
            let imageLink = igImage.parentElement.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");

            if (
                !igImage.getAttribute("alt") ||
                igImage.getAttribute("alt") == "Image"
            ) {
                altText.style.backgroundColor = "red";
                altText.style.height = "12px";
            } else {
                altText.style.color = "white";
                altText.style.backgroundColor = "blue";
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = igImage.getAttribute("alt");
            }

            if (imageLink) {
                imageLink.append(altText);
            }

            igImage.setAttribute("data-altdisplayed", "true");
        }
    });

    timelineGifs.forEach(function (userGif) {
        if (userGif.getAttribute("data-altdisplayed") !== "true") {
            // Twitter June 2021 visible container
            let gifLink =
                userGif.parentElement.parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement
                    .parentElement.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");

            // Determine if the GIF has alt text on it
            if (
                !userGif.getAttribute("aria-label") ||
                userGif.getAttribute("aria-label") == "Embedded video"
            ) {
                altText.style.backgroundColor = "red";
                altText.style.height = "12px";
            } else {
                altText.style.color = "white";
                altText.style.backgroundColor = "blue";
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = userGif.getAttribute("aria-label");
            }

            if (gifLink) {
                gifLink.append(altText);
            }

            userGif.setAttribute("data-altdisplayed", "true");
        }
    });

    timelineImages.forEach(function (userImage) {
        if (userImage.getAttribute("data-altdisplayed") !== "true") {
            let imageLink = userImage.closest("a");

            // If there are multiple images
            if (imageLink) {
                const imageCount =
                    imageLink.parentElement.querySelectorAll("a");
                if (imageCount.length > 1) {
                    imageLink =
                        imageLink.parentElement.parentElement.parentElement
                            .parentElement.parentElement;
                }
            }

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");

            // Determine if the image has alt text on it
            if (
                !userImage.getAttribute("alt") ||
                userImage.getAttribute("alt") == "Image"
            ) {
                altText.style.backgroundColor = "red";
                altText.style.height = "12px";
            } else {
                altText.style.color = "white";
                altText.style.backgroundColor = "blue";
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = userImage.getAttribute("alt");
            }

            if (imageLink) {
                imageLink.append(altText);
            }
        }
        userImage.setAttribute("data-altdisplayed", "true");
    });
};

let twitterLoop = function twitterLoop() {
    insertAlt();
    setTimeout(twitterLoop, 500);
};

twitterLoop();
