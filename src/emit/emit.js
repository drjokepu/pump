var tools = require('./tools.js')

var transformers =
[
	require('./number.js'),
	require('./arithmetic.js')
];

function emit(ast)
{
	for (var i = 0; i < transformers.length; i++)
	{
		if (transformers[i].test(ast))
		{
			return transformers[i].emit(ast);
		}
	}
	throw new Error('Unknown structure: ' + ast);
}

module.exports = emit;