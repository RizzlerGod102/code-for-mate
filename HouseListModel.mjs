export class HouseListModel {
  static async getAll(req, res) {
    const houses = HouseListModel.getAll();
    res.status(200).json(houses);
  }

  static async create(req, res) {
    const house = req.body;
    const newHouse = HouseListModel.create(house);
    res.status(201).json(newHouse);
  }

  static async update(req, res) {
    const id = req.params.id;
    const updatedHouse = req.body;
    const result = HouseListModel.update(id, updatedHouse);
    res.status(200).json(result);
  }

  static async delete(req, res) {
    const id = req.params.id;
    HouseListModel.delete(id);
    res.status(200).json({ message: "House deleted" });
  }
}