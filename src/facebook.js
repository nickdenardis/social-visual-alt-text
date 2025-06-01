// Search for items with alt text
let insertFBAlt = function () {
    // Facebook images
    const facebookImages = options.facebookImages
        ? document.querySelectorAll(
              'div.x1unhpq9 img[src^="https://scontent"]:not([alt^="Profile Photo of"]):not([height="20"]):not([aria-label*="stories"]), div.xw7yly9 img[src^="https://scontent"]:not([alt^="Profile Photo of"]):not([height="20"]), div[role="feed"] img[src^="https://scontent"]:not([alt^="Profile Photo of"]):not([height="20"]), div#pagelet_timeline_main_column img[src^="https://scontent"]:not([alt^="Profile Photo of"]):not([src*="50x50"])'
          )
        : [];

    facebookImages.forEach(function (fbImage) {
        if (fbImage.getAttribute("data-altdisplayed") !== "true") {
            // Check if there are multiple images
            let imageLink = fbImage.closest("a");
            if (imageLink) {
                const imageCount =
                    imageLink.parentElement.parentElement.querySelectorAll("a");
                if (imageCount.length > 1) {
                    imageLink =
                        imageLink.parentElement.parentElement.parentElement;
                } else {
                    // Facebook June 2021 visible container (single image working)
                    imageLink =
                        fbImage.parentElement.parentElement.parentElement
                            .parentElement.parentElement;
                }
            }

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
                let sanitizedAltText = newlineToBr(fbImage.getAttribute("alt").toHtmlEntities());
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.aiColorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.insertAdjacentHTML('beforeend', sanitizedAltText);
            } else {
                let sanitizedAltText = newlineToBr(fbImage.getAttribute("alt").toHtmlEntities());
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.colorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.insertAdjacentHTML('beforeend', sanitizedAltText);
            }

            if (imageLink) {
                imageLink.append(altText);
            }

            fbImage.setAttribute("data-altdisplayed", "true");
        }
    });
};

let facebookLoop = function facebookLoop() {
    insertFBAlt();
    setTimeout(facebookLoop, 500);
};

async function initFacebook() {
    const result = await getOptions();
    if (result.facebookImages !== false) {
        facebookLoop();
    }
}

initFacebook();
