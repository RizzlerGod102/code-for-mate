import { HouseListModel } from "../models/HouseListModel.mjs";

export class HouseListController {
  static houseContainer = document.getElementById("houseContainer");
  static newButton = document.getElementById("newBuildButton");

  static init() {
    this.newButton.addEventListener("click", () => {
      window.location.href = "houseBuilder.html";
    });
    this.renderList();
  }

  static renderList() {
    const houses = HouseListModel.getAll();
    this.houseContainer.innerHTML = "";

    houses.forEach(house => {
      const card = document.createElement("div");
      card.className = "house-card";
      card.innerHTML = `
        <h3>${house.HouseName}</h3>
        <p>Company: ${house.houseCompanyName}</p>
        <p>Floor Area: ${house.houseFloorAreaSqm} sqm</p>
      `;

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        window.location.href = `houseBuilder.html?id=${house.HouseID}`;
      });
      card.appendChild(editBtn);

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        HouseListModel.delete(house.HouseID);
        this.renderList();
      });
      card.appendChild(deleteBtn);

      this.houseContainer.appendChild(card);
    });
  }
}