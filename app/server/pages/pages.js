const homePage = (req, res) => {
  res.returnView('./dist/views/index.html');
};

module.exports = {
  'homePage': homePage
};
