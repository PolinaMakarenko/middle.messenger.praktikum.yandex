import Block from "./Block";

export default function renderDom(rootSelector: string, block: Block) {
  const root = document.querySelector(rootSelector);

  root!.innerHTML = "";
  root!.append(block.getContent()!);
}
