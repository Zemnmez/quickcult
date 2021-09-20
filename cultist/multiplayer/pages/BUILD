load("//:rules.bzl", "jest_test", "ts_project")

ts_project(
    name = "pages",
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
