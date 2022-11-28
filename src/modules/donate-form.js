import { now } from "moment/moment";
import { Settings } from "../core/constants/settings";

export class DonateForm {
  #donateForm;
  #totalAmountHTML;
  #maxDonate;
  #minDonate;
  #totalAmount;
  #createNewDonate;

  static TextObject = {
    DonateButtonText: "Задонатить",
    InputLabel: `Введите сумму в ${Settings.currency}`,
    TotalAmountTitle: "Накоплено: ",
  };

  static DefaultDonateValues = {
    min: 0,
    max: 100,
  };

  constructor(totalAmount, createNewDonate, maxDonate, minDonate) {
    this.#totalAmount = totalAmount;
    this.#maxDonate = maxDonate || DonateForm.DefaultDonateValues.max;
    this.#minDonate = minDonate || DonateForm.DefaultDonateValues.min;
    this.#createNewDonate = createNewDonate;
  }

  updateTotalAmount(newAmount) {
    this.#totalAmountHTML.textContent = `${DonateForm.TextObject.TotalAmountTitle}${newAmount}${Settings.currency}`;
  }

  #renderDonateButton() {
    const donateButton = document.createElement("button");
    donateButton.className = "donate-form__submit-button";
    donateButton.type = "submit";
    donateButton.innerText = DonateForm.TextObject.DonateButtonText;

    return donateButton;
  }

  #renderAmountInput() {
    const amountInputLabel = document.createElement("label");
    amountInputLabel.className = "donate-form__input-label";
    amountInputLabel.textContent = DonateForm.TextObject.InputLabel;

    const amountInput = document.createElement("input");
    amountInput.className = "donate-form__donate-input";
    amountInput.name = "amount";
    amountInput.type = "number";
    amountInput.max = this.#maxDonate;
    amountInput.min = this.#minDonate;
    amountInput.required = "";
    amountInputLabel.append(amountInput);

    return amountInputLabel;
  }

  #onCreateNewDonateSubmit(event) {
    event.preventDefault();
    const newDonateValue = Number(event.target.amount.value);
    if (newDonateValue && this.#createNewDonate) {
      const newDonate = {
        date: new Date(),
        amount: newDonateValue,
      };
      this.#createNewDonate(newDonate);
      event.target.amount.value = "";
    }
  }

  render() {
    this.#donateForm = document.createElement("form");
    this.#donateForm.className = "donate-form";

    this.#donateForm.addEventListener(
      "submit",
      this.#onCreateNewDonateSubmit.bind(this)
    );

    this.#totalAmountHTML = document.createElement("h1");
    this.#totalAmountHTML.id = "total-amount";
    this.updateTotalAmount(this.#totalAmount);

    const donateButton = this.#renderDonateButton();
    const amountInput = this.#renderAmountInput();

    this.#donateForm.append(this.#totalAmountHTML, amountInput, donateButton);
    return this.#donateForm;
  }
}
