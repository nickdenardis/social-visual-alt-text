// If sync.get fails, we default to everything on
let options = {
    twitterImages: true,
    twitterGifs: true,
    instagramImages: true,
    facebookImages: true,
    tweetdeckImages: true,
    linkedinImages: true,
    colorNoAlt: "#FF0000",
    colorAltBg: "#0000FF",
    aiColorAltBg: "#750238",
    colorAltText: "#FFFFFF",
};

// Get the users preferences
chrome.storage.sync.get(["options"], function (result) {
    if (result.options) {
        options.twitterImages = result.options.hasOwnProperty("twitterImages")
            ? result.options.twitterImages
            : options.twitterImages;
        options.twitterGifs = result.options.hasOwnProperty("twitterGifs")
            ? result.options.twitterGifs
            : options.twitterGifs;
        options.instagramImages = result.options.hasOwnProperty(
            "instagramImages"
        )
            ? result.options.instagramImages
            : options.instagramImages;
        options.tweetdeckImages = result.options.hasOwnProperty(
            "tweetdeckImages"
        )
            ? result.options.tweetdeckImages
            : options.tweetdeckImages;

        options.linkedinImages = result.options.hasOwnProperty("linkedinImages")
            ? result.options.linkedinImages
            : options.linkedinImages;

        options.colorNoAlt = result.options.colorNoAlt || options.colorNoAlt;
        options.colorAltBg = result.options.colorAltBg || options.colorAltBg;
        options.aiColorAltBg =
            result.options.aiColorAltBg || options.aiColorAltBg;
        options.colorAltText =
            result.options.colorAltText || options.colorAltText;
    }
});

// Search for items with alt text
let insertAlt = function () {
    // Twitter images (single or multiple)
    const timelineImages = options.twitterImages
        ? document.querySelectorAll(
              'main div[data-testid="primaryColumn"] img[src^="https://pbs.twimg.com/media/"]'
          )
        : [];

    // Twitter GIFs
    const timelineGifs = options.twitterGifs
        ? document.querySelectorAll(
              'main div[data-testid="primaryColumn"] video[src^="https://video.twimg.com/tweet_video/"]'
          )
        : [];

    // Instagram images
    const instagramImages = options.instagramImages
        ? document.querySelectorAll(
              'main article img[src^="https://scontent"]:not([data-testid="user-avatar"]), main article img[src^="https://instagram"]:not([data-testid="user-avatar"])'
          )
        : [];

    // Facebook images
    const facebookImages = options.facebookImages
        ? document.querySelectorAll(
              'div[role="feed"] img[src^="https://scontent"]:not([alt^="Profile Photo of"]):not([height="20"]), div[role="main"] div[role="article"] img[src^="https://scontent"]:not([alt^="Profile Photo of"]):not([height="20"]), div[data-pagelet="ProfileTimeline"] img[src^="https://scontent"]:not([alt^="Profile Photo of"]):not([height="20"]), div#pagelet_timeline_main_column img[src^="https://scontent"]:not([alt^="Profile Photo of"]):not([src*="50x50"])'
          )
        : [];

    // Tweetdeck images
    const tweetdeckImages = options.tweetdeckImages
        ? document.querySelectorAll(
              "div.js-tweet a.js-media-image-link, div.js-modal-panel img.media-img"
          )
        : [];

    // LinkedIn images
    const linkedinImages = options.linkedinImages
        ? document.querySelectorAll(
              "div.feed-shared-image img.feed-shared-image__image"
          )
        : [];

    linkedinImages.forEach(function (lnImage) {
        if (lnImage.getAttribute("data-altdisplayed") !== "true") {
            let imageLink =
                lnImage.parentElement.parentElement.parentElement.parentElement
                    .parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");
            altText.style.borderBottomRightRadius = "14px";
            altText.style.borderBottomLeftRadius = "14px";

            // Move around the border radius
            lnImage.style.borderBottomRightRadius = "0px";
            lnImage.style.borderBottomLeftRadius = "0px";

            if (
                !lnImage.getAttribute("alt") ||
                lnImage.getAttribute("alt") ==
                    "No alternative text description for this image"
            ) {
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else if (lnImage.getAttribute("alt").includes("Image preview")) {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.aiColorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = lnImage.getAttribute("alt");
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
                altText.style.fontSize = "14px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = lnImage.getAttribute("alt");
            }

            if (imageLink) {
                imageLink.append(altText);
            }

            lnImage.setAttribute("data-altdisplayed", "true");
        }
    });

    tweetdeckImages.forEach(function (tdImage) {
        if (tdImage.getAttribute("data-altdisplayed") !== "true") {
            // Tweetdeck June 2021 visible container (single image working)
            let imageLink = tdImage.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");
            altText.style.borderBottomRightRadius = "14px";
            altText.style.borderBottomLeftRadius = "14px";

            // Move around the border radius
            tdImage.style.borderBottomRightRadius = "0px";
            tdImage.style.borderBottomLeftRadius = "0px";

            if (
                !tdImage.getAttribute("title") &&
                !tdImage.getAttribute("alt")
            ) {
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
                altText.style.fontSize = "14px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent =
                    tdImage.getAttribute("alt") ||
                    tdImage.getAttribute("title");
            }

            if (imageLink) {
                imageLink.append(altText);
            }

            tdImage.setAttribute("data-altdisplayed", "true");
        }
    });

    facebookImages.forEach(function (fbImage) {
        if (fbImage.getAttribute("data-altdisplayed") !== "true") {
            // Facebook June 2021 visible container (single image working)
            let imageLink =
                fbImage.parentElement.parentElement.parentElement.parentElement
                    .parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");

            if (
                !fbImage.getAttribute("alt") ||
                fbImage.getAttribute("alt") == "Image"
            ) {
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else if (
                fbImage.getAttribute("alt").includes("May be a") ||
                fbImage.getAttribute("alt").includes("Photo by")
            ) {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.aiColorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = fbImage.getAttribute("alt");
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = fbImage.getAttribute("alt");
            }

            if (imageLink) {
                imageLink.append(altText);
            }

            fbImage.setAttribute("data-altdisplayed", "true");
        }
    });

    instagramImages.forEach(function (igImage) {
        if (igImage.getAttribute("data-altdisplayed") !== "true") {
            // Instagram June 2021 visible container (single image working)
            let imageLink = igImage.parentElement.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");
            altText.style.maxWidth = "600px";

            if (
                !igImage.getAttribute("alt") ||
                igImage.getAttribute("alt") == "Image"
            ) {
                imageLink =
                    igImage.parentElement.parentElement.parentElement
                        .parentElement.parentElement;
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else if (
                igImage.getAttribute("alt").includes("May be an image of") ||
                igImage.getAttribute("alt").includes("Photo by")
            ) {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.aiColorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.textContent = igImage.getAttribute("alt");
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
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
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
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
                altText.style.backgroundColor = options.colorNoAlt;
                altText.style.height = "12px";
            } else {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
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
