const { resolve } = require('path');
const cliArgs = require('command-line-args');
const cliUsage = require('command-line-usage');

// Command line arguments.
const OPTIONS = [{
	name: 'compressed',
	alias: 'c',
	type: Boolean,
	description: 'If specified, the compiled CSS code will be compressed ' +
		'(instead of expanded).',
	defaultValue: false,
}, {
	name: 'extension',
	alias: 'e',
	type: String,
	description: 'The file extension to use for generated files. ' +
		'If not specified, {bold .css} is used by default.',
	defaultValue: '.css',
}, {
	name: 'files',
	alias: 'f',
	type: String,
	description: 'Files within the {bold --source} directory to compile. ' +
		'If not specified, {bold **/*.scss} is used by default.',
	defaultValue: '**/*.scss',
}, {
	name: 'help',
	alias: 'h',
	type: Boolean,
	description: 'Print this message.',
}, {
	name: 'ignoreInitial',
	alias: 'i',
	type: Boolean,
	description: 'If used with {bold --watch}, the initial scan is ignored and ' +
		'files are only compiled when changes are detected.',
	defaultValue: false,
}, {
	name: 'includePaths',
	alias: 'p',
	type: String,
	multiple: true,
	description: 'By default, the compiler will use {bold ./node_modules} to ' +
		'attempt to resolve {bold @import} and {bold @use} statements. ' +
		'Additional paths can be specified using {bold --includePaths}.',
	defaultValue: [],
}, {
	name: 'output',
	alias: 'o',
	type: String,
	description: 'Path to the output directory.',
}, {
	name: 'source',
	alias: 's',
	type: String,
	description: 'Path to the source directory.',
}, {
	name: 'template',
	alias: 't',
	type: String,
	description: 'Path to a template file containing the placeholder: {bold <% content %>}. ' +
		'This placeholder will be replaced with the compiled CSS code.',
}, {
	name: 'watch',
	alias: 'w',
	type: Boolean,
	description: 'Watch for changes and recompile when changes are detected.',
	defaultValue: false,
}];

const SECTIONS = [{
	header: 'sass-render',
	content: 'Compile SASS into CSS.',
}, {
	header: 'Options',
	optionList: OPTIONS,
}];

/**
 * Parses the command line arguments according to `OPTIONS`.
 * If the `--help` flag was used, it will print the CLI usage screen and exit.
 *
 * @function parseArgs
 * @returns {object} The parsed CLI arguments.
 */
module.exports = function parseArgs() {
	const { help, ...result } = cliArgs(OPTIONS);

	// Add "./node_modules" to the beginning of `includePaths`.
	result.includePaths.unshift('./node_modules');

	if (help) {
		console.log(cliUsage(SECTIONS));
		process.exit(0);
	}

	return result;
}
