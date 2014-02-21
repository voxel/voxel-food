'use strict';

module.exports = function(game, opts) {
  return new FoodPlugin(game, opts);
};

module.exports.pluginInfo = {
  loadAfter: ['voxel-registry']
};

function FoodPlugin(game, opts) {
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-food requires voxel-registry plugin');

  this.health = game.plugins.get('voxel-health');
  if (!this.health) throw new Error('voxel-food requires voxel-health plugin');

  this.items = opts.items || {
    cookie: {itemTexture: 'i/cookie', foodAmount: 1},
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
