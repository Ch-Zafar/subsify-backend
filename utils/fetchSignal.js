import axios from "axios";



export const fetchSignal = async () => {
  const res = await axios.get("https://subsrciption-backend-production-75c4.up.railway.app/signals", {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  });

  return res.data;
};
