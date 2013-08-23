var compiler = require('./compiler.js');
var program = require('commander');

program
	.version('0.0.1')
	.parse(process.argv);

function main()
{
	process.nextTick(delayedMain);
}

function delayedMain()
{
	if (program.args.length > 0)
	{
		for (var i = 0; i < program.args.length; i++)
		{
			compileFile(program.args[i]);
		}
	}
}

function compileFile(filePath)
{
	compiler.compileFile(filePath).then(function(output)
	{
		console.log(output);
	})
	.done();
}

module.exports = main;