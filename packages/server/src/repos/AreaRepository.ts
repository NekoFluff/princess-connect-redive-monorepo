import Collection from "../mongodb/classes/Collection";
import { AreaName, ItemName, Area, UnwindedArea } from "@pcr/shared";

export default class AreaRepository extends Collection<Area> {
  constructor() {
    super("princess-connect-redive", "areas", Area);
  }

  async getArea(areaId: string) {
    const filter = { _id: areaId };
    return super.find(filter);
  }

  async getAreasForItems(
    itemNames: ItemName[]
  ): Promise<Record<AreaName, Area>> {
    const agg = [
      {
        $match: {
          Drops: {
            $elemMatch: {
              Name: {
                $in: itemNames,
              },
            },
          },
        },
      },
    ];

    return await super.aggregate(agg);
  }

  async getUnwindedAreasForItems(
    itemNames: ItemName[]
  ): Promise<Record<AreaName, UnwindedArea>> {
    const agg = [
      {
        $match: {
          Drops: {
            $elemMatch: {
              Name: {
                $in: itemNames,
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: "$Drops",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $addFields: {
          _id: {
            $concat: ["$_id", "_", "$Drops.Name"],
          },
          Area: "$_id",
          "Item Drop": "$Drops.Name",
          "Drop Rate": "$Drops.Drop Rate",
        },
      },
      {
        $match: {
          "Drops.Name": {
            $in: itemNames,
          },
        },
      },
      {
        $project: {
          Drops: 0,
        },
      },
    ];

    return await super.aggregate(agg, UnwindedArea);
  }

  async addAreas(areas: Area[]): Promise<void> {
    return super.update(areas, true);
  }
}
