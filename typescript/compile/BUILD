load("//:rules.bzl", "ts_project", "jest_test", "ts_config", "nodejs_binary")
package(default_visibility = ["//:__subpackages__"])

nodejs_binary(
    name = "compile",
    entry_point = "//typescript/compile-cache:index.js",
    data = [ "@npm//ttypescript", "@npm//v8-compile-cache" ],
    templated_args = [ "ttypescript/bin/tsc" ]
)
