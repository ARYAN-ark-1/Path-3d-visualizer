import { CatmullRomCurve3, Vector3 } from "three";

export const createDronePath = () => {
  return new CatmullRomCurve3(
    [
      new Vector3(10, 12, 10),
      new Vector3(40, 15, 0),
      new Vector3(60, 18, -30),
      new Vector3(30, 15, -60),
      new Vector3(-10, 12, -30),
      new Vector3(5, 15, 5),
    ],
    false,
    "catmullrom",
    0.5
  );
};
