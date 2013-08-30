var compiler = require('./compiler.js');
var program = require('commander');
var UglifyJS = require("uglify-js");

program
	.version('0.0.1')
	.option('-u, --uglify', 'Uglify output')
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
			compileFile(program.args[i], program.uglify);
		}
	}
}

function compileFile(filePath, uglify)
{
	compiler.compileFile(filePath).then(function(output)
	{
		if (uglify)
		{
			return UglifyJS.minify(output,
			{
				fromString: true
			}).code;
		}
		else
		{
			return output;
		}
	})
	.then(function(output)
	{
		console.log(output);
	})
	.done();
}

module.exports = main;