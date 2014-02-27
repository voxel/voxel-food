'use strict';

module.exports = function(game, opts) {
  return new FoodPlugin(game, opts);
};

module.exports.pluginInfo = {
  loadAfter: ['voxel-registry', 'voxel-health']
};

function FoodPlugin(game, opts) {
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-food requires voxel-registry plugin');

  this.health = game.plugins.get('voxel-health');
  if (!this.health) throw new Error('voxel-food requires voxel-health plugin');

  this.items = opts.items || {
    // TODO: rebalance/re-enable
    apple: {itemTexture: 'i/apple', foodAmount: 2.0},
    //appleGolden: {itemTexture: 'i/apple_golden', foodAmount: 999.0},
    //beefCooked: {itemTexture: 'i/beef_cooked', foodAmount: 2.0},
    //beefRaw: {itemTexture: 'i/beef_raw', foodAmount: 0.1},
    bread: {itemTexture: 'i/bread', foodAmount: 3.0},
    //cake: {itemTexture: 'i/cake', foodAMount: 3.5},
    //carrot: {itemTexture: 'i/carrot', foodAmount: 0.25},
    //carrotGolden: {itemTexture: 'i/carrot_golden', foodAmount: 5.0},
    //chickenCooked: {itemTexture: 'i/chicken_cooked', foodAmount: 2.0},
    //chickenRaw: {itemTexture: 'i/chicken_raw', foodAmount: 0.1},
    cookie: {itemTexture: 'i/cookie', foodAmount: 0.5},
    //melon: {itemTexture: 'i/melon', foodAmount: 0.5},
    //potatoBaked: {itemTexture: 'i/potato_baked', foodAmount: 0.75},
    //pumpkinPie: {itemTexture: 'i/pumpkin_pie', foodAmount: 7.0},
    spiderEye: {itemTexture: 'i/spider_eye', foodAmount: -1.0},
  };

  this.enable();
};

FoodPlugin.prototype.enable = function() {
  for (var name in this.items) {
    var props = this.items[name];

    props.onUse = this.eat.bind(this, props.foodAmount);

    this.registry.registerItem(name, props);
  }
};

FoodPlugin.prototype.disable = function() {
  // TODO: unregister items
};

FoodPlugin.prototype.eat = function(amount, item) {
  var effectiveAmount = this.health.heal(amount);

  if (effectiveAmount === 0) {
    return false; // didn't eat anything, we're full
  } else {

    // TODO: emit eat event for voxel-sfx

    return true; // ate something, consume item
  }
};
