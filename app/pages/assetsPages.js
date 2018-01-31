
let assetsPages = (req, res) => {
  res.returnView('./public/views/index.html');
}

module.exports = {
  "assetsPages": assetsPages
};