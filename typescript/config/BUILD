load("//:rules.bzl", "ts_config")

package(default_visibility = ["//visibility:public"])

ts_config(
    name = "node",
    src = "node.tsconfig.json",
    visibility = ["//visibility:public"],
    deps = [":build"],
)

ts_config(
    name = "jsx",
    src = "jsx.tsconfig.json",
    visibility = ["//visibility:public"],
    deps = [":build"],
)

ts_config(
    name = "build",
    src = "build.tsconfig.json",
    visibility = ["//visibility:public"],

    deps = ["//:tsconfig"],
)
