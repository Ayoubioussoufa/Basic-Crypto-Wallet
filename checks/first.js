import { sharedState } from './shared.js';
console.log(sharedState.Address, sharedState.PublicKey, sharedState.Balance);
sharedState.Address = 'p';
sharedState.Balance = 99;
sharedState.PublicKey = 'prrrrrrrrr';
console.log(sharedState.Address, sharedState.PublicKey, sharedState.Balance);

setTimeout(() => { window.location.href = 'hh.html'}, 5000);

export { sharedState };