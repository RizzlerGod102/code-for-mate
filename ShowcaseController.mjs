import { ShowcasePostModel } from "../models/ShowcasePostModel.mjs";
import { PricingCatalogue } from "../models/PricingCatalogueModel.mjs";

export class ShowcaseController {
    static getShowcaseJSON(req, res){
        const allBuilds = ShowcasePostModel.getAll()
        res.status(200).json(allBuilds);
    }

  static publishBuild(req,res){
    const house = req.body;

    const company = Companies.find(c => c.name === house.companyName);
    let totalCost = company.basePrice;
    totalCost += house.rooms * PricingCatalogue.perRoom;
    totalCost += house.bathrooms * PricingCatalogue.perBathroom;
    totalCost +=house.garages * PricingCatalogue.perGarage;
    totalCost += house.floorAreaSqm * PricingCatalogue.perSqm;

    if (house.extras?.length) {
      house.extras.forEach(house => {
        const HouseData = PricingCatalogue.house.find(h=> h.name === house);
        if(HouseData) totalCost += HouseData.price;
      });
    }

//Build Object created
    const build = {
      title: house.title,
      companyName: company.name,
      rooms: house.rooms,
      bathrooms: house.bathrooms,
      garages: house.garages,
      floorAreaSqm: house.floorAreaSqm,
      storeyCount: house.storeyCount,
      extras: house.extras,
      totalCost: totalCost
    };

    // Save to ShowcasePostModel
    ShowcasePostModel.insert(build);

    // Respond with the saved build
    res.status(201).json(build);
  }

}