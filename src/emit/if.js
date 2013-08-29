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
		return t.isFormWithName(ast, 'if');
	},
	emit: function(ast, options, emit)
	{
		if (ast.length < 3)
		{
			throw new Error('If statement is too short.');
		}

		if (ast.length > 4)
		{
			throw new Error('If statement is too long.')
		}

		if (options.allowStatement === true)
		{
			return emitStatement(ast)
		}
		else
		{
			return emitExpression(ast);
		}
		return output;
	},
	requiresSemicolon: function(opt)
	{
		return opt.allowStatement !== true;
	}
};

function emitStatement(ast, indent)
{
	var condition = emit.expression(ast[1]);
	var trueBranch = emit(ast[2],
	{
		allowStatement: true,
		'return': false,
		semicolon: true
	}, null, indent + 1);

	if (ast.length === 3)
	{
		return 'if(' + condition + '){' + trueBranch + '}';
	}
	else
	{
		var falseBranch = emit(ast[3],
		{
			allowStatement: true,
			'return': false,
			semicolon: true
		}, indent + 1);
		return 'if(' + condition + '){' + trueBranch + '}else{' + falseBranch + '}';
	}
}

function emitExpression(ast, indent)
{
	var condition = emit.expression(ast[1]);
	var trueBranch = emit(ast[2],
	{
		allowStatement: true,
		'return': false,
		semicolon: true
	}, indent + 1);

	if (ast.length === 3)
	{
		return '(' + condition + ')?(' + trueBranch + '):undefined';
	}
	else
	{
		var falseBranch = emit(ast[3],
		{
			allowStatement: true,
			'return': false,
			semicolon: true
		}, indent + 1);
		return '(' + condition + ')?(' + trueBranch + '):(' + falseBranch + ')';
	}
}