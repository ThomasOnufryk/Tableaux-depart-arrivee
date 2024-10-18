import "dotenv/config";
const searchStationByName = async (stationName) => {
  const apiKey = process.env.API_KEY;
  console.log(apiKey);

  const response = await fetch(
    `https://api.sncf.com/v1/coverage/sncf/places?q=${encodeURIComponent(
      stationName
    )}`,
    {
      headers: {
        Authorization: `${apiKey}`,
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    console.error("Erreur lors de la recherche de la gare");
    return;
  }
  const data = await response.json();
  console.log(data);
};
searchStationByName("nazaire");
