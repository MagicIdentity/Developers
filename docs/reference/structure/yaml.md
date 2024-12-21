---
layout: page
title: YAML Anatomy
parent: App Structure
back: Directory Structure
next: YAML Scopes
---
An app becomes a web agent app if you link a YAML file to the HTML thus:
```html
<link rel='webdaemon' href='helloWorld.yml'>
```

This will have no effect _unless_ the app is loaded from a web agent shell.

```yaml
# The YAML file defines the back-end part of a dæmon app.
# In this example, the endpoint ends up being:
#   https://some.daemon/tab/hello/world/v1/XXX
# where the XXX portion of the path is handled by the server code in
# `helloWorld.ts`.

# Title and icon are used when displaying the app in the shell.
# No need for title if the HTML defines it in the title element.
title: Hello World

# No need for icon if the HTML defines it in a link rel='icon' element.
icon: helloWorld.png

# This is the URL path prefix reserved for use by this app
# (see `tab` below). If omitted, a default path is used which
# is a short digest of the HTML URL.
prefix: hello/world

# The scope is a set of capabilities specific to this app.
# We define just one capability.
scope:
  speak: # User-defined capability.
    description: Can say hello world!

# Specific authorizations are granted to the set of counterparties below.
# We only define one counterparty, and it's only us:
grant:
  ${party}:    # Means this daemon, the one loading the app.
    - speak   # Grants the capability defined in the scope above.

# For each daemon name under audience, a token is generated upon launch.
#
# To use one of these tokens, the appp must put it in the
# `X-Tabserver-Token` header when making requests to the audience for
# that token.
#
# In this example, a token is defined for one audience only, which is
# our own daemon.
audience:
  ${party}:
    # The token requests the capability 'speak' on this app (source is the URL).
    # It also requests the capabilities to read and write daemon storage.
    ${source}: speak
    party:control: setitem getitem

# The app can have a set of endpoints, each implemented by a server
# normally written in Typescript (although you can use Javascript).
#
# Often only a single server is used, and it can be convenient to use a
# version number instead of a name so as to get simple API versioning.
#
# The source is loaded on demand, and the process is killed after (in
# this case) 30 seconds of inactivity.
#
# You can provide static configuration if required. Note that secrets
# must not be passed this way for obvious reasons!
#
# Instead, implement a '/settings' route for dynamic configuration.
tab:
  v1:
    src: helloWorld.ts         # Mandatory. Relative to this YAML file.
    importmap: importmap.json  # Optional.  Ditto.
    ttl: 30                    # Optional.
    config:                    # Optional.
      greeting: Hi there!      # Random demo of custom attribute.
      yaml: ${yaml}            # Ditto, exposes the YAML.
```
