#!/usr/bin/env node

const render = require('./render');
const chokidar = require('chokidar');
const parseArgs = require('./parseArgs');
const { dirname, join, resolve } = require('path');
const { promises: fs, readFileSync } = require('fs');
const { mkdir, writeFile } = fs;


// Parse CLI arguments.
const {
	compressed,
	extension,
	files,
	ignoreInitial,
	includePaths,
	output,
	source,
	template: templateFile,
	watch: persistent,
} = parseArgs();

/**
 * If the CLI argument `--template` was specified, read the given file and use it as a `template`.
 * Otherwise, use <% content %>.
 */
const template = templateFile ? readFileSync(templateFile, 'utf8') : '<% content %>';

// Sass render options.
const options = {
	includePaths,
	outputStyle: compressed ? 'compressed' : 'expanded',
};

// Determine the full path to the `source` and `output` directories.
const cwd = resolve(source);
const dest = resolve(output);

/**
 * Compiles the specified file, within the `source` directory, and writes the generated
 * CSS file to the corresponding path within the `output` directory.
 *
 * @function compileFile
 * @param {string} file Path (within the `source` directory) of the file to compile.
 * @param {boolean} [change=false] Indicates if this function is being executed because
 *     the specified file was changed.
 * @returns {Promise}
 */
async function compileFile(file, changed = false) {
	// Full path to the source file, name of the output file, and full path to the output file.
	const sourceFile = join(cwd, file);
	const fileName = file.replace(/\.scss$/, extension);
	const outputFile = join(dest, fileName);

	const desc = `Compiling${ changed ? ' changed ' : ' ' }file`;
	console.log(`${ desc }: ${ join(source, file) } -> ${ join(output, fileName) }`);

	// Compile the code, create its output directory, and write the file.
	const compiledCode = render(sourceFile, template, options);
	await mkdir(dirname(outputFile), { recursive: true });
	await writeFile(outputFile, compiledCode, 'utf8');
}

// Create a watcher.
const watcher = chokidar.watch(files, { cwd, ignoreInitial, persistent });

// Compile a file everytime a new file is added or an existing one is changed.
watcher.on('add', (file) => compileFile(file));
watcher.on('change', (file) => compileFile(file, true));
