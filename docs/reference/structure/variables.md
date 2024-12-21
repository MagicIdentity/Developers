---
layout: page
title: YAML Variables
back: YAML Scopes
next: YAML Custom Variables
parent: App Structure
---
You can use the following predefined variables anywhere in your `.yml` file.

Note that variable substitution occurs before the YAML is parsed. This may affect
whether you need to surround variables in quotes.

# `party`
The name of the agent that has installed and launched your app, e.g. `some.agent.id`.

# `source`
The full URL of your app's source HTML, e.g. `https://some.web.site/myApp.html`.

# `source.host`
The host component of your app's source HTML, e.g. `some.web.site`.

# `source.origin`
The origin components of your app's source HTML, e.g. `https://some.web.site`.

# `source.path`
The path component of your app's source HTML, e.g. `/myApp.html`.

# `yaml`
The full URL of your app's YAML file, e.g. `https://some.web.site/myApp.yml`.

# `yaml.host`
The host component of your app's YAML, e.g. `some.web.site`.

# `yaml.origin`
The origin components of your app's YAML, e.g. `https://some.web.site`.

# `yaml.path`
The path component of your app's YAML, e.g. `/myApp.yml`.
