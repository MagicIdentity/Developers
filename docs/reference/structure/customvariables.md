---
layout: page
title: YAML Custom Variables
parent: App Structure
back: YAML Variables
---
Custom variables can provided in two ways:

## Link Attributes
Custom attributes on your web daemon link are made available as variables.

For example:
```html
<link rel='webdaemon' href='myApp.yml' myvar1='value1' myvar2='value2'>
```

Keys are converted to **lowercase** before being made available as variables,
so for example `MyVar1='value1'` would be referenced as `${myvar1}` in your `.yml`
file.

## Querystring Parameters
Query string parameters on your app's source HTML URL are made available as
variables.

For example, suppose your app's URL is:
```
https://some.web.site/myApp.html?MyVar1=Value1&MyVar2=Value2`
```
then you can reference the variables in your `.yml` file as:

- `${myvar1}` has `Value1`
- `${myvar2}` has `Value2`

Note again that var names are always referenced in lowercase.

## Fragment Parameters
Fragment parameters on your app's source HTML URL are made available as variables.

For example, suppose your app's URL is:
```
https://some.web.site/myApp.html?MyVar1=Value1#MyVar2=Value2
```
then you can reference the variables from both the querystring and the fragment as:

- `${myvar1}` has `Value1`
- `${myvar2}` has `Value2`

## Querystring vs Fragment
When your app URL is installed in an agent, for example by using the shell,
both the querystring and fragment are visible and processed during app installation.

Upon invocation, the full URL is opened as you would expect, but note the following:

- The querystring is visible to **both** the web server **and** the web browser.
- The fragment is visible **only** to the web browser.
