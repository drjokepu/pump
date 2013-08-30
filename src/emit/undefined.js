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
		return t.type(ast) === 'Array' && ast.length === 0;
	},
	emit: function(ast, options, indent)
	{
		return 'undefined';
	},
	requiresSemicolon: true
};