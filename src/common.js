// If sync.get fails, we default to everything on
let options = {
    twitterImages: true,
    twitterGifs: true,
    instagramImages: true,
    facebookImages: true,
    tweetdeckImages: true,
    linkedinImages: true,
    mastodonImages: true,
    blueskyImages: true,
    threadsImages: true,
    colorNoAlt: "#FF0000",
    colorAltBg: "#0000FF",
    aiColorAltBg: "#750238",
    colorAltText: "#FFFFFF",
};

// Get the users preferences
function getOptions() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(["options"], function (result) {
            if (result.options) {
                options.twitterImages = result.options.hasOwnProperty(
                    "twitterImages"
                )
                    ? result.options.twitterImages
                    : options.twitterImages;
                options.twitterGifs = result.options.hasOwnProperty(
                    "twitterGifs"
                )
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

                options.linkedinImages = result.options.hasOwnProperty(
                    "linkedinImages"
                )
                    ? result.options.linkedinImages
                    : options.linkedinImages;

                options.mastodonImages = result.options.hasOwnProperty(
                    "mastodonImages"
                )
                    ? result.options.mastodonImages
                    : options.mastodonImages;

                options.blueskyImages = result.options.hasOwnProperty(
                    "blueskyImages"
                )
                    ? result.options.blueskyImages
                    : options.blueskyImages;

                options.threadsImages = result.options.hasOwnProperty(
                    "threadsImages"
                )
                    ? result.options.threadsImages
                    : options.threadsImages;

                options.colorNoAlt =
                    result.options.colorNoAlt || options.colorNoAlt;
                options.colorAltBg =
                    result.options.colorAltBg || options.colorAltBg;
                options.aiColorAltBg =
                    result.options.aiColorAltBg || options.aiColorAltBg;
                options.colorAltText =
                    result.options.colorAltText || options.colorAltText;
            }

            resolve(options);
        });
    });
}

function newlineToBr(text) {
    return text.replace(/\n/g, "<br>");
}
