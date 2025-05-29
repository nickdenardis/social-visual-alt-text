let insertAlt = function () {
    // Images (single or multiple)
    const timelineImages = options.threadsImages
        ? document.querySelectorAll('div[aria-label="Column body"] picture img')
        : [];

    timelineImages.forEach(function (userImage) {
        if (userImage.getAttribute("data-altdisplayed") !== "true") {
            // Where to put the alt text in the DOM
            let imageLink =
                userImage.parentElement.parentElement.parentElement
                    .parentElement.parentElement;

            // Check to see if this image is to a link (no need to show alt text)
            let closestLink = userImage.closest("a");
            const isExternal =
                closestLink && closestLink.getAttribute("target") == "_blank";

            // Is there multiple images?
            let img_container =
                imageLink.parentElement.querySelectorAll("picture");
            if (img_container && img_container.length > 1) {
                imageLink = imageLink.parentElement.parentElement;
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
            } else if (
                userImage.getAttribute("alt").includes("May be an image of") ||
                userImage.getAttribute("alt").includes("Photo by")
            ) {
                altText.style.color = options.colorAltText;
                altText.style.backgroundColor = options.aiColorAltBg;
                altText.style.fontSize = "18px";
                altText.style.padding = "4px 8px";
                altText.style.fontFamily =
                    'Arial, "Helvetica Neue", Helvetica, sans-serif';
                altText.insertAdjacentHTML('beforeend', newlineToBr(userImage.getAttribute("alt").replaceAll("<","&lt;")));
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
};

let threadsLoop = function threadsLoop() {
    insertAlt();
    setTimeout(threadsLoop, 500);
};

async function initThreads() {
    const result = await getOptions();

    if (result.threadsImages !== false) {
        threadsLoop();
    }
}

initThreads();
