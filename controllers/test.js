const testIndex = (req, res) => {
  const { query, body } = req;
  console.log(query, "query");
  const { x, y } = query;
  console.log(x, "x");
  console.log(y, "y");
  

  return res.send({ status: "Hello", msg: "hello" });
};

module.exports = {
  testIndex,
};
