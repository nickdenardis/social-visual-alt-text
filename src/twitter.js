// Search for items with alt text
let insertTWAlt = function () {
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

    timelineImages.forEach(function (userImage) {
        if (userImage.getAttribute("data-altdisplayed") !== "true") {
            let imageLink = userImage.closest("a");

            // If there are multiple images
            if (imageLink) {
                const imageCount =
                    imageLink.parentElement.parentElement.parentElement.parentElement.querySelectorAll(
                        "a"
                    );

                if (imageCount.length > 1) {
                    imageLink =
                        imageLink.parentElement.parentElement.parentElement
                            .parentElement.parentElement.parentElement;
                }

                // There is an extra div on the three/four image grid
                if (imageCount.length >= 3) {
                    imageLink = imageLink.parentElement;
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

    timelineGifs.forEach(function (userGif) {
        if (userGif.getAttribute("data-altdisplayed") !== "true") {
            // Twitter August 2022 visible container
            let gifLink =
                userGif.parentElement.parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement
                    .parentElement;

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
};

let twitterLoop = function twitterLoop() {
    insertTWAlt();
    setTimeout(twitterLoop, 500);
};

async function initTwitter() {
    const result = await getOptions();
    if (result.twitterImages !== false) {
        twitterLoop();
    }
}

initTwitter();
