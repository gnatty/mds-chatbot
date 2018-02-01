
let homePage = (req, res) => {
  res.returnView('./public/views/index.html');
}

module.exports = {
  "homePage": homePage
};