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
    apple: {itemTexture: 'i/apple', foodAmount: 2.0, creativeTab: 'food'},
    //appleGolden: {itemTexture: 'i/apple_golden', foodAmount: 999.0, creativeTab: 'food'},
    //beefCooked: {itemTexture: 'i/beef_cooked', foodAmount: 2.0, creativeTab: 'food'},
    //beefRaw: {itemTexture: 'i/beef_raw', foodAmount: 0.1, creativeTab: 'food'},
    bread: {itemTexture: 'i/bread', foodAmount: 3.0, creativeTab: 'food'},
    //cake: {itemTexture: 'i/cake', foodAMount: 3.5, creativeTab: 'food'},
    //carrot: {itemTexture: 'i/carrot', foodAmount: 0.25, creativeTab: 'food'},
    //carrotGolden: {itemTexture: 'i/carrot_golden', foodAmount: 5.0, creativeTab: 'food'},
    //chickenCooked: {itemTexture: 'i/chicken_cooked', foodAmount: 2.0, creativeTab: 'food'},
    //chickenRaw: {itemTexture: 'i/chicken_raw', foodAmount: 0.1, creativeTab: 'food'},
    cookie: {itemTexture: 'i/cookie', foodAmount: 0.5, creativeTab: 'food'},
    //melon: {itemTexture: 'i/melon', foodAmount: 0.5, creativeTab: 'food'},
    //potatoBaked: {itemTexture: 'i/potato_baked', foodAmount: 0.75, creativeTab: 'food'},
    //pumpkinPie: {itemTexture: 'i/pumpkin_pie', foodAmount: 7.0, creativeTab: 'food'},
    spiderEye: {itemTexture: 'i/spider_eye', foodAmount: -1.0, creativeTab: 'food'},
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
