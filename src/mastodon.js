// Search for items with alt text
let insertMDAlt = function () {
    const mastodonImages = options.mastodonImages
        ? document.querySelectorAll("#mastodon .media-gallery__item img")
        : [];

    mastodonImages.forEach(function (mDImage) {
        if (mDImage.getAttribute("data-altdisplayed") !== "true") {
            let imageLink = mDImage.parentElement.parentElement.parentElement;

            // Container for visible text
            const altText = document.createElement("div");
            altText.setAttribute("aria-hidden", "true");
            altText.style.borderBottomRightRadius = "14px";
            altText.style.borderBottomLeftRadius = "14px";

            if (
                !mDImage.getAttribute("alt") ||
                mDImage.getAttribute("alt") == ""
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
                altText.textContent = mDImage.getAttribute("alt");
            }

            if (imageLink) {
                imageLink.after(altText);
            }

            mDImage.setAttribute("data-altdisplayed", "true");
        }
    });
};

let mastodonLoop = function mastodonLoop() {
    insertMDAlt();
    setTimeout(mastodonLoop, 500);
};

async function initMastodon() {
    const result = await getOptions();
    if (result.mastodonImages !== false) {
        mastodonLoop();
    }
}

initMastodon();
