'use strict';

var fetch = require('node-fetch');

var api = function api(apiKey, data) {
  var args = Object.keys(data).filter(function (key) {
    return data[key];
  }).map(function (key) {
    return key + '=' + data[key];
  }).join('&');
  var url = 'http://api.etherscan.io/api?apikey=' + apiKey + '&tag=latest&' + args;
  return fetch(url).then(function (res) {
    return res.json();
  }).then(function (json) {
    return json.result;
  });
};

var transactions = function transactions(apiKey, _ref) {
  var address = _ref.address,
      total = _ref.total,
      contract = _ref.contract,
      startBlock = _ref.startBlock;
  return api(apiKey, {
    module: 'account',
    action: contract ? 'tokentx' : 'txlist',
    sort: 'desc',
    page: 1,
    offset: total,
    address: address,
    startBlock: startBlock,
    contract: contract
  });
};

var balance = function balance(apiKey, _ref2) {
  var addresses = _ref2.addresses,
      address = _ref2.address,
      contract = _ref2.contract;
  return api(apiKey, {
    module: 'account',
    action: contract ? 'tokenbalance' : addresses ? 'balancemulti' : 'balance',
    contractaddress: contract,
    address: addresses ? addresses.join(',') : address
  });
};

module.exports = {
  api: api,
  transactions: transactions,
  balance: balance
};