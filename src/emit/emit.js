var tools = require('./tools.js')

var transformers =
[
	require('./number.js'),
	require('./string.js'),
	require('./identifier.js'),
	require('./arithmetic.js'),
	require('./function.js'),
	require('./refinement.js'),
	require('./list.js')
];

function findTransformer(ast)
{
	for (var i = 0; i < transformers.length; i++)
	{
		if (transformers[i].test(ast))
		{
			return transformers[i];
		}
	}
	throw new Error('Unknown structure: ' + ast);
}

function option(opt, name)
{
	return tools.present(opt) ? opt[name] : null;
}

function emit(ast, opt, out)
{
	var transformer = findTransformer(ast);
	var emitReturn = option(opt, 'return') === true;
	var output = transformer.emit(ast, emitReturn);

	if (emitReturn && transformer.canEmitReturn !== true)
	{
		output = 'return ' + output;
		if (transformer.requiresSemicolon === true)
		{
			output += ';';
		}
	}

	if (tools.present(out))
	{
		out.transformer = transformer;
	}
	return output;
}

emit.block = function(ast)
{
	if (tools.type(ast) === 'Array')
	{
		var output = '';
		for (var i = 0; i < ast.length; i++)
		{
			var out = {};
			var itemOutput = emit(ast[i], null, out);
			output += itemOutput;
			if (out.transformer.requiresSemicolon === true)
			{
				output += ';';
			} 
		}
		return output;
	}
	else
	{
		return emit(ast);
	}
}

module.exports = emit;