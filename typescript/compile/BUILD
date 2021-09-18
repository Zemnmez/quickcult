load("//:rules.bzl", "ts_project", "jest_test", "ts_config", "nodejs_binary")

nodejs_binary(
    name = "compile",
    entry_point = "//typescript/compile-cache:index.js",
    data = [ "@npm//ttypescript" ],
    templated_args = [ "ttypescript" ]
)
