var emit = null;
var t = require('./tools.js');
var _ = require('underscore');

process.nextTick(function()
{
	emit = require('./emit.js');
});

module.exports =
{
	test: function(ast)
	{
		return t.type(ast) === 'Array';
	},
	emit: function(ast)
	{
		return _.map(ast, emit);
	},
	requiresSemicolon: true
}