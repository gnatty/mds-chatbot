
let aboutPage = (req, res) => {
  let data = {
    "ok": "ok"
  };
  res.returnJson(200, JSON.stringify(data));
};

let homePage = (req, res) => {
  res.returnView('./views/index.html');
}

module.exports = {
  "homePage": homePage,
  "aboutPage": aboutPage
};