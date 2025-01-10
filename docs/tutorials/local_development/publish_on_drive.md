---
layout: page
title: Publish on Drive
parent: Local Development
back: Build Distribution
---
Every web daemon not only acts as a server to run web agents, but also comes
with its own drive. This provides a handy way to publish `myapp`.

# Step 1
In your devdaemon drive, create a directory `myapp` and mark it public:

- Navigate to `http://localhost:56032` and open Drive.
- Click <span class='material-icons'>create_new_folder</span>, type `myapp` and click **Create**
- Click <span class='material-icons'>checklist</span>, check `myapp` and click <span class='material-icons'>public</span>

The public icon appears against the `myapp` directory in the listing.

# Step 2
Upload the `dist` directory inside `myapp`:

- Click `myapp` to change directory.
- Click <span class='material-icons'>drive_folder_upload</span>
- Select the `myapp/dist` directory from your local machine and click **Upload**

# Step 3
Install and launch the published app in your shell.

- Click <span class='material-icons'>home</span> if necessary.
- Click <span class='material-icons'>add</span>
- Type `http://localhost:56032/drive/myapp/dist/index.html` and click **Install**

# Step 4 (Optional)
If you have activated your own web daemon, use it to repeat the steps above and the
published app (`https://your.daemon.id/drive/myapp/dist/index.html`) will be
available for anyone to install on theirs.
