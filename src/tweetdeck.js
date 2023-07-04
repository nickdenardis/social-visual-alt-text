// Search for items with alt text
let insertTDAlt = function () {
    let image_selector =
        "div.js-tweet a.js-media-image-link, div.js-modal-panel img.media-img";
    const new_version = document.querySelectorAll("div.js-tweet").length == 0;

    // New version of Tweetdeck (July 2023) overrides
    if (new_version) {
        image_selector =
            'div[data-testid="tweetPhoto"] img:not([alt="Embedded video"])';
    }

    // Tweetdeck images
    const tweetdeckImages = options.tweetdeckImages
        ? document.querySelectorAll(image_selector)
        : [];

    tweetdeckImages.forEach(function (tdImage) {
        if (tdImage.getAttribute("data-altdisplayed") !== "true") {
            // Determine where to insert the visual alt text
            let imageLink = new_version
                ? tdImage.parentElement.parentElement.parentElement
                      .parentElement.parentElement.parentElement.parentElement
                : tdImage.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");
            altText.style.borderBottomRightRadius = "14px";
            altText.style.borderBottomLeftRadius = "14px";

            // Move around the border radius
            tdImage.style.borderBottomRightRadius = "0px";
            tdImage.style.borderBottomLeftRadius = "0px";

            if (
                (!tdImage.getAttribute("title") &&
                    !tdImage.getAttribute("alt")) ||
                tdImage.getAttribute("alt") == "Image"
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
};

let tweetdeckLoop = function tweetdeckLoop() {
    insertTDAlt();
    setTimeout(tweetdeckLoop, 500);
};

async function initTweetdeck() {
    const result = await getOptions();
    if (result.tweetdeckImages !== false) {
        tweetdeckLoop();
    }
}

initTweetdeck();
