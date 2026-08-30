import { Window } from "../../core/window";

export class CalculatorApp extends Window {
  constructor(windowID) {
    super({
      title: "calculator",
      id: "calculator",
      width: 300,
      height: 310,
      x: 100,
      y: 100
    }, windowID)

    this.expression = "";

    this.expression_view = document.createElement("div");
    this.expression_view.className = "calculator-output";

    this.buttons_div = document.createElement("div");
    this.buttons_div.className = "calculator-buttons";

    this.createButtons();

    this.content.appendChild(this.expression_view);
    this.content.appendChild(this.buttons_div);

  }

  createButtons() {
    const buttons = [
      "(", ")", "AC", "<",
      "9", "8", "7", "/",
      "6", "5", "4", "*",
      "3", "2", "1", "-",
      ".", "0", "=", "+"
    ]

    buttons.forEach((e) => {
      console.log("heheheha");
      let button = document.createElement("button");
      button.className = "calculator-button";
      button.innerText = e;
      switch (e) {
        case "=":
          button.addEventListener("click", () => {
            this.evaluate()
          })
          break;
        case "<":
          button.addEventListener("click", () => {
            this.delete()
          })
          break;
        case "AC":
          button.addEventListener("click", () => {
            this.clear()
          })
          break;
        default:
          button.addEventListener("click", () => {
            this.add_to_expression(e);
          })
      }
      this.buttons_div.appendChild(button);
    })
  }

  add_to_expression(val) {
    if (this.expression == "Error")
      this.expression = "";
    this.expression += val;
    this.expression_view.innerText = this.expression;
  }

  evaluate() {
    let result = "";
    try {
      result = String(eval(this.expression));
    } catch {
      result = "Error";
    }
    this.expression = result;
    this.expression_view.innerText = this.expression;
  }

  delete() {
    this.expression = this.expression.slice(0, -1);
    this.expression_view.innerText = this.expression;
  }

  clear() {
    this.expression = "";
    this.expression_view.innerText = this.expression;
  }
}
