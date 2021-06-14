# Browser extension to visually show alt text of social images

This extension is designed for individuals who are interested in viewing the alt text applied to images without the need to inspect each image or use a screen reader.

![Example of scrolling through Twitter timeline with some images showing alt text and others with a red line](https://nickdenardis.github.io/social-visual-alt-text/assets/twitter-example-timeline.gif)

This is helpful to see what alt text is applied (if any) to an image which may provide additional context to the contence of the image, what a screen reader user would hear and if additional context should be added if you are planning to retweet a post.

The visual text added to the page is hiddent from screen readers to ensure the text is not read to the user twice.

## Current sites

- [x] Twitter images
- [x] Twitter GIFs
- [ ] Twitter video captions
- [ ] Facebook
- [ ] Instagram

## To test

1. [Download the zip of the `main` branch](https://github.com/nickdenardis/social-visual-alt-text/archive/refs/heads/main.zip)
2. Open Chrome "Manage Extensions" and enable "Developer mode"
3. Unzip and select "Load unpacked"
4. Find the unzipped directory and choose "Open"

## Contributing

1. Please open an issue before submitting a pull request
2. Fork the `nickdenardis/social-visual-alt-text` repository
3. Make your changes on the fork
4. Submit a PR to the `nickdenardis/social-visual-alt-text` `main` branch

## Twitter examples

| Photo with alt | Photo without alt |
|--------|--------|
| ![Photo with alt text visible under image](https://nickdenardis.github.io/social-visual-alt-text/assets/twitter-example-single-image.png) | ![Photo without alt text showing a read line under the image](https://nickdenardis.github.io/social-visual-alt-text/assets/twitter-example-no-alt.png) |

| Multiple photos with alt | GIF with alt |
|--------|--------|
| ![Multiple photos with each alt text displayed underneith](https://nickdenardis.github.io/social-visual-alt-text/assets/twitter-example-multiple-photos.png) | ![GIF with alt text visible below](https://nickdenardis.github.io/social-visual-alt-text/assets/twitter-example-gif.png)

## Licensing

Social visual alt is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).