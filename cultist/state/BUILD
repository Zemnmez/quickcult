load("//:rules.bzl", "jest_test", "ts_project")

package(default_visibility = ["//visibility:public"])

tsfiles = glob(
    ["*.ts"],
    exclude = ["*_test.ts"],
)

tstestfiles = glob(["*_test.ts"])

ts_project(
    name = "state",
    srcs = tsfiles,
    composite = True,
    declaration = True,
    incremental = True,
    project_deps = [
        "//cultist:save",
        "//typescript",
        "//typescript/iter",
    ],
    tsconfig = "//:tsconfig_node",
    deps = [
        "@npm//@types/uuid",
        "@npm//immutable",
    ],
)

ts_project(
    name = "tests_lib_node",
    srcs = tstestfiles,
    composite = True,
    declaration = True,
    project_deps = [
        "//cultist:save",
        ":state",
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
        "//cultist:save",
        ":state",
    ],
    deps = [
        "@npm//immutable",
        "@npm//uuid",
    ],
)
