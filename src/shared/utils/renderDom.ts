// utils/renderDOM.js

import { Block } from "../lib/block";

export const render = (query: string, block: Block) => {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  const content = block.getContent()

  if (content){
    root!.appendChild(content);
    block.dispatchComponentDidMount();
    // console.log(root, content)
    return root;
  } else {
    // console.log("ERROR")
  }

  return null;
};
