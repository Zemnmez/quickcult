load("@npm//@bazel/typescript:index.bzl", "ts_project")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

ts_project(
    name = "main_ts",
    srcs = glob(["*.ts"]),
    declaration = True,
    tsconfig = "//:tsconfig",
    deps = [
        "@npm//@types/node",
        "//gen:core_en_ts_js"
    ],
)

nodejs_binary(
    name = "main",
    entry_point = "main.js",
)
