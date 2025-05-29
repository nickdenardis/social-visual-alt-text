let insertAlt = function () {
    // Images (single or multiple)
    const timelineImages = options.blueskyImages
        ? document.querySelectorAll(
              'main div[data-testid="contentHider-post"] img[src^="https://cdn.bsky.app/img/feed_thumbnail/"], main div[data-expoimage="true"] img[src^="https://cdn.bsky.app/img/feed_thumbnail/"]'
          )
        : [];

    // GIFs
    const timelineGIFs = options.blueskyImages
        ? document.querySelectorAll(
              'main div[data-testid="contentHider-post"] video[src^="https://t.gifs.bsky.app/"]'
          )
        : [];

    timelineImages.forEach(function (userImage) {
        if (userImage.getAttribute("data-altdisplayed") !== "true") {
            // Where to put the alt text in the DOM
            let imageLink =
                userImage.parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement
                    .parentElement;

            // Check to see if this image is to a link (no need to show alt text)
            let closestLink = userImage.closest("a");
            const isExternal =
                closestLink && closestLink.getAttribute("target") == "_blank";

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
                altText.insertAdjacentHTML('beforeend', newlineToBr(userImage.getAttribute("alt").replaceAll("<","&lt;")));
            }

            // Add the element to the DOM
            if (imageLink && !isExternal) {
                imageLink.append(altText);
            }

            // Keep track of the images with alt displayed
            userImage.setAttribute("data-altdisplayed", "true");
        }
    });

    timelineGIFs.forEach(function (userImage) {
        if (userImage.getAttribute("data-altdisplayed") !== "true") {
            // Where to put the alt text in the DOM
            let imageLink =
                userImage.parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");

            // Determine if the image has alt text on it
            if (
                !userImage.getAttribute("aria-label") ||
                userImage.getAttribute("aria-label") == "Image"
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
                altText.insertAdjacentHTML('beforeend', newlineToBr(userImage.getAttribute("aria-label").replaceAll("<","&lt;")));
            }

            // Add the element to the DOM
            if (imageLink) {
                imageLink.append(altText);
            }

            // Keep track of the images with alt displayed
            userImage.setAttribute("data-altdisplayed", "true");
        }
    });
};

let blueskyLoop = function blueskyLoop() {
    insertAlt();
    setTimeout(blueskyLoop, 500);
};

async function initBlueSky() {
    const result = await getOptions();

    if (result.blueskyImages !== false) {
        blueskyLoop();
    }
}

initBlueSky();
