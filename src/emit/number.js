var t = require('./tools.js');

module.exports =
{
	test: function(ast)
	{
		return t.type(ast) === 'Number';
	},
	emit: function(ast)
	{
		return ast;
	},
	requiresSemicolon: true
};