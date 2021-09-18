load("//:rules.bzl", "ts_project", "jest_test", "ts_config", "nodejs_binary")
package(default_visibility = ["//:__subpackages__"])

ts_project(
    name = "compile_js",
    srcs = [ "index.ts" ],
    declaration = True,
    tsconfig = "//:tsconfig_node",
    deps = [ "@npm//@types/node" ],
    tsc="@npm//ttypescript/bin:ttsc"
)


nodejs_binary(
    name = "compile-cache",
    entry_point = "index.js"
)


