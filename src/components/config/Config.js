const Config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    "Content-Type": "application/json",
    " Access-Control-Allow-Origin": "*",
  },
};


export default Config;
