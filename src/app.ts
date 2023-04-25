import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter";
import { doubleSame, iArray, iReverse, transpose, print } from "./utils/tools";

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `;

let fields = [
  [0, 0, 2, 2],
  [0, 0, 2, 2],
  [2, 0, 2, 2],
  [0, 0, 2, 2],
];
print(fields);
const main = document.createElement("article");
function render(main: HTMLElement, field: number[][]) {
  fields.map((field, j) => {
    field.map((f, i) => {
      const cell = document.createElement("div");
      cell.innerText = `${f}`;
      cell.className = `transform-${j}-${i}`;
      main.appendChild(cell);
    });
  });
  document.body.append(main);
}
render(main, fields);
addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "ArrowUp") {
    main.remove();
    fields = transpose(
      transpose(iArray(fields)).map((field) => doubleSame(field))
    );
    render(main, fields);
    print(fields);
  }
  if (event.key === "ArrowLeft") {
    fields = fields.map((field) => doubleSame(field));
    print(fields);
  }
  if (event.key === "ArrowRight") {
    fields = fields
      .map((field) => iReverse(field))
      .map((field) => doubleSame(field))
      .map((f) => iReverse(f));

    print(fields);
  }
  if (event.key === "ArrowDown") {
    fields = transpose(
      transpose(iArray(fields))
        .map((field) => doubleSame(field))
        .map((f) => iReverse(f))
    );
    print(fields);
  }
});

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
