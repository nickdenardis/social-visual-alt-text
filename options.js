// Saves options to chrome.storage
function save_options() {
    let options = {
        twitterImages: document.getElementById("twitter_images").checked,
        twitterGifs: document.getElementById("twitter_gifs").checked,
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
            options: {
                twitterImages: true,
                twitterGifs: true,
            },
        },
        function (items) {
            document.getElementById("twitter_images").checked =
                items.options.twitterImages;
            document.getElementById("twitter_gifs").checked =
                items.options.twitterGifs;
        }
    );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
