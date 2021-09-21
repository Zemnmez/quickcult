load("//:rules.bzl", "jest_test", "ts_project")
load("@build_bazel_rules_nodejs//:index.bzl", "js_library")

ts_project(
    name = "pages",
    srcs = glob(
        include = ["*.ts", "*.tsx"],
        exclude = ["*_test.ts"],
    ),
    composite = True,
    declaration = True,
    project_deps = [
        "//cultist/example:example",
        "//cultist/react:react",
        "//cultist:cultist"
    ],
    deps = [
        "@npm//next",
    ],
    visibility = ["//cultist/multiplayer:__subpackages__"]
)
