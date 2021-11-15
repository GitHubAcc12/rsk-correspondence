module.exports = (env) => {
  const config = env["dev"] ? "dev" : "prod";
  return require("./webpack.config." + config + ".js");
};
