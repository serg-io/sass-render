const { renderSync } = require('sass');

/**
 * Templates must have the string "<% contents %>". This regular expression is used to find and
 * replace "<% content %>" with the compiled CSS.
 */
const REG_EXP = /<%\s*content\s*%>/;

/**
 * Compiles the specified `sassFile` to CSS.
 *
 * @function sassToCss
 * @param {string} sassFile Path to the SASS file to compile.
 * @param {Object} [options={}] Sass render [options](https://www.npmjs.com/package/sass#api).
 * @returns {Promise<string>} The returned promise resolves with the compile CSS source code.
 */
function sassToCss(sassFile, options) {
	const result = renderSync({
		file: sassFile,
		indentWidth: 1,
		indentType: 'tab',
		...options,
	});

	return result.css.toString();
}

/**
 * Compiles SASS code from the specified `sourceFile`, injects the compiled CSS code into the given
 * template, and returns the result.
 *
 * @function render
 * @param {string} sourceFile Path to the source file.
 * @param {string} template Template string. Must contain: <% content %>
 * @param {Object} [options={}] Sass render [options](https://www.npmjs.com/package/sass#api).
 * @returns {Promise<string>}
 */
module.exports = function render(sourceFile, template = '<% content %>', options = {}) {
	const content = sassToCss(sourceFile, options);
	return template.replace(REG_EXP, content);
};
