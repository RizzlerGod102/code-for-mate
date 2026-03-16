import { HouseListModel } from "../../models/HouseListModel.mjs"; // 2 dots means go back up 1 directory level, and 2 lots of that means go up 2 directorys

export class HouseBuilderController {
  static form = document.getElementById("houseForm");
  static saveDraftBtn = document.getElementById("saveDraftButton");
  static submitBtn = document.getElementById("submitButton");

  static init() {
    const urlParams = new URLSearchParams(window.location.search);
    const houseId = urlParams.get("id");
    if (houseId) {
      this.prefillForm(houseId);
    }

    this.saveDraftBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.saveDraft();
    });

    this.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.submitBuild();
    });
  }

  static prefillForm(id) {
    const house = HouseListModel.getById(id);
    if (!house) return;

    for (const key in house) {
      const input = this.form.querySelector(`[name="${key}"]`);
      if (input) input.value = house[key];
    }
  }

  static saveDraft() {
    const houseData = Object.fromEntries(new FormData(this.form));
    HouseListModel.updateOrCreateDraft(houseData);
    alert("Draft saved!");
  }

  static submitBuild() {
    const houseData = Object.fromEntries(new FormData(this.form));
    HouseListModel.updateOrCreateDraft(houseData);
    // optionally send to server via fetch('/api/houses', { method: 'POST', body: ... })
    window.location.href = "houseList.html";
  }
}