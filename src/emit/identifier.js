var t = require('./tools.js');

module.exports =
{
	test: function(ast)
	{
		return t.type(ast) === 'Identifier';
	},
	emit: function(ast)
	{
		return ast.value;
	},
	requiresSemicolon: true
};