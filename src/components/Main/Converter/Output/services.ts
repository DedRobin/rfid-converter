const copyToClipboard = async (value: string) =>
  await navigator.clipboard.writeText(value);

const addCopiedStatus = (element: HTMLElement) =>
  element.classList.add('copied');

const disableCopiedStatus = (element: HTMLElement) =>
  element.classList.remove('copied');

export { copyToClipboard, addCopiedStatus, disableCopiedStatus };
