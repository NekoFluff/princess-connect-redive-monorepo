import Collection from "../mongodb/classes/Collection";
import { AreaName, ItemName, Area, UnwindedArea } from "@pcr/shared";

export default class AreaRepository extends Collection<Area> {
  constructor() {
    super("princess-connect-redive", "areas", Area);
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
        $match: {
          "Drops.Name": {
            $in: itemNames,
          },
        },
      },
      {
        $addFields: {
          _id: "$_id",
          "Item Dropped": "$Drops.Name",
          "Drop Rate": "$Drops.Drop Rate",
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
