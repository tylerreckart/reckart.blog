import homer from "./homer";
import excuseme from "./excuseme";
import coding from "./codingcat";
import rickroll from "./rickroll";

export default function randomizeSiteIcon(): void {
  const node = document.getElementById("site--icon");
  const icon = [homer, excuseme, coding, rickroll][
    Math.floor(Math.random() * 4)
  ];

  node!.setAttribute("src", `data:image/gif;base64,${icon}`);
}
