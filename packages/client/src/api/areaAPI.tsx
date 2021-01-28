import { Area } from "@pcr/shared";
const axios = require("axios").default;

export async function updateArea(area: Area): Promise<boolean> {
  const result = await axios.put("/api/area", area);
  return result.status === 200;
}

export async function getAreas(): Promise<Record<string, Area>> {
  const result = await axios.get("/api/areas");
  return result.data;
}

export async function deleteArea(areaId: string): Promise<boolean> {
  const result = await axios.delete("/api/area", {
    params: {
      areaId,
    },
  });
  console.log(`Delete area ${areaId}`);
  return result.status === 200;
}

export async function getArea(areaId: string): Promise<Area> {
  const result = await axios.get("/api/area", {
    params: {
      areaId,
    },
  });

  return Object.values(result.data)[0] as Area;
}

// export async function addItemToArea(area: string, itemName: string) {
//   const result = await axios.put("/api/areaItem", {
//     area,
//     itemName,
//   });
//   return result.status === 200;
// }
