const allowedCors = ['http://localhost:3001', 'https://localhost:3001'];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const alowedMethods = 'GET,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  console.log(method);
  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', '*');
  // }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Methods', alowedMethods);

    res.header('Access-Control-Allow-Headers', requestHeaders);
    console.log(res);
    res.end();
  }

  next();
};
