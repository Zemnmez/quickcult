load("//:rules.bzl", "ts_project")

ts_project(
    name = "pages",
    srcs = glob(
        include = [
            "*.ts",
            "*.tsx",
        ],
        exclude = ["*_test.ts"],
    ),
    composite = True,
    declaration = True,
    incremental = True,
    project_deps = [
        "//cultist/example:example",
        "//cultist/react:react",
        "//cultist:cultist",
    ],
    visibility = ["//cultist/multiplayer:__subpackages__"],
    deps = [
        "@npm//next",
        "@npm//@types/react",
        "@npm//@types/react-dom"
    ],
)
