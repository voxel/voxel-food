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

  this.enable();
};

FoodPlugin.prototype.enable = function() {
  this.registry.registerItem('cookie', {itemTexture: 'i/cookie', onUse: this.eat.bind(this)});
};

FoodPlugin.prototype.disable = function() {
  // TODO: unregister items
};

FoodPlugin.prototype.eat = function(item) {
  var amount = 1; // TODO: per item

  var effectiveAmount = this.health.heal(amount);

  if (effectiveAmount === 0) {
    return false; // didn't eat anything, we're full
  } else {

    // TODO: emit eat event for voxel-sfx

    return true; // ate something, consume item
  }
};
