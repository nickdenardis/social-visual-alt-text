// If sync.get fails, we default to everything on
let default_options = {
    twitterImages: true,
    twitterGifs: true,
    instagramImages: true,
    facebookImages: true,
    tweetdeckImages: true,
    colorNoAlt: "#FF0000",
    colorAltBg: "#0000FF",
    aiColorAltBg: "#750238",
    colorAltText: "#FFFFFF",
};

// Saves options to chrome.storage
function save_options() {
    let options = {
        twitterImages: document.getElementById("twitter_images").checked,
        twitterGifs: document.getElementById("twitter_gifs").checked,
        instagramImages: document.getElementById("instagram_images").checked,
        facebookImages: document.getElementById("facebook_images").checked,
        tweetdeckImages: document.getElementById("tweetdeck_images").checked,
        colorNoAlt: document.getElementById("color_no_alt").value,
        colorAltBg: document.getElementById("color_alt_background").value,
        aiColorAltBg: document.getElementById("ai_color_alt_background").value,
        colorAltText: document.getElementById("color_alt_text").value,
    };

    chrome.storage.sync.set(
        {
            options: options,
        },
        function () {
            // Update status to let user know options were saved.
            let status = document.getElementById("status");
            status.textContent = "Options saved.";
            setTimeout(function () {
                status.textContent = "";
            }, 750);
        }
    );
}

// Restores select box and checkbox state using the preferences
function restore_options() {
    // Use default values
    chrome.storage.sync.get(
        {
            options: default_options,
        },
        function (items) {
            document.getElementById("twitter_images").checked =
                items.options.hasOwnProperty("twitterImages")
                    ? items.options.twitterImages
                    : default_options.twitterImages;

            document.getElementById("twitter_gifs").checked =
                items.options.hasOwnProperty("twitterGifs")
                    ? items.options.twitterGifs
                    : default_options.twitterGifs;

            document.getElementById("instagram_images").checked =
                items.options.hasOwnProperty("instagramImages")
                    ? items.options.instagramImages
                    : default_options.instagramImages;

            document.getElementById("facebook_images").checked =
                items.options.hasOwnProperty("facebookImages")
                    ? items.options.facebookImages
                    : default_options.facebookImages;

            document.getElementById("tweetdeck_images").checked =
                items.options.hasOwnProperty("tweetdeckImages")
                    ? items.options.tweetdeckImages
                    : default_options.tweetdeckImages;

            document.getElementById("color_no_alt").value =
                items.options.colorNoAlt || default_options.colorNoAlt;

            document.getElementById("color_alt_background").value =
                items.options.colorAltBg || default_options.colorAltBg;

            document.getElementById("ai_color_alt_background").value =
                items.options.aiColorAltBg || default_options.aiColorAltBg;

            document.getElementById("color_alt_text").value =
                items.options.colorAltText || default_options.colorAltText;
        }
    );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
