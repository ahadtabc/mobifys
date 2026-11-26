export default async function copyTextToClipboard(text) {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard access is unavailable in this browser context');
  }

  await navigator.clipboard.writeText(text);
}
