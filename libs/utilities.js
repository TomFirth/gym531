const utilities = module.exports = {}

utilities.round5 = (x) => {
  return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5
}
