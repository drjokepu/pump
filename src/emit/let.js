var emit = null, undef = null;
var t = require('./tools.js');
var _ = require('underscore');

process.nextTick(function()
{
	emit = require('./emit.js');
	undef = require('./undefined.js');
});

module.exports =
{
	test: function(ast)
	{
		return t.isFormWithName(ast, 'let');
	},
	emit: function(ast, options, indent)
	{
		if (ast.length < 3)
		{
			throw new Error('Let form is too short.')
		}

		var declarations = [];
		for (var i = 1; i < ast.length - 1; i++)
		{
			var declarationAst = ast[i];
			if (t.type(declarationAst) === 'Identifier')
			{
				declarations.push(declarationAst.value);
			}
			else if (t.type(declarationAst) === 'Array')
			{
				if (declarationAst.length !== 2)
				{
					throw new Error('Declaration list must have two items.');
				}

				if (t.type(declarationAst[0]) !== 'Identifier')
				{
					throw new Error('The first item in a declaration pair must be an identifer.');
				}

				var name = declarationAst[0].value;
				var value = emit.expression(declarationAst[1]);
				declarations.push(name + ' = ' + value);
			}
			else
			{
				throw new Error('Declaration must be an identifier or an identifier-value pair.');
			}
		}

		var declarationString = declarations.join(', ');
		var bodyString =  undef.test(ast[ast.length - 1]) ? '' : ';\n' + emit(ast[ast.length - 1],
		{
			allowStatement: true,
			'return': options['return'],
			semicolon: false
		}, null, indent);

		return 'var ' + declarationString + bodyString;
	},
	requiresSemicolon: true,
	handlesReturn: true
};