module.exports = function(grunt)
{
    grunt.registerTask('default', ['peg']);
    grunt.loadNpmTasks('grunt-peg');
	grunt.initConfig(
	{
		peg:
		{
			pump:
			{
				src: "grammar/grammar.pegjs",
				dest: "grammar/grammar.js"
			}
		}
	});
}