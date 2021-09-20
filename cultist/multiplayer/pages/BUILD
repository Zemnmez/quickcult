load("//:rules.bzl", "jest_test", "ts_project")
load("@build_bazel_rules_nodejs//:index.bzl", "js_library")

ts_project(
    name = "ts",
    srcs = glob(
        include = ["*.ts", "*.tsx"],
        exclude = ["*_test.ts"],
    ),
    composite = True,
    declaration = True,
    deps = [
        "//cultist/example",
        "//cultist/react",
        "//cultist",
        "@npm//next",
    ],
    data = [
        "//cultist/multiplayer/styles",
    ],
    visibility = ["//cultist/multiplayer:__subpackages__"]
)

js_library(
    name = "js",
    srcs = [ "_app.js", "demo.js", "index.js" ]
)
