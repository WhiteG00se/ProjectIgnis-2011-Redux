# Incoming Redux Files

Drop downloaded files here when Codex needs to import them into the project.

- Put finished card-image downloads in `Redux/incoming/pics/`.
- Use the target passcode in the filename, such as `83764718.png` or
  `83764718.jpg`.
- Do not paste final card images into chat when quality matters; downloaded
  files preserve the real image bytes.

Codex should validate the image, convert it to the expected format when needed,
then move it into the tracked source folder so the incoming copy is gone.
