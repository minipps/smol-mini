# smol-mini

## NOTE:
This fork is a WIP and used for personal purposes. Documentation may not be up to date and extra configuration may be needed. I'm adding a lot of features to this theme, but still need to update the installation guide. If you want something stable, go use [the original](https://github.com/colorchestra/smol).  

## Description 
A minimal, monospaced blogging theme for Hugo that respects your privacy and is easy on your bandwidth. A demo can be found at https://dospuntostr.es.

smol-mini is based on [Smol](https://github.com/colorchestra/smol) by morph which itsel is based on [Blank](https://github.com/Vimux/Blank) created by [Vimux](https://github.com/Vimux).


![Light Mode](/images/light.png)
![Dark Mode](/images/dark.png)

## Features

- (Almost) No JavaScript
- No Google spyware or tracking of any kind
- No other external dependencies, embedded fonts or comment sections
- Dark mode support + Toggling support
- Catpuccin Latte and Mocha color themes
- SEO friendly 
- Multilanguage support 
- Microformats and other IndieWeb stuff supported!
- Webmention support

## Installation

In your Hugo site `themes` directory, run:

```
git clone https://github.com/minipps/smol-mini
```

Next, open `config.toml` in the base of the Hugo site and ensure the theme option is set to `smol`.

```
theme = "smol"
```

Lastly, add the following lines to your `config.toml` to set site parameters and make use of all the menu entries in the header and footer sections if you need them.

```
# Parameters
[params]
    subtitle = "Your blog subtitle goes here!"
    dateFmt = "02.01.2006 15:04"

# Header
[menu]
  [[menu.main]]
        identifier = "posts"
        name = "Posts"
        url = "/posts/"
        weight = 1 

  [[menu.main]]
        identifier = "categories"
        name = "Categories"
        url = "/categories/"
        weight = 2 

  [[menu.main]]
        identifier = "tags"
        name = "Tags"
        url = "/tags/"
        weight = 3

# Footer
  [[menu.footer]]
        name = "Github"
        url = "https://github.com/example"
        weight = 1 

    [[menu.footer]]
        name = "Mastodon"
        url = "https://example.com/@user"
        weight = 2 

    [[menu.footer]]
        name = "Imprint"
        url = "/imprint"
        weight = 3 

```

For more information read the official [quick start guide](https://gohugo.io/getting-started/quick-start/) of Hugo.

## Optional features
### Custom copyright text
Add `copyright = "Your text here"` - in the config.toml to change the copyright notice in the footer.

### Image captions
You can add captions to images (technically using `<figcaption>` HTML tags) by adding titles, like so: `![Alt text here](/path/to/image.png "Put your caption here!")`

## Contributing

Have you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](https://github.com/minipps/smol-mini/issues) to let me know. Or make directly a [pull request](https://github.com/minipps/smol-mini/pulls).

## License

This theme is released under the [MIT license](https://github.com/minipps/smol-mini/blob/master/LICENSE.md).
