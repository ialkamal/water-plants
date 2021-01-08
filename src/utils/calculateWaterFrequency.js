const calculateWaterFrequency = ({
  Adapted_to_Coarse_Textured_Soils,
  Adapted_to_Fine_Textured_Soils,
  Adapted_to_Medium_Textured_Soils,
  Precipitation_Maximum,
  Precipitation_Minimum,
  Root_Depth_Minimum_inches,
}) => {
  let waterFrequency = 0;
  let net_irrigation_depth = 0;

  if (Adapted_to_Coarse_Textured_Soils === "Yes")
    if (Number(Root_Depth_Minimum_inches) < 21) net_irrigation_depth = 15;
    else if (
      Number(Root_Depth_Minimum_inches) < 37 &&
      Number(Root_Depth_Minimum_inches) > 20
    )
      net_irrigation_depth = 30;
    else net_irrigation_depth = 40;



  if (Adapted_to_Medium_Textured_Soils === "Yes")
    if (Number(Root_Depth_Minimum_inches) < 21) net_irrigation_depth = 20;
    else if (
      Number(Root_Depth_Minimum_inches) < 37 &&
      Number(Root_Depth_Minimum_inches) > 20
    )
      net_irrigation_depth = 40;
    else net_irrigation_depth = 60;


  if (Adapted_to_Fine_Textured_Soils === "Yes")
    if (Number(Root_Depth_Minimum_inches) < 21) net_irrigation_depth = 30;
    else if (
      Number(Root_Depth_Minimum_inches) < 37 &&
      Number(Root_Depth_Minimum_inches) > 20
    )
      net_irrigation_depth = 50;
    else net_irrigation_depth = 70;


  waterFrequency = Math.round(
    30 /
      (365 /
        ((((Number(Precipitation_Maximum) + Number(Precipitation_Minimum)) /
          2) *
          25.4) /
          net_irrigation_depth))
  );

  return waterFrequency;
};

export default calculateWaterFrequency;
