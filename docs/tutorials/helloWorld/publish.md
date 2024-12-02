---
layout: page
title: Publish Your Own
back: Shell
parent: Hello World
back: Install
next: Hello World Explainer
---
In this section you're going to:

1. Clone the Web Agent Developers repo on your local drive.
2. Upload the pre-written app (_Hello World_) to your agent drive.
3. Publish it by marking the folder public.
4. Install and run it on your agent.

You'll find demo apps (and the source of this website) in the [Web Agent Developers](https://github.com/Magic-ID/Developers) repository on Github.

## Instructions

1. Clone the [Web Agent Developers](https://github.com/Magic-ID/Developers) repo onto your own PC or laptop.
   - `git clone {{ site.github_repo }}`
2. Navigate directly to your Web Agent in your browser.
   - That is, simply type the daemon name in the URL bar, such as `your.webagent.name`.
   - If this doesn't show the Home page, you may need to [reclaim]({{ "/start/activate" | relative_url }}) the web agent.
3. Click <span class='material-icons'>folder_shared_outline</span> Drive to view your drive.
4. Click <span class='material-icons'>drive_folder_upload</span> Upload Folder top right, and select the `apps/helloWorld` folder to upload.
   - _Note:_ there's a separate
     <span class='material-icons'>upload_file</span> Upload Files
     which lets you select a bunch of individual files as opposed to a single folder.
   - When you upload a folder, the entire tree below that folder is uploaded too.
5. Click <span class='material-icons'>checklist</span> Selection top left, and tick the newly uploaded `helloWorld` folder.
   - In Select mode, you can set permissions, download and delete entries in drive.
   - Note that deleting a folder automatically deletes all its descendants too!
6. Click <span class='material-icons'>public</span> Public top middle, and note that the `helloWorld` folder is now public.
   - If a folder is made public, that applies to all its descendants.
   - You can mark a descendant folder or file as private if required.
   - You can clear the public or private setting using
     <span class='material-icons'>cancel</span> Clear when in select mode.
7. Click <span class='material-icons'>home</span> Home top right to get back to your home display.
8. Click <span class='material-icons'>add</span> Add Application top right to install a new app.
   - Note that an app is defined by the HTML file, in this case `helloWorld.html`.
9. Enter the URL of your newly published app to install it:
   - `https://<your.webagent.name>/drive/helloWorld/helloWorld.html`
10. If you got the URL right, the app will load and say _Hello_!

Congratulations! You've published your own app using your own web agent.

Now take a look at [how it works](explainer)!
