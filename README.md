`sass-render`
=============

A command line interface to compile SASS to CSS.

## Installation ##

```sh
npm install serg-io/sass-render
```

## Usage ##

```
sass-render

  Compile SASS into CSS.

Options

  -c, --compressed              If specified, the compiled CSS code will be compressed (instead of expanded).
  -e, --extension string        The file extension to use for generated files. If not specified, .css is used
                                by default.
  -f, --files string            Files within the --source directory to compile. If not specified, **/*.scss
                                is used by default.
  -h, --help                    Print this message.
  -i, --ignoreInitial           If used with --watch, the initial scan is ignored and files are only compiled
                                when changes are detected.
  -p, --includePaths string[]   By default, the compiler will use ./node_modules to attempt to resolve
                                @import and @use statements. Additional paths can be specified using
                                --includePaths.
  -o, --output string           Path to the output directory.
  -s, --source string           Path to the source directory.
  -t, --template string         Path to a template file containing the placeholder: <% content %>. This
                                placeholder will be replaced with the compiled CSS code.
  -w, --watch                   Watch for changes and recompile when changes are detected.
```
