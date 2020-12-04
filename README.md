# Nova Translation Editor

This is a laravel nova package to manage/edit your translations. It depends on `spatie/laravel-translation-loader`.

![screenshot](https://raw.githubusercontent.com/bernhardh/nova-translation-editor/master/docs/screenshot.png)

## Features

- Decide which translation group/file you want to make editable (`auth`, `validation`, etc.)
- Add new keys to the translation group
- Save all changes at once or only from current tab
- Multiple languages support
- Respects you own theme colors
- Filter the table by key or translation 

## Installation

### Install dependencies

First, make sure that you have installed and configured [spatie/laravel-translation-loader](https://github.com/spatie/laravel-translation-loader). 

### Installation

Install this package with composer and publish the config

```
composer require bernhardh/nova-translation-editor
php artisan vendor:publish --provider="Bernhardh\NovaTranslationEditor\ToolServiceProvider"
```

Add this nova tool to your NovaServiceProvider (`app/Providers/NovaServiceProvider.php`):

```php
public function tools()
{
    return [
        ...
        new \Bernhardh\NovaTranslationEditor\NovaTranslationEditor()
    ];
}
```
### Configuration

Currently there are two configuration options:

```php
return [
    'groups' => [],
    'languages' => [
        'en'
    ]
];
```

##### groups

Here you can set which groups you want to show in the editor. You can add as many groups you want, for example `auth`, `validation` or even your own translation group. 

##### languages

Here you set, which languages you use. Default is `en`, but you can set other languages like `de` for german or `es` for spanish, etc.

## Filter

You can filter each tab after key AND any string in your translation:

![screenshot](https://raw.githubusercontent.com/bernhardh/nova-translation-editor/master/docs/filter.gif)
