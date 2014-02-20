'use strict';

module.exports = function(game, opts) {
  return new FoodPlugin(game, opts);
};

module.exports.pluginInfo = {
  loadAfter: ['voxel-registry']
};

function FoodPlugin(game, opts) {
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-food requires voxel-registry');

  this.enable();
};

FoodPlugin.prototype.enable = function() {
  this.registry.registerItem('cookie', {itemTexture: 'i/cookie'});
};

FoodPlugin.prototype.disable = function() {
  // TODO: unregister items
};

