load("//:rules.bzl", "jest_test", "ts_project")

package(default_visibility = ["//visibility:public"])

individual_ts = [
    "save.ts",
    "action.ts",
    "types.ts",
    "history.ts",
]

tsfiles = glob(
    ["*.ts"],
    exclude = [
        "*_test.ts",
    ] + individual_ts,
)

tstestfiles = glob(["*_test.ts"])

ts_project(
    name = "cultist",
    srcs = tsfiles,
    composite = True,
    declaration = True,
    incremental = True,
    project_deps = [
        "//cultist/example",
        "//typescript",
        "//typescript/iter",
        "//cultist:save",
        "//cultist:action",
        "//cultist/state",
        "//cultist:types",

    ],
    tsconfig = "//:tsconfig_node",
    deps = [
        "@npm//@types/uuid",
        "@npm//immutable",
    ],
)

# Separate project needed for 'save' to prevent dependency cycle.
ts_project(
    name = "save",
    srcs = ["save.ts"],
    composite = True,
    declaration = True,
    incremental = True,
)

ts_project(
    name = "action",
    srcs = ["action.ts"],
    composite = True,
    declaration = True,
    incremental = True,
    project_deps = [
        "//cultist/state",
        "//cultist:types",
    ],
)

ts_project(
    name = "history",
    srcs = ["history.ts"],
    composite = True,
    declaration = True,
    incremental = True,
    project_deps = [
        "//cultist:types",
    ],
)

ts_project(
    name = "types",
    srcs = ["types.ts"],
    composite = True,
    declaration = True,
    incremental = True,
)

ts_project(
    name = "tests",
    srcs = tstestfiles,
    composite = True,
    declaration = True,
    incremental = True,
    project_deps = [
        ":cultist",
        ":save",
    ],

    tsconfig = "//:tsconfig_node",
    deps = [
        "@npm//@types/jest",
    ],
)

jest_test(
    name = "test",
    srcs = [f[:-len(".ts")] + ".js" for f in tstestfiles],
    project_deps = [
        ":tests",
    ],
    deps = [
        "@npm//immutable",
        "@npm//uuid",
    ],
)
